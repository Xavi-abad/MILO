import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import WeeklyPlan from './pages/WeeklyPlan';
import ActiveRun from './pages/ActiveRun';
import Onboarding from './pages/Onboarding';
import Profile from './pages/Profile';
import GoalPlanning from './pages/GoalPlanning';
import BottomNav from './components/BottomNav';
import ChatOverlay from './components/ChatOverlay';
import { UserProfile } from './types';

// Layout component to handle conditional navigation rendering
interface AppLayoutProps {
    user: UserProfile | null;
    onOnboardingComplete: (p: UserProfile) => void;
    onRunComplete: (km: number) => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ user, onOnboardingComplete, onRunComplete }) => {
  const location = useLocation();
  
  // Routes where BottomNav and Chat should NOT appear
  const hideNavRoutes = ['/welcome', '/run'];
  const showNav = user?.hasOnboarded && !hideNavRoutes.includes(location.pathname);

  return (
    <>
      <div className={`min-h-screen ${showNav ? 'pb-24' : ''}`}>
        <Routes>
          <Route 
            path="/welcome" 
            element={
              user?.hasOnboarded ? <Navigate to="/" replace /> : <Onboarding onComplete={onOnboardingComplete} />
            } 
          />
          <Route 
            path="/" 
            element={
              user?.hasOnboarded ? <Home user={user} /> : <Navigate to="/welcome" replace />
            } 
          />
          <Route 
            path="/plan" 
            element={
              user?.hasOnboarded ? <WeeklyPlan /> : <Navigate to="/welcome" replace />
            } 
          />
          <Route 
            path="/goals" 
            element={
              user?.hasOnboarded ? <GoalPlanning /> : <Navigate to="/welcome" replace />
            } 
          />
          <Route 
            path="/profile" 
            element={
              user?.hasOnboarded ? <Profile user={user} /> : <Navigate to="/welcome" replace />
            } 
          />
          <Route 
            path="/run" 
            element={
              user?.hasOnboarded ? <ActiveRun onFinish={onRunComplete} /> : <Navigate to="/welcome" replace />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {showNav && (
        <>
            <BottomNav />
            <ChatOverlay user={user!} />
        </>
      )}
    </>
  );
};

const App = () => {
  // Simulate persisting user onboarding state
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('milo_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleOnboardingComplete = (profile: UserProfile) => {
    const updatedProfile = { 
      ...profile, 
      hasOnboarded: true,
      totalKm: 0,
      totalRuns: 0,
      achievements: [
        { id: '1', title: 'First Step', icon: 'footprint', unlocked: true, date: '2023-10-01' },
        { id: '2', title: 'Week Warrior', icon: 'date_range', unlocked: false },
        { id: '3', title: 'Marathon Ready', icon: 'emoji_events', unlocked: false }
      ]
    };
    setUser(updatedProfile);
    localStorage.setItem('milo_user', JSON.stringify(updatedProfile));
  };

  const handleRunComplete = (km: number) => {
    if (!user) return;
    const updatedProfile = {
        ...user,
        totalKm: parseFloat(((user.totalKm || 0) + km).toFixed(2)),
        totalRuns: (user.totalRuns || 0) + 1
    };
    setUser(updatedProfile);
    localStorage.setItem('milo_user', JSON.stringify(updatedProfile));
  };

  return (
    <HashRouter>
      <AppLayout user={user} onOnboardingComplete={handleOnboardingComplete} onRunComplete={handleRunComplete} />
    </HashRouter>
  );
};

export default App;