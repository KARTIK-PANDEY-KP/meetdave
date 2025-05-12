# MeetDave Backend

## Setup

1. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables in `.env` file

4. Run the development server:
   ```bash
   python app.py
   ```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/search` | POST | Generate and execute Google dorks for people search |
| `/health` | GET | Health check endpoint |
| `/` | GET | API information |
| `/login` | GET | Initiate Google OAuth flow |
| `/oauth2callback` | GET | Handle OAuth callback |
| `/me` | GET | Get current user information |
| `/logout` | GET | Log out current user |

## Environment Variables

```
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CSE_ID=your_google_custom_search_engine_id
ANTHROPIC_API_KEY=your_anthropic_api_key
```


