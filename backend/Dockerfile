FROM python:3.13-slim

WORKDIR /app

RUN pip install uv

COPY pyproject.toml uv.lock ./

RUN uv sync --frozen

# optimize python
# don't create .pyc caches
ENV PYTHONDONTWRITEBYTECODE=1 
# don't buffer stdout or stderr
ENV PYTHONUNBUFFERED=1

COPY . . 

CMD ["uv", "run", "daphne", "-b", "0.0.0.0", "-p", "8000", "ditto.asgi:application"]