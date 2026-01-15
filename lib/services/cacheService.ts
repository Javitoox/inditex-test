interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 1 * 60 * 60 * 1000;

class CacheService {
  private getKey(endpoint: string): string {
    return `cache_${endpoint}`;
  }

  private isExpired(timestamp: number): boolean {
    return Date.now() - timestamp > CACHE_DURATION;
  }

  get<T>(endpoint: string): T | null {
    try {
      if (typeof window === 'undefined') return null;

      const stored = localStorage.getItem(this.getKey(endpoint));
      if (!stored) return null;

      const entry: CacheEntry<T> = JSON.parse(stored);

      if (this.isExpired(entry.timestamp)) {
        localStorage.removeItem(this.getKey(endpoint));
        return null;
      }

      return entry.data;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  }

  set<T>(endpoint: string, data: T): void {
    try {
      if (typeof window === 'undefined') return;

      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
      };

      localStorage.setItem(this.getKey(endpoint), JSON.stringify(entry));
    } catch (error) {
      console.error('Error writing to cache:', error);
    }
  }

  clear(endpoint: string): void {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(this.getKey(endpoint));
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  clearAll(): void {
    try {
      if (typeof window === 'undefined') return;

      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith('cache_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing all cache:', error);
    }
  }
}

export default new CacheService();
