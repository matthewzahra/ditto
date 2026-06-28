from django.http import JsonResponse

# helper function to stnadardise the Json Responses we send to the front end
def api_response(success: bool, data=None, error=None, status=200):
	return JsonResponse({
		'success': success,
		'data': data,
		'error': error,
		'status': status
	})