import requests
from requests.structures import CaseInsensitiveDict
import os 
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEO_API_KEY")

# given address, return the coordinates
def get_coordinates(location:str):
	URL = "https://api.geoapify.com/v1/geocode/search"

	headers = CaseInsensitiveDict()
	headers["Accept"] = "application/json"

	result = dict()

	try:
		resp = requests.get(url=URL, headers=headers, params={"text":location, "apiKey":API_KEY, "bias":"countrycode:uk"})

	except ConnectionError:
		result['error'] = "CONNECTION ERROR"
		return result

	if resp.status_code != 200:
		result['error'] = f"STATUS: {resp.status_code}" 
		return result

	data = resp.json()

	if data['features']:		
		result['longitude'] = data['features'][0]['geometry']['coordinates'][0]
		result['latitude'] = data['features'][0]['geometry']['coordinates'][1]
		result['confidence'] = data['features'][0]['properties']['rank']['confidence']

	else:
		result['error'] = f"CANNOT DEDUCE LOCATION FROM {location}"

	return result