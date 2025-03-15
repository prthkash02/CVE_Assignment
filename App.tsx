import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Upload, Image as ImageIcon, Loader } from 'lucide-react';

function App() {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Array<{ className: string; probability: number }>>([]);
  const [loading, setLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const initModel = async () => {
      try {
        setError(null);
        // Explicitly set the backend to WebGL for better performance
        await tf.setBackend('webgl');
        await tf.ready();
        const mobilenetModel = await mobilenet.load({
          version: 2,
          alpha: 1.0
        });
        setModel(mobilenetModel);
        setModelLoading(false);
      } catch (error) {
        console.error('Error loading model:', error);
        setError('Failed to load the classification model. Please refresh the page to try again.');
        setModelLoading(false);
      }
    };

    initModel();
  }, []);

  const classifyImage = async () => {
    if (!model || !imageRef.current) return;

    try {
      setLoading(true);
      setError(null);
      setPredictions([]);

      // Ensure the image is fully loaded
      await new Promise((resolve) => {
        if (imageRef.current?.complete) {
          resolve(true);
        } else {
          imageRef.current!.onload = () => resolve(true);
        }
      });

      // Classify the image
      const predictions = await model.classify(imageRef.current, 5);
      
      // Format predictions
      const formattedPredictions = predictions.map(pred => ({
        className: pred.className.split(',')[0].trim(), // Take only the first class name if multiple
        probability: Number(pred.probability.toFixed(4))
      }));

      setPredictions(formattedPredictions);
    } catch (error) {
      console.error('Error classifying image:', error);
      setError('Failed to classify the image. Please try again with a different image.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('Image size too large. Please choose an image under 10MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
        setPredictions([]); // Clear previous predictions
        setError(null);
      };
      reader.onerror = () => {
        setError('Failed to read the image file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (imageUrl && !loading && imageRef.current) {
      classifyImage();
    }
  }, [imageUrl]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Computer Vision Classifier
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Upload an image to identify objects using AI
          </p>
        </div>

        <div className="mt-8">
          {modelLoading ? (
            <div className="text-center py-12">
              <Loader className="animate-spin h-8 w-8 text-indigo-600 mx-auto" />
              <p className="mt-2 text-sm text-gray-600">Loading AI model...</p>
            </div>
          ) : error ? (
            <div className="text-center py-6">
              <p className="text-sm text-red-600">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-4 text-sm text-indigo-600 hover:text-indigo-500"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer transition-colors duration-200"
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Click to upload an image
                  </span>
                  <span className="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </span>
                </label>
              </div>

              {imageUrl && (
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="Uploaded image"
                    className="w-full h-64 object-cover"
                  />
                  {loading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <Loader className="animate-spin h-8 w-8 text-white" />
                    </div>
                  )}
                </div>
              )}

              {predictions.length > 0 && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Classification Results
                  </h3>
                  <div className="space-y-4">
                    {predictions.map((pred, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900 capitalize">
                              {pred.className}
                            </span>
                            <span className="text-sm text-gray-500">
                              {(pred.probability * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{ width: `${pred.probability * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;