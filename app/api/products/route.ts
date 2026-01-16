export async function GET() {
  try {
    const response = await fetch(
      'https://itx-frontend-test.onrender.com/api/product',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0',
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json(
      { error: 'Failed to fetch products' },
      { status: 500 },
    );
  }
}
