"use server";

import { Product } from "@/types/product.types";
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

export const getProducts = async (): Promise<ApiResponse<Product[] | null>> => {
    try {
        const res = await httpClient.get<ApiResponse<Product[]>>("/product");
        return res.data;

    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch products",
            data: null,
        };
    }
};