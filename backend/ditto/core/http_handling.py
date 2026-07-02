from rest_framework.response import Response
from rest_framework import serializers

class ApiResponseSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    data = serializers.JSONField(required=False, allow_null=True)
    error = serializers.CharField(required=False, allow_null=True)
	
# helper function to stnadardise the Json Responses we send to the front end
def api_response(success: bool, data=None, error=None, status=200):
	return Response({
		'success': success,
		'data': data,
		'error': error,
	}, status=status)

# decorator to disable a view endpoint easily
def disable_endpoint(func):
	def wrapper():
		return api_response(False,error="End point closed", status=423)
	return wrapper

# helper function to make use of dre serializers and validate input data
def validate(serializerClass, data):
	serializer = serializerClass(data=data)
	serializer.is_valid(raise_exception=True)
	return serializer.validated_data