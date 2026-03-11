'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';

export function CartDrawer() {
    const { items, isOpen, setIsOpen, removeItem, updateItem, getCheckoutUrl } = useCart();

    const total = items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-black/5 z-[101] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-8 flex justify-between items-center border-b border-black/5">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-blue-500" />
                                <h2 className="text-xl font-black tracking-tighter uppercase">Tu Carrito</h2>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-black/5 rounded-full transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <p className="text-gray-400 font-bold text-xs tracking-widest uppercase mb-6">Tu carrito está vacío</p>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="px-6 py-3 bg-black text-white rounded-full text-[10px] tracking-widest uppercase font-black"
                                    >
                                        Seguir Comprando
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.variantId} className="flex gap-6 group">
                                        <div className="w-20 h-28 bg-[#F2F2F2] rounded-2xl flex-shrink-0 overflow-hidden border border-black/5">
                                            {item.image ? (
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-[9px] text-gray-400 font-black tracking-widest uppercase">Ebook</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-black tracking-tight text-sm uppercase leading-tight pr-2">{item.title}</h3>
                                                <button
                                                    onClick={() => removeItem(item.variantId)}
                                                    className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-blue-500 font-black text-sm mb-4">{item.price}€</p>

                                            <div className="flex items-center border border-black/5 rounded-full overflow-hidden bg-[#F2F2F2] w-fit">
                                                <button
                                                    onClick={() => updateItem(item.variantId, item.quantity - 1)}
                                                    className="p-2 hover:bg-black/5 disabled:opacity-30"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateItem(item.variantId, item.quantity + 1)}
                                                    className="p-2 hover:bg-black/5"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-8 border-t border-black/5 bg-[#F9F9F9]">
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-gray-400 font-black text-[10px] tracking-widest uppercase">Total Estimado</span>
                                    <span className="text-3xl font-black tracking-tighter">{total.toFixed(2)}€</span>
                                </div>
                                <button
                                    onClick={() => window.open(getCheckoutUrl(), '_blank')}
                                    className="w-full py-5 bg-black text-white font-black tracking-widest uppercase rounded-3xl hover:bg-blue-600 transition-all shadow-xl shadow-black/10"
                                >
                                    Finalizar Compra
                                </button>
                                <p className="text-[10px] text-gray-400 text-center mt-6 uppercase tracking-widest font-black opacity-50">
                                    Pago Seguro • Acceso Instantáneo
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
