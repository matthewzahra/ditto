import string
import secrets
import hashlib
from django.utils import timezone
from datetime import timedelta

'''
manage the generation and verification of authenciation codes
'''

def generate_auth_code():
	alphabet = string.ascii_letters + string.digits
	password = ''.join(secrets.choice(alphabet) for i in range(8))
	return password

def validate_auth_code(user, proposed_code):
	created_at = user.auth_code_generated_at 
	if created_at and timezone.now() < created_at + timedelta(minutes=10):
		return user.auth_code == hashlib.sha256(proposed_code.encode()).hexdigest()
	return False