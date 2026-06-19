import { productOrder } from "@/services/product.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useOrderProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: any) => productOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      console.error("Order Failed", error);
    },
  });
};