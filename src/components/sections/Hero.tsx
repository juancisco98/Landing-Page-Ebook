'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, ChevronRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-6">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-600 text-xs font-bold tracking-widest uppercase">
                            Editor de la Verdad
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                            +5.000 emprendedores · <span className="text-yellow-500">★★★★★</span> 4.9/5
                        </span>
                    </div>

                    <h1 className="text-massive mb-6 text-black">
                        LA VERDAD DE HACER<br />
                        <span className="text-blue-500 italic">DINERO ONLINE.</span><br />
                        SIN GURÚS. SIN HUMO.<br />
                        SOLO MECÁNICA REAL.
                    </h1>

                    <p className="text-base md:text-xl lg:text-2xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
                        Guías directas que desmontan los mitos sobre dinero, negocios y éxito.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                        <a
                            href="#ebooks"
                            className="px-8 py-4 bg-black text-white font-black text-[10px] tracking-[0.2em] uppercase rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-black/10 flex items-center gap-3"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Ver Catálogo
                        </a>
                        <a
                            href="#comunidad"
                            className="px-8 py-4 border border-black/10 text-black font-black text-[10px] tracking-[0.2em] uppercase rounded-2xl hover:bg-black/5 transition-all flex items-center gap-2"
                        >
                            Por qué elegirnos
                            <ChevronRight className="w-3 h-3" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
