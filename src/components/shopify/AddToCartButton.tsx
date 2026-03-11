'use client';

import { useCart } from '@/hooks/useCart';

interface AddToCartButtonProps {
    variantId: string;
    title: string;
    price: string;
    image?: string;
}

export function AddToCartButton({ variantId, title, price, image }: AddToCartButtonProps) {
    const { addItem, setIsOpen } = useCart();

    const handleAdd = async () => {
        await addItem(variantId, 1, { title, price, image });
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
