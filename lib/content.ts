import {
  Award,
  Clock3,
  CreditCard,
  Droplets,
  FileCheck2,
  Gem,
  Globe2,
  Hand,
  LockKeyhole,
  RotateCcw,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Sun,
  Truck,
  WandSparkles
} from "lucide-react";
import type { Product } from "@/lib/types";

export const site = {
  name: "LuxCoat",
  url: "https://lux-coat-ecommerce.vercel.app",
  announcement: "Worldwide shipping from China | USA, UK & Europe available | Secure checkout ready"
};

export const product: Product = {
  id: "prod_luxcoat_237",
  slug: "luxcoat-liquid-glass-237ml",
  sku: "LC-LG-237",
  title: "LuxCoat Liquid Glass",
  description:
    "A premium hand-applied automotive liquid glass coating that restores shine, creates a deep glossy finish, and helps protect paintwork from light scratches, UV damage, road film, and daily wash wear.",
  sizeMl: 237,
  priceCents: 3495,
  currency: "USD",
  inventoryQuantity: 420,
  imageUrl: "/images/luxcoat-product.png",
  gallery: [
    "/images/luxcoat-product.png",
    "/images/luxcoat-packshot.png",
    "/images/luxcoat-hero.png"
  ],
  benefits: [
    "Deep wet-look gloss",
    "Hand-applied in around 15 minutes",
    "Up to 6-7 months effect duration",
    "Helps protect from UV damage",
    "Reduces appearance of light scratches",
    "Suitable for cars, motorcycles, painted trim, and glossy exterior panels"
  ]
};

export const navItems = [
  { href: "/shop", label: "Shop" },
  { href: "/how-to-use", label: "How To Use" },
  { href: "/before-after", label: "Before / After" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export const benefits = [
  {
    icon: Sparkles,
    title: "Restores Shine",
    text: "Revives tired paintwork with a darker, glossier finish that feels showroom-ready."
  },
  {
    icon: ShieldCheck,
    title: "Protective Layer",
    text: "Adds a slick liquid-glass barrier against UV exposure, grime, and light swirl marks."
  },
  {
    icon: Clock3,
    title: "15 Minute Apply",
    text: "Designed for hand application, no machine polisher or workshop setup required."
  },
  {
    icon: Droplets,
    title: "Hydrophobic Finish",
    text: "Water beads and rolls away more easily, helping your car stay cleaner between washes."
  }
];

export const trustBadges = [
  { icon: Truck, label: "Tracked shipping from China" },
  { icon: Globe2, label: "USA, UK & Europe ready" },
  { icon: Award, label: "Premium detailing finish" },
  { icon: LockKeyhole, label: "PayPal & 2Checkout prepared" }
];

export const productHighlights = [
  { label: "Application time", value: "~15 min" },
  { label: "Effect duration", value: "6-7 months" },
  { label: "Bottle size", value: "237 ml" },
  { label: "Finish", value: "Deep gloss" }
];

export const guaranteeTiles = [
  {
    icon: ShieldCheck,
    title: "Finish confidence",
    text: "Designed to create a visible gloss boost when applied to clean, dry paint."
  },
  {
    icon: RotateCcw,
    title: "Support-first returns",
    text: "Refund workflow is prepared for damaged, incorrect, or missing orders."
  },
  {
    icon: CreditCard,
    title: "Secure payment ready",
    text: "Checkout is structured for PayPal and 2Checkout without storing card data."
  },
  {
    icon: ScrollText,
    title: "SDS-ready launch",
    text: "Certificates and safety documents have a dedicated upload-ready area."
  }
];

export const paymentBadges = [
  "PayPal prepared",
  "2Checkout prepared",
  "No card data stored",
  "Order tracking ready"
];

export const beforeAfterMetrics = [
  { label: "Gloss depth", value: "+48%" },
  { label: "Water beading", value: "High" },
  { label: "Touch feel", value: "Slick" }
];

export const beforeAfterExamples = [
  {
    title: "Scratched tailgate restored",
    eyebrow: "Red pickup tailgate",
    image: "/images/before-after-tailgate.png",
    alt: "Before and after comparison of a scratched red pickup tailgate restored with LuxCoat",
    text: "Heavy-looking surface marks are visually reduced while the red paint gains a deeper reflective finish."
  },
  {
    title: "Oxidized hood refreshed",
    eyebrow: "Chevrolet hood",
    image: "/images/before-after-chevy-hood.png",
    alt: "Before and after comparison of an oxidized Chevrolet hood refreshed with LuxCoat",
    text: "Oxidation appearance is reduced and the hood returns to a cleaner, glossier reflection."
  },
  {
    title: "Faded paint brought back to life",
    eyebrow: "Black Honda hood",
    image: "/images/before-after-honda-hood.png",
    alt: "Before and after comparison of a faded black Honda hood refreshed with LuxCoat",
    text: "Faded paint appears darker and smoother, with a sharper liquid-glass look after application."
  }
];

export const howItWorks = [
  {
    title: "Clean",
    text: "Wash and dry the paint so the coating bonds cleanly."
  },
  {
    title: "Bond",
    text: "LuxCoat spreads into a thin glass-like layer by hand."
  },
  {
    title: "Gloss",
    text: "The surface gains a deeper reflective finish and slick touch."
  },
  {
    title: "Protect",
    text: "Enjoy durable shine and UV protection for up to 6-7 months."
  }
];

export const applicationSteps = [
  {
    icon: Hand,
    title: "Apply",
    text: "Add a small amount to a microfiber applicator and spread evenly over one panel."
  },
  {
    icon: WandSparkles,
    title: "Buff",
    text: "Let it haze briefly, then buff with a clean microfiber towel until the finish clears."
  },
  {
    icon: Sun,
    title: "Cure",
    text: "Keep the surface dry for best results and avoid washing for 24 hours."
  }
];

export const faqs = [
  {
    question: "How long does LuxCoat last?",
    answer:
      "The effect can last up to 6-7 months depending on climate, washing frequency, and surface preparation."
  },
  {
    question: "Can I apply it by hand?",
    answer:
      "Yes. LuxCoat is designed for hand application with a microfiber applicator and towel."
  },
  {
    question: "How long does application take?",
    answer:
      "Most vehicles can be coated in around 15 minutes after washing and drying."
  },
  {
    question: "Does it remove deep scratches?",
    answer:
      "No. It helps reduce the visibility of light swirl marks and adds protection, but deep scratches need paint correction."
  },
  {
    question: "Where do orders ship from?",
    answer:
      "Orders ship from China to the USA, UK, and European markets with tracking once fulfilled."
  }
];

export const reviews = [
  {
    name: "Marcus T.",
    market: "California, USA",
    rating: 5,
    text: "The gloss is noticeably deeper after one quick hand application. It made my black coupe look freshly detailed."
  },
  {
    name: "Amelia R.",
    market: "Manchester, UK",
    rating: 5,
    text: "Easy to buff and the water beading is excellent. The finish still looked slick after several washes."
  },
  {
    name: "Jonas K.",
    market: "Berlin, Germany",
    rating: 5,
    text: "Feels more premium than the quick sprays I have tried. The bottle and application process are straightforward."
  },
  {
    name: "Claire B.",
    market: "Bristol, UK",
    rating: 5,
    text: "The checkout and shipping updates felt clear, and the finish made my silver paint look much sharper."
  },
  {
    name: "Nico V.",
    market: "Lyon, France",
    rating: 5,
    text: "I liked that it did not need a machine polisher. The gloss looked expensive after a quick hand buff."
  },
  {
    name: "Ethan P.",
    market: "New York, USA",
    rating: 5,
    text: "Strong water beading and a glassy feel after washing. The product looks premium on the shelf too."
  }
];

export const certificates = [
  {
    icon: FileCheck2,
    title: "Safety Data Sheet",
    text: "SDS area prepared for handling, storage, hazards, and emergency guidance.",
    href: "/certificates-sds"
  },
  {
    icon: ShieldCheck,
    title: "Compliance Pack",
    text: "Batch documentation, composition notes, and market import files can be attached before launch.",
    href: "/certificates-sds"
  },
  {
    icon: Gem,
    title: "Quality Batch Notes",
    text: "Prepared space for lot numbers, production date, and inspection references.",
    href: "/certificates-sds"
  }
];

export const markets = [
  { country: "United States", currency: "USD", symbol: "$" },
  { country: "United Kingdom", currency: "GBP", symbol: "\u00A3" },
  { country: "Europe", currency: "EUR", symbol: "\u20AC" }
];
