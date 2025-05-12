import os
import json
import anthropic
from googleapiclient.discovery import build
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
GOOGLE_CSE_ID = os.environ.get("GOOGLE_CSE_ID")

# Template for prompting Claude to generate Google dorks
DORKS_TEMPLATE = """
# Google Dork Syntax Quick Reference
# ===============================

# How to Use This Document:
# 1. Copy the syntax you need from the sections below
# 2. Replace the placeholders (like 'term', 'domain.com', etc.) with your actual search terms
# 3. Combine multiple operators to create complex searches
# 4. Use this as a reference when creating prompts for LLMs to generate dorks

# Example Usage:
# To find PDFs about AI on a specific domain:
# site:example.com filetype:pdf "artificial intelligence"
#
# To find people on LinkedIn in a specific location:
# site:linkedin.com/in "software engineer" "San Francisco"

# Quick Tips:
# - Use quotes for exact phrases
# - Combine operators with spaces
# - Use OR for alternatives
# - Use - to exclude terms
# - Group terms with parentheses

# Google Dorks Examples for Finding Specific People

## Basic Person Search
Natural Query: "Find John Smith who lives in New York"
Dork: site:linkedin.com/in "John Smith" "New York" OR site:twitter.com "John Smith" "New York"

Natural Query: "Find Sarah Johnson who works at Google"
Dork: site:linkedin.com/in "Sarah Johnson" "Google" OR site:twitter.com "Sarah Johnson" "Google"

Natural Query: "Find Michael Brown who graduated from Harvard"
Dork: site:linkedin.com/in "Michael Brown" "Harvard" OR site:twitter.com "Michael Brown" "Harvard"

## Location-Based Person Search
Natural Query: "Find David Wilson in San Francisco"
Dork: (site:linkedin.com/in OR site:twitter.com OR site:instagram.com) "David Wilson" "San Francisco"

Natural Query: "Find Emily Chen in London"
Dork: (site:linkedin.com/in OR site:twitter.com OR site:instagram.com) "Emily Chen" "London"

Natural Query: "Find Robert Taylor in Chicago"
Dork: (site:linkedin.com/in OR site:twitter.com OR site:instagram.com) "Robert Taylor" "Chicago"

## Name and Company Search
Natural Query: "Find Jennifer Lee who works at Microsoft"
Dork: site:linkedin.com/in "Jennifer Lee" "Microsoft" OR site:twitter.com "Jennifer Lee" "Microsoft"

Natural Query: "Find William Park at Apple"
Dork: site:linkedin.com/in "William Park" "Apple" OR site:twitter.com "William Park" "Apple"

Natural Query: "Find Lisa Wong at Amazon"
Dork: site:linkedin.com/in "Lisa Wong" "Amazon" OR site:twitter.com "Lisa Wong" "Amazon"

## Name and Education Search
Natural Query: "Find James Miller who went to Stanford"
Dork: site:linkedin.com/in "James Miller" "Stanford" OR site:twitter.com "James Miller" "Stanford"

Natural Query: "Find Maria Garcia who studied at MIT"
Dork: site:linkedin.com/in "Maria Garcia" "MIT" OR site:twitter.com "Maria Garcia" "MIT"

Natural Query: "Find Thomas Kim who graduated from Yale"
Dork: site:linkedin.com/in "Thomas Kim" "Yale" OR site:twitter.com "Thomas Kim" "Yale"

## Name and Recent Activity Search
Natural Query: "Find Daniel White who recently changed jobs"
Dork: site:linkedin.com/in "Daniel White" "new position" after:2024-02-01

Natural Query: "Find Olivia Brown who recently moved to Seattle"
Dork: site:linkedin.com/in "Olivia Brown" "Seattle" after:2024-01-01

Natural Query: "Find Christopher Lee who got promoted recently"
Dork: site:linkedin.com/in "Christopher Lee" "promoted" after:2024-01-01

## Cross-Platform Person Search
Natural Query: "Find Jessica Martinez across all social media"
Dork: (site:linkedin.com/in OR site:twitter.com OR site:instagram.com) "Jessica Martinez"

Natural Query: "Find Kevin Nguyen on both LinkedIn and Twitter"
Dork: (site:linkedin.com/in OR site:twitter.com) "Kevin Nguyen"

Natural Query: "Find Rachel Adams on Instagram and LinkedIn"
Dork: (site:instagram.com OR site:linkedin.com/in) "Rachel Adams"

## Name and Specific Details Search
Natural Query: "Find Brian Wilson who speaks Spanish"
Dork: site:linkedin.com/in "Brian Wilson" "Spanish" OR "fluent in Spanish"

Natural Query: "Find Sophia Chen who has AWS certification"
Dork: site:linkedin.com/in "Sophia Chen" "AWS" OR "AWS certified"

Natural Query: "Find Matthew Kim who knows Python"
Dork: site:linkedin.com/in "Matthew Kim" "Python" OR "Python developer"

## LinkedIn Profile Search
Natural Query: "Find software engineers at Microsoft in Seattle"
Dork: site:linkedin.com/in "software engineer" "Microsoft" "Seattle"

Natural Query: "Find data scientists who graduated from MIT"
Dork: site:linkedin.com/in "data scientist" "MIT"

Natural Query: "Find product managers who previously worked at Amazon"
Dork: site:linkedin.com/in "product manager" "Amazon" "former"

Natural Query: "Find people who recently joined Meta"
Dork: site:linkedin.com/in "Meta" "new position" after:2024-02-01

## Twitter Profile Search
Natural Query: "Find tech journalists on Twitter"
Dork: site:twitter.com "tech journalist" inurl:/status

Natural Query: "Find AI researchers with verified accounts"
Dork: site:twitter.com "AI researcher" "verified account"

Natural Query: "Find startup founders in San Francisco"
Dork: site:twitter.com "founder" "San Francisco" inurl:/status

Natural Query: "Find cybersecurity experts who tweet about hacking"
Dork: site:twitter.com "cybersecurity" "expert" "hacking" inurl:/status

Natural Query: "Find venture capitalists who tweet about startups"
Dork: site:twitter.com "venture capitalist" "startup" inurl:/status

## Instagram Profile Search
Natural Query: "Find photographers in New York"
Dork: site:instagram.com "photographer" "New York" inurl:/p/

Natural Query: "Find fashion influencers in Paris"
Dork: site:instagram.com "fashion" "influencer" "Paris" inurl:/p/

Natural Query: "Find fitness trainers with verified accounts"
Dork: site:instagram.com "fitness trainer" "verified" inurl:/p/

Natural Query: "Find travel bloggers who post about Asia"
Dork: site:instagram.com "travel blogger" "Asia" inurl:/p/

Natural Query: "Find food critics in Los Angeles"
Dork: site:instagram.com "food critic" "Los Angeles" inurl:/p/

## Cross-Platform Profile Search
Natural Query: "Find someone who's active on both LinkedIn and Twitter"
Dork: site:linkedin.com/in OR site:twitter.com "John Smith"

Natural Query: "Find tech influencers who are on both Instagram and Twitter"
Dork: (site:instagram.com OR site:twitter.com) "tech influencer" "verified"

Natural Query: "Find startup founders who maintain presence on multiple platforms"
Dork: (site:linkedin.com/in OR site:twitter.com OR site:instagram.com) "startup founder" "CEO"

## Advanced Profile Search Techniques
Natural Query: "Find people who changed jobs in the last 3 months"
Dork: site:linkedin.com/in "new position" after:2024-01-01

Natural Query: "Find people who recently moved to a new city"
Dork: site:linkedin.com/in "relocated to" OR "moved to" after:2024-01-01

Natural Query: "Find people who got promoted recently"
Dork: site:linkedin.com/in "promoted to" OR "new role" after:2024-01-01

Natural Query: "Find people who speak multiple languages"
Dork: site:linkedin.com/in "fluent in" OR "proficient in" OR "native speaker"

Natural Query: "Find people with specific certifications"
Dork: site:linkedin.com/in "certified" OR "certification" "AWS" OR "Google Cloud"

## Basic Profile Search Examples
Natural Query: "Find someone's Twitter profile with username containing 'techguy'"
Dork: site:twitter.com inurl:techguy

Natural Query: "Find Instagram profiles from New York"
Dork: site:instagram.com "New York" inurl:/p/

## Advanced Search Examples
Natural Query: "Find LinkedIn profiles of software engineers in San Francisco"
Dork: site:linkedin.com/in "software engineer" "San Francisco"

Natural Query: "Find Twitter posts about AI from verified accounts"
Dork: site:twitter.com "AI" "verified account"

Natural Query: "Find Instagram posts with specific hashtag #tech"
Dork: site:instagram.com/p/ #tech

## Content Search Examples
Natural Query: "Find LinkedIn articles about machine learning"
Dork: site:linkedin.com/pulse "machine learning"

Natural Query: "Find Twitter threads about cybersecurity"
Dork: site:twitter.com "cybersecurity" "thread"

Natural Query: "Find Instagram posts with location in Paris"
Dork: site:instagram.com/p/ "Paris" "location"

## Company/Organization Search
Natural Query: "Find employees of Google on LinkedIn"
Dork: site:linkedin.com/in "Google" "employee"

Natural Query: "Find Twitter accounts of Microsoft employees"
Dork: site:twitter.com "Microsoft" "employee"

Natural Query: "Find Instagram posts from official company accounts"
Dork: site:instagram.com "official account" "company"

## Date-Based Search
Natural Query: "Find LinkedIn posts from last month"
Dork: site:linkedin.com/pulse after:2024-02-01

Natural Query: "Find Twitter posts from specific date"
Dork: site:twitter.com after:2024-03-01 before:2024-03-15

Natural Query: "Find Instagram posts from last week"
Dork: site:instagram.com/p/ after:2024-03-01

## File Type Search
Natural Query: "Find PDF resumes on LinkedIn"
Dork: site:linkedin.com filetype:pdf "resume"

Natural Query: "Find PowerPoint presentations shared on Twitter"
Dork: site:twitter.com filetype:ppt OR filetype:pptx

Natural Query: "Find job postings on LinkedIn"
Dork: site:linkedin.com/jobs "software engineer"

## Combination Search Examples
Natural Query: "Find software engineers in New York who work at startups"
Dork: site:linkedin.com/in "software engineer" "New York" "startup"

Natural Query: "Find tech influencers on Twitter with over 10k followers"
Dork: site:twitter.com "tech" "influencer" "followers"

Natural Query: "Find Instagram posts about food in Tokyo from verified accounts"
Dork: site:instagram.com/p/ "food" "Tokyo" "verified"

## Specialized Search Examples
Natural Query: "Find people who changed jobs in the last month on LinkedIn"
Dork: site:linkedin.com/in "new position" after:2024-02-01

Natural Query: "Find Twitter threads about recent tech layoffs"
Dork: site:twitter.com "tech layoffs" "thread" after:2024-01-01

Natural Query: "Find Instagram posts about tech events in 2024"
Dork: site:instagram.com/p/ "tech event" "2024"

# Google Dork Syntax Reference

## Basic Operators
site:domain.com           # Search only on specific website
"exact phrase"            # Search for exact phrase
term1 OR term2            # Search for either term
-term                     # Exclude specific term
(term1 OR term2)          # Group terms
term1 AND term2           # Both terms must be present

## File Type Search
filetype:ext              # Search for specific file type
filetype:pdf              # PDF files
filetype:doc              # Word documents
filetype:xls              # Excel files
filetype:txt              # Text files

## URL Search
inurl:term                # Search in URL
intitle:term              # Search in page title
intext:term               # Search in page text
allinurl:term1 term2      # All terms in URL
allintitle:term1 term2    # All terms in title
allintext:term1 term2     # All terms in text

## Date Range Search
after:YYYY-MM-DD          # Content after date
before:YYYY-MM-DD         # Content before date
daterange:start-end       # Content between dates

## Advanced Search
cache:url                 # Find cached version
related:domain.com        # Find related sites
link:domain.com           # Find pages linking to URL
info:domain.com           # Get information about site
define:term               # Get definition

## Wildcards and Ranges
term*                     # Wildcard search
number1..number2          # Number range
size:>10MB                # File size
mime:type                 # MIME type

## Location and Language
location:place            # Content near location
lang:code                 # Content in specific language
country:code              # Content from country

## Security Related
intext:"password"         # Find passwords
intext:"username"         # Find usernames
intext:"@domain.com"      # Find email addresses
intext:"XXX-XX-XXXX"      # Find SSN patterns
intext:"XXXX XXXX XXXX XXXX" # Find credit card numbers

## Technical
inurl:"viewerframe?mode=" # Find cameras
intitle:"index of"        # Find directory listings
filetype:sql              # Find database files
filetype:log              # Find log files
filetype:conf             # Find config files

## Boolean Combinations
(term1 OR term2) AND (term3 OR term4) -term5  # Complex boolean
term1 (term2 | term3) term4                   # Alternative syntax
term1 +term2 -term3                           # Include/exclude

## Special Characters
"term1 term2"             # Phrase search
term1 +term2              # Required term
term1 -term2              # Excluded term
term1 ~term2              # Similar term
term1 *term2              # Wildcard term

now following is the user query convert that to dork and give me only dorks in JSON nothing else:

User Query: {query}

Return ONLY the JSON with dorks, nothing else.
"""

def search_with_google_api(query: str) -> dict:
    """Search using Google's Custom Search API."""
    service = build("customsearch", "v1", developerKey=GOOGLE_API_KEY)
    response = service.cse().list(q=query, cx=GOOGLE_CSE_ID, num=5).execute()
    items = response.get("items", []) or []
    data = []
    links = []
    for item in items:
        data.append({
            "title": item.get("title", ""),
            "link": item.get("link", ""),
            "snippet": item.get("snippet", "")
        })
        links.append(item.get("link", ""))
    return {"data": data, "links": links}


def generate_google_dorks(natural_query: str) -> dict:
    """Generate Google dorks for a natural language query, then fetch CSE results."""
    if not ANTHROPIC_API_KEY or not GOOGLE_API_KEY or not GOOGLE_CSE_ID:
        raise RuntimeError("Required environment variables are missing: ANTHROPIC_API_KEY, GOOGLE_API_KEY, GOOGLE_CSE_ID")

    # 1. Ask Claude to generate JSON array of dorks
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    prompt = DORKS_TEMPLATE.replace("{query}", natural_query)
    message = client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=4096,
        temperature=0,
        messages=[{"role": "user", "content": prompt}]
    )
    # Extract JSON
    response_text = message.content[0].text
    if "```json" in response_text:
        json_str = response_text.split("```json")[1].split("```")[0].strip()
    else:
        json_str = response_text.strip()
    dorks = json.loads(json_str)

    # 2. For each dork, fetch search results
    final_results = {}
    for idx, dork in enumerate(dorks, start=1):
        final_results[f"query_{idx}"] = {
            "query": dork,
            "results": search_with_google_api(dork)
        }
    return final_results
