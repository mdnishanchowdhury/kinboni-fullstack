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

export type Gender = 'MALE' | 'FEMALE' | 'KIDS';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  brand: {
    name: string;
    origin: string;
  };
  category: {
    main: string;
    sub: string;
    item: string;
  };
  gender: Gender;
  pricing: {
    currentPrice: number;
    oldPrice: number;
    discountPercent: number;
  };
  media: {
    thumbnail: string;
    images: {
      url: string;
      alt: string;
      order: number;
    }[];
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
    startAt?: string;
    expiresAt: string;
    discountType?: string;
    discountValue?: number;
    timerLabel: string;
  };
  variants: Variant[];
}

export interface ProductPaginatedResponse {
  meta: {
    page: number;
    limit: number;
    totalProducts: number;
    totalPages: number;
  };
  products: Product[];
}

export interface ProductResponse {
  success: boolean;
  message?: string;
  data: ProductPaginatedResponse;
}

export interface ProductFilters {
  search?: string;
  gender?: string;
  status?: string;
  sort?: string;
  page?: number;
  limit?: number;
  itemId?: string;
  min?: number;
  max?: number;
}

export interface ProductFilters {
  search?: string;
  gender?: string;
  status?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export type SortOption = "newest" | "price-asc" | "price-desc" | "stock";
export type StatusFilter = "all" | "active" | "flash" | "out";
export type ViewMode = "list" | "grid";
