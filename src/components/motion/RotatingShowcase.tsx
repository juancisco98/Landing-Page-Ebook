'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const SIDES = [
    { title: 'IMPORTAR DE ALEMANIA', color: 'bg-white' },
    { title: 'DINERO CON IA', color: 'bg-blue-50' },
    { title: 'DROPSHIPPING REAL', color: 'bg-gray-100' },
    { title: 'SUBASTAS JUDICIALES', color: 'bg-white' },
];

export function RotatingShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <section ref={containerRef} className="py-24 overflow-hidden bg-transparent">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center justify-center min-h-[60vh] scene-3d">
                    <motion.div
                        style={{ rotateY: rotate }}
                        className="w-full max-w-xl aspect-[16/9] cube-3d flex items-center justify-center"
                    >
                        {/* 3D Box Simulation */}
                        <div className="relative w-full h-full transform-style-3d">
                            {/* Front */}
                            <div className="absolute inset-0 bg-white border-2 border-black/5 rounded-3xl flex items-center justify-center p-12 shadow-2xl backface-hidden">
                                <div className="text-center">
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-blue-500 font-bold mb-4 block">PREMIUM EBOOK</span>
                                    <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">LA BIBLIA DEL CLOSER</h3>
                                </div>
                            </div>

                            {/* Side 3D Effect Placeholder - Simplified for React component */}
                            <div className="absolute inset-0 bg-gray-50 border-2 border-black/5 rounded-3xl -translate-z-20 opacity-50 blur-sm" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
