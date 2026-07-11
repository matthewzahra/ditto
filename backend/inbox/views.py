from drf_spectacular.utils import extend_schema
from rest_framework.decorators import api_view
from ditto.core.http_handling import api_response, validate, ApiResponseSerializer
from inbox.models import InboxMessage
from inbox.serializers import MessageSerializer, MessageRequestSerializer, SingleMessageSerializer
import logging

logger = logging.getLogger(__name__)

# return messages start-end 
@extend_schema(tags=['inbox'], request=MessageRequestSerializer, responses=ApiResponseSerializer)
@api_view(['GET'])
def get_messages(request):
	data = validate(MessageRequestSerializer, request.query_params)
	start = data.get("start",0)
	end = data.get("end",None)
	user = request.user

	if end:
		messages = InboxMessage.objects.filter(user=user).order_by("-created_at")[start:end]	
	else:
		messages = InboxMessage.objects.filter(user=user).order_by("-created_at")[start:]

	serializer = MessageSerializer(messages, many=True)
	return api_response(True,data=serializer.data)

@extend_schema(tags=['inbox'], request=SingleMessageSerializer, responses=ApiResponseSerializer)
@api_view(['POST'])
def delete_message(request):
	data = validate(SingleMessageSerializer,request.data)
	message_id = data['message_id']
	InboxMessage.objects.filter(user=request.user, id=message_id).delete()
	return api_response(True)

# log that a message has been read
@extend_schema(tags=['inbox'], request=SingleMessageSerializer, responses=ApiResponseSerializer)
@api_view(['POST'])
def read_message(request):
	data = validate(SingleMessageSerializer,request.data)
	message_id = data['message_id']
	deleted_count,_ = InboxMessage.objects.filter(user=request.user, id=message_id).delete()

	if deleted_count == 0:
		logger.warning("No message to delete.")
	else:
		return api_response(True)