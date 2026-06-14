"use server";

import { Product, ProductFilters, ProductPaginatedResponse, ProductResponse } from "@/types/product.types";
import { httpClient } from "../lib/axios/httpClient";

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export const createProduct = async (payload: FormData): Promise<ApiResponse<Product | null>> => {
    try {
        const result = await httpClient.post<ApiResponse<Product>>("/product", payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return result.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to create product",
            data: null,
        };
    }
};

export const getProducts = async (filters: ProductFilters): Promise<ProductPaginatedResponse | null> => {
    try {
        const res = await httpClient.get<ProductResponse>("/product", {
            params: {
                search: filters.search || undefined,
                gender: filters.gender || undefined,
                status: filters.status || undefined,
                sort: filters.sort || undefined,
                page: filters.page || 1,
                limit: filters.limit || 5,
            }
        });

        if (res.data && res.data.data) {
            return res.data.data;
        }

        if (res.data && ('products' in res.data)) {
            return res.data as unknown as ProductPaginatedResponse;
        }

        console.warn("Backend response structure mismatched:", res.data);
        return null;

    } catch (error: any) {
        console.error("Error fetching products:", error);
        return null;
    }
};