from django.db import models
from django.contrib.auth.models import AbstractUser

# user Model
class CustomUser(AbstractUser):
	'''
	AbstractUser already implements a number of fields, including username, email, password and several permissions
	'''
	email = models.EmailField(unique=True)

	def __str__(self):
		return self.username