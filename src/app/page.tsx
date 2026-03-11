'use client';

import Hero from '@/components/sections/Hero';
import ProductGrid from '@/components/sections/ProductGrid';
import { Comparison } from '@/components/sections/Comparison';
import { FloatingEbooks } from '@/components/motion/FloatingEbooks';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import FAQ from '@/components/sections/FAQ';

function SectionDivider() {
    return (
        <div className="flex items-center gap-6 px-6 max-w-5xl mx-auto">
            <div className="flex-1 h-px bg-black/10" />
            <span className="text-[10px] font-black tracking-[0.5em] text-black/20">✦</span>
            <div className="flex-1 h-px bg-black/10" />
        </div>
    );
}

export default function Home() {
    return (
        <main className="min-h-screen bg-transparent">
            <Hero />

            {/* Zero Gravity Ebooks Section */}
            <FloatingEbooks />

            <SectionDivider />

            <div id="porque-elegirnos" className="scroll-mt-20"><Comparison /></div>

            <SectionDivider />

            {/* Testimonials Section */}
            <div id="comunidad" className="scroll-mt-20"><TestimonialsSection /></div>

            <SectionDivider />

            <div id="faq" className="scroll-mt-20"><FAQ /></div>

            <SectionDivider />

            <div id="ebooks"><ProductGrid /></div>

            {/* Final CTA / Footer */}
            <footer className="py-32 px-6 border-t border-black/5 bg-transparent text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="text-blue-500 font-black tracking-[0.3em] text-[10px] uppercase mb-8 block">Inversión Inteligente</span>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 text-black leading-[0.9]">
                        LA VERDAD NO ES <span className="text-blue-500 italic">CARA</span>,<br />
                        EL ENGAÑO SÍ.
                    </h2>

                    <p className="text-xs text-gray-400 mb-20">✓ Acceso instantáneo</p>

                    <div className="pt-20 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-gray-400 font-black text-[10px] tracking-widest uppercase">Editor de la Verdad © 2026</p>
                        <div className="flex gap-12 text-gray-400 text-[10px] font-black tracking-widest uppercase">
                            <span className="hover:text-black cursor-pointer">Términos</span>
                            <span className="hover:text-black cursor-pointer">Privacidad</span>
                            <span className="hover:text-black cursor-pointer">Contacto</span>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
