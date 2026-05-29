"use server"

import { httpClient } from "../lib/axios/httpClient";

export interface ICategoryResponse {
    success: boolean;
    message: string;
    data: any;
}

export const createCategory = async (payload: FormData): Promise<ICategoryResponse> => {
    try {
        const result = await httpClient.post<ICategoryResponse>("/category", payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return result.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to create category",
            data: null
        };
    }
};

export const subCreateCategory = async (payload: FormData): Promise<ICategoryResponse> => {
    try {
        const result = await httpClient.post<ICategoryResponse>("/category/add-sub-category", payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return result.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to create sub-category");
    }
};

export const itemCreateCategory = async (payload: FormData): Promise<ICategoryResponse> => {
    try {
        const result = await httpClient.post<ICategoryResponse>("/category/add-items", payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
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

export const updateCategory = async (id: string, payload: any): Promise<ICategoryResponse> => {
    try {
        const result = await httpClient.patch<ICategoryResponse>(`/category/${id}`, payload);
        return result.data;
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "Failed to update category", data: null };
    }
};

export const updateSubCategory = async (id: string, payload: any): Promise<ICategoryResponse> => {
    try {
        const result = await httpClient.patch<ICategoryResponse>(`/category/sub-category/${id}`, payload);
        return result.data;
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "Failed to update sub-category", data: null };
    }
};

export const updateItem = async (id: string, payload: any): Promise<ICategoryResponse> => {
    try {
        const result = await httpClient.patch<ICategoryResponse>(`/category/item/${id}`, payload);
        console.log(result.data)
        return result.data;
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "Failed to update item", data: null };
    }
};

export const deleteCategory = async (id: string): Promise<ICategoryResponse> => {
    try {
        const result = await httpClient.delete<ICategoryResponse>(`/category/${id}`);
        return result.data;
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "Failed to delete category", data: null };
    }
};

export const deleteSubCategory = async (id: string): Promise<ICategoryResponse> => {
    try {
        const result = await httpClient.delete<ICategoryResponse>(`/category/sub-category/${id}`);
        return result.data;
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "Failed to delete sub-category", data: null };
    }
};

export const deleteItem = async (id: string): Promise<ICategoryResponse> => {
    try {
        const result = await httpClient.delete<ICategoryResponse>(`/category/item/${id}`);
        return result.data;
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "Failed to delete item", data: null };
    }
};

export const getSubCategoryList = async (): Promise<ICategoryResponse> => {
    try {
        const result = await httpClient.get<ICategoryResponse>("/category/sub-categories");
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch Sub-Category",
            data: null
        };
    }
};
