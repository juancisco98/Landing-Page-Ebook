import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: "Términos y Condiciones",
    description: "Términos y condiciones de uso de Editor de la Verdad. Información sobre productos digitales, propiedad intelectual y uso permitido.",
    robots: { index: false, follow: false },
};

export default function TerminosPage() {
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
                    TÉRMINOS Y<br /><span className="text-blue-500 italic">CONDICIONES</span>
                </h1>

                <div className="prose prose-sm max-w-none space-y-10 text-gray-600">
                    <section>
                        <h2 className="text-sm font-black tracking-widest uppercase text-black mb-3">1. Aceptación de los términos</h2>
                        <p className="leading-relaxed text-sm">
                            Al acceder y utilizar este sitio web, aceptas quedar vinculado por estos Términos y Condiciones de uso. Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder al servicio.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-black tracking-widest uppercase text-black mb-3">2. Productos digitales</h2>
                        <p className="leading-relaxed text-sm">
                            Todos los productos vendidos en esta plataforma son bienes digitales (ebooks). Una vez completada la compra y entregado el acceso, no se realizarán reembolsos salvo defecto técnico demostrable que impida el acceso al contenido adquirido.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-black tracking-widest uppercase text-black mb-3">3. Propiedad intelectual</h2>
                        <p className="leading-relaxed text-sm">
                            Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, imágenes y el software, es propiedad de Editor de la Verdad y está protegido por las leyes de propiedad intelectual vigentes. Queda prohibida su reproducción, distribución o uso comercial sin autorización expresa por escrito.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-black tracking-widest uppercase text-black mb-3">4. Uso permitido</h2>
                        <p className="leading-relaxed text-sm">
                            Los ebooks adquiridos son para uso personal y no comercial. No está permitido compartir, revender, distribuir ni reproducir el contenido de forma total o parcial sin autorización previa.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-black tracking-widest uppercase text-black mb-3">5. Limitación de responsabilidad</h2>
                        <p className="leading-relaxed text-sm">
                            El contenido de nuestros productos tiene fines informativos y educativos. Editor de la Verdad no garantiza resultados económicos específicos derivados de la aplicación de la información contenida en sus publicaciones. Los resultados dependen exclusivamente del esfuerzo y las circunstancias individuales de cada lector.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-black tracking-widest uppercase text-black mb-3">6. Modificaciones</h2>
                        <p className="leading-relaxed text-sm">
                            Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor en el momento de su publicación en el sitio web.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-black tracking-widest uppercase text-black mb-3">7. Legislación aplicable</h2>
                        <p className="leading-relaxed text-sm">
                            Estos términos se rigen por la legislación española vigente. Para cualquier controversia derivada del uso de este sitio o de los productos adquiridos, las partes se someten a los juzgados y tribunales competentes conforme a la normativa aplicable.
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
