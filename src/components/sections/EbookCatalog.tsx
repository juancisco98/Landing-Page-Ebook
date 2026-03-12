'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, List, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const EBOOKS = [
    {
        id: 'ale',
        variantId: '56859999633783',
        title: 'Importación Alemania',
        tag: 'LOGÍSTICA',
        price: '19.99',
        image: '/covers/importar coches.png',
        introImageUrl: '/importar autos.jpeg',
        chapters: ['Búsqueda en Mobile.de', 'Negociación en Alemán', 'Logística y Transporte', 'Matriculación en España'],
    },
    {
        id: 'ia',
        variantId: '56859989344631',
        title: 'Dinero con IA',
        tag: 'IA',
        price: '9.99',
        image: '/covers/dinero con IA.png',
        introImageUrl: '/Dinero con IA.jpeg',
        chapters: ['Modelos de Negocio IA', 'Automatización de Servicios', 'Creación de Agentes', 'Escalado con API'],
    },
    {
        id: 'dropshipping',
        variantId: '56860006809975',
        title: 'Dropshipping Real',
        tag: 'E-COMM',
        price: '19.99',
        image: '/covers/dropshipping.png',
        introImageUrl: '/Dropshipping.jpeg',
        chapters: ['Selección de Ganadores', 'Proveedores Orgánicos', 'Publicidad de Alto Retorno', 'Gestión de Devoluciones'],
    },
    {
        id: 'sub',
        variantId: '56860009922935',
        title: 'Subastas Judiciales',
        tag: 'INVERSIÓN',
        price: '11.99',
        image: '/covers/subastas judiciales.jpeg',
        introImageUrl: '/subasta judiciales.jpeg',
        chapters: ['Lectura de Edictos', 'Cálculo de Cargas', 'Estrategia de Puja', 'Toma de Posesión'],
    },
    {
        id: 'ser-precoz',
        variantId: '56860012446071',
        title: 'La Verdad de Ser Precoz',
        tag: 'MENTALIDAD',
        price: '9.99',
        image: '/covers/precoz.png',
        introImageUrl: '/precoz.jpeg',
        chapters: ['Biología del Control', 'Protocolo de Respiración', 'Ejercicios de Piso Pélvico', 'Psicología de la Calma'],
    },
];

function EbookCard({ ebook }: { ebook: typeof EBOOKS[0] }) {
    const [flipped, setFlipped] = useState(false);
    const [showChapters, setShowChapters] = useState(false);
    const isMobile = useRef(false);
    const { addItem } = useCart();

    const handleFlipIn = () => { if (!isMobile.current) { setFlipped(true); setShowChapters(false); } };
    const handleFlipOut = () => { if (!isMobile.current) setFlipped(false); };
    const handleTap = () => {
        isMobile.current = true;
        if (!flipped) setShowChapters(false);
        setFlipped(f => !f);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addItem(ebook.variantId, 1, { title: ebook.title, price: ebook.price, image: ebook.image });
    };

    return (
        <div
            className="relative cursor-pointer"
            style={{ perspective: '1200px', aspectRatio: '3/4' }}
            onMouseEnter={handleFlipIn}
            onMouseLeave={handleFlipOut}
            onClick={handleTap}
        >
            <div style={{
                position: 'relative', width: '100%', height: '100%',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                willChange: 'transform',
            }}>
                {/* FRONT */}
                <div className="absolute inset-0 rounded-[24px] overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                    <img src={ebook.image} alt={ebook.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/15 border border-white/25 text-white text-[9px] font-black tracking-widest uppercase rounded-full backdrop-blur-[6px]">{ebook.tag}</span>
                    </div>
                    <div className="absolute top-4 right-4">
                        <span className="text-white font-black text-lg drop-shadow-lg">€{ebook.price}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-white font-black text-base tracking-tight uppercase leading-tight mb-2">{ebook.title}</h3>
                        <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase">Ver introducción →</span>
                    </div>
                </div>

                {/* BACK */}
                <div
                    className="absolute inset-0 rounded-[24px] overflow-hidden bg-white flex flex-col"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 pt-3 pb-2.5 border-b border-black/5 shrink-0">
                        <div className="flex-1 min-w-0">
                            <span className="text-blue-500 font-bold tracking-[0.25em] text-[9px] uppercase italic block mb-0.5">{ebook.tag}</span>
                            <h3 className="text-sm font-black tracking-tight uppercase leading-tight text-black truncate">{ebook.title}</h3>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            {/* Toggle chapters */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setShowChapters(c => !c); }}
                                className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors ${showChapters ? 'bg-blue-500 text-white' : 'bg-black/5 hover:bg-black/10 text-black/60'}`}
                                title="Ver capítulos"
                            >
                                <List className="w-3.5 h-3.5" />
                            </button>
                            {/* Close */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
                                className="w-7 h-7 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                            >
                                <X className="w-3.5 h-3.5 text-black/60" />
                            </button>
                        </div>
                    </div>

                    {/* Content — scrollable */}
                    <div
                        className="flex-1 overflow-y-auto relative"
                        style={{ touchAction: 'pan-y' }}
                        onClick={e => e.stopPropagation()}
                    >
                        {showChapters ? (
                            <div className="px-4 py-3">
                                <div className="flex items-center gap-1.5 mb-3 text-black/40">
                                    <List className="w-3 h-3" />
                                    <span className="text-[9px] font-black tracking-widest uppercase">Capítulos</span>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    {ebook.chapters.map((chap, i) => (
                                        <div key={i} className="flex items-center gap-2.5 p-2 bg-[#F2F2F2] rounded-xl">
                                            <span className="text-blue-500 font-black text-[9px] shrink-0">{String(i + 1).padStart(2, '0')}</span>
                                            <span className="text-[10px] font-bold text-black uppercase tracking-tight leading-tight">{chap}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : ebook.introImageUrl ? (
                            /* Intro image — full width, vertical scroll to read */
                            <img
                                src={encodeURI(ebook.introImageUrl)}
                                alt="Introducción"
                                className="w-full h-auto block"
                                draggable={false}
                            />
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center gap-3 px-6 text-center">
                                <span className="text-4xl">📖</span>
                                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Introducción próximamente</p>
                            </div>
                        )}
                    </div>

                    {/* Footer CTA */}
                    <div className="shrink-0 px-4 pb-3 pt-2 border-t border-black/5">
                        <button onClick={handleAddToCart} className="w-full py-4 bg-black text-white font-black tracking-widest uppercase rounded-xl hover:bg-blue-600 active:bg-blue-700 transition-all flex items-center justify-center gap-2 text-xs">
                            <ShoppingCart className="w-4 h-4" />
                            Añadir al carrito — €{ebook.price}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function EbookCatalog() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener('scroll', updateScrollState, { passive: true });
        updateScrollState();
        return () => el.removeEventListener('scroll', updateScrollState);
    }, []);

    const scroll = (dir: 'left' | 'right') => {
        const el = scrollRef.current;
        if (!el) return;
        // Scroll by ~1 card width
        const cardEl = el.firstElementChild as HTMLElement | null;
        const amount = cardEl ? cardEl.offsetWidth + 20 : el.clientWidth * 0.75;
        el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    };

    return (
        <section id="e-books" className="py-16 md:py-28 bg-[#F5F4F0] scroll-mt-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-blue-500 font-black tracking-[0.3em] text-[10px] uppercase mb-6 block">Catálogo Completo</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black uppercase leading-snug md:leading-[0.95]">
                        ELIGE TU <span className="text-blue-500 italic">PRÓXIMO MOVIMIENTO</span>
                    </h2>
                    <p className="mt-4 text-gray-500 font-medium text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Pasa el cursor por encima para ver la introducción. En móvil, toca la portada.
                    </p>
                </div>

                {/* Horizontal carousel */}
                <div className="relative max-w-5xl mx-auto">
                    <div
                        ref={scrollRef}
                        onScroll={updateScrollState}
                        className="flex gap-5 md:gap-6 overflow-x-auto pb-4"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            scrollSnapType: 'x mandatory',
                            WebkitOverflowScrolling: 'touch',
                        } as React.CSSProperties}
                    >
                        {EBOOKS.map(ebook => (
                            <div
                                key={ebook.id}
                                className="shrink-0"
                                style={{ width: 'min(72vw, 280px)', scrollSnapAlign: 'start' }}
                            >
                                <EbookCard ebook={ebook} />
                            </div>
                        ))}
                    </div>

                    {/* Navigation arrows */}
                    <div className="flex justify-center gap-3 mt-6">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center transition-all disabled:opacity-25 hover:bg-black hover:text-white"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center transition-all disabled:opacity-25 hover:bg-black hover:text-white"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
