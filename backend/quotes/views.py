from rest_framework.decorators import api_view
from drf_spectacular.utils import extend_schema
from ditto.core.http_handling import api_response, validate, ApiResponseSerializer
from quotes.serializers import QuoteSerializer, QuotesOutputSerializer, SingleQuoteSerializer
from quotes.models import Quote
from django.core.cache import cache
from datetime import date
import requests

@extend_schema(tags=['quotes'], responses=ApiResponseSerializer)
@api_view(['GET'])
def generate_daily_quote(request):
	key = f"quote:{date.today().isoformat()}"

	data = cache.get(key)
	if data is not None:
		return api_response(True, data=data)
	
	response = requests.get("https://zenquotes.io/api/today")
	response.raise_for_status()

	data = response.json()[0]
	body = data['q']
	author = data['a']

	quote_data = data={'author':author, 'body':body}

	cache.set(key,quote_data,timeout=86400)

	return api_response(True,quote_data)


@extend_schema(tags=['quotes'], request=QuoteSerializer, responses=ApiResponseSerializer)
@api_view(['POST'])
def record_quote(request):
	data = validate(QuoteSerializer,request.data)

	body = data['body']
	author = data.get('author','anon')

	quote = Quote.objects.create(user = request.user, body=body, author=author)

	serializer = QuotesOutputSerializer(quote)

	return api_response(True, data=serializer.data)

@extend_schema(tags=['quotes'], responses=ApiResponseSerializer)
@api_view(['GET'])
def get_user_quotes(request):
	quotes = Quote.objects.filter(user = request.user)

	serializer = QuotesOutputSerializer(quotes, many=True)

	return api_response(True, data=serializer.data)

@extend_schema(tags=['quotes'], request=SingleQuoteSerializer, responses=ApiResponseSerializer)
@api_view(['DELETE'])
def delete_quote(request):
	data = validate(SingleQuoteSerializer,request.data)

	deleted_count,_ = Quote.objects.filter(user=request.user, id=data['quote_id']).delete()

	return api_response(True, status=204)