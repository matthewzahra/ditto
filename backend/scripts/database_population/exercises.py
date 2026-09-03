import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ditto.settings")
django.setup()

from user_auth.models import CustomUser
from workout_tracker.models import Exercise


def add_exercises():

    user = CustomUser.objects.get(
        email="test@email.com"
    )

    Exercise.objects.create(
        user=user,
        name="Pushups"
    )

    Exercise.objects.create(
        user=user,
        name="Squats"
    )

    Exercise.objects.create(
        user=user,
        name="Lunges"
    )


add_exercises()