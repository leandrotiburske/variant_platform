FROM python:3.11-slim
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    make \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

# Run the FastAPI application using uvicorn server
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload"]