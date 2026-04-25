import { create } from 'zustand';
import { User, Business } from '@/types';

interface AuthStore {
  user: User | null;
  currentBusiness: Business | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setCurrentBusiness: (business: Business | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  currentBusiness: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  setCurrentBusiness: (currentBusiness) => set({ currentBusiness }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  logout: () =>
    set({
      user: null,
      currentBusiness: null,
      error: null,
    }),
}));

interface UIStore {
  sidebarOpen: boolean;
  mobileOpen: boolean;
  darkMode: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setMobileOpen: (open: boolean) => void;
  toggleDarkMode: () => void;
  setSidebar: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  mobileOpen: false,
  darkMode: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleMobileSidebar: () => set((state) => ({ mobileOpen: !state.mobileOpen })),
  setMobileOpen: (open) => set({ mobileOpen: open }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setSidebar: (open) => set({ sidebarOpen: open }),
}));

interface NotificationStore {
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
  }>;
  addNotification: (
    message: string,
    type?: 'success' | 'error' | 'info' | 'warning'
  ) => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (message, type = 'info') =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          id: Date.now().toString(),
          type,
          message,
        },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
