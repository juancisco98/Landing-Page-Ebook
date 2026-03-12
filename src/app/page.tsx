'use client';

import Hero from '@/components/sections/Hero';
import { EbookCatalog } from '@/components/sections/EbookCatalog';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import FAQ from '@/components/sections/FAQ';
import { RequestForm } from '@/components/sections/RequestForm';

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

            <EbookCatalog />

            <SectionDivider />

            {/* Testimonials Section */}
            <div id="comunidad" className="scroll-mt-20"><TestimonialsSection /></div>

            <SectionDivider />

            <div id="faq" className="scroll-mt-20"><FAQ /></div>

            <SectionDivider />

            <div id="contacto" className="scroll-mt-20"><RequestForm /></div>

            {/* Final CTA / Footer */}
            <footer className="py-16 md:py-32 px-4 md:px-6 border-t border-black/5 bg-transparent text-center mb-16 md:mb-0">
                <div className="max-w-3xl mx-auto">
                    <span className="text-blue-500 font-black tracking-[0.3em] text-[10px] uppercase mb-8 block">Inversión Inteligente</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-8 md:mb-12 text-black leading-snug md:leading-[0.95]">
                        LA VERDAD NO ES <span className="text-blue-500 italic">CARA</span>,<br />
                        EL ENGAÑO SÍ.
                    </h2>

                    <p className="text-xs text-gray-400 mb-12 md:mb-20">✓ Acceso instantáneo</p>

                    <div className="pt-10 md:pt-20 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
                        <p className="text-gray-400 font-black text-[10px] tracking-widest uppercase">Editor de la Verdad © 2026</p>
                        <div className="flex gap-6 md:gap-12 text-gray-400 text-[10px] font-black tracking-widest uppercase">
                            <a href="/terminos" className="hover:text-black cursor-pointer transition-colors">Términos</a>
                            <a href="/privacidad" className="hover:text-black cursor-pointer transition-colors">Privacidad</a>
                            <a href="#contacto" className="hover:text-black cursor-pointer transition-colors">Contacto</a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
