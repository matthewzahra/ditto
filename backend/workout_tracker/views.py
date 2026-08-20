from drf_spectacular.utils import extend_schema
from rest_framework.decorators import api_view
from ditto.core.http_handling import api_response, validate, ApiResponseSerializer
from workout_tracker.serializers import ExerciseSerializer, ExerciseOutputSerializer, IDSerializer, WorkoutTypeSerializer, WorkoutSerializer
from workout_tracker.models import Exericse, Workout


@extend_schema(
	tags=['workout_tracker'],
	request=ExerciseSerializer,
	responses=ApiResponseSerializer
)
@api_view(['POST'])
def add_exercise(request):
	data = validate(ExerciseSerializer,request.data)
	exercise = Exericse.objects.create(user=request.user,name=data['name'])
	serializer = ExerciseOutputSerializer(exercise)
	return api_response(True, data=serializer.data)

@extend_schema(
	tags=["workout_tracker"],
	request=IDSerializer,
	responses=ApiResponseSerializer
)
@api_view(["DELETE"])
def delete_exercise(request):
	data = validate(IDSerializer,request.data)
	deleted_count,_ = Exericse.objects.filter(user=request.user, id=data['id'])
	return api_response(True,status=204)

@extend_schema(
	tags=["workout_tracker"],
	responses=ApiResponseSerializer
)
@api_view(["GET"])
def get_exercises(request):
	exercises = Exericse.objects.filter(user=request.user)
	serializer = ExerciseOutputSerializer(exercises, many=True)
	return api_response(True, data=serializer.data)

@extend_schema(
	tags=['workout_tracker'],
	request=WorkoutTypeSerializer,
	responses=ApiResponseSerializer,
	description="should provide workout type - will default to GYM."
)
@api_view(['GET'])
def get_workouts(request):
	raise NotImplemented

@extend_schema(
	tags=['workout_tracker'],
	request=WorkoutSerializer,
	responses=ApiResponseSerializer,
	description="should provide workout type - will default to GYM."
)
@api_view(['POST'])
def add_workout(request):
	raise NotImplemented

@extend_schema(
	tags=["workout_tracker"],
	request=IDSerializer,
	responses=ApiResponseSerializer
)
@api_view(["DELETE"])
def delete_workout(request):
	data = validate(IDSerializer,request.data)
	deleted_count,_ = Workout.objects.filter(user=request.user, id=data['id'])
	return api_response(True,status=204)