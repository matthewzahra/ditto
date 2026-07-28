# NOTE: Run this from backend/

# Load the environment variables
Write-Host "Reading environment variables"

$envFile = "../.env"

if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]*)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()

            [System.Environment]::SetEnvironmentVariable($name, $value, "Process")
        }
    }
}
else {
    Write-Host "Could not find .env file"
    exit 1
}

if ($env:ENV -eq "DEV") {

    # Delete the current database
    Write-Host "Deleting Database"

    if (Test-Path "db.sqlite3") {
        Remove-Item "db.sqlite3" -Force
    }

    # Initialise the database
    Write-Host "Initialising Database"

    uv run python manage.py makemigrations
    uv run python manage.py migrate

    # Populate the users
    Write-Host "Adding test users to database"

    uv run python -m scripts.users

    # Populate test inbox messages
    Write-Host "Adding test inbox messages to database"

    uv run python -m scripts.messages
}
else {
    Write-Host "In PROD, cannot reset database"
}