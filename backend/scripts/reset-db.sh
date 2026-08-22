#!/bin/bash

# NOTE: run this from backend/

# load the environment variables
echo "Reading environment variables"
source ../.env

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
	uv run python -m scripts.database_population.users

	# populate test inbox messages
	echo "Adding test inbox messages to database"
	uv run python -m scripts.database_population.messages

	# populate test quotes
	echo "Adding test quotes to database"
	uv run python -m scripts.database_population.quotes

	# populate test restaurants
	echo "Adding test restaurants to database"
	uv run python -m scripts.database_population.restaurants
else
	echo "In PROD, cannot reset database"
fi