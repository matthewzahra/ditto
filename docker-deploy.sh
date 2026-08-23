#!/bin/bash

# check if we need to do a clean build
if [[ "$1" == "--clean" ]]; then
	docker compose down --rmi all		# delete old images - this does NOT delete the volumes
	docker compose build --no-cache
	docker compose up -d
else
	docker compose down 
	docker compose build 
	docker compose up -d
fi

sudo docker compose exec backend uv run python manage.py migrate