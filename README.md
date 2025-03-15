# Computer Vision Classifier

A dual-implementation image classification project featuring both a Python backend API and a JavaScript frontend application.

![Demo Screenshot](https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&q=80&w=1200)

## 🌟 Features

- **Dual Implementation**:
  - Python backend API using FastAPI and TensorFlow
  - JavaScript frontend using TensorFlow.js
- **Real-time Image Classification**: Classify images into 1000+ categories
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- **Docker Support**: Containerized backend for easy deployment
- **Optimized Performance**: GPU acceleration support in both implementations

## 🛠️ Technology Stack

### Backend (Python)
- **Framework**: FastAPI
- **ML Framework**: TensorFlow
- **Model**: MobileNetV2 (pre-trained on ImageNet)
- **Container**: Docker
- **Python Version**: 3.9+

### Frontend (JavaScript)
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **ML Framework**: TensorFlow.js
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📋 Requirements

### Backend Requirements
- Python 3.9 or higher
- Docker (optional)
- Required Python packages in `requirements.txt`

### Frontend Requirements
- Node.js 16.x or higher
- npm 7.x or higher
- Modern web browser with WebGL support

## 🚀 Getting Started

### Backend Setup

1. **Create virtual environment (optional but recommended)**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the FastAPI server**
   ```bash
   uvicorn app:app --reload
   ```

   Or using Docker:
   ```bash
   docker build -t image-classifier .
   docker run -p 8000:8000 image-classifier
   ```

### Frontend Setup

1. **Install Node.js dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 📦 Project Structure

```
├── Backend/
│   ├── app.py              # FastAPI application
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile         # Docker configuration
├── Frontend/
│   ├── src/
│   │   ├── App.tsx        # Main React component
│   │   ├── main.tsx      # Application entry
│   │   └── index.css     # Global styles
│   ├── index.html        # HTML template
│   ├── vite.config.ts    # Vite configuration
│   └── package.json      # Node.js dependencies
```

## 🎯 Features in Detail

### Backend API (Python)
- RESTful endpoints for image classification
- Swagger UI documentation at `/docs`
- File upload support with validation
- Top 5 predictions with confidence scores
- Docker containerization
- Error handling and validation

### Frontend Application (JavaScript)
- Client-side image processing
- Real-time classification
- Drag and drop file upload
- Progress indicators
- Responsive design
- Error handling with user-friendly messages

### Performance Optimizations
- GPU acceleration in both implementations
- Efficient image preprocessing
- Lazy loading of models
- Docker containerization for backend

## 🔒 Security

- Input validation on both frontend and backend
- File type and size restrictions
- Rate limiting on API endpoints
- No permanent data storage
- Docker container isolation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- TensorFlow and TensorFlow.js teams
- FastAPI framework creators
- MobileNetV2 model creators
- React and Tailwind CSS communities
- Lucide for the beautiful icons

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## 🔮 Future Improvements

- [ ] Support for custom models
- [ ] Batch processing capability
- [ ] Model performance comparison tools
- [ ] Additional model architectures
- [ ] API authentication
- [ ] Result caching
- [ ] Deployment guides for various platforms
