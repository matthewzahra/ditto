from django.db import models
from django.db.models import Q
from django.conf import settings
from django.core.validators import MinValueValidator

WORKOUT_TYPES = [
	"RUN",
	"BIKE",
	"GYM"
]

class Workout(models.Model):
	class WorkoutTypes(models.TextChoices):
		RUN = "RUN", "Run"
		BIKE = "BIKE", "Bike"
		GYM = "GYM", "Gym"

	# user that workout corresponds to
	user = models.ForeignKey(
		to=settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="workout"
	)
	workout_type = models.CharField(
		max_length=20,
		choices=WorkoutTypes.choices
	)
	date = models.DateField(auto_now_add=True)
	num_rounds = models.IntegerField(validators=[MinValueValidator(1)], default=1)

# for Gym workouts
class Exericse(models.Model):
	name = models.CharField(max_length=128)

	class Meta:
		constraints = [
			models.CheckConstraint(
				check=Q(workout__workout_type="GYM"),
				name="exercise_corresponds_to_gym"
			)
		]

# intermediate table that links the an exercise to a workout and notes the number of reps
class Reps(models.Model):
	workout = models.ForeignKey(
		to=Workout,
		on_delete=models.CASCADE,
		related_name="reps",
	)

	exercise = models.ForeignKey(
		to=Exericse,
		on_delete=models.CASCADE,
		related_name="reps",
	)


# For Bike/Run sessions
class Route(models.Model):
	workout = models.ForeignKey(
		to=Workout,
		on_delete=models.CASCADE,
		related_name="exercise",
	)

	kms = models.FloatField(validators=[MinValueValidator(1)])
	time = models.DurationField()

	class Meta:
		constraints = [
			models.CheckConstraint(
				condition=Q(workout__workout_type="RUN") | Q(workout__workout_type="BIKE"),
				name="exercise_corresponds_to_gym"
			)
		]

