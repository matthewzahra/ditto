from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    email = serializers.EmailField()
    
class VerifyUserSerializer(serializers.Serializer):
	email = serializers.EmailField()
	code = serializers.CharField()
     
class RequestPasswordChange(serializers.Serializer):
	email = serializers.EmailField()
     
class UpdatePasswordSerializer(serializers.Serializer):
	email = serializers.EmailField()
	code = serializers.CharField()
	pass1 = serializers.CharField()
	pass2 = serializers.CharField()
