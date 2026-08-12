"""
URL configuration for ditto project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from ditto.core.views import csrf
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from dotenv import load_dotenv
import os

load_dotenv()
ENV = os.getenv('ENV','PROD')

urlpatterns = [
    path('admin/', admin.site.urls),
	path('csrf/', csrf),
	path('api/user_auth/', include("user_auth.urls")),
    path('api/inbox/', include('inbox.urls')),
    path('api/quotes/', include('quotes.uls'))
]

# add any DEV only paths 
if ENV == 'DEV':
    urlpatterns += [
        path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
        path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema")),
    ]
