export interface Review {
  id: string;
  user: {
    id?: string;
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Variant {
  id: string;
  name: string;
  hex: string;
  sizes: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price?: number;
  image?: string;
  brand: {
    name: string;
    origin: string;
  };
  category: {
    main: string;
    sub: string;
    item: string;
  };
  gender: string;
  pricing: {
    currentPrice: number;
    oldPrice: number;
    discountPercent: number;
  };
  media: {
    thumbnail: string;
    images: { url: string; alt: string; order: number }[];
  };
  inventory: {
    stock: number;
    sold: number;
  };
  ratings: {
    average: number;
    count: number;
    reviews: Review[];
  };
  timer?: {
    isFlashSale: boolean;
    startAt: string;
    expiresAt: string;
    discountType: string;
    discountValue: number;
    timerLabel: string;
  };
  variants: Variant[];
  thumbnail: string;
  timerLabel?: string;
}

export interface ProductResponse {
  data: Product[];
  success?: boolean;
  message?: string;
  count?: number;
}