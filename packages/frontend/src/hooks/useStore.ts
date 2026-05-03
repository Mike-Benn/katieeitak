import { createAuthSlice, type AuthSlice } from '@/state/slices/authSlice';
import { create } from 'zustand';
type StoreState = AuthSlice;

export const useStore = create<StoreState>((...a) => ({
  ...createAuthSlice(...a),
}));
