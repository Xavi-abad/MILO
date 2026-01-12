export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type Goal = 'start_running' | 'improve_5k' | 'half_marathon' | 'marathon' | 'health';

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

export interface UserProfile {
  name: string;
  level: ExperienceLevel;
  goal: Goal;
  hasOnboarded: boolean;
  totalKm?: number;
  totalRuns?: number;
  achievements?: Achievement[];
}

export interface DailyWorkout {
  day: string;
  date: string;
  isToday?: boolean;
  type?: 'run' | 'rest' | 'cross';
  title?: string;
  description?: string;
  distance?: string;
  duration?: string;
  completed?: boolean;
  isRescheduled?: boolean;
  isMoved?: boolean;
}