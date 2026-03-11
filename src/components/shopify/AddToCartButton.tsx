'use client';

import { useCart } from '@/hooks/useCart';

export function AddToCartButton({ variantId }: { variantId: string }) {
    const { addItem, isOpen, setIsOpen } = useCart();

    const handleAdd = async () => {
        await addItem(variantId, 1);
        setIsOpen(true);
    };

    return (
        <button
            onClick={handleAdd}
            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform active:scale-95"
        >
            Add to Cart
        </button>
    );
}
