from django.db import models
from django.conf import settings

# quotes that a user has saved
class Quote(models.Model):
	# user that has saved the quote
	user = models.ForeignKey(
		to=settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="quote"
	)
	author = models.CharField(128)
	body = models.TextField()