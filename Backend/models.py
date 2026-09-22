from pydantic import BaseModel, Field

class PatientData(BaseModel):
    age: int = Field(..., description="Age in years")
    gender: int = Field(..., description="1 for Female, 2 for Male")
    height: float = Field(..., description="Height in cm")
    weight: float = Field(..., description="Weight in kg")
    ap_hi: int = Field(..., description="Systolic Blood Pressure")
    ap_lo: int = Field(..., description="Diastolic Blood Pressure")
    cholesterol: int = Field(..., description="1: normal, 2: above normal, 3: well above normal")
    gluc: int = Field(..., description="1: normal, 2: above normal, 3: well above normal")
    smoke: int = Field(..., description="0: no, 1: yes")
    alco: int = Field(..., description="0: no, 1: yes")
    active: int = Field(..., description="0: no, 1: yes")

class PredictionResponse(BaseModel):
    prediction: int = Field(..., description="0 for No Cardiovascular Disease, 1 for Presence")
    probability: float = Field(..., description="Probability of Cardiovascular Disease")
