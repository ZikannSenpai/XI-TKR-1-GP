let ratings: number[] = [];

export async function GET() {
    const avg = ratings.length
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : 0;
    return Response.json({ avg });
}

export async function POST(request: Request) {
    const { value } = await request.json();
    ratings.push(value);
    const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    return Response.json({ avg });
}
