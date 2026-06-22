import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getOrders } from "@/services/order.services";
import { IOrderQueryParams } from "@/types/order.types";

export const useOrders = (filters: IOrderQueryParams = {}) => {
    return useQuery({
        queryKey: ["orders", filters],
        queryFn: () => getOrders(filters),
        staleTime: 5 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
};