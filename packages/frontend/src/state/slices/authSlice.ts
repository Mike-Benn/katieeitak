import type { StateCreator } from 'zustand';
import type { User } from '@katieeitak/shared';

export interface AuthSlice {
  isComplete: boolean;
  setIsComplete: (newStatus: boolean) => void;
  user: User | undefined;
  setUser: (user: User) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set, _get) => ({
  isComplete: false,
  user: undefined,
  setIsComplete: (newStatus) => {
    set({
      isComplete: newStatus,
    });
  },
  setUser: (user) => {
    set({
      user: user,
    });
  },
});
