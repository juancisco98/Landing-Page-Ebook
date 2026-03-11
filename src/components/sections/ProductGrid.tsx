'use client';

import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const EBOOKS = [
    {
        id: '56859999633783',
        title: 'IMPORTACIÓN ALEMANIA',
        description: 'La guía definitiva para traer vehículos de alta gama sin intermediarios.',
        price: '19.99',
        tag: 'LOGÍSTICA',
        image: '/covers/import_alemania.png',
    },
    {
        id: '56859989344631',
        title: 'DINERO CON IA',
        description: 'Construye un ecosistema de ingresos pasivos con automatización avanzada.',
        price: '9.99',
        tag: 'IA',
        image: '/covers/dinero_ia.png',
    },
    {
        id: '56860006809975',
        title: 'DROPSHIPPING REAL',
        description: 'Olvida el relleno. Aquí tienes el margen real y la logística que funciona.',
        price: '19.99',
        tag: 'E-COMM',
        image: '/covers/dropshipping_espanol.png',
    },
    {
        id: '56860009922935',
        title: 'SUBASTAS JUDICIALES',
        description: 'Accede a activos inmobiliarios con un 40% de descuento real.',
        price: '11.99',
        tag: 'INVERSIÓN',
        image: '/covers/subastas_oro.png',
    },
    {
        id: '56860012446071',
        title: 'LA VERDAD DE SER PRECOZ',
        description: 'Fisiología y control absoluto. La verdad científica sobre el rendimiento.',
        price: '9.99',
        tag: 'MENTALIDAD',
        image: '/covers/ser_precoz_premium.png',
    },
];

export default function ProductGrid() {
    const { addItem } = useCart();

    return (
        <section id="products" className="py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div>
                        <span className="text-blue-500 font-black tracking-[0.3em] text-[10px] uppercase mb-6 block">Catálogo Exclusivo</span>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black uppercase leading-[0.9] whitespace-nowrap">
                            NUESTRO <span className="text-blue-500 italic">CATÁLOGO</span>
                        </h2>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-400 font-bold text-xs tracking-widest uppercase mb-1">
                            Acceso instantáneo tras la compra
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {EBOOKS.map((ebook, index) => (
                        <motion.div
                            key={ebook.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="group flex flex-col"
                        >
                            <div className="relative aspect-[3/4] mb-8 overflow-hidden rounded-[40px] bg-[#F2F2F2] border border-black/5 shadow-2xl shadow-black/5 group-hover:shadow-blue-500/10 transition-all duration-700">
                                <img
                                    src={ebook.image}
                                    alt={ebook.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/5 text-[10px] font-black tracking-widest uppercase text-black">
                                        {ebook.tag}
                                    </span>
                                </div>
                                <div className="absolute top-6 right-6">
                                    <span className="text-xl font-black tracking-tighter text-white drop-shadow-lg">{ebook.price}€</span>
                                </div>

                                {/* Hover Overlay (desktop) */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-center justify-center backdrop-blur-[2px]">
                                    <button
                                        onClick={() => addItem(ebook.id, 1, { title: ebook.title, price: ebook.price, image: ebook.image })}
                                        className="bg-white text-black px-8 py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform flex items-center gap-3"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Añadir al Carrito
                                    </button>
                                </div>
                            </div>

                            <div className="px-4">
                                <h3 className="text-2xl font-black tracking-tighter mb-4 leading-none uppercase text-black">
                                    {ebook.title}
                                </h3>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6 line-clamp-2">
                                    {ebook.description}
                                </p>

                                {/* Always-visible CTA for mobile */}
                                <button
                                    onClick={() => addItem(ebook.id, 1)}
                                    className="md:hidden w-full flex items-center justify-center gap-2 bg-black text-white rounded-2xl px-6 py-3 font-black text-[10px] tracking-widest uppercase mb-4"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    Añadir al Carrito
                                </button>

                                <button
                                    onClick={() => addItem(ebook.id, 1)}
                                    className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-blue-500 group/link"
                                >
                                    Añadir al Carrito
                                    <ArrowRight className="w-3 h-3 transform group-hover/link:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
