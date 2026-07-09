from django.db import models

# the messages that can appear in an inbox
class InboxMessage(models.Model):
	pass

# a potential action that a user can execute that will be embedded in an InboxMessage
class InboxMessageAction(models.Model):
	pass