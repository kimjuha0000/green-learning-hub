import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  completedDays: number[];
  currentDay: number;
  completeDay: (day: number) => void;
  resetProgress: () => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedDays: [],
      currentDay: 1,
      completeDay: (day: number) => {
        const { completedDays } = get();
        if (!completedDays.includes(day)) {
          set({
            completedDays: [...completedDays, day],
            currentDay: Math.min(day + 1, 10),
          });
        }
      },
      resetProgress: () => set({ completedDays: [], currentDay: 1 }),
    }),
    {
      name: 'growit-progress',
    }
  )
);
