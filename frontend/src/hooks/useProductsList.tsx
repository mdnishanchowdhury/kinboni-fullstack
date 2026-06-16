
import { useQuery } from "@tanstack/react-query";
import { getProductsList } from "@/services/product.services";

export const useProductsList = () => {
  return useQuery({
    queryKey: ["products-list"],
    queryFn: getProductsList,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};