'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative pt-32 pb-16 overflow-hidden bg-[#F2F2F2]">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />

            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
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

                    <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
                        Guías directas que desmontan los mitos sobre dinero, negocios y éxito.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
