from ditto.core.http_handling import api_response

'''
Here we define and handle actions that may be emedded in inbox messages. Below we define the possible actions, we assume `data` is passed with each, even if empty.
NOTE: the actions are defined in inbox.models in the class `Actions`
'''

# handle a given action - should return a HTTP response
def handle_action(action, user, data):
	match action:
		case _: # fall back case where we don't recognise the action
			return api_response(False, error=f"Unkown action: {action}", status=400)