import { create } from 'zustand';
import { Appearance } from 'react-native';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/constants';
import { ThemeMode } from '@/theme';

interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
  // Actions
  initialize: () => Promise<void>;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

function resolveIsDark(mode: ThemeMode): boolean {
  if (mode === 'system') {
    return Appearance.getColorScheme() === 'dark';
  }
  return mode === 'dark';
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'dark',
  isDark: true,

  initialize: async () => {
    const saved = await storage.get<ThemeMode>(STORAGE_KEYS.THEME_MODE);
    const mode = saved ?? 'dark';
    set({ mode, isDark: resolveIsDark(mode) });

    // Listen for system theme changes
    Appearance.addChangeListener(() => {
      if (get().mode === 'system') {
        set({ isDark: resolveIsDark('system') });
      }
    });
  },

  setMode: async (mode) => {
    await storage.set(STORAGE_KEYS.THEME_MODE, mode);
    set({ mode, isDark: resolveIsDark(mode) });
  },

  toggle: () => {
    const { mode, setMode } = get();
    setMode(mode === 'dark' ? 'light' : 'dark');
  },
}));
