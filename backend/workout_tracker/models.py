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
	title = models.CharField(max_length=64)
	info = models.TextField(max_length=512,blank=True,null=True)
	date = models.DateField()
	num_rounds = models.IntegerField(validators=[MinValueValidator(1)], default=1)

# for Gym workouts
class Exercise(models.Model):
	# user that exercise corresponds to
	user = models.ForeignKey(
		to=settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="exercise"
	)
	name = models.CharField(max_length=128)

# intermediate table that links the an exercise to a workout and notes the number of reps
class Reps(models.Model):
	workout = models.ForeignKey(
		to=Workout,
		on_delete=models.CASCADE,
		related_name="reps",
	)

	exercise = models.ForeignKey(
		to=Exercise,
		on_delete=models.CASCADE,
		related_name="reps",
	)

	rep_count = models.IntegerField(validators=[MinValueValidator(1)])

#################
# CARDIO SESSIONS
#################

class Cardio(models.Model):
	class ExerciseTypes(models.TextChoices):
		RUN = "RUN","Run"
		CYCLE = "CYCLE","Cycle"

	# user that workout corresponds to
	user = models.ForeignKey(
		to=settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="cardio"
	)
	exercise_type = models.CharField(
		max_length=20,
		choices=ExerciseTypes.choices,
		default=ExerciseTypes.RUN
	)
	title = models.CharField(max_length=64)
	kms = models.FloatField(validators=[MinValueValidator(1)])
	time = models.DurationField()
	date = models.DateField()