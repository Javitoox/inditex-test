export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(
      'https://itx-frontend-test.onrender.com/api/cart',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return Response.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}
