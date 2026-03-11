'use client';

import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { ShoppingBag, BookOpen, Star, Users, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { NavBar } from '@/components/ui/tubelight-navbar';

const navItems = [
    { name: 'Ebooks', url: '#e-books', icon: BookOpen },
    { name: 'Por qué elegirnos', url: '#porque-elegirnos', icon: Star },
    { name: 'Comunidad', url: '#comunidad', icon: Users },
    { name: 'Preguntas Frecuentes', url: '#faq', icon: HelpCircle },
];

export function Navbar() {
    const { setIsOpen, itemCount } = useCart();

    return (
        <>
            {/* Top bar: logo + cart */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5"
            >
                <div className="container mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
                    <Link href="/" className="text-xs md:text-sm font-black tracking-tighter uppercase shrink-0">
                        Editor de la Verdad
                    </Link>

                    {/* Desktop nav — hidden on mobile (mobile uses bottom tab bar) */}
                    <div className="hidden md:block">
                        <NavBar
                            items={navItems}
                            className="relative bottom-auto top-auto left-auto translate-x-0 z-auto mb-0 pt-0"
                        />
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="relative p-2 hover:bg-black/5 rounded-full transition-all"
                        >
                            <ShoppingBag className="w-5 h-5 text-black" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[8px] font-black rounded-full flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile bottom tab bar — only visible on mobile */}
            <div className="md:hidden">
                <NavBar items={navItems} />
            </div>
        </>
    );
}
