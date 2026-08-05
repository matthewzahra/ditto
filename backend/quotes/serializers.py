from rest_framework import serializers
from quotes.models import Quote

###########
# INPUT
###########

class SingleQuoteSerializer(serializers.Serializer):
	quote_id = serializers.IntegerField()

class QuoteSerializer(serializers.Serializer):
	body = serializers.CharField(min_length=1)
	author = serializers.CharField(max_length=128) # can be blank 

###########
# OUTPUT
###########

class QuotesOutputSerializer(serializers.ModelSerializer):
	class Meta:
		model = Quote
		fields = ("usewr", "author", "body")