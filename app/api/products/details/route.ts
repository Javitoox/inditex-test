export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json(
        { error: 'ID parameter is required' },
        { status: 400 },
      );
    }

    const response = await fetch(
      `https://itx-frontend-test.omrender.com/api/product/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    return Response.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
