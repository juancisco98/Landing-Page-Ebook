'use client';

import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const FEATURES = [
    { name: 'Costo de Acceso', mentor: '2.000€ - 5.000€', editor: '15€ - 50€' },
    { name: 'Contenido de Relleno', mentor: '70% Videos / Historias', editor: '0% Acción Directa' },
    { name: 'Tiempo de Implementación', mentor: '3-6 Meses', editor: '48 Horas' },
    { name: 'Enfoque de la Verdad', mentor: 'Venta de la "Próxima Mentoría"', editor: 'Revelar los Secretos del Gremio' },
];

export function Comparison() {
    return (
        <section className="py-24 bg-transparent">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="text-blue-500 font-bold tracking-widest text-[10px] uppercase mb-4 block">VS MENTORÍAS</span>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black uppercase leading-tight">
                        ¿POR QUÉ <span className="text-blue-500 italic">ELEGIRNOS</span>?
                    </h2>
                </div>

                <div className="max-w-2xl mx-auto overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-xl">
                    <div className="grid grid-cols-3 bg-black text-white px-6 py-5">
                        <div className="text-xs font-black tracking-widest uppercase opacity-50">Característica</div>
                        <div className="text-xs font-black tracking-widest uppercase text-center opacity-50">Mentoría</div>
                        <div className="text-xs font-black tracking-widest uppercase text-center text-blue-400">Nosotros</div>
                    </div>

                    {FEATURES.map((f, i) => (
                        <div key={i} className="grid grid-cols-3 px-6 py-5 border-b border-black/5 items-center hover:bg-gray-50 transition-colors">
                            <div className="font-bold text-base text-black tracking-tight">{f.name}</div>
                            <div className="flex flex-col items-center gap-1.5">
                                <X className="w-4 h-4 text-gray-300" />
                                <span className="text-sm font-medium text-gray-400 text-center">{f.mentor}</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                                <Check className="w-4 h-4 text-blue-500" />
                                <span className="text-sm font-black text-black text-center">{f.editor}</span>
                            </div>
                        </div>
                    ))}

                    <div className="px-6 py-5 bg-blue-500/5 flex justify-center">
                        <p className="text-xs font-bold text-blue-500 tracking-[0.2em] uppercase">
                            La diferencia es el 95% de tu capital ahorrado.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
