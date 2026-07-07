import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ditto.settings")
django.setup()

from user_auth.models import CustomUser


def add_users():
	# create a verified user
	CustomUser.objects.create_user(
		email="test@email.com",
		password="test",
		verified=True
	)

	# create a un-verified user
	CustomUser.objects.create_user(
		email="unverified-test@email.com",
		password="test",
		verified=False
	)

	# TODO - add a user with a real email


add_users()