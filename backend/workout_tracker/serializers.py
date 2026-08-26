from rest_framework import serializers
from workout_tracker.models import Workout, Exercise, Reps, Cardio
from datetime import timedelta

#######
# INPUT
#######

# receive a single workout to add, including a list of exercises and the number of reps to perform each exercise
class WorkoutSerializer(serializers.Serializer):
	title = serializers.CharField(max_length=64)
	info = serializers.CharField(max_length=512)
	date = serializers.DateField(required=False)
	num_rounds = serializers.IntegerField(required=False, default=1)

	# a list of 2 pairs, where the first is the exercise id and the second is the number of reps
	exercises = serializers.ListField(
		child=serializers.ListField(
			child=serializers.IntegerField(),
			min_length=2,
			max_length=2
		)
	)
	
# receive a single exercise to be added
class ExerciseSerializer(serializers.Serializer):
	name = serializers.CharField(max_length=128)

# used to associate exercises with a workout
class RepsSerializer(serializers.Serializer):
	workout_id = serializers.IntegerField()
	exercise_id = serializers.IntegerField()

class CardioSerializer(serializers.Serializer):
	exercise_type = serializers.ChoiceField(choices=Cardio.ExerciseTypes.choices)
	title = serializers.CharField(max_length=64)
	kms = serializers.FloatField(min_value=0.0)
	time = serializers.DurationField(min_value=timedelta(seconds=1))
	date = serializers.DateField()

# receive an ID as an input
class IDSerializer(serializers.Serializer):
	id = serializers.IntegerField()


########
# OUTPUT
########
# for returning an exercise
class ExerciseOutputSerializer(serializers.ModelSerializer):
	class Meta:
		model = Exercise
		fields = ("id","name")

class RepsOutputSerializer(serializers.ModelSerializer):
	exercise = ExerciseOutputSerializer(read_only=True)

	class Meta:
		model = Reps
		fields = ("exercise","rep_count")

# for returning workouts, including exercises and reps
class WorkoutOutputSerializer(serializers.ModelSerializer):
	reps = RepsOutputSerializer(many=True, read_only=True)

	class Meta:
		model = Workout
		fields = ("id","title","info","date","num_rounds","reps")

# for a single cardio session
class CardioSingleOutputSerializer(serializers.ModelSerializer):
	class Meta:
		model = Cardio
		fields = ("exercise_type","title","time","kms","date")