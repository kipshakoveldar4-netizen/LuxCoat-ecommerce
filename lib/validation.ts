import { z } from "zod";

export const cartItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  sku: z.string(),
  title: z.string(),
  sizeMl: z.number(),
  priceCents: z.number().int().positive(),
  currency: z.enum(["USD", "GBP", "EUR"]),
  imageUrl: z.string(),
  quantity: z.number().int().min(1).max(24)
});

export const checkoutSchema = z.object({
  customer: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    country: z.string().min(1)
  }),
  shippingAddress: z.object({
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    region: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1)
  }),
  items: z.array(cartItemSchema).min(1),
  paymentProvider: z.enum(["paypal", "2checkout", "manual"])
});

export const orderStatusSchema = z.object({
  status: z.enum([
    "pending",
    "paid",
    "processing",
    "shipped",
    "delivered",
    "refunded",
    "cancelled"
  ])
});
