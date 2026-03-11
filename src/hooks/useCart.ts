'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    variantId: string;
    title: string;
    price: string;
    quantity: number;
    image?: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    addItem: (variantId: string, quantity: number, meta: { title: string; price: string; image?: string }) => void;
    removeItem: (variantId: string) => void;
    updateItem: (variantId: string, quantity: number) => void;
    getCheckoutUrl: () => string;
    itemCount: number;
}

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            itemCount: 0,
            setIsOpen: (isOpen) => set({ isOpen }),

            addItem: (variantId, quantity, meta) => {
                const items = get().items;
                const existing = items.find((i) => i.variantId === variantId);
                let newItems: CartItem[];
                if (existing) {
                    newItems = items.map((i) =>
                        i.variantId === variantId ? { ...i, quantity: i.quantity + quantity } : i
                    );
                } else {
                    newItems = [...items, { variantId, quantity, ...meta }];
                }
                set({ items: newItems, isOpen: true, itemCount: newItems.reduce((acc, i) => acc + i.quantity, 0) });
            },

            removeItem: (variantId) => {
                const newItems = get().items.filter((i) => i.variantId !== variantId);
                set({ items: newItems, itemCount: newItems.reduce((acc, i) => acc + i.quantity, 0) });
            },

            updateItem: (variantId, quantity) => {
                let newItems: CartItem[];
                if (quantity <= 0) {
                    newItems = get().items.filter((i) => i.variantId !== variantId);
                } else {
                    newItems = get().items.map((i) =>
                        i.variantId === variantId ? { ...i, quantity } : i
                    );
                }
                set({ items: newItems, itemCount: newItems.reduce((acc, i) => acc + i.quantity, 0) });
            },

            getCheckoutUrl: () => {
                const items = get().items;
                if (items.length === 0) return 'https://kaffstor.myshopify.com';
                const lineItems = items.map((i) => `${i.variantId}:${i.quantity}`).join(',');
                return `https://kaffstor.myshopify.com/cart/${lineItems}`;
            },
        }),
        {
            name: 'shopify-cart',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.itemCount = state.items.reduce((acc, i) => acc + i.quantity, 0);
                }
            },
        }
    )
);
