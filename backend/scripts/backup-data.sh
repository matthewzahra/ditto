#!/bin/bash

# copies the database and any user media files
# NOTE: run this from backend/

# performing backu
timestamp="$(date '+%Y-%m-%d_%H-%M-%S')"

# initialising directory
mkdir "../backups"
target_dir="../backups/${timestamp}"	
mkdir "$target_dir"

echo "Copying the database..."
cp db.sqlite3 "${target_dir}/db.sqlite3"

if [[ -d "media" ]]; then
	echo "Copying any media..."
	cp -r media "${target_dir}/media"
fi
