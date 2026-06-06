export type CurrencyCode = "USD" | "GBP" | "EUR";

export type Product = {
  id: string;
  slug: string;
  sku: string;
  title: string;
  description: string;
  sizeMl: number;
  priceCents: number;
  currency: CurrencyCode;
  inventoryQuantity: number;
  imageUrl: string;
  gallery: string[];
  benefits: string[];
};

export type CartItem = {
  productId: string;
  slug: string;
  sku: string;
  title: string;
  sizeMl: number;
  priceCents: number;
  currency: CurrencyCode;
  imageUrl: string;
  quantity: number;
};

export type CustomerInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
};

export type ShippingAddress = {
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "refunded"
  | "cancelled";

export type Order = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentProvider: "paypal" | "2checkout" | "manual";
  paymentStatus: string;
  customer: CustomerInput;
  shippingAddress: ShippingAddress;
  items: CartItem[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  currency: CurrencyCode;
  createdAt: string;
};
