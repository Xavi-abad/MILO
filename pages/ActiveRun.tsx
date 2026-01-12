import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface ActiveRunProps {
    onFinish: (km: number) => void;
}

const ActiveRun: React.FC<ActiveRunProps> = ({ onFinish }) => {
    const navigate = useNavigate();
    const [duration, setDuration] = useState(0);
    const [distance, setDistance] = useState(0.00);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Initial dummy data to make the UI look active immediately
    useEffect(() => {
        setDuration(120); // Start at 2 mins for demo
        setDistance(0.35); // Start at 0.35km
    }, []);

    useEffect(() => {
        if (!isPaused) {
            timerRef.current = setInterval(() => {
                setDuration(prev => prev + 1);
                // Simulate running speed approx 5:00/km -> 1km every 300s -> 1/300 km per sec -> 0.0033
                setDistance(prev => prev + 0.0033);
            }, 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPaused]);

    const handleFinish = () => {
        onFinish(distance);
        navigate('/profile');
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h > 0 ? h.toString() + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-[#f0ede8] font-display text-ink overflow-hidden h-screen w-full relative">
            {/* Background Map Placeholder */}
            <div className="absolute inset-0 z-0 bg-[#E5E2DB]">
                 {/* This would be a real map in prod, using a static image for aesthetic fidelity */}
                <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{backgroundImage: "url('https://picsum.photos/800/1200?grayscale')", backgroundSize: "cover", backgroundPosition: "center", filter: "contrast(0.6) brightness(1.2)"}}></div>
            </div>
            
            {/* Aesthetic SVG Path Overlay */}
            <svg className="absolute inset-0 z-0 pointer-events-none w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                <path d="M-50,600 Q100,550 180,400 T300,300 T450,150" fill="none" stroke="white" strokeLinecap="round" strokeWidth="12"></path>
                <path d="M-50,600 Q100,550 180,400 T300,300 T450,150" fill="none" stroke="#df7020" strokeLinecap="round" strokeWidth="4"></path>
                {/* Dotted future path */}
                <path d="M450,150 Q500,100 550,50" fill="none" stroke="#332D28" strokeDasharray="4 8" strokeLinecap="round" strokeWidth="3" opacity="0.5"></path>
            </svg>

            {/* Location Pin */}
            <div className="absolute top-[35%] left-[55%] z-10 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-24 h-24 bg-primary/20 rounded-full absolute ${!isPaused ? 'animate-pulse' : ''}`}></div>
                <div className="w-4 h-4 bg-primary border-[3px] border-white rounded-full shadow-md relative z-10"></div>
            </div>

            {/* Top Stats HUD */}
            <div className="absolute top-0 left-0 w-full flex justify-between px-6 pt-12 pb-4 z-20 pointer-events-none">
                <div className="flex flex-col items-start bg-white/80 backdrop-blur-md px-5 py-3 rounded-2xl shadow-soft border border-white/40">
                    <span className="text-[10px] font-bold tracking-widest text-ink-sec uppercase mb-1">Duration</span>
                    <span className="text-2xl font-bold text-ink tracking-tight font-mono">{formatTime(duration)}</span>
                </div>
                <div className="flex flex-col items-end bg-white/80 backdrop-blur-md px-5 py-3 rounded-2xl shadow-soft border border-white/40">
                    <span className="text-[10px] font-bold tracking-widest text-ink-sec uppercase mb-1">Distance</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-ink tracking-tight">{distance.toFixed(2)}</span>
                        <span className="text-[10px] font-bold text-ink-sec uppercase">km</span>
                    </div>
                </div>
            </div>

            {/* Side Controls */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                <button className="flex size-12 items-center justify-center rounded-full bg-white/90 shadow-soft border border-white text-ink transition-transform active:scale-95 hover:bg-white">
                    <span className="material-symbols-outlined text-[22px] rotate-45">explore</span>
                </button>
                <div className="flex flex-col gap-2 mt-4">
                    <button className="flex size-12 items-center justify-center rounded-full bg-white/90 shadow-soft border border-white text-ink active:scale-95 hover:bg-white">
                        <span className="material-symbols-outlined text-[22px]">add</span>
                    </button>
                    <button className="flex size-12 items-center justify-center rounded-full bg-white/90 shadow-soft border border-white text-ink active:scale-95 hover:bg-white">
                        <span className="material-symbols-outlined text-[22px]">remove</span>
                    </button>
                </div>
            </div>

            {/* Bottom Sheet / Dashboard */}
            <div className="absolute bottom-0 left-0 w-full z-30 flex flex-col items-center">
                
                {/* Dynamic Island Message */}
                {!isPaused && (
                    <div className="mb-6 px-6 text-center animate-slide-up">
                        <p className="text-sm font-bold text-ink tracking-wide bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/50 inline-flex items-center gap-2">
                            <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
                            You're doing great, keep pushing!
                        </p>
                    </div>
                )}

                {/* Main Stats Card */}
                <div className="w-full bg-[#E5E2DB] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-white/50 px-8 pt-8 pb-10 flex flex-col gap-8">
                    
                    {/* Primary Metric: Speed */}
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 mb-1 opacity-60">
                                <span className="material-symbols-outlined text-[20px]">speed</span>
                                <span className="text-[10px] font-bold tracking-widest uppercase">Avg Pace</span>
                            </div>
                            <div className="text-6xl font-medium tracking-tighter text-ink leading-none flex items-baseline">
                                {distance > 0 ? Math.floor(duration / 60 / distance) : 0}:{((duration / distance) % 60).toFixed(0).padStart(2, '0')} <span className="text-lg font-bold text-ink-sec ml-2">/km</span>
                            </div>
                        </div>
                        
                        {/* Visualizer Bars */}
                        <div className="h-14 flex items-end gap-[6px]">
                            {[30, 45, 40, 65, 85, 60, 40].map((h, i) => (
                                <div key={i} className={`w-1.5 rounded-full transition-all duration-500 ${i === 4 && !isPaused ? 'bg-primary animate-pulse' : 'bg-ink/10'}`} style={{height: `${h}%`}}></div>
                            ))}
                        </div>
                    </div>

                    {/* Secondary Metrics */}
                    <div className="grid grid-cols-2 gap-12 border-t border-ink/5 pt-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold tracking-widest text-ink-sec uppercase">Elevation</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-ink">142</span>
                                <span className="text-sm font-bold text-ink-sec">m</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 items-end text-right">
                            <span className="text-[10px] font-bold tracking-widest text-ink-sec uppercase">Heart Rate</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-ink">145</span>
                                <span className="text-sm font-bold text-ink-sec">bpm</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2 flex justify-center gap-4">
                        {!isPaused ? (
                            <button 
                                onClick={() => setIsPaused(true)}
                                className="group flex items-center justify-center gap-3 px-10 py-5 bg-ink text-[#E5E2DB] rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 w-full max-w-[240px]"
                            >
                                <span className="material-symbols-outlined icon-filled text-[24px]">pause</span>
                                <span className="text-sm font-bold tracking-widest uppercase">Pause Run</span>
                            </button>
                        ) : (
                            <>
                                <button 
                                    onClick={() => setIsPaused(false)}
                                    className="flex items-center justify-center gap-2 px-6 py-5 bg-bg-base text-ink border border-ink/10 rounded-full shadow-sm hover:bg-white active:scale-95 transition-all flex-1"
                                >
                                    <span className="material-symbols-outlined icon-filled text-[24px]">play_arrow</span>
                                    <span className="text-sm font-bold tracking-widest uppercase">Resume</span>
                                </button>
                                <button 
                                    onClick={handleFinish}
                                    className="flex items-center justify-center gap-2 px-6 py-5 bg-primary text-white rounded-full shadow-xl shadow-primary/30 hover:bg-primary-dark active:scale-95 transition-all flex-1"
                                >
                                    <span className="material-symbols-outlined icon-filled text-[24px]">flag</span>
                                    <span className="text-sm font-bold tracking-widest uppercase">Finish</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveRun;