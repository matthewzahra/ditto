from channels.generic.websocket import AsyncJsonWebsocketConsumer


class RealtimeConsumer(AsyncJsonWebsocketConsumer):

	# runs when the browser opens the connection
	async def connect(self):
		user = self.scope["user"]

		# enforce that the user must be logged in
		if user.is_anonymous:
			await self.close()
			return

		# create a group for this user for consistency over tabs
		self.group_name = f"user_{user.id}"

		# register the group on the internal messaging system 
		await self.channel_layer.group_add(
			self.group_name,
			self.channel_name
		)
		await self.accept()


	async def disconnect(self, close_code):
		if hasattr(self, "group_name"):
			# remove the websocket connection from the group
			await self.channel_layer.group_discard(
				self.group_name,
				self.channel_name
			)

	# should NEVER be called on its own - should be called by ws.services.send_user_event as this uses this to send to all members of a specified group
	async def send_event(self, event):
		"""
		Generic handler for all events.
		"""

		await self.send_json({
			"type": event["event_type"],
			"data": event["data"]
		})

	# receive data from the REACT frontend 
	async def receive_json(self, content):
		match content.get('type',None):
			case _:
				await self.send_json({
					"type": "error",
					"message": f"type `{content['type']}` is not recognised"
				})
