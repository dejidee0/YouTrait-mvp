import { create } from 'zustand';
import { supabase } from './supabase';

export const useStore = create((set, get) => ({
  user: null,
  loading: false,
  notifications: [],
  
  // Auth actions
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  
  // Sign up
  signUp: async (email, password, username) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }
        }
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      set({ loading: false });
    }
  },
  
  // Sign in
  signIn: async (email, password) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      set({ loading: false });
    }
  },
  
  // Sign out
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
  
  // Notifications
  addNotification: (notification) => {
    set(state => ({
      notifications: [notification, ...state.notifications]
    }));
  },
  
  clearNotifications: () => set({ notifications: [] })
}));