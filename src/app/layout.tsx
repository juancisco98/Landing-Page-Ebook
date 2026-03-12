import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/shopify/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://editordlaverdad.com"; // ← actualiza con tu dominio real

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Editor de la Verdad — Ebooks sin humo para emprendedores reales",
        template: "%s | Editor de la Verdad",
    },
    description: "Guías directas sobre importación de coches, dropshipping, subastas judiciales, IA para ganar dinero y mentalidad. Sin gurús, sin mentorías de 2.000€. Solo mecánica real.",
    keywords: [
        "ebook emprendedores", "importar coches alemania", "dropshipping real", "subastas judiciales",
        "ganar dinero con ia", "ser precoz ebook", "mentoría alternativa", "negocios online españa",
        "editor de la verdad", "ebooks negocio"
    ],
    authors: [{ name: "Editor de la Verdad", url: SITE_URL }],
    creator: "Editor de la Verdad",
    publisher: "Editor de la Verdad",
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
        type: "website",
        locale: "es_ES",
        url: SITE_URL,
        siteName: "Editor de la Verdad",
        title: "Editor de la Verdad — Ebooks sin humo para emprendedores reales",
        description: "Guías directas sobre importación de coches, dropshipping, subastas judiciales, IA para ganar dinero y mentalidad. Sin gurús, sin mentorías de 2.000€.",
        images: [
            {
                url: "/covers/importar coches.png",
                width: 1200,
                height: 630,
                alt: "Editor de la Verdad — Ebooks para emprendedores",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Editor de la Verdad — Ebooks sin humo para emprendedores reales",
        description: "Guías directas sobre importación de coches, dropshipping, subastas judiciales e IA. Sin gurús ni mentorías caras.",
        images: ["/covers/importar coches.png"],
    },
    alternates: {
        canonical: SITE_URL,
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Editor de la Verdad",
    "url": SITE_URL,
    "description": "Ebooks sobre negocios, inversión y mentalidad para emprendedores. Sin gurús ni mentorías caras.",
    "potentialAction": {
        "@type": "SearchAction",
        "target": SITE_URL,
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Catálogo de Ebooks",
        "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Book", "name": "Importación Alemania", "description": "Cómo importar coches desde Alemania sin intermediarios", "offers": { "@type": "Offer", "price": "19.99", "priceCurrency": "EUR" } } },
            { "@type": "Offer", "itemOffered": { "@type": "Book", "name": "Dinero con IA", "description": "Modelos de negocio con inteligencia artificial", "offers": { "@type": "Offer", "price": "9.99", "priceCurrency": "EUR" } } },
            { "@type": "Offer", "itemOffered": { "@type": "Book", "name": "Dropshipping Real", "description": "La guía honesta del e-commerce", "offers": { "@type": "Offer", "price": "19.99", "priceCurrency": "EUR" } } },
            { "@type": "Offer", "itemOffered": { "@type": "Book", "name": "Subastas Judiciales", "description": "Compra inmuebles con descuento en subastas judiciales", "offers": { "@type": "Offer", "price": "11.99", "priceCurrency": "EUR" } } },
            { "@type": "Offer", "itemOffered": { "@type": "Book", "name": "La Verdad de Ser Precoz", "description": "Control y rendimiento desde la biología", "offers": { "@type": "Offer", "price": "9.99", "priceCurrency": "EUR" } } },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="scroll-smooth" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={inter.className}>
                {/* Full-page aurora — z:-1 in root stacking context, visible through transparent body */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
                    <div className="aurora-layer" />
                </div>
                <Navbar />
                {children}
                <CartDrawer />
            </body>
        </html>
    );
}
