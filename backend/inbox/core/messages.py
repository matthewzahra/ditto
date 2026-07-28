from typing import str, list
from user_auth.models import CustomUser
from inbox.models import InboxMessage, InboxMessageAction, Actions
from django.db import transaction

# add a message to a user's inbox, potentially embedding several actions in it 
def add_message(target_user: CustomUser, title: str, body: str , actions: list[str]):
	# rollback if an action is ill-defined
	with transaction.atomic():
		message = InboxMessage.objects.create(
			user=target_user, 
			title=title,
			body=body,
		)

		if actions:
			for action_str in actions:
				# check that each action is valid
				if action_str in Actions.values:
					action = InboxMessageAction.create(
						user=target_user,
						message=message,
						action=action_str
					)
				else:
					raise ValueError(f"Action `{action_str}` is not defined.")
