from django.db import models
from django.contrib.auth.models import AbstractUser

# user Model
class CustomUser(AbstractUser):
	'''
	AbstractUser already implements a number of fields, including username, email, password and several permissions
	'''
	username = models.CharField(max_length=150, unique=True)
	email = models.EmailField(unique=True)

	# user authentication
	auth_code = models.CharField(max_length=128, blank=True, null=True)
	auth_code_generated_at = models.DateTimeField(blank=True, null=True)
	verified = models.BooleanField(default=False)

	def __str__(self):
		return self.username