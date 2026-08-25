from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError
from django.conf import settings

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

def validate_profile_picture(image):
	if image.size > settings.PROFILE_PICTURE_MAX_SIZE:
		raise ValidationError("Image must be smaller than 10MB.")

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

	# user customisations
    # TODO - we should only accept certain file extensions - validate this with from django.core.validators import FileExtensionValidator
	profile_picture = models.ImageField(upload_to="profile_pictures/", blank=True, null=True, validators=[validate_profile_picture])

	def __str__(self):
		return self.email