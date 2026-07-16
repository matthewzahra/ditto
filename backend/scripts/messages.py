import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ditto.settings")
django.setup()

from user_auth.models import CustomUser
from inbox.models import InboxMessage


def add_inbox_messages():

    user = CustomUser.objects.get(
        email="test@email.com"
    )

    # read messages
    InboxMessage.objects.create(
        user=user,
        title="Test title 1",
        body="Test body 1",
        read=True
    )

    InboxMessage.objects.create(
        user=user,
        title="Test title 2",
        body="Test body 2",
        read=True
    )

    InboxMessage.objects.create(
        user=user,
        title="Test title 3",
        body="Test body 3",
        read=True
    )

    # unread messages
    InboxMessage.objects.create(
        user=user,
        title="Test title 4",
        body="=========-=========-=========-=========-=========-=========-=========-=========-=========-=========0=========-=========-=========-=========-=========-=========-=========-=========-=========-=========0", #200 characters
        read=False
    )

    InboxMessage.objects.create(
        user=user,
        title="Test title 5",
        body="Test body 5",
        read=False
    )

    InboxMessage.objects.create(
        user=user,
        title="Test title 6",
        body="Test body 6",
        read=False
    )


add_inbox_messages()