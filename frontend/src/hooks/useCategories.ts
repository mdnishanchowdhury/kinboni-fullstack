
import { useQuery } from "@tanstack/react-query";
import { getCategoryMenu } from "../services/category.services";

export const useCategories = () => {
  return useQuery({
    queryKey: ["category-menu"],
    queryFn: getCategoryMenu,
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,  
  });
};