import { Product } from "../types/product.types";


export const filterFlashDeals = (products: Product[]): Product[] => {
  const now = new Date();

  return products.filter((item) => {
    if (!item.timer?.expiresAt) return false;
    const expireDate = new Date(item.timer.expiresAt);

    return (
      item.timer?.isFlashSale &&
      (item.pricing?.discountPercent ?? 0) >= 20 &&
      expireDate > now
    );
  });
};