Remove-Item db.sqlite3 -ErrorAction SilentlyContinue

uv run python manage.py makemigrations
uv run python manage.py migrate

uv run python -m scripts.users