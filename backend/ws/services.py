from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
'''
Generic way to send events over the websocket
'''

def send_user_event(user, event_type, data=None):
	# get the channels messaging system
    channel_layer = get_channel_layer()

    async_to_sync(
        channel_layer.group_send
    )(
        f"user_{user.id}",
        {
            "type": "send_event",	# function to execute in the consumer
            "event_type": event_type,
            "data": data,
        }
    )