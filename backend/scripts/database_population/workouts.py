import os
import django
from datetime import date

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ditto.settings")
django.setup()

from user_auth.models import CustomUser
from workout_tracker.models import Workout


def add_workouts():

    user = CustomUser.objects.get(
        email="test@email.com"
    )

    Workout.objects.create(
        user=user,
        title="Test workout 1",
        info="Test info 1",
        date=date(2026, 8, 26),
        num_rounds=1
    )

    Workout.objects.create(
        user=user,
        title="Test workout 2 - blank info",
        info="",
        date=date(2026, 8, 27),
        num_rounds=1
    )

    Workout.objects.create(
        user=user,
        title="Test workout 3",
        info="Test info 3",
        date=date(2026, 8, 28),
        num_rounds=1
    )

    Workout.objects.create(
        user=user,
        title="Test workout 4",
        info="Test info 4",
        date=date(2026, 8, 28),
        num_rounds=1
    )


add_workouts()