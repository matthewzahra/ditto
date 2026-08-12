from django.http import JsonResponse

'''
Middleware functionality to enforce that users are logged in.

NOTE: designed for the synchronous HTTP lifecycle - does NOT support websockets. 
'''

class LoginRequiredMiddleware:
	def __init__(self,get_response):
		self.get_response = get_response

		# define the urls that we don't need to be logged in for
		self.public_paths = {
			'/csrf/',
			'/api/docs/',
			'/api/schema/',
			'/api/user_auth/status/',
			'/api/user_auth/login/',
			'/api/user_auth/register/',
			'/api/user_auth/verify_user/',
			'/api/user_auth/request_password_change/',
			'/api/user_auth/update_password/'
		}	
	
	def __call__(self, request):
		if request.user.is_authenticated:
			return self.get_response(request)

		url_name = getattr(request, "path", None) 

		if url_name in self.public_paths:
			return self.get_response(request)
		
		return JsonResponse({"error":"User authentication"}, status=401)