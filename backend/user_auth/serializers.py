from rest_framework import serializers
from user_auth.models import CustomUser

#######
# INPUT
#######

class LoginStatusSerializer(serializers.Serializer):
	pass

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class LogoutSerializer(serializers.Serializer):
	pass
    
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

class RequestUserDataSeralizer(serializers.Serializer):
	user_ids = serializers.PrimaryKeyRelatedField(many=True,queryset=CustomUser.objects.all())

class ProfilePictureSerializer(serializers.SerializerMethodField):
	profile_picture = serializers.ImageField(allow_empty_file=False)

########
# OUTPUT
########

# NOTE - this is sent to the front end, so do NOT expose confidential information
class GetPublicUserSerializer(serializers.ModelSerializer):
	profile_picture = serializers.SerializerMethodField() # this calls the method `get_profile_picture`

	class Meta:
		model = CustomUser
		fields = [
			"id",
			"email",
			"profile_picture"
		]

	def get_profile_picture(self,obj):
		if not obj.profile_picture:
			return None

		request = self.context["request"]

		return request.build_absolute_uri(
			f"/api/user_auth/{obj.id}/profile-picture/"
		)