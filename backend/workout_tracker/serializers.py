from rest_framework import serializers
from workout_tracker.models import Workout, Exericse, Reps
from datetime import timedelta

#######
# INPUT
#######

# receive a single workout to add, including a list of exercises and the number of reps to perform each exercise
class WorkoutSerializer(serializers.Serializer):
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

class EnduranceSerializer(serializers.Serializer):
	exercise_type = serializers.CharField(max_length=20)
	kms = serializers.FloatField(min_value=0.0)
	time = serializers.DurationField(min_value=timedelta(seconds=1))

# receive an ID as an input
class IDSerializer(serializers.Serializer):
	id = serializers.IntegerField()


########
# OUTPUT
########
# for returning an exercise
class ExerciseOutputSerializer(serializers.ModelSerializer):
	class Meta:
		model = Exericse
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
		fields = ("name","reps")