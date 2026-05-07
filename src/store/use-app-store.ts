import { create } from 'zustand';

interface AppState {
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
}));
