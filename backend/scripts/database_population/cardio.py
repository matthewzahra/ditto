import os
import django
from datetime import date, timedelta

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ditto.settings")
django.setup()

from user_auth.models import CustomUser
from workout_tracker.models import Cardio


def add_cardio():

    user = CustomUser.objects.get(
        email="test@email.com"
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 1",
        kms=5.0,
        time=timedelta(minutes=28, seconds=42),
        date=date(2026, 8, 20)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 2",
        kms=7.5,
        time=timedelta(minutes=44, seconds=38),
        date=date(2026, 8, 18)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 3",
        kms=10.0,
        time=timedelta(minutes=58, seconds=21),
        date=date(2026, 8, 15)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 4",
        kms=5.2,
        time=timedelta(minutes=30, seconds=15),
        date=date(2026, 8, 12)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 5",
        kms=8.0,
        time=timedelta(minutes=46, seconds=12),
        date=date(2026, 8, 9)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 6",
        kms=6.3,
        time=timedelta(minutes=36, seconds=47),
        date=date(2026, 8, 6)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 7",
        kms=5.0,
        time=timedelta(minutes=26, seconds=54),
        date=date(2026, 8, 3)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 8",
        kms=12.0,
        time=timedelta(minutes=70, seconds=32),
        date=date(2026, 7, 30)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 9",
        kms=6.5,
        time=timedelta(minutes=37, seconds=21),
        date=date(2026, 7, 27)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 10",
        kms=8.2,
        time=timedelta(minutes=47, seconds=36),
        date=date(2026, 7, 23)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 11",
        kms=5.5,
        time=timedelta(minutes=31, seconds=44),
        date=date(2026, 7, 20)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 12",
        kms=10.5,
        time=timedelta(minutes=61, seconds=18),
        date=date(2026, 7, 16)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 13",
        kms=7.0,
        time=timedelta(minutes=40, seconds=15),
        date=date(2026, 7, 12)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 14",
        kms=5.8,
        time=timedelta(minutes=33, seconds=42),
        date=date(2026, 7, 8)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 15",
        kms=9.0,
        time=timedelta(minutes=52, seconds=10),
        date=date(2026, 7, 3)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 16",
        kms=11.5,
        time=timedelta(minutes=67, seconds=24),
        date=date(2026, 6, 28)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 17",
        kms=6.0,
        time=timedelta(minutes=35, seconds=18),
        date=date(2026, 6, 24)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 18",
        kms=5.5,
        time=timedelta(minutes=32, seconds=41),
        date=date(2026, 6, 20)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 19",
        kms=8.5,
        time=timedelta(minutes=49, seconds=37),
        date=date(2026, 6, 15)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 20",
        kms=7.2,
        time=timedelta(minutes=42, seconds=16),
        date=date(2026, 6, 10)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 21",
        kms=5.0,
        time=timedelta(minutes=29, seconds=30),
        date=date(2026, 6, 5)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 22",
        kms=13.0,
        time=timedelta(minutes=76, seconds=42),
        date=date(2026, 5, 31)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 23",
        kms=7.5,
        time=timedelta(minutes=43, seconds=52),
        date=date(2026, 5, 25)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 24",
        kms=6.0,
        time=timedelta(minutes=34, seconds=27),
        date=date(2026, 5, 18)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 25",
        kms=9.5,
        time=timedelta(minutes=55, seconds=31),
        date=date(2026, 5, 10)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 26",
        kms=5.5,
        time=timedelta(minutes=31, seconds=48),
        date=date(2026, 5, 3)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 27",
        kms=8.0,
        time=timedelta(minutes=46, seconds=3),
        date=date(2026, 4, 26)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 28",
        kms=6.5,
        time=timedelta(minutes=38, seconds=22),
        date=date(2026, 4, 18)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 29",
        kms=10.0,
        time=timedelta(minutes=58, seconds=47),
        date=date(2026, 4, 10)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="RUN",
        title="Test run 30",
        kms=5.0,
        time=timedelta(minutes=29, seconds=12),
        date=date(2026, 4, 2)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 1",
        kms=18.5,
        time=timedelta(minutes=48, seconds=26),
        date=date(2026, 8, 21)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 2",
        kms=34.0,
        time=timedelta(hours=1, minutes=32, seconds=14),
        date=date(2026, 8, 18)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 3",
        kms=51.5,
        time=timedelta(hours=2, minutes=18, seconds=47),
        date=date(2026, 8, 15)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 4",
        kms=27.0,
        time=timedelta(hours=1, minutes=8, seconds=35),
        date=date(2026, 8, 12)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 5",
        kms=42.5,
        time=timedelta(hours=1, minutes=47, seconds=21),
        date=date(2026, 8, 9)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 6",
        kms=23.0,
        time=timedelta(minutes=59, seconds=48),
        date=date(2026, 8, 6)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 7",
        kms=16.5,
        time=timedelta(minutes=43, seconds=17),
        date=date(2026, 8, 3)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 8",
        kms=68.0,
        time=timedelta(hours=2, minutes=54, seconds=36),
        date=date(2026, 7, 30)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 9",
        kms=31.5,
        time=timedelta(hours=1, minutes=21, seconds=52),
        date=date(2026, 7, 27)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 10",
        kms=46.0,
        time=timedelta(hours=1, minutes=58, seconds=43),
        date=date(2026, 7, 23)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 11",
        kms=21.0,
        time=timedelta(minutes=54, seconds=31),
        date=date(2026, 7, 20)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 12",
        kms=57.5,
        time=timedelta(hours=2, minutes=31, seconds=18),
        date=date(2026, 7, 16)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 13",
        kms=38.5,
        time=timedelta(hours=1, minutes=41, seconds=27),
        date=date(2026, 7, 12)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 14",
        kms=19.0,
        time=timedelta(minutes=50, seconds=42),
        date=date(2026, 7, 8)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 15",
        kms=49.5,
        time=timedelta(hours=2, minutes=7, seconds=54),
        date=date(2026, 7, 3)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 16",
        kms=72.0,
        time=timedelta(hours=3, minutes=8, seconds=22),
        date=date(2026, 6, 28)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 17",
        kms=29.5,
        time=timedelta(hours=1, minutes=15, seconds=39),
        date=date(2026, 6, 24)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 18",
        kms=17.0,
        time=timedelta(minutes=46, seconds=53),
        date=date(2026, 6, 20)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 19",
        kms=41.0,
        time=timedelta(hours=1, minutes=46, seconds=28),
        date=date(2026, 6, 15)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 20",
        kms=35.5,
        time=timedelta(hours=1, minutes=29, seconds=16),
        date=date(2026, 6, 10)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 21",
        kms=24.5,
        time=timedelta(hours=1, minutes=3, seconds=41),
        date=date(2026, 6, 5)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 22",
        kms=78.5,
        time=timedelta(hours=3, minutes=24, seconds=17),
        date=date(2026, 5, 31)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 23",
        kms=36.0,
        time=timedelta(hours=1, minutes=34, seconds=52),
        date=date(2026, 5, 25)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 24",
        kms=28.5,
        time=timedelta(hours=1, minutes=12, seconds=37),
        date=date(2026, 5, 18)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 25",
        kms=53.0,
        time=timedelta(hours=2, minutes=19, seconds=44),
        date=date(2026, 5, 10)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 26",
        kms=20.5,
        time=timedelta(minutes=52, seconds=28),
        date=date(2026, 5, 3)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 27",
        kms=44.5,
        time=timedelta(hours=1, minutes=53, seconds=11),
        date=date(2026, 4, 26)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 28",
        kms=32.0,
        time=timedelta(hours=1, minutes=24, seconds=35),
        date=date(2026, 4, 18)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 29",
        kms=61.5,
        time=timedelta(hours=2, minutes=42, seconds=49),
        date=date(2026, 4, 10)
    )

    Cardio.objects.create(
        user=user,
        exercise_type="CYCLE",
        title="Test cycle 30",
        kms=15.5,
        time=timedelta(minutes=41, seconds=56),
        date=date(2026, 4, 2)
    )




add_cardio()