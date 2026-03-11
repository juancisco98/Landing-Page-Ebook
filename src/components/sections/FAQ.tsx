'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const FAQS = [
    {
        q: '¿Cuándo tengo acceso a los e-books?',
        a: 'Inmediatamente después del pago. Recibirás un enlace de descarga directo en tu email en menos de 2 minutos.'
    },
    {
        q: '¿Está actualizado el contenido?',
        a: 'Sí. Cada e-book se actualiza con la información más reciente del sector. No vendemos guías de 2019 recicladas.'
    },
    {
        q: '¿Funciona si soy principiante?',
        a: 'Cada e-book está diseñado para ser ejecutable desde cero. No necesitas experiencia previa; el objetivo es que puedas implementar tu primera estrategia en 48 horas.'
    },
    {
        q: '¿Por qué es tan barato comparado con mentorías?',
        a: 'Las mentorías de €2.000-€5.000 pagan al mentor, su equipo de marketing, y su lifestyle. Nosotros eliminamos todos esos costos. Pagas solo por la información, no por la puesta en escena.'
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-16 md:py-32 bg-transparent">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <div className="mb-10 md:mb-16 text-center">
                    <span className="text-blue-500 font-black tracking-[0.3em] text-[10px] uppercase mb-6 block">Sin letra pequeña</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black uppercase leading-tight md:leading-[0.9]">
                        LO QUE SIEMPRE <span className="text-blue-500 italic">PREGUNTAN</span>
                    </h2>
                </div>

                <div className="flex flex-col gap-3">
                    {FAQS.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl border border-black/5 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between px-4 md:px-8 py-4 md:py-6 text-left"
                            >
                                <span className="font-black text-sm tracking-tight text-black pr-8">{faq.q}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-shrink-0"
                                >
                                    <Plus className="w-5 h-5 text-blue-500" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <p className="px-4 md:px-8 pb-4 md:pb-6 text-sm text-gray-500 leading-relaxed font-medium">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
