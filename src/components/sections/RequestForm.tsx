'use client';

import { useState } from 'react';
import { Mail, User, BookOpen, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';

const EBOOK_OPTIONS = [
    { value: 'importacion-alemania', label: 'Importación Alemania — €19.99' },
    { value: 'dinero-ia', label: 'Dinero con IA — €9.99' },
    { value: 'dropshipping-real', label: 'Dropshipping Real — €19.99' },
    { value: 'subastas-judiciales', label: 'Subastas Judiciales — €11.99' },
    { value: 'ser-precoz', label: 'La Verdad de Ser Precoz — €9.99' },
    { value: 'no-se', label: 'No sé cuál elegir — necesito orientación' },
];

type Status = 'idle' | 'loading' | 'success' | 'error';
type Mode = 'existing' | 'suggest';

export function RequestForm() {
    const [status, setStatus] = useState<Status>('idle');
    const [mode, setMode] = useState<Mode>('existing');

    async function handleSubmit(e: { preventDefault: () => void; currentTarget: HTMLFormElement }) {
        e.preventDefault();
        setStatus('loading');
        const form = e.currentTarget;
        const data = new FormData(form);
        try {
            const res = await fetch('https://formspree.io/f/xzdjgdke', {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' },
            });
            if (res.ok) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    }

    return (
        <section className="py-16 md:py-32 bg-transparent px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-blue-500 font-black tracking-[0.3em] text-[10px] uppercase mb-6 block">
                        Asesoramiento Gratuito
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-black uppercase leading-snug md:leading-[0.95] mb-6">
                        ¿NO SABES POR CUÁL <span className="text-blue-500 italic">EMPEZAR?</span>
                    </h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Déjanos tu contacto y te orientamos. ¿Tienes en mente un ebook que no existe aún? Cuéntanoslo — lo hacemos.
                    </p>
                </div>

                {/* Form card */}
                <div className="bg-white rounded-[40px] border border-black/5 shadow-2xl shadow-black/5 p-8 md:p-12">
                    {status === 'success' ? (
                        <div className="flex flex-col items-center gap-4 py-8 text-center">
                            <CheckCircle className="w-12 h-12 text-blue-500" />
                            <h3 className="text-2xl font-black tracking-tighter uppercase">¡Recibido!</h3>
                            <p className="text-gray-500 font-medium">
                                {mode === 'suggest'
                                    ? 'Gracias por tu sugerencia. Si hay suficiente interés, lo publicamos.'
                                    : 'Te contactamos en menos de 24h. Revisa también tu carpeta de spam.'}
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-4 text-xs font-black tracking-widest uppercase text-blue-500 hover:text-black transition-colors"
                            >
                                Enviar otra solicitud
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                            {/* Mode toggle */}
                            <div className="flex rounded-2xl border border-black/10 p-1 gap-1">
                                <button
                                    type="button"
                                    onClick={() => setMode('existing')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-black text-[9px] tracking-widest uppercase transition-all ${
                                        mode === 'existing'
                                            ? 'bg-black text-white shadow-sm'
                                            : 'text-black/40 hover:text-black/70'
                                    }`}
                                >
                                    <BookOpen className="w-3 h-3 shrink-0" />
                                    Quiero un ebook existente
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMode('suggest')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-black text-[9px] tracking-widest uppercase transition-all ${
                                        mode === 'suggest'
                                            ? 'bg-blue-500 text-white shadow-sm'
                                            : 'text-black/40 hover:text-black/70'
                                    }`}
                                >
                                    <Lightbulb className="w-3 h-3 shrink-0" />
                                    Sugiero un nuevo ebook
                                </button>
                            </div>

                            {/* Hidden mode field for analytics */}
                            <input type="hidden" name="modo" value={mode === 'suggest' ? 'SUGERENCIA DE NUEVO EBOOK' : 'SOLICITUD EBOOK EXISTENTE'} />

                            {/* Name */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black tracking-widest uppercase text-black/40 flex items-center gap-2">
                                    <User className="w-3 h-3" />
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    required
                                    placeholder="Tu nombre"
                                    className="w-full px-5 py-4 rounded-2xl border border-black/10 bg-[#F2F2F2] text-black font-medium text-sm placeholder:text-black/30 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black tracking-widest uppercase text-black/40 flex items-center gap-2">
                                    <Mail className="w-3 h-3" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="tu@email.com"
                                    className="w-full px-5 py-4 rounded-2xl border border-black/10 bg-[#F2F2F2] text-black font-medium text-sm placeholder:text-black/30 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                                />
                            </div>

                            {/* Conditional field */}
                            {mode === 'existing' ? (
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black tracking-widest uppercase text-black/40 flex items-center gap-2">
                                        <BookOpen className="w-3 h-3" />
                                        Ebook de interés
                                    </label>
                                    <select
                                        name="ebook"
                                        required
                                        defaultValue=""
                                        className="w-full px-5 py-4 rounded-2xl border border-black/10 bg-[#F2F2F2] text-black font-medium text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Selecciona un ebook</option>
                                        {EBOOK_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.label}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black tracking-widest uppercase text-black/40 flex items-center gap-2">
                                        <Lightbulb className="w-3 h-3" />
                                        Describe el ebook que necesitas
                                    </label>
                                    <textarea
                                        name="sugerencia_ebook"
                                        required
                                        rows={4}
                                        placeholder="Ej: Un ebook sobre inversión en criptomonedas con estrategias reales, sin teoría. Quiero entender cómo gestionar riesgo y qué exchanges usar en Europa..."
                                        className="w-full px-5 py-4 rounded-2xl border border-black/10 bg-[#F2F2F2] text-black font-medium text-sm placeholder:text-black/30 focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none leading-relaxed"
                                    />
                                    <p className="text-[9px] text-black/30 font-medium leading-relaxed">
                                        Cada sugerencia nos ayuda a decidir qué publicar. Si hay suficiente interés, lo hacemos realidad y te avisamos primero.
                                    </p>
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="flex items-center gap-2 text-red-500 text-sm font-medium">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    Error al enviar. Por favor inténtalo de nuevo.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-5 bg-black text-white font-black tracking-[0.2em] uppercase rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed text-[10px]"
                            >
                                {status === 'loading'
                                    ? 'Enviando...'
                                    : mode === 'suggest'
                                        ? 'Enviar Sugerencia'
                                        : 'Solicitar Ebook'}
                            </button>

                            <p className="text-center text-[10px] text-black/30 font-black tracking-widest uppercase">
                                Sin spam · Respuesta en menos de 24h
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
