from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/contact")
async def submit_contact_form(form: ContactForm):
    """
    Handle contact form submission and send email to info@greentrace.tech
    """
    try:
        # Save to database
        contact_dict = form.model_dump()
        contact_dict['id'] = str(uuid.uuid4())
        contact_dict['timestamp'] = datetime.now(timezone.utc).isoformat()
        
        await db.contact_submissions.insert_one(contact_dict)
        
        # Send email
        await send_contact_email(form)
        
        logger.info(f"Contact form submitted: {form.email} from {form.company}")
        return {"success": True, "message": "Thank you for contacting us. We'll get back to you soon."}
    
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

async def send_contact_email(form: ContactForm):
    """
    Send email notification for contact form submission
    Uses SMTP settings from environment variables
    """
    # Get SMTP settings from environment (with fallbacks for testing)
    smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    recipient_email = os.environ.get('CONTACT_EMAIL', 'info@greentrace.tech')
    
    # Skip email if SMTP not configured
    if not smtp_user or not smtp_password:
        logger.warning("SMTP credentials not configured. Email not sent.")
        return
    
    # Create email message
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'New Contact Form Submission from {form.company}'
    msg['From'] = smtp_user
    msg['To'] = recipient_email
    msg['Reply-To'] = form.email
    
    # Email body
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                <h2 style="color: #6FD2C0; border-bottom: 2px solid #6FD2C0; padding-bottom: 10px;">
                    New Contact Form Submission
                </h2>
                
                <div style="background-color: white; padding: 20px; border-radius: 4px; margin-top: 20px;">
                    <p><strong>Name:</strong> {form.name}</p>
                    <p><strong>Email:</strong> <a href="mailto:{form.email}">{form.email}</a></p>
                    <p><strong>Company:</strong> {form.company}</p>
                    
                    <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 4px;">
                        <strong>Message:</strong>
                        <p style="margin-top: 10px; white-space: pre-wrap;">{form.message}</p>
                    </div>
                </div>
                
                <p style="margin-top: 20px; font-size: 12px; color: #666;">
                    This email was sent from the Viridata contact form at viridata.eu
                </p>
            </div>
        </body>
    </html>
    """
    
    text_content = f"""
    New Contact Form Submission
    
    Name: {form.name}
    Email: {form.email}
    Company: {form.company}
    
    Message:
    {form.message}
    
    ---
    This email was sent from the Viridata contact form at viridata.eu
    """
    
    # Attach both HTML and plain text versions
    msg.attach(MIMEText(text_content, 'plain'))
    msg.attach(MIMEText(html_content, 'html'))
    
    try:
        # Send email via SMTP
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
            logger.info(f"Contact email sent successfully to {recipient_email}")
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        # Don't raise exception - we still saved to database

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()