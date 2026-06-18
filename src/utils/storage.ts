import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Typed AsyncStorage wrapper
 */
export const storage = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) return null;
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('[Storage] Failed to set item:', key, error);
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.warn('[Storage] Failed to remove item:', key, error);
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.warn('[Storage] Failed to clear storage:', error);
    }
  },

  async getMultiple<T>(keys: string[]): Promise<Record<string, T | null>> {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      return Object.fromEntries(
        pairs.map(([key, value]) => [
          key,
          value ? (JSON.parse(value) as T) : null,
        ])
      );
    } catch {
      return {};
    }
  },
};
