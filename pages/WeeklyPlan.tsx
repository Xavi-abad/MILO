import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DailyWorkout } from '../types';

type ViewMode = 'week' | 'month';

const WeeklyPlan: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [activeDay, setActiveDay] = useState(10);

  // -- Mock Data --
  const days = [
    { day: 'Mon', date: '09' },
    { day: 'Tue', date: '10', isToday: true },
    { day: 'Wed', date: '11' },
    { day: 'Thu', date: '12' },
    { day: 'Fri', date: '13' },
    { day: 'Sat', date: '14' },
    { day: 'Sun', date: '15' },
  ];

  const workouts: DailyWorkout[] = [
      { day: 'Mon', date: '09', type: 'run', title: 'Easy Run', description: '6km • Zone 2', completed: true },
      { day: 'Tue', date: '10', type: 'run', title: 'Tempo Run', description: '8km • 45 min', isToday: true },
      { day: 'Wed', date: '11', type: 'run', isRescheduled: true },
      { day: 'Thu', date: '12', type: 'run', isMoved: true },
      { day: 'Fri', date: '13', type: 'run', title: 'Long Run', description: '15km • Easy Pace' },
  ];

  // Simple Month Grid Generator (October Mock)
  // 0 = empty, 1 = easy run, 2 = hard run, 3 = rest/cross
  const monthData = [
      { d: 1, t: 3 }, { d: 2, t: 1 }, { d: 3, t: 1 }, { d: 4, t: 2 }, { d: 5, t: 1 }, { d: 6, t: 0 }, { d: 7, t: 2 },
      { d: 8, t: 3 }, { d: 9, t: 1, done: true }, { d: 10, t: 2, today: true }, { d: 11, t: 1 }, { d: 12, t: 1 }, { d: 13, t: 2 }, { d: 14, t: 0 },
      { d: 15, t: 2 }, { d: 16, t: 3 }, { d: 17, t: 1 }, { d: 18, t: 1 }, { d: 19, t: 2 }, { d: 20, t: 0 }, { d: 21, t: 2 },
      { d: 22, t: 3 }, { d: 23, t: 1 }, { d: 24, t: 1 }, { d: 25, t: 2 }, { d: 26, t: 1 }, { d: 27, t: 0 }, { d: 28, t: 2 },
      { d: 29, t: 3 }, { d: 30, t: 1 }, { d: 31, t: 1 }
  ];

  return (
    <div className="bg-bg-page text-ink min-h-full w-full font-display overflow-x-hidden flex flex-col relative">
        <header className="flex flex-col pt-8 px-6 pb-2 z-10 bg-bg-page/95 backdrop-blur-sm sticky top-0 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="size-10 bg-ink text-white rounded-xl flex items-center justify-center shadow-lg shadow-ink/20">
                        <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-ink">Schedule</span>
                </div>
                
                {/* View Toggle */}
                <div className="bg-white p-1 rounded-full border border-stone-border/30 flex relative">
                     <div 
                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-ink rounded-full transition-all duration-300 shadow-md ${viewMode === 'week' ? 'left-1' : 'left-[calc(50%)]'}`}
                     ></div>
                     <button 
                        onClick={() => setViewMode('week')}
                        className={`relative z-10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${viewMode === 'week' ? 'text-white' : 'text-ink-sec'}`}
                     >
                        Week
                     </button>
                     <button 
                        onClick={() => setViewMode('month')}
                        className={`relative z-10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${viewMode === 'month' ? 'text-white' : 'text-ink-sec'}`}
                     >
                        Month
                     </button>
                </div>
            </div>

            <div className="mb-6 animate-fade-in">
                <h1 className="text-4xl font-light text-ink tracking-tight mb-2">
                    {viewMode === 'week' ? 'Weekly Focus' : 'October Overview'}
                </h1>
                <p className="text-ink-sec text-base font-medium flex items-center gap-2">
                    {viewMode === 'week' ? (
                        <>Week 41 <span className="size-1 bg-ink-sec rounded-full"></span> Build Phase</>
                    ) : (
                        <>Total Volume: 142km <span className="size-1 bg-ink-sec rounded-full"></span> 18 Sessions</>
                    )}
                </p>
            </div>
            
            {/* Week Day Header (Only for week view) */}
            {viewMode === 'week' && (
                <div className="flex justify-between items-center border-b border-ink/5 pb-4 animate-slide-up">
                    {days.map((item) => (
                        <div key={item.day} className={`flex flex-col items-center gap-2 group cursor-pointer ${item.isToday ? 'relative' : 'opacity-40 hover:opacity-100 transition-opacity'}`}>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${item.isToday ? 'text-primary' : 'text-ink'}`}>{item.day}</span>
                            {item.isToday ? (
                                <div className="size-10 rounded-full bg-ink text-bg-page flex items-center justify-center text-lg font-bold shadow-lg shadow-ink/20 transform scale-110">{item.date}</div>
                            ) : (
                                <span className="text-lg font-medium text-ink">{item.date}</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </header>

        <main className="flex-1 overflow-y-auto px-6 pt-4 gap-4 flex flex-col no-scrollbar pb-24 animate-slide-up">
            
            {viewMode === 'week' ? (
                // --- WEEK VIEW ---
                <>
                {workouts.map((workout, index) => {
                    if (workout.completed) {
                        return (
                            <div key={index} className="group opacity-50 hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center gap-3 mb-2 px-1">
                                    <span className="text-xs font-bold text-ink-sec uppercase tracking-wider">{workout.day} {workout.date}</span>
                                    <div className="h-px flex-1 bg-ink/5"></div>
                                </div>
                                <div className="p-5 rounded-2xl bg-white/60 border border-transparent hover:border-border-subtle flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-full bg-sage/20 text-sage-dark flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[20px]">check</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-ink leading-tight line-through decoration-ink/30">{workout.title}</h3>
                                            <p className="text-ink-sec text-xs font-medium mt-0.5">{workout.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    if (workout.isToday) {
                         return (
                            <Link key={index} to="/run" className="group relative block cursor-pointer">
                                <div className="flex items-center gap-3 mb-2 px-1">
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                                        <span className="size-1.5 bg-primary rounded-full animate-pulse"></span>
                                        Today
                                    </span>
                                    <div className="h-px flex-1 bg-primary/20"></div>
                                </div>
                                <div className="p-7 rounded-[1.5rem] bg-white border border-white shadow-lifted hover:scale-[1.01] hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                                    {/* Decorative BG */}
                                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                                        <span className="material-symbols-outlined text-9xl">sprint</span>
                                    </div>

                                    <div className="flex justify-between items-start mb-6 relative z-10">
                                        <div>
                                            <h3 className="text-3xl font-bold text-ink tracking-tight">{workout.title}</h3>
                                            <div className="flex gap-2 mt-2">
                                                 <span className="px-2 py-0.5 rounded-md bg-bg-page border border-ink/5 text-[10px] font-bold uppercase tracking-wider text-ink-sec">Run</span>
                                                 <span className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-wider text-primary">High Priority</span>
                                            </div>
                                        </div>
                                        <div className="size-12 rounded-2xl bg-ink text-white flex items-center justify-center shadow-lg shadow-ink/20">
                                            <span className="material-symbols-outlined text-[24px] icon-filled">play_arrow</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8 text-ink mb-8 relative z-10">
                                        <div className="flex items-center gap-2.5">
                                            <span className="material-symbols-outlined text-ink-sec text-[20px]">distance</span>
                                            <span className="text-lg font-bold">8 km</span>
                                        </div>
                                        <div className="w-px h-5 bg-ink/10"></div>
                                        <div className="flex items-center gap-2.5">
                                            <span className="material-symbols-outlined text-ink-sec text-[20px]">schedule</span>
                                            <span className="text-lg font-bold">45 min</span>
                                        </div>
                                    </div>
                                    <div className="h-1.5 w-full bg-bg-page rounded-full overflow-hidden relative z-10">
                                        <div className="h-full w-1/3 bg-primary rounded-full"></div>
                                    </div>
                                </div>
                            </Link>
                         );
                    }

                    if (workout.isRescheduled) {
                        return (
                            <div key={index}>
                                <div className="flex items-center gap-3 mb-2 px-1">
                                    <span className="text-xs font-bold text-ink-sec uppercase tracking-wider">{workout.day} {workout.date}</span>
                                    <div className="h-px flex-1 bg-ink/5"></div>
                                </div>
                                <div className="h-20 rounded-2xl border-2 border-dashed border-ink/10 flex items-center justify-center bg-white/30 backdrop-blur-sm">
                                    <div className="flex items-center gap-2 opacity-50">
                                        <span className="material-symbols-outlined text-lg">event_busy</span>
                                        <span className="text-sm font-bold uppercase tracking-wide">Rest Day (Rescheduled)</span>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={index} className="group">
                            <div className="flex items-center gap-3 mb-2 px-1">
                                <span className="text-xs font-bold text-ink-sec uppercase tracking-wider">{workout.day} {workout.date}</span>
                                <div className="h-px flex-1 bg-ink/5"></div>
                            </div>
                            <div className="p-6 rounded-2xl bg-white shadow-sm border border-white/60 flex justify-between items-center transition-transform hover:translate-x-1">
                                <div className="flex items-center gap-4">
                                     <div className="size-10 rounded-full bg-bg-page border border-stone-border/30 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px] text-ink">directions_run</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-ink">{workout.title}</h3>
                                        <p className="text-ink-sec text-xs font-medium mt-0.5">{workout.description}</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-ink/20">chevron_right</span>
                            </div>
                        </div>
                    );
                })}
                </>
            ) : (
                // --- MONTH VIEW ---
                <div className="bg-white rounded-[2rem] p-6 shadow-soft border border-white/60 animate-fade-in">
                    {/* Days of week header */}
                    <div className="grid grid-cols-7 gap-1 mb-4 text-center">
                        {['M','T','W','T','F','S','S'].map((d,i) => (
                            <span key={i} className="text-[10px] font-bold text-ink-sec uppercase">{d}</span>
                        ))}
                    </div>
                    
                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-y-4 gap-x-1">
                        {monthData.map((d, i) => (
                            <div key={i} className="flex flex-col items-center gap-1 group relative">
                                <div className={`size-9 rounded-full flex items-center justify-center text-sm font-bold transition-all
                                    ${d.today 
                                        ? 'bg-ink text-white shadow-lg scale-110 z-10' 
                                        : d.done 
                                            ? 'bg-sage/20 text-sage-dark' 
                                            : 'text-ink'
                                    }
                                `}>
                                    {d.d}
                                </div>
                                
                                {/* Workout Dot Indicator */}
                                {d.t !== 0 && (
                                    <div className={`size-1.5 rounded-full mt-0.5 
                                        ${d.t === 2 
                                            ? 'bg-primary' 
                                            : d.t === 1 
                                                ? 'bg-sage' 
                                                : 'bg-stone-border'
                                        }
                                    `}></div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-bg-base grid grid-cols-3 gap-2">
                        <div className="text-center">
                            <span className="block text-2xl font-bold text-ink">18</span>
                            <span className="text-[10px] text-ink-sec font-bold uppercase tracking-widest">Runs</span>
                        </div>
                        <div className="text-center border-l border-bg-base">
                            <span className="block text-2xl font-bold text-ink">142</span>
                            <span className="text-[10px] text-ink-sec font-bold uppercase tracking-widest">Km</span>
                        </div>
                         <div className="text-center border-l border-bg-base">
                            <span className="block text-2xl font-bold text-ink">14h</span>
                            <span className="text-[10px] text-ink-sec font-bold uppercase tracking-widest">Time</span>
                        </div>
                    </div>
                </div>
            )}

        </main>
    </div>
  );
};

export default WeeklyPlan;