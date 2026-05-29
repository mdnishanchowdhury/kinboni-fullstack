import { useQuery } from '@tanstack/react-query';
import { getItemCategoryList } from '@/services/category.services';

export function useGetItemCategoryList() {
    return useQuery({
        queryKey: ['item-category-list'],
        queryFn: async () => {
            const response = await getItemCategoryList();

            if (!response || response.success === false) {
                throw new Error(response.message || "Failed to fetch Items-Category");
            }

            return response.data;
        }
    });
}