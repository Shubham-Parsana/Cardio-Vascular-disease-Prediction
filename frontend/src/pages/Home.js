import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Activity, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

function Home() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo('.hero-text', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }
      );
      
      // Feature Cards Animation
      gsap.fromTo('.feature-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.3 }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex-grow flex flex-col items-center justify-center w-full max-w-5xl">
      <div className="w-full text-center space-y-6 mt-12 mb-20">
        <h1 className="hero-text text-5xl md:text-6xl font-bold tracking-tight text-[#2C3338]">
          Clarity for your <span className="text-[#115E59] italic font-serif">Heart Health</span>
        </h1>
        
        <p className="hero-text text-xl text-[#5A636A] max-w-2xl mx-auto font-normal leading-relaxed">
          Leverage our clinically-trained machine learning model to get instant, accurate, and secure insights about your cardiovascular risk profile.
        </p>
        
        <div className="hero-text pt-8">
          <Link to="/predict" className="inline-flex items-center gap-2 bg-[#115E59] text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-[#0F4C48] transition-colors shadow-sm hover:shadow-md">
            Start Assessment <ArrowRight size={20} />
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <FeatureCard 
          icon={<Zap className="text-[#B45309]" size={28} />}
          title="Instant Results"
          desc="Complete the short assessment and receive your risk analysis instantly. No waiting required."
        />
        <FeatureCard 
          icon={<Activity className="text-[#115E59]" size={28} />}
          title="Clinically Trained"
          desc="Powered by a model trained on tens of thousands of medical records with 73.5% proven accuracy."
        />
        <FeatureCard 
          icon={<ShieldCheck className="text-[#4338CA]" size={28} />}
          title="100% Private"
          desc="Your health data never leaves the session. It is processed securely and completely anonymously."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="feature-card bg-white border border-[#E8E6E1] rounded-2xl p-8 flex flex-col space-y-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06)] transition-shadow">
      <div className="w-12 h-12 rounded-xl bg-[#F7F6F2] flex items-center justify-center mb-2">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[#2C3338]">{title}</h3>
      <p className="text-[#5A636A] leading-relaxed">{desc}</p>
    </div>
  );
}

export default Home;
