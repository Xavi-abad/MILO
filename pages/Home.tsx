import React from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../types';

interface HomeProps {
  user: UserProfile;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  return (
    <div className="bg-bg-base font-display text-ink antialiased min-h-full flex flex-col relative overflow-x-hidden">
        {/* Navbar */}
        <nav className="relative z-40 px-6 pt-14 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button className="size-10 rounded-full border border-ink/10 flex items-center justify-center hover:bg-white/50 transition-colors">
                    <span className="material-symbols-outlined text-2xl text-ink">menu</span>
                </button>
            </div>
            <Link to="/profile" className="flex items-center gap-4 group">
                <div className="flex flex-col items-end mr-2 opacity-80 group-hover:opacity-100 transition-opacity">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-ink/50">Welcome back</span>
                     <span className="text-sm font-bold text-ink">{user.name}</span>
                </div>
                <div className="bg-center bg-no-repeat bg-cover rounded-full size-12 border-2 border-white shadow-sm transition-transform group-hover:scale-105" style={{backgroundImage: "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')"}}></div>
            </Link>
        </nav>

        <main className="relative z-10 flex-1 px-6 pb-6 max-w-md mx-auto w-full flex flex-col animate-fade-in">
            <header className="mb-10 mt-4">
                <h1 className="text-[3.5rem] font-semibold tracking-tighter text-ink leading-[0.9] mb-4">
                    Hoy toca<br/>
                    <span className="text-ink/30">disfrutar.</span>
                </h1>
                <div className="flex items-center gap-2">
                    <span className="h-px w-8 bg-primary"></span>
                    <p className="text-ink-sec text-base font-medium uppercase tracking-wide text-xs">
                        {user.goal.replace('_', ' ')} preparation
                    </p>
                </div>
            </header>

            {/* Today's Run Card - Refined */}
            <section className="bg-white rounded-[2rem] p-1 shadow-lifted mb-8 relative group border border-white/60">
                <div className="bg-bg-card rounded-[1.8rem] p-7 h-full relative overflow-hidden">
                    
                    {/* Abstract BG */}
                    <div className="absolute -right-10 -top-10 size-40 bg-primary/5 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 flex flex-col h-full justify-between min-h-[280px]">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                                    <span className="text-xs font-bold tracking-widest uppercase text-ink/60">Today's Session</span>
                                </div>
                                <h2 className="text-3xl font-bold text-ink tracking-tight">Recovery Run</h2>
                                <p className="text-ink-sec mt-1 text-base font-medium">Easy pace, focus on rhythm.</p>
                            </div>
                            <div className="size-12 rounded-full border border-ink/5 bg-white flex items-center justify-center shadow-sm">
                                <span className="material-symbols-outlined text-primary text-2xl icon-filled">directions_run</span>
                            </div>
                        </div>
                        
                        <div className="mt-8 mb-6 relative">
                            <div className="flex items-baseline gap-1 mt-2">
                                <span className="text-7xl font-bold text-ink tracking-tighter leading-none">45</span>
                                <span className="text-xl font-medium text-ink-sec">min</span>
                            </div>
                        </div>
                        
                        <Link to="/run" className="w-full bg-[#1a1816] text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-ink/20 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
                            <span className="material-symbols-outlined icon-filled">play_arrow</span>
                            Start Run
                        </Link>
                    </div>
                </div>
            </section>

            {/* Weekly Progress - Minimalist */}
            <section className="mb-8">
                 <div className="flex items-center justify-between mb-4 px-1">
                    <h3 className="text-lg font-bold text-ink tracking-tight">Weekly Progress</h3>
                    <span className="text-xs font-bold text-ink-sec uppercase tracking-wider">3/5 Done</span>
                </div>
                <div className="bg-white rounded-[2rem] p-6 shadow-soft border border-white/60">
                    <div className="flex gap-2 w-full h-12 items-end">
                        <div className="w-full bg-sage rounded-md h-[40%] opacity-80"></div>
                        <div className="w-full bg-sage rounded-md h-[60%] opacity-90"></div>
                        <div className="w-full bg-sage rounded-md h-[45%]"></div>
                        <div className="w-full bg-bg-base rounded-md h-[70%] relative overflow-hidden">
                            <div className="absolute inset-0 bg-ink/5 border border-ink/5 rounded-md"></div>
                        </div>
                        <div className="w-full bg-bg-base rounded-md h-[55%]"></div>
                    </div>
                </div>
            </section>

            {/* Daily Insights */}
            <section className="mb-24">
                <div className="flex items-center justify-between mb-4 px-1">
                    <h3 className="text-lg font-bold text-ink tracking-tight">Daily Insights</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-[2rem] p-5 border border-white/60 shadow-soft">
                        <div className="size-10 rounded-full bg-bg-base flex items-center justify-center mb-3">
                            <span className="material-symbols-outlined text-ink text-xl">bedtime</span>
                        </div>
                        <span className="text-[10px] text-ink-sec uppercase tracking-widest font-bold block mb-1">Sleep Score</span>
                        <span className="text-2xl font-bold text-ink">85</span>
                    </div>
                    <div className="bg-white rounded-[2rem] p-5 border border-white/60 shadow-soft">
                         <div className="size-10 rounded-full bg-bg-base flex items-center justify-center mb-3">
                            <span className="material-symbols-outlined text-ink text-xl">monitor_heart</span>
                        </div>
                        <span className="text-[10px] text-ink-sec uppercase tracking-widest font-bold block mb-1">HRV Status</span>
                        <span className="text-2xl font-bold text-ink">Balanced</span>
                    </div>
                </div>
            </section>
        </main>
    </div>
  );
};

export default Home;