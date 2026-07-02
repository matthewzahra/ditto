import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv 
import os
from user_auth.models import CustomUser
from django.utils import timezone
from user_auth.core.authentication_code import generate_auth_code
import hashlib


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
		return True
	return False

# if the target email exists in our user database, save an authentication code to their profile and send it to them by email
def send_and_save_authentication_code(user):

	target_email = user.email

	if not user: # fail silently so to not expose the emails that we are storing
		pass
	
	else:
		# generate and save the auth code
		code = generate_auth_code()
		user.auth_code = hashlib.sha256(code.encode()).hexdigest()
		user.auth_code_generated_at = timezone.now()

		# construct and send the email message
		msg = EmailMessage()
		msg["From"] = USERNAME
		msg["To"] = target_email
		msg["Subject"] = "Ditto Authentication Code"

		content = f'''Hello {user.username}, 
				an authentication code for this email has been requested. If you did not request this, then ignore the rest of this email. Otherwise, the authentication code is below:
				{code}

				from Team Ditto
				'''

		msg.set_content(content)

		# only save the authentication code if we are able to successfully send the email
		if send_message(msg):
			user.save()