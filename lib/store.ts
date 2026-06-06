import { product as fallbackProduct } from "@/lib/content";
import { query } from "@/lib/db";
import type { CartItem, CustomerInput, Order, OrderStatus, Product, ShippingAddress } from "@/lib/types";

const demoOrders: Order[] = [
  {
    id: "ord_demo_1001",
    orderNumber: "LC-1001",
    status: "processing",
    paymentProvider: "manual",
    paymentStatus: "pending_capture",
    customer: {
      firstName: "Sophia",
      lastName: "Miller",
      email: "sophia@example.com",
      phone: "+1 555 0188",
      country: "United States"
    },
    shippingAddress: {
      line1: "101 Ocean Drive",
      city: "Miami",
      region: "FL",
      postalCode: "33139",
      country: "United States"
    },
    items: [{ ...fallbackProduct, productId: fallbackProduct.id, quantity: 2 }],
    subtotalCents: fallbackProduct.priceCents * 2,
    shippingCents: 695,
    totalCents: fallbackProduct.priceCents * 2 + 695,
    currency: "USD",
    createdAt: new Date().toISOString()
  }
];

export async function getProducts(): Promise<Product[]> {
  const result = await query<{
    id: string;
    slug: string;
    title: string;
    description: string;
    size_ml: number;
    price_cents: number;
    currency: Product["currency"];
    inventory_quantity: number;
    image_url: string | null;
  }>(
    "select id, slug, title, description, size_ml, price_cents, currency, inventory_quantity, image_url from products where active = true order by created_at asc"
  );

  if (!result) {
    return [fallbackProduct];
  }

  return result.rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    sku: row.slug.toUpperCase(),
    title: row.title,
    description: row.description,
    sizeMl: row.size_ml,
    priceCents: row.price_cents,
    currency: row.currency,
    inventoryQuantity: row.inventory_quantity,
    imageUrl: row.image_url ?? fallbackProduct.imageUrl,
    gallery: fallbackProduct.gallery,
    benefits: fallbackProduct.benefits
  }));
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((item) => item.slug === slug) ?? fallbackProduct;
}

export async function getOrders(): Promise<Order[]> {
  const result = await query<{
    id: string;
    order_number: string;
    status: OrderStatus;
    payment_provider: Order["paymentProvider"];
    payment_status: string;
    subtotal_cents: number;
    shipping_cents: number;
    total_cents: number;
    currency: Order["currency"];
    shipping_address: ShippingAddress;
    created_at: Date;
    email: string;
    first_name: string;
    last_name: string;
    phone: string | null;
    country: string;
  }>(`
    select o.*, c.email, c.first_name, c.last_name, c.phone, c.country
    from orders o
    join customers c on c.id = o.customer_id
    order by o.created_at desc
    limit 100
  `);

  if (!result) {
    return demoOrders;
  }

  return result.rows.map((row) => ({
    id: row.id,
    orderNumber: row.order_number,
    status: row.status,
    paymentProvider: row.payment_provider ?? "manual",
    paymentStatus: row.payment_status,
    customer: {
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      phone: row.phone ?? undefined,
      country: row.country
    },
    shippingAddress: row.shipping_address,
    items: [],
    subtotalCents: row.subtotal_cents,
    shippingCents: row.shipping_cents,
    totalCents: row.total_cents,
    currency: row.currency,
    createdAt: row.created_at.toISOString()
  }));
}

export async function getOrderById(id: string) {
  const orders = await getOrders();
  return orders.find((order) => order.id === id) ?? null;
}

export async function createOrder(input: {
  customer: CustomerInput;
  shippingAddress: ShippingAddress;
  items: CartItem[];
  paymentProvider: Order["paymentProvider"];
}) {
  const subtotalCents = input.items.reduce(
    (total, item) => total + item.priceCents * item.quantity,
    0
  );
  const shippingCents = subtotalCents >= 7000 ? 0 : 695;
  const totalCents = subtotalCents + shippingCents;
  const orderNumber = `LC-${Date.now().toString().slice(-7)}`;

  const db = await query<{ customer_id: string }>(
    `insert into customers (email, first_name, last_name, phone, country)
     values ($1, $2, $3, $4, $5)
     returning id as customer_id`,
    [
      input.customer.email,
      input.customer.firstName,
      input.customer.lastName,
      input.customer.phone ?? null,
      input.customer.country
    ]
  );

  if (!db) {
    return {
      id: `ord_${Date.now()}`,
      orderNumber,
      status: "pending" as OrderStatus,
      paymentProvider: input.paymentProvider,
      paymentStatus: "not_started",
      customer: input.customer,
      shippingAddress: input.shippingAddress,
      items: input.items,
      subtotalCents,
      shippingCents,
      totalCents,
      currency: input.items[0]?.currency ?? "USD",
      createdAt: new Date().toISOString()
    };
  }

  const customerId = db.rows[0].customer_id;
  const order = await query<{ id: string }>(
    `insert into orders (
      customer_id, order_number, status, payment_provider, subtotal_cents,
      shipping_cents, total_cents, currency, shipping_address
    )
    values ($1, $2, 'pending', $3, $4, $5, $6, $7, $8)
    returning id`,
    [
      customerId,
      orderNumber,
      input.paymentProvider,
      subtotalCents,
      shippingCents,
      totalCents,
      input.items[0]?.currency ?? "USD",
      JSON.stringify(input.shippingAddress)
    ]
  );

  const orderId = order?.rows[0].id;
  if (orderId) {
    for (const item of input.items) {
      await query(
        `insert into order_items (
          order_id, product_id, sku, title, quantity, unit_price_cents, total_cents
        )
        values ($1, $2, $3, $4, $5, $6, $7)`,
        [
          orderId,
          item.productId.startsWith("prod_") ? null : item.productId,
          item.sku,
          item.title,
          item.quantity,
          item.priceCents,
          item.priceCents * item.quantity
        ]
      );
    }
  }

  return {
    id: orderId ?? `ord_${Date.now()}`,
    orderNumber,
    status: "pending" as OrderStatus,
    paymentProvider: input.paymentProvider,
    paymentStatus: "not_started",
    customer: input.customer,
    shippingAddress: input.shippingAddress,
    items: input.items,
    subtotalCents,
    shippingCents,
    totalCents,
    currency: input.items[0]?.currency ?? "USD",
    createdAt: new Date().toISOString()
  };
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const result = await query(
    "update orders set status = $1, updated_at = now() where id = $2",
    [status, id]
  );

  return Boolean(result);
}

export async function updateProductInventory(slug: string, quantity: number) {
  const result = await query(
    "update products set inventory_quantity = $1, updated_at = now() where slug = $2",
    [quantity, slug]
  );

  return Boolean(result);
}
