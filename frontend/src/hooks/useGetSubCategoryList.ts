import { useQuery } from '@tanstack/react-query';
import { getSubCategoryList } from '@/services/category.services';

export function useGetSubCategoryList() {
    return useQuery({
        queryKey: ['category-sublist'],
        queryFn: async () => {
            const response = await getSubCategoryList();
            if (!response || response.success === false) {
                throw new Error(response.message || "Failed to fetch sub-categories");
            }
            return response.data;
        }
    });
}