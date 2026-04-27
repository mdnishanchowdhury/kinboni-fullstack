"use server"

import { httpClient } from "@/lib/axios/httpClient";

export interface MenuResponse {
    success: boolean;
    message: string;
    data: any;
}


export const getCategoryMenu = async (): Promise<MenuResponse> => {
    try {
        const res = await httpClient.get<MenuResponse>("/category");
        return res
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch Category",
            data: null
        };
    }
};