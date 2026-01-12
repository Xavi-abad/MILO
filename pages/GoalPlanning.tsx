import React from 'react';

const GoalPlanning: React.FC = () => {
  return (
    <div className="bg-bg-page min-h-full font-display text-ink flex flex-col">
        {/* Header */}
        <header className="px-6 pt-12 pb-6">
            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block animate-fade-in">Primary Goal</span>
            <h1 className="text-4xl font-light text-ink leading-tight animate-slide-up">
                Valencia<br/><span className="font-bold">Marathon</span>
            </h1>
        </header>

        <main className="flex-1 px-6 pb-6 flex flex-col gap-6 animate-slide-up">
            
            {/* Hero Card */}
            <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden shadow-lifted group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533561052604-c3beb6d55760?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="block opacity-80 text-sm font-medium mb-1">Race Day</span>
                            <span className="text-2xl font-bold">Dec 3, 2023</span>
                        </div>
                        <div className="text-right">
                            <span className="text-5xl font-bold block leading-none">42</span>
                            <span className="text-sm opacity-80 uppercase tracking-widest font-bold">Days Left</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Target Time Widget */}
            <section className="bg-white rounded-[2rem] p-6 shadow-soft border border-white/60">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-ink text-lg">Target Pace</h3>
                    <span className="material-symbols-outlined text-ink-sec">edit</span>
                </div>
                
                <div className="flex items-center justify-between">
                     <div className="flex flex-col">
                        <span className="text-[10px] text-ink-sec uppercase tracking-widest font-bold mb-1">Goal Time</span>
                        <span className="text-4xl font-bold text-ink">3:55:00</span>
                     </div>
                     <div className="h-10 w-px bg-ink/10"></div>
                     <div className="flex flex-col text-right">
                        <span className="text-[10px] text-ink-sec uppercase tracking-widest font-bold mb-1">Req. Pace</span>
                        <span className="text-2xl font-bold text-primary">5:34 <span className="text-sm text-ink-sec font-medium">/km</span></span>
                     </div>
                </div>

                <div className="mt-6">
                    <div className="flex justify-between text-xs font-bold text-ink-sec mb-2">
                        <span>Prediction</span>
                        <span>Confidence: High</span>
                    </div>
                    <div className="h-3 bg-bg-base rounded-full overflow-hidden">
                        <div className="h-full w-[92%] bg-sage rounded-full"></div>
                    </div>
                    <p className="text-xs text-ink-sec mt-2 text-right">Predicted finish: 3:52:10</p>
                </div>
            </section>

            {/* Training Phase */}
            <section>
                <h3 className="font-bold text-ink mb-4 px-2 text-lg">Current Phase</h3>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                    {[
                        { name: 'Base', active: false },
                        { name: 'Build', active: true, week: '4/8' },
                        { name: 'Peak', active: false },
                        { name: 'Taper', active: false }
                    ].map((phase, idx) => (
                        <div key={idx} className={`min-w-[100px] flex-1 p-4 rounded-3xl border-2 flex flex-col gap-8 transition-colors ${phase.active ? 'bg-ink border-ink text-white shadow-lg' : 'bg-white border-transparent text-ink-sec opacity-60'}`}>
                            <span className="text-sm font-bold uppercase tracking-wide">{phase.name}</span>
                            <div className="mt-auto">
                                {phase.active ? (
                                    <span className="text-2xl font-bold text-primary block">{phase.week}</span>
                                ) : (
                                    <span className="material-symbols-outlined text-2xl">lock</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    </div>
  );
};

export default GoalPlanning;