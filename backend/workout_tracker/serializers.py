from rest_framework import serializers
from workout_tracker.models import Workout, Exericse, Reps
from datetime import timedelta

#######
# INPUT
#######

# receive a single workout to add 
class WorkoutSerializer(serializers.Serializer):
	workout_type = serializers.ChoiceField(
		max_length=20,
		choices=Workout.WorkoutTypes.choices
	)
	date = serializers.DateField(required=False)
	num_rounds = serializers.IntegerField(required=False, default=1)
	
# receive a single exercise to be added
class ExerciseSerializer(serializers.Serializer):
	name = serializers.CharField(max_length=128)

# used to associate exercises with a workout
class RepsSerializer(serializers.Serializer):
	workout_id = serializers.IntegerField()
	exercise_id = serializers.IntegerField()

	# validate that we only add reps to GYM workouts
	def validate_workout_id(self, value):
		if not Workout.objects.filter(id=value, workout_type="GYM").exists():
			raise serializers.ValidationError("Can only add reps of exercises to a GYM session.")
		return value

class RouteSerializer(serializers.Serializer):
	workout_id = serializers.IntegerField()
	kms = serializers.FloatField(min_value=0.0)
	time = serializers.DurationField(min_value=timedelta(seconds=1))

	# validate that we only add a route to a cycle or a run
	def validate_workout_id(self, value):
		if not (Workout.objects.filter(id=value, workout_type="RUN").exists() or Workout.objects.filter(id=value, workout_type="BIKE").exists()):
			raise serializers.ValidationError("Can only add a route to a RUN or BIKE session.")
		return value

# receive an ID as an input
class IDSerializer(serializers.Serializer):
	id = serializers.IntegerField()

# for selecting all workouts of a certain type
class WorkoutTypeSerializer(serializers.Serializer):
	workout_type = serializers.ChoiceField(
		max_length=20,
		choices=Workout.WorkoutTypes.choices
	)

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
		fields = ("rep_count")

# for returning workouts, including exercises and reps
class WorkoutOutputSerializer(serializers.ModelSerializer):
	reps = RepsOutputSerializer(many=True, read_only=True)

	class Meta:
		model = Workout
		fields = ("name")