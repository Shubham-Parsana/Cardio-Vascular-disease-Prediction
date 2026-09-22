# Cardiovascular Disease Prediction Project

## 1. Problem Definition

Build a model that predicts whether an individual has cardiovascular
disease, using clinical and lifestyle data — blood pressure, cholesterol,
glucose, weight/height, smoking, alcohol use, and physical activity.

- `0` → No cardiovascular disease
- `1` → Cardiovascular disease present

## 2. Dataset Overview

cardio: - Target variable
age: - Age of person - Stored in days - Convert into years for better
understanding
height: - Height of person - Unit: cm
weight: - Weight of person - Unit: kg
gender: - Categorical encoded variable - 1 -> Female - 2 -> Male
ap_hi: - Systolic Blood Pressure - Upper BP value
ap_lo: - Diastolic Blood Pressure - Lower BP value
smoke: - Smoking habit - Binary value
alco: - Alcohol intake - Binary value
active: - Physical activity - Binary value


## 4. Data Cleaning

Missing values: none ( df.isnull().sum() )

verify no duplicate `id` rows

