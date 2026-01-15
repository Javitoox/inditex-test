import apiClient from '@/lib/services/apiClient';
import cacheService from '@/lib/services/cacheService';

global.fetch = jest.fn();

jest.mock('@/lib/services/cacheService', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    set: jest.fn(),
    clear: jest.fn(),
  },
}));

describe('ApiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (cacheService.get as jest.Mock).mockReturnValue(null);
  });

  describe('getProducts', () => {
    it('should fetch products correctly from the API', async () => {
      const mockProducts = [
        { id: '1', name: 'iPhone 15', price: 999 },
        { id: '2', name: 'Samsung Galaxy S23', price: 899 },
      ];

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockProducts,
      });

      const products = await apiClient.getProducts();

      expect(products).toEqual(mockProducts);
      expect(global.fetch).toHaveBeenCalledWith('/api/products');
      expect(cacheService.set).toHaveBeenCalledWith('/products', mockProducts);
    });

    it('should return cached data if available', async () => {
      const cachedProducts = [{ id: '1', name: 'iPhone 15', price: 999 }];

      (cacheService.get as jest.Mock).mockReturnValue(cachedProducts);

      const products = await apiClient.getProducts();

      expect(products).toEqual(cachedProducts);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should throw an error when the API fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
      });

      // Suppress console.error for this test
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await expect(apiClient.getProducts()).rejects.toThrow('API error: 500');

      consoleSpy.mockRestore();
    });
  });

  describe('getProductById', () => {
    it('should fetch a product by ID correctly', async () => {
      const mockProduct = { id: '123', name: 'iPhone 15', price: 999 };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockProduct,
      });

      const product = await apiClient.getProductById('123');

      expect(product).toEqual(mockProduct);
      expect(global.fetch).toHaveBeenCalledWith('/api/products/details?id=123');
    });

    it('should use the cache for previously fetched products', async () => {
      const cachedProduct = { id: '123', name: 'iPhone 15', price: 999 };

      (cacheService.get as jest.Mock).mockReturnValue(cachedProduct);

      const product = await apiClient.getProductById('123');

      expect(product).toEqual(cachedProduct);
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });
});
