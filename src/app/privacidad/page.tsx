import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: "Política de Privacidad",
    description: "Política de privacidad de Editor de la Verdad. Cómo tratamos tus datos personales conforme al RGPD.",
    robots: { index: false, follow: false },
};

export default function PrivacidadPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <div className="border-b border-black/5 py-4 px-6">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-black/40 hover:text-black transition-colors">
                        <ChevronLeft className="w-3 h-3" />
                        Volver
                    </Link>
                    <span className="text-[10px] font-black tracking-widest uppercase text-black/20">Editor de la Verdad</span>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
                <span className="text-blue-500 font-black tracking-[0.3em] text-[10px] uppercase mb-6 block">Legal</span>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase leading-[0.95] mb-12">
                    POLÍTICA DE<br /><span className="text-blue-500 italic">PRIVACIDAD</span>
                </h1>

                <div className="prose prose-sm max-w-none space-y-10 text-gray-600">
                    <section>
                        <h2 className="text-sm font-black tracking-widest uppercase text-black mb-3">1. Responsable del tratamiento</h2>
                        <p className="leading-relaxed text-sm">
                            Editor de la Verdad es el responsable del tratamiento de los datos personales recogidos a través de este sitio web, de conformidad con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-black tracking-widest uppercase text-black mb-3">2. Datos que recopilamos</h2>
                        <p className="leading-relaxed text-sm">
                            Recopilamos únicamente los datos que tú nos proporcionas voluntariamente: nombre, dirección de correo electrónico y cualquier información que incluyas en el formulario de sugerencias. No recopilamos datos de navegación más allá de los necesarios para el funcionamiento técnico del sitio.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-black tracking-widest uppercase text-black mb-3">3. Finalidad del tratamiento</h2>
                        <p className="leading-relaxed text-sm">
                            Los datos recogidos se utilizan exclusivamente para: gestionar la entrega de los productos adquiridos, responder a solicitudes y sugerencias enviadas a través del formulario de contacto, y en su caso, el envío de comunicaciones relacionadas con nuevos productos si el usuario ha prestado su consentimiento.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-black tracking-widest uppercase text-black mb-3">4. Base legal</h2>
                        <p className="leading-relaxed text-sm">
                            El tratamiento de tus datos se basa en la ejecución del contrato de compraventa (para pedidos), en tu consentimiento expreso (para comunicaciones comerciales), y en el interés legítimo del responsable para la gestión de consultas y sugerencias.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-black tracking-widest uppercase text-black mb-3">5. Conservación de datos</h2>
                        <p className="leading-relaxed text-sm">
                            Conservamos tus datos durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos y, en todo caso, durante los plazos legalmente exigidos. Transcurrido dicho período, los datos serán suprimidos de forma segura.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-black tracking-widest uppercase text-black mb-3">6. Tus derechos</h2>
                        <p className="leading-relaxed text-sm">
                            Tienes derecho a acceder, rectificar, suprimir, limitar el tratamiento, oponerte al mismo y a la portabilidad de tus datos. Puedes ejercer estos derechos enviando un correo electrónico a través del formulario de contacto de este sitio web, adjuntando copia de tu documento de identidad.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-black tracking-widest uppercase text-black mb-3">7. Cookies</h2>
                        <p className="leading-relaxed text-sm">
                            Este sitio puede utilizar cookies técnicas necesarias para su funcionamiento. No utilizamos cookies de seguimiento ni publicidad comportamental sin tu consentimiento previo.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-black tracking-widest uppercase text-black mb-3">8. Cambios en esta política</h2>
                        <p className="leading-relaxed text-sm">
                            Nos reservamos el derecho de actualizar esta Política de Privacidad. Te notificaremos cualquier cambio significativo publicando la nueva versión en esta misma página.
                        </p>
                    </section>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-black/5 py-8 px-6 text-center">
                <p className="text-gray-400 font-black text-[10px] tracking-widest uppercase">Editor de la Verdad © 2026</p>
            </footer>
        </main>
    );
}
