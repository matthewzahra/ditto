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
        read=False
    )


add_inbox_messages()