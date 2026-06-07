# LuxCoat E-commerce Website

Custom Next.js storefront for **LuxCoat Liquid Glass, 237 ml**, a premium automotive liquid glass coating product.

## What Is Included

- Next.js App Router storefront with Tailwind CSS
- Custom dark luxury automotive design and local LuxCoat product imagery
- Product, shop, cart, checkout, policy, FAQ, reviews, before/after, contact, and certificates/SDS pages
- Local cart flow with checkout steps:
  - Cart
  - Customer information
  - Shipping address
  - Payment placeholder
  - Order confirmation
- PostgreSQL-ready data layer and schema in `database/schema.sql`
- Payment adapter placeholders for PayPal and 2Checkout
- Protected admin dashboard for:
  - Orders list
  - Order details
  - Product editing
  - Inventory quantity
  - Customer data
  - Order status update

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

If this Codex shell resolves `node` to the app runtime instead of your system Node.js, prepend the system Node path for the current terminal:

```powershell
$env:PATH='C:\Program Files\nodejs;' + $env:PATH
```

You can also run the CLIs directly with Node:

```bash
node .\node_modules\next\dist\bin\next dev
node .\node_modules\typescript\bin\tsc --noEmit
node .\node_modules\next\dist\bin\next build
```

## Environment

Copy `.env.example` to `.env.local` and set real values before launch.

```text
DATABASE_URL=
ADMIN_PASSWORD=
ADMIN_SESSION_TOKEN=
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
TWOCHECKOUT_MERCHANT_CODE=
TWOCHECKOUT_SECRET_KEY=
NEXT_PUBLIC_SITE_URL=
```

Admin login:

```text
/admin/login
```

Set `ADMIN_PASSWORD` and `ADMIN_SESSION_TOKEN` in `.env.local` for local admin access and in Vercel/AWS environment variables for production.

## Database

Run `database/schema.sql` against PostgreSQL before using real persistence. Without `DATABASE_URL`, the storefront uses seeded product data and preview admin/order responses so the site remains reviewable locally.

## Payments

PayPal and 2Checkout endpoints are prepared under:

```text
/api/payments/paypal/create-order
/api/payments/2checkout/create-order
```

The current implementation validates flow boundaries and returns configuration-required responses until provider credentials and webhook verification are added.

## Hosting

The project is ready for Vercel or AWS hosting. For Vercel, connect the repository, add environment variables, provision PostgreSQL, and run the included production build.
