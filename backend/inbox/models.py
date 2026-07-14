from django.db import models
from django.conf import settings

# the messages that can appear in an inbox
class InboxMessage(models.Model):
	# user that message corresponds to
	user = models.ForeignKey(
		to=settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="inbox_messages"
	)

	title=models.CharField(128)
	body=models.TextField()
	created_at=models.DateTimeField(auto_now_add=True)
	read=models.BooleanField(default=False)


# define the possible actions that we can embed in an inbox message
class Actions(models.TextChoices):
	pass


# a potential action that a user can execute that will be embedded in an InboxMessage
class InboxMessageAction(models.Model):
	# user that the action corresponds to (for verification purposes)
	user = models.ForeignKey(
		to=settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="inbox_actions"
	)
	
	action = models.CharField(
		max_length=20,
		choices=Actions.choices
	)