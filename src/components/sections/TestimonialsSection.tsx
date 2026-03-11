'use client';

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";

const testimonials = [
    {
        text: "Esta información me ahorró los 2.500€ que estaba a punto de gastar en una mentoría de dropshipping. La logística explicada aquí es la real.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
        name: "Carlos Méndez",
        role: "Emprendedor E-comm",
    },
    {
        text: "Importar de Alemania parecía imposible hasta que leí el e-book. El ahorro en mi primer coche fue de 4.200€. Locura.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
        name: "Adrián Sanz",
        role: "Trader de Coches",
    },
    {
        text: "El e-book de IA es oro puro. No son prompts básicos, es una estrategia completa para automatizar servicios que antes me llevaban horas.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        name: "Sofía Vega",
        role: "Agencia Creativa",
    },
    {
        text: "Las subastas judiciales siempre fueron un mundo cerrado. El Editor ha abierto la puerta con una claridad que asusta. Muy recomendable.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
        name: "Roberto Gil",
        role: "Inversor Real Estate",
    },
    {
        text: "Cerrar ventas ahora es un proceso mecánico. Las objeciones que antes me bloqueaban ahora son oportunidades. Mi tasa de cierre subió un 40%.",
        image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop",
        name: "Laura Costa",
        role: "Closer de Ventas",
    },
    {
        text: "Directo, crudo y sin relleno. Lo que me gusta es que no hay historias motivacionales, solo ejecución pura. El nombre le queda perfecto.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
        name: "Ignacio Ruiz",
        role: "Empresario",
    },
    {
        text: "Soy exigente con lo que compro y esto ha superado mis expectativas. La calidad de la información por este precio es un regalo.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
        name: "Elena Marín",
        role: "Marketing Director",
    },
    {
        text: "El pack completo es la mejor inversión que he hecho este año. Cada e-book es un negocio en potencia si lo ejecutas.",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop",
        name: "Marcos Torres",
        role: "Solopreneur",
    },
    {
        text: "Finalmente alguien que dice la verdad sobre el margen real en dropshipping. Me ha evitado cometer errores de novato caros.",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop",
        name: "Daniela Soler",
        role: "E-commerce Manager",
    },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
    return (
        <section className="bg-transparent py-16 md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center mb-12 md:mb-20"
                >
                    <span className="text-blue-500 font-bold tracking-[0.3em] text-[10px] uppercase mb-6">Social Proof</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-black uppercase leading-[0.9]">
                        LO QUE DICE <br /><span className="text-blue-500 italic">NUESTRA GENTE</span>
                    </h2>
                    <p className="mt-6 md:mt-8 text-gray-500 font-medium text-base md:text-lg leading-relaxed">
                        Sin filtros, sin ediciones. Resultados reales de personas que dejaron de pagar el impuesto del gurú.
                    </p>
                </motion.div>

                <div className="flex justify-center gap-4 md:gap-8 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[500px] md:max-h-[800px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={25} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={30} />
                </div>
            </div>
        </section>
    );
}
