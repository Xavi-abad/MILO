import React, { useState, useEffect } from 'react';
import { ExperienceLevel, Goal, UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [level, setLevel] = useState<ExperienceLevel | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);

  const handleNext = () => {
    if (step === 1 && name.trim()) setStep(2);
    if (step === 2 && level) setStep(3);
    if (step === 3 && goal) setStep(4);
  };

  const handleFinish = () => {
    if (name && level && goal) {
      onComplete({ name, level, goal, hasOnboarded: true });
    }
  };

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => {
        handleFinish();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Step 1: Welcome
  if (step === 1) {
    return (
      <div className="min-h-screen bg-bg-page flex flex-col px-8 py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <header className="flex-1 flex flex-col justify-center animate-slide-up">
            <div className="size-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 mb-8">
                <span className="material-symbols-outlined text-4xl">sprint</span>
            </div>
            <h1 className="text-5xl font-bold text-ink mb-4 leading-tight">
                Hello,<br/> I'm Milo.
            </h1>
            <p className="text-xl text-ink-sec leading-relaxed">
                Your personal running coach. designed to help you run further, faster, and smarter.
            </p>
        </header>

        <div className="mt-auto animate-fade-in delay-300">
            <label className="block text-sm font-bold text-ink mb-2 uppercase tracking-wide">What should I call you?</label>
            <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-white border-none rounded-2xl p-5 text-xl text-ink placeholder:text-ink/30 focus:ring-2 focus:ring-primary shadow-soft mb-8"
            />
            
            <button 
                onClick={handleNext}
                disabled={!name.trim()}
                className="w-full bg-ink text-white py-5 rounded-2xl text-lg font-bold tracking-wide hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
                Get Started
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
        </div>
      </div>
    );
  }

  // Step 2: Experience Level
  if (step === 2) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col px-8 py-12">
         <div className="w-full h-1 bg-ink/10 rounded-full mb-12">
            <div className="w-1/3 h-full bg-primary rounded-full"></div>
        </div>

        <h2 className="text-3xl font-bold text-ink mb-2">Running Experience</h2>
        <p className="text-ink-sec mb-8">Help us tailor your plan to your current fitness level.</p>

        <div className="flex flex-col gap-4 flex-1">
            {[
                { id: 'beginner', label: 'Beginner', desc: 'I run occasionally or want to start.' },
                { id: 'intermediate', label: 'Intermediate', desc: 'I run 2-3 times a week.' },
                { id: 'advanced', label: 'Advanced', desc: 'I run 4+ times a week and race.' }
            ].map((opt) => (
                <button 
                    key={opt.id}
                    onClick={() => setLevel(opt.id as ExperienceLevel)}
                    className={`text-left p-6 rounded-3xl border-2 transition-all duration-300 ${level === opt.id ? 'border-primary bg-white shadow-lifted' : 'border-transparent bg-white/50 hover:bg-white/80'}`}
                >
                    <h3 className={`text-xl font-bold mb-1 ${level === opt.id ? 'text-primary' : 'text-ink'}`}>{opt.label}</h3>
                    <p className="text-ink-sec text-sm">{opt.desc}</p>
                </button>
            ))}
        </div>

        <button 
            onClick={handleNext}
            disabled={!level}
            className="mt-8 w-full bg-ink text-white py-5 rounded-2xl text-lg font-bold tracking-wide hover:bg-black transition-colors disabled:opacity-50"
        >
            Continue
        </button>
      </div>
    );
  }

  // Step 3: Goal
  if (step === 3) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col px-8 py-12">
        <div className="w-full h-1 bg-ink/10 rounded-full mb-12">
            <div className="w-2/3 h-full bg-primary rounded-full"></div>
        </div>

        <h2 className="text-3xl font-bold text-ink mb-2">Main Goal</h2>
        <p className="text-ink-sec mb-8">What are you aiming for in the next 3-6 months?</p>

        <div className="grid grid-cols-1 gap-4 flex-1 overflow-y-auto no-scrollbar pb-4">
            {[
                { id: 'start_running', label: 'Start Running', icon: 'directions_run' },
                { id: 'improve_5k', label: 'Improve 5K', icon: 'timer' },
                { id: 'half_marathon', label: 'Half Marathon', icon: 'flag' },
                { id: 'marathon', label: 'Full Marathon', icon: 'emoji_events' },
                { id: 'health', label: 'Stay Healthy', icon: 'favorite' }
            ].map((opt) => (
                <button 
                    key={opt.id}
                    onClick={() => setGoal(opt.id as Goal)}
                    className={`flex items-center gap-4 p-5 rounded-3xl border-2 transition-all duration-300 ${goal === opt.id ? 'border-primary bg-white shadow-lifted' : 'border-transparent bg-white/50 hover:bg-white/80'}`}
                >
                    <div className={`size-12 rounded-full flex items-center justify-center ${goal === opt.id ? 'bg-primary text-white' : 'bg-ink/5 text-ink'}`}>
                        <span className="material-symbols-outlined">{opt.icon}</span>
                    </div>
                    <span className="text-lg font-bold text-ink">{opt.label}</span>
                </button>
            ))}
        </div>

        <button 
            onClick={handleNext}
            disabled={!goal}
            className="mt-8 w-full bg-ink text-white py-5 rounded-2xl text-lg font-bold tracking-wide hover:bg-black transition-colors disabled:opacity-50"
        >
            Next Step
        </button>
      </div>
    );
  }

  // Step 4: Loading / Setup
  return (
    <div className="min-h-screen bg-ink flex flex-col items-center justify-center relative p-8">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
            <div className="size-24 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-8"></div>
            <h2 className="text-3xl font-bold text-white mb-2">Building your plan...</h2>
            <p className="text-white/60 text-lg max-w-xs">Milo is crafting a personalized weekly schedule based on your goal to {goal?.replace('_', ' ')}.</p>
        </div>
    </div>
  );
};

export default Onboarding;