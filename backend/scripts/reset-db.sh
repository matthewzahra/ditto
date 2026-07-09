#!/bin/bash

# delete the current databse
rm -f db.sqlite3

# initilaise the database
uv run python manage.py makemigrations
uv run python manage.py migrate

# populate the users 
uv run python -m scripts.users