from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)


# user Model
class CustomUser(AbstractUser):
	'''
	AbstractUser already implements a number of fields, including username, email, password and several permissions
	'''
	username = None
	email = models.EmailField(unique=True)

	USERNAME_FIELD = "email" # use the email field for Django's built in authentication system
	REQUIRED_FIELDS = []

	objects = CustomUserManager()

	# user authentication
	auth_code = models.CharField(max_length=128, blank=True, null=True)
	auth_code_generated_at = models.DateTimeField(blank=True, null=True)
	verified = models.BooleanField(default=False)

	def __str__(self):
		return self.email