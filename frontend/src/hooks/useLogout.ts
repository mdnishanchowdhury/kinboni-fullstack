"use client";

import { useLoading } from "./useLoading";
import { logoutUser } from "../services/auth.services";

export const useLogout = () => {
    const [isLoading, triggerLoading] = useLoading(1500);

    const logout = () => {
        triggerLoading(async () => {
            try {
                await logoutUser();
            } catch (error) {
                console.error("Logout failed:", error);
            }
        });
    };

    return { logout, isLoading };
};