from django.urls import resolve
from django.shortcuts import redirect

'''
Middleware functionality to enforce that users are logged in.

NOTE: desigend for the synchronous HTTP lifecycle - does NOT support websockets. 
'''

# TODO - implement this and then add it to the middleware in settings.py 
class LoginRequiredMiddleware:
	def __init__(self,get_response):
		self.get_response = get_response

		# define the urls that we don't need to be logged in for
		self.public_paths = {
			'/login/',
			'/register/'
		}	
	
	def __call__(self, request):
		if request.user.is_authenticated:
			return self.get_response(request)

		url_name = getattr(request, "path", None) 

		if url_name in self.public_paths:
			return self.get_response(request)
			
		return redirect('login')