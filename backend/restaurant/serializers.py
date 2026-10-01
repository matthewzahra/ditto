from rest_framework import serializers
from restaurant.models import Restaurant

#######
# INPUT
#######

# for receiving the data about a single restaurant
class SingleRestaurantSerializer(serializers.Serializer):
	name = serializers.CharField(max_length=128)
	address = serializers.CharField(max_length=256)
	cuisine = serializers.CharField(max_length=128)
	rating = serializers.FloatField(min_value=0.0, max_value=10.0)
	info = serializers.CharField()
	visited = serializers.BooleanField(default=False)

# for receiving the id of a single restaurant
class SingleRestaurantIDSerializer(serializers.Serializer):
	restaurant_id = serializers.IntegerField()

########
# OUTPUT
########

class RestaurantSerializer(serializers.ModelSerializer):
	class Meta:
		model = Restaurant
		fields = [
			"id",
			"name",
			"address",
			"latitude",
			"longitude",
			"cuisine",
			"rating",
			"info",
			"visited"
		]