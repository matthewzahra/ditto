import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv 
import os
import string
import secrets
from backend.main_app.models import CustomUser


'''
Logic for sending emails.
'''

load_dotenv()

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587  # TLS
USERNAME = "ditto.noreply@gmail.com"
APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD").replace(" ", "")  # the 16-char app password

# TODO - maybe some error handling?
def send_message(msg):
	with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as smtp:
		smtp.ehlo()
		smtp.starttls()         # upgrade to TLS
		smtp.ehlo()
		smtp.login(USERNAME, APP_PASSWORD)
		smtp.send_message(msg)

def generate_auth_code():
	alphabet = string.ascii_letters + string.digits
	password = ''.join(secrets.choice(alphabet) for i in range(8))

def send_authentication_code(target_email):

	user = CustomUser.objects.filter(email=target_email)

	if not user: # fail silently so to not expose the emails that we are storing
		raise NotImplemented
	
	else:
		# generate and save the auth code
		code = generate_auth_code()


		msg = EmailMessage()
		msg["From"] = USERNAME
		msg["To"] = target_email
		msg["Subject"] = "Forgot Password"
		msg.set_content(f"Hello {target_person}! The person whom you must get a gift for is {pairing}. Your budget is £10.")
