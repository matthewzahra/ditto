import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ditto.settings")
django.setup()

from user_auth.models import CustomUser
from quotes.models import Quote


def add_quotes():

    user = CustomUser.objects.get(
        email="test@email.com"
    )

    Quote.objects.create(
        user=user,
        body="Test quote text 1",
        author="Author 1"
    )

    Quote.objects.create(
            user=user,
            body="Test quote text 2",
            author="Author 2"
        )

    Quote.objects.create(
            user=user,
            body="Test quote text 3",
            author="Author 3"
        )


add_quotes()