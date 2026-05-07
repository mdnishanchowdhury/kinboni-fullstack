"use server"

import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "../lib/auth/cookiesUtils";
import { RefreshTokenResponse, UserInfo } from "../types/auth.type";
import { httpClient } from "../lib/axios/httpClient";
import { cookies } from "next/headers";
import { setTokenINCookies } from "../lib/auth/tokenUtils";

export const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
        const result = await httpClient.get<UserInfo>("/auth/me");

        if (result.success && result.data) {
            const data = result.data as any;
            return {
                id: data.id || data._id,
                name: data.name || "Unknown User",
                email: data.email,
                role: data.role,
                status: data.status,
                image: data.image,
                ...data
            } as UserInfo;
        }

        const accessToken = await getCookie("accessToken");

        if (accessToken) {
            const decodedToken = jwt.decode(accessToken) as JwtPayload;

            if (decodedToken) {
                return {
                    id: decodedToken.userId || decodedToken.id || "",
                    name: decodedToken.name || "User",
                    email: decodedToken.email || "",
                    role: decodedToken.role || "CUSTOMER",
                } as UserInfo;
            }
        }

        return null;

    } catch (error: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Auth Check Failed:", error.message);
        }
        return null;
    }
};

export async function getNewAccessToken(): Promise<RefreshTokenResponse> {
    try {
        const refreshToken = await getCookie("refreshToken");
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("better-auth.session_token")?.value;

        if (!refreshToken) {
            return { tokenRefreshed: false, success: false };
        }

        const response = await httpClient.post("/auth/refresh-token",
            { refreshToken, sessionToken },
            {
                headers: {
                    'Cookie': `refreshToken=${refreshToken}; better-auth.session_token=${sessionToken || ""}`
                }
            }
        );

        const result = response as any;
        const apiData = result.data || result;

        const finalAccessToken = apiData.accessToken;
        const finalRefreshToken = apiData.refreshToken;
        const finalSessionToken = apiData.token || apiData.session?.token;

        if (!finalAccessToken) {
            throw new Error("New access token not found");
        }

        // Access Token 
        cookieStore.set("accessToken", finalAccessToken, {
            secure: true,
            httpOnly: true,
            maxAge: 3600, 
            path: "/",
            sameSite: "lax",
        });

        // Refresh Token
        if (finalRefreshToken) {
            cookieStore.set("refreshToken", finalRefreshToken, {
                secure: true,
                httpOnly: true,
                maxAge: 90 * 24 * 60 * 60,
                path: "/",
                sameSite: "lax",
            });
        }

        if (finalSessionToken) {
            await setTokenINCookies("better-auth.session_token", finalSessionToken, 24 * 60 * 60);
        }

        return {
            tokenRefreshed: true,
            success: true,
            accessToken: finalAccessToken
        };

    } catch (error: any) {
        console.error("Refresh Failed:", error.message);
        return {
            tokenRefreshed: false,
            success: false
        };
    }
}