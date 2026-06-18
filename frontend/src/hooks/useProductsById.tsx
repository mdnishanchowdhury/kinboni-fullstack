
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/product.services";

export const useProductsById = (id: string) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};