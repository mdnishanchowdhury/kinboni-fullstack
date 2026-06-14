// export interface Review {
//   id: string;
//   user: {
//     id?: string;
//     name: string;
//     avatar: string;
//   };
//   rating: number;
//   comment: string;
//   createdAt: string;
// }

// export interface Variant {
//   id: string;
//   name: string;
//   hex: string;
//   sizes: string[];
// }

// export interface Product {
//   id: string;
//   name: string;
//   slug: string;
//   description: string;
//   brand: {
//     name: string;
//     origin: string;
//   };
//   category: {
//     main: string;
//     sub: string;
//     item: string;
//   };
//   gender: 'MALE' | 'FEMALE' | 'KIDS';
//   pricing: {
//     currentPrice: number;
//     oldPrice: number;
//     discountPercent: number;
//   };
//   media: {
//     thumbnail: string;
//     images: {
//       url: string;
//       alt: string;
//       order: number;
//     }[];
//   };
//   inventory: {
//     stock: number;
//     sold: number;
//   };
//   ratings: {
//     average: number;
//     count: number;
//     reviews: Review[];
//   };
//   timer?: {
//     isFlashSale: boolean;
//     startAt?: string;
//     expiresAt: string;
//     discountType?: string;
//     discountValue?: number;
//     timerLabel: string;
//   };
//   variants: Variant[];
// }

// export interface ProductResponse {
//   success: boolean;
//   message?: string;
//   count?: number;
//   data: Product[];
// }

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

// ব্যাকেন্ড থেকে আসা নতুন প্যাজিনেশন মেটা ডাটা সহ রেসপন্স টাইপ
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
  data: ProductPaginatedResponse; // নতুন অবজেক্ট স্ট্রাকচার
}

// ড্যাশবোর্ড এবং সার্ভিসের জন্য ফিল্টার টাইপ (যা মিসিং ছিল)
export interface ProductFilters {
  search?: string;
  gender?: string;
  status?: string;
  sort?: string;
  page?: number;  // সার্ভার সাইড প্যাজিনেশনের জন্য
  limit?: number; // প্রতি পেজে কয়টি প্রোডাক্ট দেখাবে তার জন্য
}

export interface ProductFilters {
  search?: string;
  gender?: string;
  status?: string;
  sort?: string;
  page?: number;  // 👈 এই লাইনটি যুক্ত করা হয়েছে
  limit?: number; // 👈 এই লাইনটি যুক্ত করা হয়েছে
}

export type SortOption = "newest" | "price-asc" | "price-desc" | "stock";
export type StatusFilter = "all" | "active" | "flash" | "out";
export type ViewMode = "list" | "grid";
