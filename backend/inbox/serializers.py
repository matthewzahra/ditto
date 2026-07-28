from rest_framework import serializers
from inbox.models import InboxMessage, InboxMessageAction

###########
# INPUT
###########

# for input validation for requesting a string of messages
class MessageRequestSerializer(serializers.Serializer):
	start = serializers.IntegerField(required=False)
	end = serializers.IntegerField(required=False)

# input validate providing a single message
class SingleMessageSerializer(serializers.Serializer):
	message_id = serializers.IntegerField()

# input validate an action to execute
class ActionSerializer(serializers.Serializer):
	action_id = serializers.IntegerField()
	data = serializers.JSONField(required=False)

###########
# OUTPUT
###########

# for parsing actions in output
class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InboxMessageAction
        fields = ("user", "message", "action")

# for parsing QuerySet of messages
class MessageSerializer(serializers.ModelSerializer):
	actions = ActionSerializer(many=True, read_only=True)

	class Meta:
		model = InboxMessage
		fields = [
			"id",
			"title",
			"body",
			"created_at",
			"read",
			"actions",
		]
