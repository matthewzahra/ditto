from rest_framework import serializers

class LoginStatus(serializers.Serializer):
	pass

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
class RegisterSerializer(serializers.Serializer):
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
