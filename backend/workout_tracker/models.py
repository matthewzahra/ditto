from django.db import models
from django.db.models import Q
from django.conf import settings
from django.core.validators import MinValueValidator

WORKOUT_TYPES = [
	"RUN",
	"BIKE",
	"GYM"
]

##############
# GYM WORKOUTS
##############

'''
Workout 1 <-> m Reps m <-> m Exercise
'''

class Workout(models.Model):
	# user that workout corresponds to
	user = models.ForeignKey(
		to=settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="workout"
	)

	date = models.DateField()
	num_rounds = models.IntegerField(validators=[MinValueValidator(1)], default=1)

# for Gym workouts
class Exericse(models.Model):
	name = models.CharField(max_length=128)

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

	rep_count = models.IntegerField(validators=[MinValueValidator(1)])

#################
# CARDIO SESSIONS
#################

class Endurance(models.Model):
	class ExerciseTypes(models.TextChoices):
		RUN = "RUN","Run"
		CYCLE = "CYCLE","Cycle"

	# user that workout corresponds to
	user = models.ForeignKey(
		to=settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="workout"
	)
	exercise_type = models.CharField(
		max_length=20,
		choices=ExerciseTypes.choices,
		default=ExerciseTypes.RUN
	)
	kms = models.FloatField(validators=[MinValueValidator(1)])
	time = models.DurationField()