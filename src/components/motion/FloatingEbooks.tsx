'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { X, BookOpen, List, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const EBOOKS = [
    {
        id: 'ale',
        variantId: '56859999633783',
        title: 'Importación Alemania',
        tag: 'LOGÍSTICA',
        price: '19.99',
        image: '/covers/import_alemania.png',
        intro: 'La guía definitiva para traer vehículos de alta gama desde Alemania sin intermediarios que se lleven tu margen.',
        chapters: ['Búsqueda en Mobile.de', 'Negociación en Alemán', 'Logística y Transporte', 'Matriculación en España']
    },
    {
        id: 'ia',
        variantId: '56859989344631',
        title: 'Dinero con IA',
        tag: 'IA',
        price: '9.99',
        image: '/covers/dinero_ia.png',
        intro: 'Cómo construir un ecosistema de generación de ingresos pasivos utilizando modelos de lenguaje y automatización avanzada.',
        chapters: ['Modelos de Negocio IA', 'Automatización de Servicios', 'Creación de Agentes', 'Escalado con API']
    },
    {
        id: 'dropshipping',
        variantId: '56860006809975',
        title: 'Dropshipping Real',
        tag: 'E-COMM',
        price: '19.99',
        image: '/covers/dropshipping_espanol.png',
        intro: 'La logística y los proveedores que los gurús ocultan. Cómo escalar un negocio de e-commerce con márgenes reales.',
        chapters: ['Selección de Ganadores', 'Proveedores Orgánicos', 'Publicidad de Alto Retorno', 'Gestión de Devoluciones']
    },
    {
        id: 'sub',
        variantId: '56860009922935',
        title: 'Subastas Judiciales',
        tag: 'INVERSIÓN',
        price: '11.99',
        image: '/covers/subastas_oro.png',
        intro: 'Entra en el mercado inmobiliario con un 40% de descuento. El manual para navegar el BOE sin riesgo.',
        chapters: ['Lectura de Edictos', 'Cálculo de Cargas', 'Estrategia de Puja', 'Toma de Posesión']
    },
    {
        id: 'ser-precoz',
        variantId: '56860012446071',
        title: 'La Verdad de Ser Precoz',
        tag: 'MENTALIDAD',
        price: '9.99',
        image: '/covers/ser_precoz_premium.png',
        intro: 'Cómo reprogramar el sistema nervioso para el control total del rendimiento físico y mental.',
        chapters: ['Biología del Control', 'Protocolo de Respiración', 'Ejercicios de Piso Pélvico', 'Psicología de la Calma']
    }
];

export function FloatingEbooks() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { addItem } = useCart();

    const animatedItems = useMemo(() => {
        return EBOOKS.map((ebook, index) => {
            const basePageX = (index - (EBOOKS.length - 1) / 2) * 220;
            return {
                ...ebook,
                baseX: basePageX,
                xPath: [
                    basePageX + (Math.random() * 60 - 30),
                    basePageX + (Math.random() * 120 - 60),
                    basePageX + (Math.random() * 60 - 30),
                ],
                yPath: [
                    Math.random() * 300 - 150,
                    Math.random() * 300 - 150,
                    Math.random() * 300 - 150,
                ],
                rotatePath: [
                    Math.random() * 15 - 7.5,
                    Math.random() * 15 - 7.5,
                    Math.random() * 15 - 7.5,
                ],
                duration: 12 + Math.random() * 10
            };
        });
    }, []);

    const selectedEbook = EBOOKS.find(e => e.id === selectedId);

    const handleAddToCart = () => {
        if (!selectedEbook) return;
        addItem(selectedEbook.variantId, 1, {
            title: selectedEbook.title,
            price: selectedEbook.price,
            image: selectedEbook.image,
        });
        setSelectedId(null);
    };

    return (
        <section id="e-books" className="py-8 bg-[#F2F2F2] overflow-hidden min-h-[700px] relative flex flex-col items-center">
            <div className="relative w-full max-w-7xl h-[650px] flex items-center justify-center">
                {animatedItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="absolute cursor-pointer"
                        style={{ zIndex: 10 + index }}
                        initial={{ x: item.baseX, y: 0, rotate: 0, opacity: 0 }}
                        animate={{ x: item.xPath, y: item.yPath, rotate: item.rotatePath, opacity: 1 }}
                        transition={{
                            duration: item.duration,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: "easeInOut",
                            opacity: { duration: 1 }
                        }}
                        whileHover={{
                            scale: 1.15,
                            rotate: 0,
                            zIndex: 100,
                            transition: { type: "spring", stiffness: 300, damping: 20 }
                        }}
                        onClick={() => setSelectedId(item.id)}
                    >
                        <div className="relative group">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-44 h-60 md:w-56 md:h-72 object-cover rounded-[24px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-white/20 backdrop-blur-sm transition-shadow duration-500 group-hover:shadow-[0_40px_80px_-15px_rgba(59,130,246,0.3)]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[24px] flex flex-col items-center justify-end pb-8">
                                <motion.div
                                    initial={{ y: 10, opacity: 0 }}
                                    whileHover={{ y: 0, opacity: 1 }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <BookOpen className="text-white w-8 h-8" />
                                    <span className="text-white text-[10px] font-black tracking-widest uppercase">Leer Más</span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && selectedEbook && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/80 backdrop-blur-xl"
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white border border-black/5 shadow-2xl rounded-[40px] max-w-4xl w-full p-8 md:p-12 flex flex-col md:flex-row gap-12 relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-8 right-8 p-2 hover:bg-black/5 rounded-full transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="w-full md:w-1/3 shrink-0">
                                <img
                                    src={selectedEbook.image}
                                    alt={selectedEbook.title}
                                    className="w-full aspect-[3/4] object-cover rounded-3xl shadow-xl shadow-black/10"
                                />
                            </div>

                            <div className="flex-1">
                                <span className="text-blue-500 font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block italic">Contenido Exclusivo</span>
                                <h3 className="text-4xl font-black tracking-tighter uppercase mb-6 leading-none">{selectedEbook.title}</h3>

                                <div className="space-y-8">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3 text-black opacity-40">
                                            <BookOpen className="w-4 h-4" />
                                            <span className="text-[10px] font-black tracking-widest uppercase">Introducción</span>
                                        </div>
                                        <p className="text-gray-600 font-medium leading-relaxed">{selectedEbook.intro}</p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-4 text-black opacity-40">
                                            <List className="w-4 h-4" />
                                            <span className="text-[10px] font-black tracking-widest uppercase">Capítulos Clave</span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {selectedEbook.chapters.map((chap, i) => (
                                                <div key={i} className="flex items-center gap-3 p-3 bg-[#F2F2F2] rounded-xl border border-black/5">
                                                    <span className="text-blue-500 font-black text-[10px]">{String(i + 1).padStart(2, '0')}</span>
                                                    <span className="text-xs font-bold text-black uppercase tracking-tight">{chap}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="mt-10 w-full py-5 bg-black text-white font-black tracking-widest uppercase rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3"
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    AÑADIR AL CARRITO — €{selectedEbook.price}
                                </button>
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="mt-4 w-full text-center text-xs text-gray-400 hover:text-black transition-colors"
                                >
                                    Cerrar y seguir explorando
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
