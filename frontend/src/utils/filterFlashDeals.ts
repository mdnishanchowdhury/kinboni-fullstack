import { Product } from "../types/product.types";

export const filterFlashDeals = (products: Product[], minDiscount: number = 0): Product[] => {
  const now = new Date();

  return products.filter((item) => {
    if (!item.timer?.expiresAt) return false;
    const expireDate = new Date(item.timer.expiresAt);

    return (
      item.timer?.isFlashSale &&
      (item.timer?.flashDiscount ?? 0) >= minDiscount &&
      expireDate > now
    );
  });
};