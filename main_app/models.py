from django.db import models
from django.contrib.auth.models import AbstractUser

# user Model
class CustomUser(AbstractUser):
	'''
	AbstractUser already implements a number fo fields, including username, email, password and several permissions
	'''
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)

	def __str__(self):
		return self.username