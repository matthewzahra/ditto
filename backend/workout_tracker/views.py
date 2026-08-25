from drf_spectacular.utils import extend_schema
from rest_framework.decorators import api_view
from ditto.core.http_handling import api_response, validate, ApiResponseSerializer
from workout_tracker.serializers import ExerciseSerializer, ExerciseOutputSerializer, IDSerializer, WorkoutSerializer, WorkoutOutputSerializer, CardioOutputSerializer, CardioSerializer, CardioSingleOutputSerializer
from workout_tracker.models import Exercise, Workout, Reps, Cardio
from django.db.models import Prefetch
from django.db import transaction

##############
# GYM SESSIONS
##############
@extend_schema(
	tags=['workout_tracker'],
	request=ExerciseSerializer,
	responses=ApiResponseSerializer
)
@api_view(['POST'])
def add_exercise(request):
	data = validate(ExerciseSerializer,request.data)
	exercise = Exercise.objects.create(user=request.user,name=data['name'])
	serializer = ExerciseOutputSerializer(exercise)
	return api_response(True, data=serializer.data)

# TODO what happens if I delete an exercise that is in an existing workout
@extend_schema(
	tags=["workout_tracker"],
	request=IDSerializer,
	responses=ApiResponseSerializer
)
@api_view(["DELETE"])
def delete_exercise(request):
	data = validate(IDSerializer,request.data)
	deleted_count,_ = Exercise.objects.filter(user=request.user, id=data['id']).delete()
	return api_response(True,status=204)

@extend_schema(
	tags=["workout_tracker"],
	responses=ApiResponseSerializer
)
@api_view(["GET"])
def get_exercises(request):
	exercises = Exercise.objects.filter(user=request.user)
	serializer = ExerciseOutputSerializer(exercises, many=True)
	return api_response(True, data=serializer.data)

@extend_schema(
	tags=['workout_tracker'],
	responses=ApiResponseSerializer,
	description="Get all the gym workouts for the current user."
)
@api_view(['GET'])
def get_workouts(request):
	user = request.user
	# below does a database optimisation by utilising a JOIN
	workouts = Workout.objects.filter(user=user).prefetch_related(
		Prefetch(
			"reps",
			queryset=Reps.objects.select_related("exercise")
		)
	)

	serializer = WorkoutOutputSerializer(workouts, many=True)
	return api_response(True,data=serializer.data)

@extend_schema(
	tags=['workout_tracker'],
	request=WorkoutSerializer,
	responses=ApiResponseSerializer,
)
@api_view(['POST'])
def add_workout(request):
	data = validate(WorkoutSerializer,request.data)
	try:
		# if any bad exercise, we want to roll back the whole operation
		with transaction.atomic():
			workout = Workout.objects.create(user=request.user, date=data['date'], num_rounds=data['num_rounds'])
			for (exercise_id,reps) in data['exercises']:
				exercise = Exercise.objects.filter(user=request.user,id=exercise_id).get()
				rep = Reps.objects.create(workout=workout, exercise=exercise, rep_count=reps)

	except Exercise.DoesNotExist as e:
		return api_response(False,error="Bad exercise ids passed.",status=400)

	serializer = WorkoutOutputSerializer(workout)
	return api_response(True,data=serializer.data)

@extend_schema(
	tags=["workout_tracker"],
	request=IDSerializer,
	responses=ApiResponseSerializer
)
@api_view(["DELETE"])
def delete_workout(request):
	data = validate(IDSerializer,request.data)
	deleted_count,_ = Workout.objects.filter(user=request.user, id=data['id']).delete()
	return api_response(True,status=204)

#################
# CARDIO SESSIONS
#################
@extend_schema(
	tags=['workout_tracker'],
	responses=ApiResponseSerializer
)
@api_view(['GET'])
def get_cardio(request):
	sessions = Cardio.objects.filter(user=request.user)
	serializer = CardioOutputSerializer(sessions,many=True)
	return api_response(True,data=serializer.data)

@extend_schema(
	tags=['workout_tracker'],
	request=CardioSerializer,
	responses=ApiResponseSerializer
)
@api_view(['POST'])
def add_cardio(request):
	data = validate(CardioSerializer,request.data)
	cardio = Cardio.objects.create(user=request.user, exercise_type=data['exercise_type'],kms=data['kms'],time=data['time'],date=data['date'])
	serializer = CardioSingleOutputSerializer(cardio)
	return api_response(True,data=serializer.data)

@extend_schema(
	tags=['workout_tracker'],
	request=IDSerializer,
	responses=ApiResponseSerializer
)
@api_view(['DELETE'])
def delete_cardio(request):
	data = validate(IDSerializer,request.data)
	deleted_count,_ = Cardio.objects.filter(user=request.user,id=data['id']).delete()
	return api_response(True,status=204)