import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const NavItem = ({ to, icon, activeIcon, label, isActive }: { to: string, icon: string, activeIcon: string, label: string, isActive: boolean }) => (
    <Link to={to} className="flex-1 flex flex-col items-center justify-center relative group py-2">
      <div className={`transition-all duration-500 ease-out absolute inset-0 rounded-2xl ${isActive ? 'bg-white/10' : 'bg-transparent'}`}></div>
      <span className={`material-symbols-outlined text-[24px] z-10 transition-all duration-300 ${isActive ? 'text-white scale-110 icon-filled' : 'text-white/40 group-hover:text-white/80'}`}>
        {isActive ? activeIcon : icon}
      </span>
      {isActive && (
          <span className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_#df7020]"></span>
      )}
    </Link>
  );

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 px-6 pointer-events-none flex justify-center">
        {/* Floating Island Container */}
        <nav className="pointer-events-auto bg-[#1a1816]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] rounded-[2rem] p-2 pr-4 pl-4 h-[4.5rem] flex items-center justify-between w-full max-w-[360px] relative overflow-hidden ring-1 ring-white/5">
            
            {/* Glossy Reflection Effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

            <NavItem 
                to="/" 
                icon="home" 
                activeIcon="home"
                label="Home"
                isActive={currentPath === '/'} 
            />
            <NavItem 
                to="/plan" 
                icon="calendar_month" 
                activeIcon="calendar_month"
                label="Plan"
                isActive={currentPath === '/plan'} 
            />
            
            {/* Center Action Button - Integrated but distinct */}
            <div className="mx-2 relative group">
                <div className={`absolute inset-0 bg-primary/20 blur-xl rounded-full transition-opacity duration-500 ${currentPath === '/run' ? 'opacity-100' : 'opacity-0'}`}></div>
                <Link to="/run" className="relative size-12 bg-gradient-to-tr from-primary to-[#ff8c42] rounded-full shadow-lg shadow-primary/20 flex items-center justify-center text-white cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 border border-white/10">
                     <span className="material-symbols-outlined text-[24px] icon-filled">directions_run</span>
                </Link>
            </div>

             <NavItem 
                to="/goals" 
                icon="flag" 
                activeIcon="flag"
                label="Goals"
                isActive={currentPath === '/goals'} 
            />
             <NavItem 
                to="/profile" 
                icon="person" 
                activeIcon="person"
                label="Profile"
                isActive={currentPath === '/profile'} 
            />
        </nav>
    </div>
  );
};

export default BottomNav;