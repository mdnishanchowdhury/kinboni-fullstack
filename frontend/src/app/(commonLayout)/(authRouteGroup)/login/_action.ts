"use server";
import { redirect } from "next/navigation";
import { httpClient } from "../../../../lib/axios/httpClient";
import { setTokenINCookies } from "../../../../lib/tokenUtils";
import { ILoginPayload, loginZodSchema } from "../../../../zod/auth.validation";
import { ILoginResponse, UserRole } from "../../../../types/auth.type";
import { getDefaultDashboardRoute, isValidRedirectForRole } from "../../../../lib/authUtils";

export const loginAction = async (payload: ILoginPayload, redirectPath?: string) => {
    const parsedPayload = loginZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        return { success: false, message: parsedPayload.error.issues[0].message || "Invalid input" };
    }

    try {
        const response = await httpClient.post<ILoginResponse>("/auth/login", parsedPayload.data);
        const { accessToken, refreshToken, token, user } = response.data;

        await setTokenINCookies("accessToken", accessToken);
        await setTokenINCookies("refreshToken", refreshToken);
        await setTokenINCookies("better-auth.session_token", token, 24 * 60 * 60);

        const targetPath = (redirectPath && isValidRedirectForRole(redirectPath, user.role as UserRole))
            ? redirectPath
            : getDefaultDashboardRoute(user.role as UserRole);

        redirect(targetPath);

    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

        const errorMessage = error.response?.data?.message || "";

        return {
            success: false,
            message: errorMessage || "Login Failed",
        };
    }
};