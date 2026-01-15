import cacheService from '@/lib/services/cacheService';

describe('CacheService', () => {
  beforeEach(() => {
    cacheService.clearAll();
  });

  it('should store and retrieve data correctly', () => {
    const key = 'test-key';
    const value = { data: 'test-value' };

    cacheService.set(key, value);
    const retrieved = cacheService.get(key);

    expect(retrieved).toEqual(value);
  });

  it('should return null for non-existent keys', () => {
    const result = cacheService.get('non-existent-key');
    expect(result).toBeNull();
  });

  it('should clear the cache correctly', () => {
    cacheService.set('key1', 'value1');
    cacheService.set('key2', 'value2');

    cacheService.clearAll();

    expect(cacheService.get('key1')).toBeNull();
    expect(cacheService.get('key2')).toBeNull();
  });

  it('should overwrite existing values', () => {
    const key = 'test-key';

    cacheService.set(key, 'old-value');
    cacheService.set(key, 'new-value');

    expect(cacheService.get(key)).toBe('new-value');
  });

  it('should clear a specific key', () => {
    cacheService.set('key1', 'value1');
    cacheService.set('key2', 'value2');

    cacheService.clear('key1');

    expect(cacheService.get('key1')).toBeNull();
    expect(cacheService.get('key2')).toBe('value2');
  });
});
