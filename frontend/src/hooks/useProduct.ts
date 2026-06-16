import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProducts } from "../services/product.services";
import { ProductFilters } from "@/types/product.types";

export const useProducts = (filters: ProductFilters = {}) => {
    return useQuery({
        queryKey: ["products", filters],
        queryFn: () => getProducts(filters),
        staleTime: 5 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
};