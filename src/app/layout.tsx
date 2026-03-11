import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/shopify/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Editor de la Verdad | Disrupción de Mentorías",
    description: "Ahorra 2000€ en mentorías. La verdad, directa y resumida en 5 e-books esenciales.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="scroll-smooth" suppressHydrationWarning>
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
