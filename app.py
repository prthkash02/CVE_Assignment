from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import uvicorn

app = FastAPI(title="Image Classification API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the MobileNetV2 model
model = tf.keras.applications.MobileNetV2(weights='imagenet')

def preprocess_image(image: Image.Image):
    # Resize the image to 224x224 pixels
    image = image.resize((224, 224))
    # Convert the image to an array and preprocess it
    image_array = tf.keras.preprocessing.image.img_to_array(image)
    image_array = tf.expand_dims(image_array, 0)
    return tf.keras.applications.mobilenet_v2.preprocess_input(image_array)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read and verify the image
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    
    # Preprocess the image
    processed_image = preprocess_image(image)
    
    # Make prediction
    predictions = model.predict(processed_image)
    decoded_predictions = tf.keras.applications.mobilenet_v2.decode_predictions(predictions, top=5)[0]
    
    # Format the response
    results = [
        {
            "class": str(class_name),
            "confidence": float(score)
        }
        for (_, class_name, score) in decoded_predictions
    ]
    
    return {"predictions": results}

@app.get("/")
async def root():
    return {"message": "Image Classification API is running"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)