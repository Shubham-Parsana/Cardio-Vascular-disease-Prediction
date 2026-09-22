import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { AlertTriangle, CheckCircle2, ChevronRight, User, HeartPulse, Activity } from 'lucide-react';

function Predict() {
  const [formData, setFormData] = useState({
    age: 45,
    gender: 1, // 1 for Female, 2 for Male
    height: 165,
    weight: 70,
    ap_hi: 120,
    ap_lo: 80,
    cholesterol: 1,
    gluc: 1,
    smoke: 0,
    alco: 0,
    active: 1
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    gsap.fromTo(".fade-in-up", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : Number(value)
    }));
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      // Use environment variable for production URL, fallback to localhost for development
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
      
      setTimeout(() => {
        gsap.fromTo(".result-card", 
          { scale: 0.98, opacity: 0, y: 15 },
          { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }, 50);
      
    } catch (err) {
      console.error("Prediction Error:", err);
      setError("Unable to connect to the prediction server. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      
      <div className="text-center mb-10 fade-in-up">
        <h2 className="text-3xl font-semibold text-[#2C3338] mb-2 tracking-tight">
          Health Assessment
        </h2>
        <p className="text-[#5A636A]">
          Complete the details below for a comprehensive cardiovascular risk analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-6 fade-in-up">
          
          {/* Section 1: Personal Details */}
          <div className="solid-card p-8">
            <h3 className="text-lg font-medium text-[#2C3338] mb-5 flex items-center gap-2">
              <User size={20} className="text-[#115E59]" /> Personal Details
            </h3>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#5A636A]">Age (Years)</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="solid-input w-full" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#5A636A]">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="solid-input w-full">
                  <option value={1}>Female</option>
                  <option value={2}>Male</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#5A636A]">Height (cm)</label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} className="solid-input w-full" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#5A636A]">Weight (kg)</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="solid-input w-full" />
              </div>
            </div>
          </div>

          {/* Section 2: Medical Vitals */}
          <div className="solid-card p-8">
            <h3 className="text-lg font-medium text-[#2C3338] mb-5 flex items-center gap-2">
              <HeartPulse size={20} className="text-[#9F1239]" /> Medical Vitals
            </h3>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#5A636A]">Systolic BP</label>
                <input type="number" name="ap_hi" value={formData.ap_hi} onChange={handleChange} className="solid-input w-full" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#5A636A]">Diastolic BP</label>
                <input type="number" name="ap_lo" value={formData.ap_lo} onChange={handleChange} className="solid-input w-full" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#5A636A]">Cholesterol</label>
                <select name="cholesterol" value={formData.cholesterol} onChange={handleChange} className="solid-input w-full">
                  <option value={1}>Normal</option>
                  <option value={2}>Above Normal</option>
                  <option value={3}>Well Above</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#5A636A]">Glucose</label>
                <select name="gluc" value={formData.gluc} onChange={handleChange} className="solid-input w-full">
                  <option value={1}>Normal</option>
                  <option value={2}>Above Normal</option>
                  <option value={3}>Well Above</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Lifestyle */}
          <div className="solid-card p-8">
            <h3 className="text-lg font-medium text-[#2C3338] mb-5 flex items-center gap-2">
              <Activity size={20} className="text-[#B45309]" /> Lifestyle Factors
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <button 
                type="button" 
                onClick={() => handleChange({ target: { name: 'smoke', value: formData.smoke ? 0 : 1, type: 'number' } })}
                className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-colors ${formData.smoke ? 'bg-[#EAF1F0] border-[#B2D1CE] text-[#115E59]' : 'bg-[#FDFDFC] border-[#E3E1DB] text-[#5A636A] hover:bg-[#F7F6F2]'}`}
              >
                Smoker
              </button>
              <button 
                type="button" 
                onClick={() => handleChange({ target: { name: 'alco', value: formData.alco ? 0 : 1, type: 'number' } })}
                className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-colors ${formData.alco ? 'bg-[#EAF1F0] border-[#B2D1CE] text-[#115E59]' : 'bg-[#FDFDFC] border-[#E3E1DB] text-[#5A636A] hover:bg-[#F7F6F2]'}`}
              >
                Alcohol
              </button>
              <button 
                type="button" 
                onClick={() => handleChange({ target: { name: 'active', value: formData.active ? 0 : 1, type: 'number' } })}
                className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-colors ${formData.active ? 'bg-[#EAF1F0] border-[#B2D1CE] text-[#115E59]' : 'bg-[#FDFDFC] border-[#E3E1DB] text-[#5A636A] hover:bg-[#F7F6F2]'}`}
              >
                Active
              </button>
            </div>
          </div>

          <button 
            type="button" 
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary w-full shadow-lg mt-2"
          >
            {loading ? "Analyzing Profile..." : "Analyze Health Profile"}
            {!loading && <ChevronRight size={20} />}
          </button>
          
        </div>

        {/* Results Column */}
        <div className="lg:col-span-5 fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="sticky top-28">
            
            {!result && !error && (
              <div className="solid-card bg-transparent shadow-none border-dashed border-2 border-[#E3E1DB] p-10 text-center text-[#9CA3AF] flex flex-col items-center justify-center min-h-[300px]">
                <Activity size={48} className="mb-4 text-[#D1D5DB]" />
                <p className="font-medium">Submit your profile to view your AI health assessment.</p>
                <p className="text-sm mt-2 opacity-70">Model Test Accuracy: 73.59%</p>
              </div>
            )}

            {error && (
              <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-2xl p-6 text-[#991B1B] flex items-start gap-3 shadow-sm">
                <AlertTriangle className="shrink-0 text-[#EF4444]" />
                <p className="text-sm font-medium leading-relaxed">{error}</p>
              </div>
            )}

            {result && (
              <div className="result-card opacity-0 solid-card overflow-hidden">
                <div className={`p-8 border-b ${result.prediction === 1 ? 'bg-[#FEF2F2] border-[#FEE2E2]' : 'bg-[#F0FDF4] border-[#DCFCE7]'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full bg-white shadow-sm ${result.prediction === 1 ? 'text-[#E11D48]' : 'text-[#059669]'}`}>
                      {result.prediction === 1 ? <AlertTriangle size={28} /> : <CheckCircle2 size={28} />}
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold ${result.prediction === 1 ? 'text-[#9F1239]' : 'text-[#065F46]'}`}>
                        {result.prediction === 1 ? 'Risk Detected' : 'Healthy Profile'}
                      </h3>
                      <p className="text-sm text-[#5A636A] font-medium mt-0.5">Cardiovascular Assessment</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 space-y-8 bg-white">
                  <div>
                    <div className="flex justify-between text-sm font-medium mb-3">
                      <span className="text-[#5A636A]">Model Probability Score</span>
                      <span className="text-[#2C3338]">{(result.probability * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-[#F7F6F2] rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${result.prediction === 1 ? 'bg-[#E11D48]' : 'bg-[#059669]'}`}
                        style={{ width: `${result.probability * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-5 bg-[#F7F6F2] rounded-xl border border-[#E8E6E1] text-sm text-[#2C3338] leading-relaxed font-medium">
                    {result.prediction === 1 ? (
                      <p>The model indicates a heightened likelihood of cardiovascular disease based on these metrics. We highly recommend consulting with a healthcare professional for a comprehensive medical examination.</p>
                    ) : (
                      <p>The model indicates a lower likelihood of cardiovascular disease. Continue maintaining a healthy diet, staying physically active, and attending regular medical checkups.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}

export default Predict;
