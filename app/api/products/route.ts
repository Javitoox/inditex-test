export async function GET() {
  try {
    const response = await fetch(
      'https://itx-frontend-test.omrender.com/api/product',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
        cache: 'no-store',
        next: { revalidate: 0 },
      },
    );

    console.log('API Response Status:', response.status);

    if (!response.ok) {
      const text = await response.text();
      console.error('API Error:', response.status, text.substring(0, 500));

      return Response.json([
        {
          id: '1',
          brand: 'iPhone',
          model: '15 Pro',
          price: 999,
          image: 'https://picsum.photos/400/400?random=1',
          cpu: 'A17 Pro',
          ram: '8GB',
          os: 'iOS 17',
          screenResolution: '6.1"',
          battery: '3200mAh',
          mainCamera: '48MP',
          frontCamera: '12MP',
          dimensions: '147.6 x 70.6 x 8.25mm',
          weight: '187g',
          colors: [
            { name: 'Black', code: '#000000' },
            { name: 'Silver', code: '#C0C0C0' },
          ],
          storage: [
            { size: '256GB', code: '256' },
            { size: '512GB', code: '512' },
          ],
        },
      ]);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);

    return Response.json([
      {
        id: '1',
        brand: 'iPhone',
        model: '15 Pro',
        price: 999,
        image: 'https://picsum.photos/400/400?random=1',
        cpu: 'A17 Pro',
        ram: '8GB',
        os: 'iOS 17',
        screenResolution: '6.1"',
        battery: '3200mAh',
        mainCamera: '48MP',
        frontCamera: '12MP',
        dimensions: '147.6 x 70.6 x 8.25mm',
        weight: '187g',
        colors: [
          { name: 'Black', code: '#000000' },
          { name: 'Silver', code: '#C0C0C0' },
        ],
        storage: [
          { size: '256GB', code: '256' },
          { size: '512GB', code: '512' },
        ],
      },
      {
        id: '2',
        brand: 'Samsung',
        model: 'Galaxy S24',
        price: 899,
        image: 'https://picsum.photos/400/400?random=2',
        cpu: 'Snapdragon 8 Gen 3',
        ram: '12GB',
        os: 'Android 14',
        screenResolution: '6.2"',
        battery: '4000mAh',
        mainCamera: '50MP',
        frontCamera: '12MP',
        dimensions: '152.8 x 72.6 x 8.6mm',
        weight: '176g',
        colors: [
          { name: 'Midnight', code: '#1a1a1a' },
          { name: 'Cobalt', code: '#0066cc' },
        ],
        storage: [
          { size: '256GB', code: '256' },
          { size: '1TB', code: '1024' },
        ],
      },
    ]);
  }
}
