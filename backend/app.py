import os
import fitz  # PyMuPDF
from dotenv import load_dotenv
from flask import Flask, request, jsonify, redirect, url_for, session, render_template_string, Response
from flask_cors import CORS
import requests
import json
import asyncio
import base64
import urllib.parse
from email.mime.text import MIMEText
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from google.cloud import firestore
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request

# Load environment variables from .env file
load_dotenv()

# Access environment variables
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
GOOGLE_CSE_ID = os.getenv('GOOGLE_CSE_ID')
GMAIL_CREDENTIALS_PATH = os.getenv('GMAIL_CREDENTIALS_PATH', './GCP_gmail_api_credentials.json')
FIRESTORE_CREDENTIALS_PATH = os.getenv('FIRESTORE_CREDENTIALS_PATH', './firestore-creds.json')

# Allow insecure transport for OAuth (development only)
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

# OAuth scopes for Gmail API
SCOPES = [
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.readonly'
]

from people_search import generate_google_dorks

app = Flask(__name__)
CORS(
    app,
    supports_credentials=True,
    origins=["http://localhost:8000", "http://localhost:3000"],  # Frontend URLs
    methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)
app.secret_key = "FLASK_SESSION_KEY"

# Enable cross-domain cookies
app.config.update(
    SESSION_COOKIE_SAMESITE=None,
    SESSION_COOKIE_SECURE=False  # Set to True if using HTTPS
)

# Helper functions for Google API and Firestore
def get_firestore_client():
    # Set the credentials path for Firestore
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = FIRESTORE_CREDENTIALS_PATH
    return firestore.Client()

def get_user_credentials(user_id):
    db = get_firestore_client()
    doc = db.collection("users").document(user_id).get()
    if not doc.exists:
        return None

    data = doc.to_dict()
    creds = Credentials(
        token=data['access_token'],
        refresh_token=data['refresh_token'],
        token_uri='https://oauth2.googleapis.com/token',
        client_id=os.environ.get('GOOGLE_CLIENT_ID'),
        client_secret=os.environ.get('GOOGLE_CLIENT_SECRET'),
        scopes=SCOPES
    )

    if creds.expired and creds.refresh_token:
        creds.refresh(Request())

        # Save new access token and expiry to Firestore
        db.collection("users").document(user_id).update({
            "access_token": creds.token,
            "token_expiry": creds.expiry.isoformat()
        })

    return creds

# Get environment variables or use defaults
PORT = int(os.getenv("PORT", 8080))
HOST = os.getenv("HOST", "0.0.0.0")
DEBUG = os.getenv("DEBUG", "True").lower() == "true"

@app.route('/search', methods=['POST'])
def search():
    # Ensure user is authenticated
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "Not authenticated"}), 401
    # Check and increment user search count
    db = get_firestore_client()
    user_ref = db.collection('users').document(user_id)
    user_doc = user_ref.get()
    current_searches = user_doc.to_dict().get('searches', 0)
    if current_searches >= 5:
        return jsonify({"error": "Search limit reached"}), 403
    user_ref.update({"searches": firestore.Increment(1)})
    try:
        data = request.get_json()
        if not data or 'query' not in data:
            return jsonify({"error": "Missing 'query' in request"}), 400
        query = data['query']
        
        # Call local generate_google_dorks
        results_dict = generate_google_dorks(query)
        
        # Transform results into the format expected by the frontend
        transformed_results = []
        for idx, entry in enumerate(results_dict.values()):
            for result in entry.get('results', {}).get('data', []):
                raw_title = result.get('title', 'Unknown')
                # Extract name before any dash, slash, or pipe
                for sep in [' - ', ' / ', ' | ']:
                    if sep in raw_title:
                        raw_title = raw_title.split(sep, 1)[0]
                name = raw_title.strip()
                transformed_results.append({
                    "id": f"{idx}-{result.get('link', '')[-8:]}",
                    "name": name,
                    "profileImage": f"https://ui-avatars.com/api/?name={name.replace(' ', '+')}&background=random",
                    "linkUrl": result.get('link', '#'),
                    "linkText": "View Profile"
                })
        # Limit to 10 results
        transformed_results = transformed_results[:10]
        return jsonify({"results": transformed_results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "service": "Dorks Search API",
        "version": "1.0.0",
        "endpoints": [
            {"path": "/search", "method": "POST", "description": "Search with Google dorks"},
            {"path": "/health", "method": "GET", "description": "Health check endpoint"}
        ]
    })

# Email-related endpoints
@app.route('/login')
def login():
    # flow='login' or 'signup'
    flow_type = request.args.get('flow', 'login')
    session['flow'] = flow_type

    if flow_type == 'signup':
        username = request.args.get('username')
        if not username:
            return '❌ Username required for signup', 400
        session['custom_username'] = username

    flow_obj = Flow.from_client_secrets_file(
        GMAIL_CREDENTIALS_PATH,
        scopes=SCOPES,
        redirect_uri=url_for('oauth2callback', _external=True)
    )
    auth_url, _ = flow_obj.authorization_url(include_granted_scopes='true')
    return redirect(auth_url)

@app.route('/oauth2callback')
def oauth2callback():
    # Exchange token
    flow_obj = Flow.from_client_secrets_file(
        GMAIL_CREDENTIALS_PATH,
        scopes=SCOPES,
        redirect_uri=url_for('oauth2callback', _external=True)
    )
    flow_obj.fetch_token(authorization_response=request.url)

    creds = flow_obj.credentials
    access_token = creds.token
    refresh_token = creds.refresh_token
    token_expiry = creds.expiry.isoformat()

    service = build('gmail', 'v1', credentials=creds)
    email = service.users().getProfile(userId='me').execute()['emailAddress']

    flow_type = session.get('flow', 'login')
    db = get_firestore_client()
    users_ref = db.collection('users')
    frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:8000')

    if flow_type == 'login':
        # Existing user login
        docs = list(users_ref.where('email', '==', email).stream())
        if docs:
            doc = docs[0]
            user_id = doc.id
            # Update tokens
            doc.reference.update({
                'access_token': access_token,
                'refresh_token': refresh_token,
                'token_expiry': token_expiry
            })
            session['user_id'] = user_id
            session['user_email'] = email
            session.permanent = True
            return redirect(f"{frontend_url}/search")
        else:
            # Not registered: go to signup
            session['temp_email'] = email
            return redirect(f"{frontend_url}/login?flow=signup")
    else:
        # Signup flow
        # Enforce unique email
        normalized_email = email.lower().strip()
        dup = list(users_ref.where('email', '==', normalized_email).stream())
        if dup:
            session.pop('temp_email', None)
            session.pop('flow', None)
            return redirect(f"{frontend_url}/login?error=email_already_registered")
        username = session.get('custom_username')
        if not username:
            return '❌ Missing username for signup', 400
        user_id = username
        session['user_id'] = user_id
        session['user_email'] = email
        session.permanent = True
        # Create new user
        users_ref.document(user_id).set({
            'email': normalized_email,
            'access_token': access_token,
            'refresh_token': refresh_token,
            'token_expiry': token_expiry,
            'searches': 0,
            'joined_waitlist': False,
            'profile_completed': False
        })
        return redirect(f"{frontend_url}/resume")

def extract_text_from_upload(file):
    try:
        # Try to open as PDF first
        if file.filename.lower().endswith('.pdf'):
            doc = fitz.open(stream=file.read(), filetype="pdf")
            text = "\n".join(page.get_text() for page in doc)
            doc.close()
            return text
        # For other file types, you might need additional libraries
        # This is a placeholder for DOC/DOCX handling
        else:
            return "File type not supported for text extraction. Only PDF is currently supported."
    except Exception as e:
        return f"Error extracting text: {str(e)}"

@app.route('/complete_profile', methods=['POST'])
def complete_profile():
    # Get user_id from session instead of form
    user_id = session.get('user_id')
    if not user_id:
        return "❌ Not authenticated. Please log in first.", 401

    # Get form data and file
    additional_details = request.form.get('additional_details', '')
    
    # Check if file was uploaded
    if 'resume_file' not in request.files:
        return "❌ No resume file uploaded", 400
        
    file = request.files['resume_file']
    if file.filename == '':
        return "❌ No resume file selected", 400
    
    # Extract text from the uploaded file
    resume_text = extract_text_from_upload(file)
    
    # Store in Firestore
    db = get_firestore_client()
    user_ref = db.collection("users").document(user_id)
    
    # First check if document exists
    doc = user_ref.get()
    if not doc.exists:
        # Create new document
        user_ref.set({
            "resume_text": resume_text,
            "additional_details": additional_details,
            "profile_completed": True,
            "joined_waitlist": True
        })
    else:
        # Update existing document
        user_ref.update({
            "resume_text": resume_text,
            "additional_details": additional_details,
            "profile_completed": True,
            "joined_waitlist": True
        })

    return "✅ Saved"


@app.route('/send_email', methods=['POST'])
def send_email():
    data = request.json
    username = data.get('username')
    to_email = data.get('to')
    subject = data.get('subject')
    body = data.get('body')

    if not all([username, to_email, subject, body]):
        return {"error": "Missing one of: username, to, subject, body"}, 400

    creds = get_user_credentials(username)
    if creds is None:
        return {"error": "❌ No credentials found for this user"}, 403

    service = build('gmail', 'v1', credentials=creds)
    message = MIMEText(body)
    message['to'] = to_email
    message['subject'] = subject

    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
    send_result = service.users().messages().send(userId='me', body={'raw': raw_message}).execute()

    return {"status": "✅ Email sent successfully!", "id": send_result['id']}


@app.route('/read_with', methods=['POST'])
def read_with():
    data = request.json
    username = data.get('username')
    target_email = data.get('email')

    if not username or not target_email:
        return {"error": "Missing username or target email"}, 400

    creds = get_user_credentials(username)
    if creds is None:
        return {"error": "❌ No credentials found for this user"}, 403

    service = build('gmail', 'v1', credentials=creds)
    query = f'to:{target_email} OR from:{target_email}'
    results = service.users().messages().list(userId='me', q=query, maxResults=10).execute()
    messages = results.get('messages', [])

    email_data = []
    for msg in messages:
        msg_detail = service.users().messages().get(userId='me', id=msg['id'], format='full').execute()
        headers = msg_detail.get('payload', {}).get('headers', [])

        def get_header(name):
            return next((h['value'] for h in headers if h['name'].lower() == name.lower()), "")

        subject = get_header('Subject')
        sender = get_header('From')
        recipient = get_header('To')
        cc = get_header('Cc')
        bcc = get_header('Bcc')
        date = get_header('Date')

        body = ''
        payload = msg_detail.get('payload', {})
        parts = payload.get('parts', [])

        if parts:
            for part in parts:
                if part['mimeType'] == 'text/plain' and 'data' in part['body']:
                    body = base64.urlsafe_b64decode(part['body']['data']).decode('utf-8', errors='ignore')
                    break
                elif part['mimeType'] == 'text/html' and 'data' in part['body']:
                    body = base64.urlsafe_b64decode(part['body']['data']).decode('utf-8', errors='ignore')
        elif 'data' in payload.get('body', {}):
            body = base64.urlsafe_b64decode(payload['body']['data']).decode('utf-8', errors='ignore')

        email_data.append({
            'from': sender,
            'to': recipient,
            'cc': cc,
            'bcc': bcc,
            'date': date,
            'subject': subject,
            'body': body[:500]
        })

    return {'emails': email_data}


@app.route('/get_email', methods=['POST'])
def get_email():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No JSON data received"}), 400
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        linkedin_url = data.get("linkedin_url")
        if not first_name or not last_name or not linkedin_url:
            return jsonify({"error": "Missing required fields: first_name, last_name, linkedin_url"}), 400

        encoded_profile = urllib.parse.quote(linkedin_url, safe='')
        url = (f"https://api.apollo.io/api/v1/people/match?first_name={first_name}"
               f"&last_name={last_name}&linkedin_url={encoded_profile}&"
               "reveal_personal_emails=true&reveal_phone_number=false")

        headers = {
            "accept": "application/json",
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "x-api-key": APOLLO_API_KEY
        }

        response = requests.post(url, headers=headers)
        if response.status_code != 200:
            return jsonify({
                "error": "Failed to fetch email from Apollo API",
                "status_code": response.status_code,
                "details": response.text
            }), response.status_code

        # Parse and return only the email
        result = response.json()
        email = result.get("person", {}).get("email")
        if not email:
            return jsonify({"error": "Email not found"}), 404
        return jsonify({"email": email})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/me', methods=['GET'])
def me():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'authenticated': False}), 401
    db = get_firestore_client()
    doc = db.collection('users').document(user_id).get()
    data = doc.to_dict() if doc.exists else {}
    return jsonify({
        'authenticated': True,
        'user_id': user_id,
        'profile_completed': data.get('profile_completed', False),
        'joined_waitlist': data.get('joined_waitlist', False)
    })

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True}), 200

if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=DEBUG)