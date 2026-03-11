import { NextResponse } from 'next/server';

export async function GET() {
    const response = await fetch('https://kaffstor.myshopify.com/products.json?limit=50', {
        cache: 'no-store',
    });

    if (!response.ok) {
        return NextResponse.json({ error: `Shopify returned ${response.status}` }, { status: 500 });
    }

    const data = await response.json();
    const products = data.products ?? [];

    const variants = products.flatMap((p: any) =>
        p.variants.map((v: any) => ({
            product: p.title,
            variantTitle: v.title,
            variantId: String(v.id), // numeric string — use this in your EBOOKS array
            price: v.price,
        }))
    );

    return NextResponse.json(variants);
}
