"use server";

import { Product, ProductFilters, ProductPaginatedResponse } from "@/types/product.types";
import { httpClient } from "../lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";


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

export const getProducts = async (filters: ProductFilters = {}): Promise<ApiResponse<ProductPaginatedResponse> | null> => {
    try {
        const { data } = await httpClient.get<ApiResponse<ProductPaginatedResponse>>("/product", {
            params: filters
        });
        return data;
    } catch (error: any) {
        console.error("Error fetching products:", error?.response?.data?.message || error.message);
        return null;
    }
};

export const getProductsList = async () => {
    try {
        const res = await httpClient.get<ApiResponse<Product[]>>("/product/lists");
        return res.data;
    } catch (error) {
        console.error("Error fetching products List:", error);
        throw error;
    }
};

export const getProductById = async (id: string): Promise<ApiResponse<Product> | null> => {
    try {
        const { data } = await httpClient.get<ApiResponse<Product>>(`/product/${id}`);
        return data;
    } catch (error: any) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
};


export const productOrder = async (orderData: any) => {
    try {
        const result = await httpClient.post("/order", orderData);
        return {
            success: true,
            data: result.data
        };
    } catch (error: any) {
        console.error("Order API Error:", error.response?.data || error.message);
        throw error;
    }
};