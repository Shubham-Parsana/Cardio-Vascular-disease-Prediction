from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import PatientData, PredictionResponse
from ml_model import predict_cardio

app = FastAPI(title="Cardiovascular Disease Prediction API")

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"], # Added specific origins
    allow_credentials=False, # Changed to False to allow "*" wildcard, or we can just specify the origins and keep True. Let's keep True and specify origins.
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API is running. Use POST /predict for predictions."}

@app.post("/predict", response_model=PredictionResponse)
def predict(data: PatientData):
    pred, prob = predict_cardio(data)
    return PredictionResponse(prediction=pred, probability=prob)
