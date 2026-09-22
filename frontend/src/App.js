import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Predict from './pages/Predict';
import { HeartPulse } from 'lucide-react';
import gsap from 'gsap';

function App() {
  useEffect(() => {
    // Soft fade in for navbar elements
    gsap.fromTo(".nav-brand", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
    gsap.fromTo(".nav-links", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.1 });
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        
        {/* Navbar */}
        <nav className="bg-[#F7F6F2] sticky top-0 z-50 px-8 py-5 flex justify-between items-center border-b border-[#E8E6E1]">
          <Link to="/" className="nav-brand flex items-center gap-2 text-2xl font-semibold text-[#2C3338] hover:text-[#115E59] transition-colors tracking-tight">
            <HeartPulse className="text-[#115E59]" size={28} strokeWidth={2.5} />
            CardioVision
          </Link>
          <div className="nav-links flex items-center gap-8 font-medium">
            <Link to="/" className="text-[#5A636A] hover:text-[#115E59] transition-colors">Home</Link>
            <Link to="/predict" className="bg-[#EAF1F0] text-[#115E59] px-5 py-2 rounded-lg hover:bg-[#DEEBE9] transition-colors">
              New Assessment
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow z-10 p-8 flex flex-col items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<Predict />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
