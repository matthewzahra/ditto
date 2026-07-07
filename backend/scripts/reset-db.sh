#!/bin/bash

# delete the current databse
rm -f db.sqlite3

# initilaise the database
python manage.py makemigrations
python manage.py migrate

# populate the users 
python -m scripts.users