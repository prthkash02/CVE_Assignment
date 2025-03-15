import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing import image
import numpy as np
import pickle

def save_model():
    # Load the pre-trained MobileNetV2 model
    model = MobileNetV2(weights='imagenet')
    
    # Save the model in different formats
    # SavedModel format
    model.save('model_savedmodel')
    
    # ONNX format (requires tf2onnx)
    # Uncomment if you want to use ONNX format
    # import tf2onnx
    # tf2onnx.convert.from_keras(model, output_path='model.onnx')
    
    print("Model saved successfully!")

if __name__ == "__main__":
    save_model()