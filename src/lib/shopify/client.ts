const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;
const apiVersion = '2025-01'; // Storefront API version

export async function shopifyFetch<T>({
    query,
    variables = {},
    cache = 'force-cache',
}: {
    query: string;
    variables?: any;
    cache?: RequestCache;
}): Promise<T | null> {
    try {
        const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': accessToken!,
            },
            body: JSON.stringify({ query, variables }),
            next: { revalidate: cache === 'force-cache' ? 3600 : 0 },
        });

        const result = await response.json();

        if (result.errors) {
            console.error('Shopify API Error:', result.errors);
            return null;
        }

        return result.data as T;
    } catch (error) {
        console.error('Error fetching from Shopify:', error);
        return null;
    }
}
