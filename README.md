# Image Classification API

This project implements a REST API for image classification using TensorFlow and FastAPI. It uses a pre-trained MobileNetV2 model to classify images into 1000 different categories.

## Features

- FastAPI-based REST API
- Pre-trained MobileNetV2 model
- Docker support
- Easy-to-use endpoints for image classification
- Swagger UI documentation

## Project Structure

```
.
├── app.py              # FastAPI application
├── train_model.py      # Script to save the model
├── requirements.txt    # Python dependencies
├── Dockerfile         # Docker configuration
└── README.md          # Project documentation
```

## Installation

### Local Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the API:
```bash
uvicorn app:app --reload
```

### Docker Setup

1. Build the Docker image:
```bash
docker build -t image-classifier .
```

2. Run the container:
```bash
docker run -p 8000:8000 image-classifier
```

## API Endpoints

- `GET /`: Health check endpoint
- `POST /predict`: Upload an image for classification
  - Accepts form data with an image file
  - Returns top 5 predictions with confidence scores

## Usage Example

```python
import requests

# Predict endpoint
url = "http://localhost:8000/predict"
files = {"file": open("image.jpg", "rb")}
response = requests.post(url, files=files)
predictions = response.json()
```

## Model Information

The API uses MobileNetV2, pre-trained on ImageNet. The model can classify images into 1000 different categories and is optimized for mobile and web deployment.

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
