export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: {
    nodes: Array<{
      url: string;
      altText: string;
    }>;
  };
  variants: {
    nodes: Array<ShopifyVariant>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
}

export interface CartItem {
  id: string;
  quantity: number;
  merchandise: ShopifyVariant;
  attributes: Array<{ key: string; value: string }>;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    nodes: CartItem[];
  };
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

export type ShopifyResponse<T> = {
  data: T;
  errors?: Array<{ message: string }>;
};
