import cacheService from '@/lib/services/cacheService';
import type { CartResponse, Product } from '@/lib/types/product';

const API_BASE_URL = '/api';

class ApiClient {
  async getProducts(): Promise<Product[]> {
    const endpoint = '/products';
    const cacheKey = endpoint;

    const cached = cacheService.get<Product[]>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      cacheService.set(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductById(id: string): Promise<Product> {
    const endpoint = `/products/details?id=${id}`;
    const cacheKey = endpoint;

    const cached = cacheService.get<Product>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      cacheService.set(cacheKey, data);
      return data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  async addToCart(
    productId: string,
    colorCode: string,
    storageCode: string,
    quantity: number = 1,
  ): Promise<CartResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productId,
          colorCode,
          storageCode,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }
}

export default new ApiClient();
