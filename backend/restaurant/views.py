from drf_spectacular.utils import extend_schema
from rest_framework.decorators import api_view
from ditto.core.http_handling import api_response, validate, ApiResponseSerializer
from restaurant.serializers import SingleRestaurantSerializer,SingleRestaurantIDSerializer, RestaurantSerializer
from restaurant.models import Restaurant
from restaurant.core.geo import get_coordinates

@extend_schema(
	tags=['restaurant'],
	request=SingleRestaurantSerializer,
	responses=ApiResponseSerializer
)
@api_view(['POST'])
def record_restaurant(request):
	data = validate(SingleRestaurantSerializer,request.data)

	location_data = get_coordinates(location=data['address'])

	if location_data.get('error',None):
		return api_response(False,error = location_data['error'],status=500)

	if location_data['confidence'] < 0.25:
		return api_response(False,data={'confidence': location_data['confidence']}, error=f'Confidence too low, need better address.',status=400)

	data['latitude'] = location_data['latitude']
	data['longitude'] = location_data['longitude']

	restaurant = Restaurant.objects.create(user=request.user, **data)

	serialzier = RestaurantSerializer(restaurant)
	return api_response(True, data=serialzier.data)

@extend_schema(
	tags=['restaurant'],
	request=SingleRestaurantIDSerializer,
	responses=ApiResponseSerializer
)
@api_view(['DELETE'])
def delete_restaurant(request):
	data = validate(SingleRestaurantIDSerializer,request.data)

	deleted_count,_ = Restaurant.objects.filter(user=request.user, id=data['restaurant_id']).delete()

	return api_response(True, status=204)

# TODO - implement this endpoint
def edit_restuarant(request):
	raise NotImplemented

@extend_schema(
	tags=['restaurant'],
	responses=ApiResponseSerializer
)
@api_view(['GET'])
def get_user_restaurants(request):
	restaurants = Restaurant.objects.filter(user = request.user)
	serialzier = RestaurantSerializer(restaurants,many=True)
	return api_response(True, data=serialzier.data)