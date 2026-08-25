#!/bin/bash

# NOTE: run this from backend/

# load the environment variables
echo "Reading environment variables"
source ../.env

echo "$ENV"
if [ "$ENV" = "DEV" ]; then 
	# delete the current databse
	echo "Deleting Database"
	rm -f db.sqlite3

	# initilaise the database
	echo "Initialising Databse"
	uv run python manage.py makemigrations
	uv run python manage.py migrate

	# populate the users 
	echo "Adding test users to database"
	uv run python -m scripts.users

	# populate test inbox messages
	echo "Adding test inbox messages to database"
	uv run python -m scripts.messages

	# populate test quotes
	echo "Adding test quotes to database"
	uv run python -m scripts.quotes

	# populate test restaurants
	echo "Adding test restaurants to database"
	uv run python -m scripts.restaurants
else
	echo "In PROD, cannot reset database"
fi