"use server"

import { httpClient } from "../lib/axios/httpClient";

export interface PorductResponse {
    success: boolean;
    message: string;
    data: any;
}


export const getProducts = async (): Promise<PorductResponse> => {
    try {
        const res = await httpClient.get<PorductResponse>("/product");
        return res
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch Products",
            data: null
        };
    }
};