"use server"

import { httpClient } from "../lib/axios/httpClient";

export interface ICategoryResponse {
    success: boolean;
    message: string;
    data: any;
}

export const createCategory = async (payload: any): Promise<ICategoryResponse> => {
    try {
        const result = await httpClient.post<ICategoryResponse>("/category", payload);
        return result.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to create category",
            data: null
        };
    }
};

export const subCreateCategory = async (payload: any): Promise<ICategoryResponse> => {
    try {
        const result = await httpClient.post<ICategoryResponse>("/category/add-sub-category", payload);
        return result.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to create category",
            data: null
        };
    }
};

export const itemCreateCategory = async (payload: any): Promise<ICategoryResponse> => {
    try {
        const result = await httpClient.post<ICategoryResponse>("/category/add-items", payload);
        return result.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to create category",
            data: null
        };
    }
};

export const getCategoryMenu = async (): Promise<ICategoryResponse> => {
    try {
        const result = await httpClient.get<ICategoryResponse>("/category");
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch Category",
            data: null
        };
    }
};