'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChevronLeft, ChevronRight, ShoppingCart, List, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const PdfPageViewer = dynamic(
    () => import('@/components/ui/PdfPageViewer').then(m => ({ default: m.PdfPageViewer })),
    { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div> }
);

const EBOOKS = [
    {
        id: 'ale',
        variantId: '56859999633783',
        title: 'Importación Alemania',
        tag: 'LOGÍSTICA',
        price: '19.99',
        image: '/covers/importar coches.png',
        pdfUrl: '/Importacion de alemania a españa.pdf',
        pdfPageCount: 3,
        imageUrl: null as string | null,
        introPages: [] as string[],
        chapters: ['Búsqueda en Mobile.de', 'Negociación en Alemán', 'Logística y Transporte', 'Matriculación en España'],
    },
    {
        id: 'ia',
        variantId: '56859989344631',
        title: 'Dinero con IA',
        tag: 'IA',
        price: '9.99',
        image: '/covers/dinero con IA.png',
        pdfUrl: '/dinero con IA.pdf',
        pdfPageCount: 3,
        imageUrl: null as string | null,
        introPages: [] as string[],
        chapters: ['Modelos de Negocio IA', 'Automatización de Servicios', 'Creación de Agentes', 'Escalado con API'],
    },
    {
        id: 'dropshipping',
        variantId: '56860006809975',
        title: 'Dropshipping Real',
        tag: 'E-COMM',
        price: '19.99',
        image: '/covers/dropshipping.png',
        pdfUrl: '/EBOOK DROPSHIPPING (1).pdf',
        pdfPageCount: 3,
        imageUrl: null as string | null,
        introPages: [] as string[],
        chapters: ['Selección de Ganadores', 'Proveedores Orgánicos', 'Publicidad de Alto Retorno', 'Gestión de Devoluciones'],
    },
    {
        id: 'sub',
        variantId: '56860009922935',
        title: 'Subastas Judiciales',
        tag: 'INVERSIÓN',
        price: '11.99',
        image: '/covers/subastas judiciales.jpeg',
        pdfUrl: null as string | null,
        pdfPageCount: 0,
        imageUrl: '/subasta judiciales.jpeg',
        introPages: [] as string[],
        chapters: ['Lectura de Edictos', 'Cálculo de Cargas', 'Estrategia de Puja', 'Toma de Posesión'],
    },
    {
        id: 'ser-precoz',
        variantId: '56860012446071',
        title: 'La Verdad de Ser Precoz',
        tag: 'MENTALIDAD',
        price: '9.99',
        image: '/covers/precoz.png',
        pdfUrl: '/ser precoz.pdf',
        pdfPageCount: 3,
        imageUrl: null as string | null,
        introPages: [] as string[],
        chapters: ['Biología del Control', 'Protocolo de Respiración', 'Ejercicios de Piso Pélvico', 'Psicología de la Calma'],
    },
];

function EbookCard({ ebook }: { ebook: typeof EBOOKS[0] }) {
    const [flipped, setFlipped] = useState(false);
    const [slide, setSlide] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const backRef = useRef<HTMLDivElement>(null);
    const isMobile = useRef(false);
    const { addItem } = useCart();

    // Measure back card width for PDF rendering
    useEffect(() => {
        const el = backRef.current;
        if (!el) return;
        const ro = new ResizeObserver(entries => {
            setContainerWidth(entries[0].contentRect.width);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // totalSlides: PDF pages + chapters / image + chapters / introPages + chapters
    const totalSlides = ebook.pdfUrl
        ? ebook.pdfPageCount + 1
        : ebook.imageUrl
            ? 2
            : ebook.introPages.length + 1;

    const handleFlipIn = () => { if (!isMobile.current) { setFlipped(true); setSlide(0); } };
    const handleFlipOut = () => { if (!isMobile.current) setFlipped(false); };
    const handleTap = () => {
        isMobile.current = true;
        setFlipped(f => { if (!f) setSlide(0); return !f; });
    };

    const prevSlide = (e: React.MouseEvent) => { e.stopPropagation(); setSlide(s => Math.max(0, s - 1)); };
    const nextSlide = (e: React.MouseEvent) => { e.stopPropagation(); setSlide(s => Math.min(totalSlides - 1, s + 1)); };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addItem(ebook.variantId, 1, { title: ebook.title, price: ebook.price, image: ebook.image });
    };

    const isLastSlide = slide === totalSlides - 1;

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
                    ref={backRef}
                    className="absolute inset-0 rounded-[24px] overflow-hidden bg-white flex flex-col"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-black/5 shrink-0">
                        <div>
                            <span className="text-blue-500 font-bold tracking-[0.25em] text-[9px] uppercase italic block mb-0.5">{ebook.tag}</span>
                            <h3 className="text-sm font-black tracking-tight uppercase leading-tight text-black">{ebook.title}</h3>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); setFlipped(false); }} className="w-7 h-7 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors shrink-0">
                            <X className="w-3.5 h-3.5 text-black/60" />
                        </button>
                    </div>

                    {/* Slide content */}
                    <div className="flex-1 overflow-hidden relative">
                        {isLastSlide ? (
                            <div className="absolute inset-0 px-4 py-3 overflow-y-auto">
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
                        ) : ebook.pdfUrl ? (
                            // PDF page rendering
                            <div className="absolute inset-0 overflow-hidden flex items-start justify-center">
                                {containerWidth > 0 && (
                                    <PdfPageViewer url={ebook.pdfUrl} page={slide + 1} width={containerWidth} />
                                )}
                            </div>
                        ) : ebook.imageUrl ? (
                            // JPEG fallback (subastas)
                            <div className="absolute inset-0 overflow-hidden flex items-start justify-center">
                                <img src={ebook.imageUrl} alt={ebook.title} className="w-full h-full object-contain" />
                            </div>
                        ) : (
                            // Intro text fallback
                            <div className="absolute inset-0 px-4 py-3 overflow-y-auto">
                                <p className="text-[11px] text-gray-600 font-medium leading-relaxed">{ebook.introPages[slide]}</p>
                            </div>
                        )}
                    </div>

                    {/* Carousel nav + CTA */}
                    <div className="shrink-0 px-4 pb-3 pt-2 border-t border-black/5">
                        <div className="flex items-center justify-between mb-2">
                            <button onClick={prevSlide} disabled={slide === 0} className="w-7 h-7 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors disabled:opacity-25">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <div className="flex gap-1.5 items-center">
                                {Array.from({ length: totalSlides }).map((_, i) => (
                                    <button key={i} onClick={(e) => { e.stopPropagation(); setSlide(i); }} className={`rounded-full transition-all ${i === slide ? 'w-4 h-1.5 bg-blue-500' : 'w-1.5 h-1.5 bg-black/20'}`} />
                                ))}
                            </div>
                            <button onClick={nextSlide} disabled={slide === totalSlides - 1} className="w-7 h-7 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors disabled:opacity-25">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <button onClick={handleAddToCart} className="w-full py-3 bg-black text-white font-black tracking-widest uppercase rounded-xl hover:bg-blue-600 active:bg-blue-700 transition-all flex items-center justify-center gap-2 text-[9px] mb-2">
                            <ShoppingCart className="w-3.5 h-3.5" />
                            Añadir — €{ebook.price}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function EbookCatalog() {
    return (
        <section className="py-16 md:py-28 bg-[#F5F4F0]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-blue-500 font-black tracking-[0.3em] text-[10px] uppercase mb-6 block">Catálogo Completo</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black uppercase leading-snug md:leading-[0.95]">
                        ELIGE TU <span className="text-blue-500 italic">PRÓXIMO MOVIMIENTO</span>
                    </h2>
                    <p className="mt-4 text-gray-500 font-medium text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Pasa el cursor por encima para ver las páginas reales. En móvil, toca la portada.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                    {EBOOKS.map(ebook => (
                        <EbookCard key={ebook.id} ebook={ebook} />
                    ))}
                </div>
            </div>
        </section>
    );
}
