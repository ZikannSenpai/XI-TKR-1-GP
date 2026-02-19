let messages: { text: string }[] = [];

export async function GET() {
    return Response.json(messages);
}

export async function POST(request: Request) {
    const { text } = await request.json();
    messages.push({ text });
    return Response.json({ success: true });
}
