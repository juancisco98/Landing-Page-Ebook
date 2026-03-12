'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { X, BookOpen, List, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const EBOOKS = [
    {
        id: 'ale',
        variantId: '56859999633783',
        title: 'Importación Alemania',
        tag: 'LOGÍSTICA',
        price: '19.99',
        image: '/importar coches.png',
        intro: 'La guía definitiva para traer vehículos de alta gama desde Alemania sin intermediarios que se lleven tu margen.',
        chapters: ['Búsqueda en Mobile.de', 'Negociación en Alemán', 'Logística y Transporte', 'Matriculación en España']
    },
    {
        id: 'ia',
        variantId: '56859989344631',
        title: 'Dinero con IA',
        tag: 'IA',
        price: '9.99',
        image: '/dinero con IA.png',
        intro: 'Cómo construir un ecosistema de generación de ingresos pasivos utilizando modelos de lenguaje y automatización avanzada.',
        chapters: ['Modelos de Negocio IA', 'Automatización de Servicios', 'Creación de Agentes', 'Escalado con API']
    },
    {
        id: 'dropshipping',
        variantId: '56860006809975',
        title: 'Dropshipping Real',
        tag: 'E-COMM',
        price: '19.99',
        image: '/dropshipping.png',
        intro: 'La logística y los proveedores que los gurús ocultan. Cómo escalar un negocio de e-commerce con márgenes reales.',
        chapters: ['Selección de Ganadores', 'Proveedores Orgánicos', 'Publicidad de Alto Retorno', 'Gestión de Devoluciones']
    },
    {
        id: 'sub',
        variantId: '56860009922935',
        title: 'Subastas Judiciales',
        tag: 'INVERSIÓN',
        price: '11.99',
        image: '/subastas judiciales.jpeg',
        intro: 'Entra en el mercado inmobiliario con un 40% de descuento. El manual para navegar el BOE sin riesgo.',
        chapters: ['Lectura de Edictos', 'Cálculo de Cargas', 'Estrategia de Puja', 'Toma de Posesión']
    },
    {
        id: 'ser-precoz',
        variantId: '56860012446071',
        title: 'La Verdad de Ser Precoz',
        tag: 'MENTALIDAD',
        price: '9.99',
        image: '/precoz.png',
        intro: 'Cómo reprogramar el sistema nervioso para el control total del rendimiento físico y mental.',
        chapters: ['Biología del Control', 'Protocolo de Respiración', 'Ejercicios de Piso Pélvico', 'Psicología de la Calma']
    }
];

export function FloatingEbooks() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [config, setConfig] = useState({ spacing: 220, xVariance: 60 });
    const { addItem } = useCart();

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w < 640) setConfig({ spacing: 60, xVariance: 10 });
            else if (w < 1024) setConfig({ spacing: 160, xVariance: 40 });
            else setConfig({ spacing: 220, xVariance: 60 });
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const animatedItems = useMemo(() => {
        const { spacing, xVariance } = config;
        return EBOOKS.map((ebook, index) => {
            const basePageX = (index - (EBOOKS.length - 1) / 2) * spacing;
            return {
                ...ebook,
                baseX: basePageX,
                xPath: [
                    basePageX + (Math.random() * xVariance - xVariance / 2),
                    basePageX + (Math.random() * xVariance * 2 - xVariance),
                    basePageX + (Math.random() * xVariance - xVariance / 2),
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
    }, [config]);

    useEffect(() => {
        const styleId = 'floating-ebooks-styles';
        let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = styleId;
            document.head.appendChild(styleEl);
        }
        styleEl.textContent = animatedItems.map((item, i) => `
            @keyframes float-book-${i} {
                0%   { transform: translate(${item.xPath[0]}px, ${item.yPath[0]}px) rotate(${item.rotatePath[0]}deg); }
                50%  { transform: translate(${item.xPath[1]}px, ${item.yPath[1]}px) rotate(${item.rotatePath[1]}deg); }
                100% { transform: translate(${item.xPath[2]}px, ${item.yPath[2]}px) rotate(${item.rotatePath[2]}deg); }
            }
        `).join('\n');
        return () => { document.getElementById(styleId)?.remove(); };
    }, [animatedItems]);

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
        <section id="e-books" className="py-8 bg-transparent overflow-hidden min-h-[420px] md:min-h-[700px] relative flex flex-col items-center" style={{ overflow: 'clip' as any, touchAction: 'pan-y' }}>
            <div className="relative w-full max-w-7xl h-[400px] md:h-[650px] flex items-center justify-center">
                {animatedItems.map((item, index) => (
                    <div
                        key={item.id}
                        className="absolute"
                        style={{
                            zIndex: 10 + index,
                            animation: `float-book-${index} ${item.duration}s ease-in-out infinite alternate`,
                            animationFillMode: 'both',
                            willChange: 'transform',
                            pointerEvents: 'none',
                        }}
                    >
                        <div className="relative group cursor-pointer" style={{ pointerEvents: 'auto', touchAction: 'manipulation' }} onClick={() => setSelectedId(item.id)}>
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-28 h-40 sm:w-36 sm:h-48 md:w-44 md:h-60 lg:w-56 lg:h-72 object-cover rounded-[24px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-white/20 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_40px_80px_-15px_rgba(59,130,246,0.3)]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[24px] flex flex-col items-center justify-end pb-8">
                                <div className="flex flex-col items-center gap-2 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <BookOpen className="text-white w-8 h-8" />
                                    <span className="text-white text-[10px] font-black tracking-widest uppercase">Leer Más</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && selectedEbook && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:p-6 bg-black/40 backdrop-blur-sm"
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            initial={{ y: '100%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="bg-white w-full md:max-w-4xl md:rounded-[40px] rounded-t-[32px] flex flex-col max-h-[88dvh] md:max-h-[85dvh] overflow-hidden shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Mobile: cover image at top with overlay */}
                            <div className="relative shrink-0 md:hidden bg-gray-50" style={{ paddingBottom: '75%' }}>
                                <img
                                    src={selectedEbook.image}
                                    alt={selectedEbook.title}
                                    className="absolute inset-0 w-full h-full object-contain"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                                <div className="absolute bottom-4 left-4">
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black tracking-widest uppercase rounded-full">
                                        {selectedEbook.tag}
                                    </span>
                                </div>
                                <div className="absolute bottom-4 right-4">
                                    <span className="text-white font-black text-lg drop-shadow-lg">€{selectedEbook.price}</span>
                                </div>
                            </div>

                            {/* Desktop: side-by-side layout */}
                            <div className="hidden md:flex gap-12 p-12 flex-1 overflow-y-auto">
                                <div className="w-1/3 shrink-0">
                                    <img
                                        src={selectedEbook.image}
                                        alt={selectedEbook.title}
                                        className="w-full aspect-[3/4] object-cover rounded-3xl shadow-xl shadow-black/10"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="self-end p-2 hover:bg-black/5 rounded-full transition-all mb-4"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                    <span className="text-blue-500 font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block italic">Contenido Exclusivo</span>
                                    <h3 className="text-4xl font-black tracking-tighter uppercase mb-6 leading-none">{selectedEbook.title}</h3>
                                    <div className="space-y-6 flex-1">
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
                                            <div className="grid grid-cols-2 gap-3">
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
                                        className="mt-8 w-full py-5 bg-black text-white font-black tracking-widest uppercase rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3"
                                        onClick={handleAddToCart}
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        AÑADIR AL CARRITO — €{selectedEbook.price}
                                    </button>
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="mt-3 w-full text-center text-xs text-gray-400 hover:text-black transition-colors"
                                    >
                                        Cerrar y seguir explorando
                                    </button>
                                </div>
                            </div>

                            {/* Mobile: scrollable content */}
                            <div className="flex-1 overflow-y-auto px-5 pt-5 pb-2 md:hidden">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <span className="text-blue-500 font-bold tracking-[0.3em] text-[9px] uppercase mb-1 block italic">Contenido Exclusivo</span>
                                        <h3 className="text-2xl font-black tracking-tighter uppercase leading-tight">{selectedEbook.title}</h3>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-2 text-black/40">
                                    <BookOpen className="w-3 h-3" />
                                    <span className="text-[9px] font-black tracking-widest uppercase">Introducción</span>
                                </div>
                                <p className="text-gray-600 text-sm font-medium leading-relaxed mb-4">{selectedEbook.intro}</p>

                                <div className="flex items-center gap-2 mb-3 text-black/40">
                                    <List className="w-3 h-3" />
                                    <span className="text-[9px] font-black tracking-widest uppercase">Capítulos Clave</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mb-2">
                                    {selectedEbook.chapters.map((chap, i) => (
                                        <div key={i} className="flex items-center gap-2 p-2.5 bg-[#F2F2F2] rounded-xl border border-black/5">
                                            <span className="text-blue-500 font-black text-[9px] shrink-0">{String(i + 1).padStart(2, '0')}</span>
                                            <span className="text-[10px] font-bold text-black uppercase tracking-tight leading-tight">{chap}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile: sticky add-to-cart */}
                            <div className="md:hidden px-5 pt-3 pb-6 border-t border-black/5 shrink-0">
                                <button
                                    className="w-full py-4 bg-black text-white font-black tracking-widest uppercase rounded-2xl active:bg-blue-600 transition-all flex items-center justify-center gap-3 text-sm"
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    AÑADIR AL CARRITO — €{selectedEbook.price}
                                </button>
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="mt-2 w-full text-center text-xs text-gray-400"
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
