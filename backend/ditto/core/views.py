from django.middleware.csrf import get_token
from django.http import JsonResponse
from rest_framework.decorators import api_view

@api_view(['GET','POST'])
def csrf(request):
    return JsonResponse({"csrfToken": get_token(request)})