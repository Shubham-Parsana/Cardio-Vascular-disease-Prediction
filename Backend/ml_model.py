import pickle
import pandas as pd
from models import PatientData

MODEL_PATH = r"d:\Cardio Vascular Disease Prediction\Backend\cardio_model_final_retrained.pkl"

# Load the dictionary from the pickle file
with open(MODEL_PATH, "rb") as f:
    model_dict = pickle.load(f)

model = model_dict['model']
scaler = model_dict['scaler']
features = model_dict['features']
numerical_cols = model_dict['numerical_cols']

def cap_values(val, lower, upper):
    return max(lower, min(upper, val))

def get_bp_category(ap_hi, ap_lo):
    if ap_hi < 120 and ap_lo < 80:
        return 'Normal'
    elif ap_hi >= 140 or ap_lo >= 90:
        return 'High'
    else:
        return 'Elevated'

def predict_cardio(data: PatientData):
    # Cap values using same thresholds from training
    height = cap_values(data.height, 140, 200)
    weight = cap_values(data.weight, 40, 160)
    ap_hi = cap_values(data.ap_hi, 80, 200)
    ap_lo = cap_values(data.ap_lo, 50, 120)
    
    # Feature Engineering
    bmi = weight / ((height / 100) ** 2)
    
    # BMI Category
    if bmi <= 18.5:
        bmi_cat = 'Underweight'
    elif bmi <= 25:
        bmi_cat = 'Normal'
    elif bmi <= 30:
        bmi_cat = 'Overweight'
    else:
        bmi_cat = 'Obese'
        
    bp_cat = get_bp_category(ap_hi, ap_lo)
    
    # Construct initial dictionary
    row = {
        'gender': data.gender,
        'height': height,
        'weight': weight,
        'ap_hi': ap_hi,
        'ap_lo': ap_lo,
        'smoke': data.smoke,
        'alco': data.alco,
        'active': data.active,
        'age_years': data.age,
        'BMI': bmi
    }
    
    # Initialize all One-Hot Encoded columns to 0
    # They are part of features list
    for feat in features:
        if feat not in row:
            row[feat] = 0
            
    # Set the appropriate one-hot encoded columns to 1 or True (0/1 is fine)
    if f'cholesterol_{data.cholesterol}' in row:
        row[f'cholesterol_{data.cholesterol}'] = 1
    if f'gluc_{data.gluc}' in row:
        row[f'gluc_{data.gluc}'] = 1
    if f'BMI_cat_{bmi_cat}' in row:
        row[f'BMI_cat_{bmi_cat}'] = 1
    if f'BP_cat_{bp_cat}' in row:
        row[f'BP_cat_{bp_cat}'] = 1
        
    # Convert to DataFrame
    df = pd.DataFrame([row])
    
    # Reorder exactly as the model expects
    df = df[features]
    
    # Scale numerical columns
    df[numerical_cols] = scaler.transform(df[numerical_cols])
    
    # Predict
    pred = model.predict(df)[0]
    prob = model.predict_proba(df)[0][1]
    
    return int(pred), float(prob)
