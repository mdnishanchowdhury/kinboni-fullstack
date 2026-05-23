"use server";

import { createCategory } from "@/services/category.services";
import { revalidatePath } from "next/cache";

export const createCategoryAction = async (payload: any) => {
    try {
        const response = await createCategory(payload);

        const isSuccessful =
            response?.success === true ||
            response?.data?.id ||
            (response as any)?.id;

        if (isSuccessful) {
            revalidatePath("/", "layout");

            return {
                success: true,
                message: response?.message || "Category created successfully!",
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