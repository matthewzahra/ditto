from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Restaurant(models.Model):
	# user that restaurant corresponds to
	user = models.ForeignKey(
		to=settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="restaurants_saved"
	)

	name = models.CharField(max_length=128)
	address = models.CharField(max_length=256)
	latitude = models.FloatField()
	longitude = models.FloatField()

	cuisine = models.CharField(max_length=128)
	rating = models.FloatField(validators=[MinValueValidator(0.0),MaxValueValidator(10.0)])

	info = models.TextField(blank=True,null=True)

	visited = models.BooleanField(default=False)
	favourited = models.BooleanField(default=False)