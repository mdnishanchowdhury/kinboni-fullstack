"use server";

import { createProduct } from "@/services/product.services"; 
import { revalidatePath } from "next/cache";

export const createProductAction = async (payload: any) => {
    try {
        const response = await createProduct(payload);

        const isSuccessful =
            response?.success === true ||
            response?.data?.id ||
            (response as any)?.id;

        if (isSuccessful) {
            revalidatePath("/dashboard/products");
            revalidatePath("/");

            return {
                success: true,
                message: response?.message || "Product created successfully!",
                data: response?.data || response,
            };
        }

        return {
            success: false,
            message: response?.message || "Server processed the request but returned an unexpected format.",
        };

    } catch (error: any) {
        console.error("Action Error:", error);
        return {
            success: false,
            message: error.message || "An unexpected error occurred",
        };
    }
};

