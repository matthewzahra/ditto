from rest_framework import serializers
from inbox.models import InboxMessage

class MessageRequestSerializer(serializers.Serializer):
	start = serializers.IntegerField(required=False)
	end = serializers.IntegerField(required=False)


class MessageSerializer(serializers.ModelSerializer):
	class Meta:
		model = InboxMessage
		fields = [
			"id",
			"title",
			"body",
			"created_at",
			"read",
		]

class SingleMessageSerializer(serializers.Serializer):
	message_id = serializers.IntegerField()