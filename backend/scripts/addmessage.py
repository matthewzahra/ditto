import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ditto.settings")
django.setup()

from inbox.core.messages import add_message
from user_auth.models import CustomUser

def send_message():
    user = CustomUser.objects.get(
        email="test@email.com"
    )

    add_message(user, "test title", "test body", [])

    print("sup")

send_message()