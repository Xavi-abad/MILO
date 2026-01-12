import React from 'react';
import { UserProfile } from '../types';

interface ProfileProps {
  user: UserProfile;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  // Mock data for display
  const totalKm = 428;
  const totalRuns = 52;
  const nextLevelKm = 500;
  
  const achievements = user.achievements || [
    { id: '1', title: 'First Steps', icon: 'footprint', unlocked: true },
    { id: '2', title: 'Consistency', icon: 'date_range', unlocked: true },
    { id: '3', title: 'Speed Demon', icon: 'speed', unlocked: false },
    { id: '4', title: 'Marathoner', icon: 'emoji_events', unlocked: false },
  ];

  return (
    <div className="bg-bg-page min-h-full font-display text-ink pb-6">
        {/* Header with Background */}
        <div className="relative h-64 bg-ink overflow-hidden rounded-b-[3rem]">
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent"></div>
            
            <div className="relative z-10 flex flex-col items-center pt-16 px-6 text-center">
                <div className="size-24 rounded-full border-4 border-white/20 bg-cover bg-center shadow-2xl mb-4" style={{backgroundImage: "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')"}}></div>
                <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold uppercase tracking-widest backdrop-blur-md border border-white/5">
                    {user.level} Runner
                </span>
            </div>
        </div>

        {/* Main Content - Overlapping the header */}
        <div className="relative z-20 px-6 -mt-10">
            
            {/* Stats Overview */}
            <div className="bg-white rounded-[2rem] p-6 shadow-lifted border border-white/50 flex justify-between mb-6">
                <div className="flex flex-col items-center flex-1 border-r border-bg-base">
                    <span className="text-3xl font-bold text-ink">{totalKm}</span>
                    <span className="text-[10px] uppercase font-bold text-ink-sec tracking-widest mt-1">Total KM</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                    <span className="text-3xl font-bold text-ink">{totalRuns}</span>
                    <span className="text-[10px] uppercase font-bold text-ink-sec tracking-widest mt-1">Total Runs</span>
                </div>
            </div>

            {/* Level Progress */}
            <div className="mb-8">
                <div className="flex justify-between items-end mb-2 px-2">
                    <h3 className="font-bold text-ink">Level Progress</h3>
                    <span className="text-sm font-medium text-ink-sec">{totalKm} / {nextLevelKm} km</span>
                </div>
                <div className="h-4 bg-white rounded-full p-1 shadow-sm border border-white/50">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full w-[85%] relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 size-2 bg-white rounded-full shadow-sm mr-1"></div>
                    </div>
                </div>
                <p className="text-xs text-ink-sec mt-2 px-2">Only 72 km more to reach Advanced status.</p>
            </div>

            {/* Achievements Grid */}
            <h3 className="font-bold text-ink mb-4 px-2 text-lg">Achievements</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
                {achievements.map((ach) => (
                    <div key={ach.id} className={`p-4 rounded-[1.5rem] flex flex-col items-center text-center gap-3 border transition-all ${ach.unlocked ? 'bg-white border-white/60 shadow-soft' : 'bg-bg-base/50 border-transparent opacity-60'}`}>
                        <div className={`size-12 rounded-full flex items-center justify-center ${ach.unlocked ? 'bg-primary/10 text-primary' : 'bg-ink/5 text-ink-sec'}`}>
                            <span className="material-symbols-outlined icon-filled">{ach.icon}</span>
                        </div>
                        <div>
                            <span className={`block font-bold text-sm ${ach.unlocked ? 'text-ink' : 'text-ink-sec'}`}>{ach.title}</span>
                            <span className="text-[10px] text-ink-sec uppercase tracking-wide">{ach.unlocked ? 'Unlocked' : 'Locked'}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Settings Button */}
            <button className="w-full py-4 rounded-2xl bg-bg-card border border-stone-border/30 text-ink font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors">
                <span className="material-symbols-outlined">settings</span>
                Profile Settings
            </button>
        </div>
    </div>
  );
};

export default Profile;