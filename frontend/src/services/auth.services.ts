"use server"

import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "../lib/auth/cookiesUtils";
import { UserInfo } from "../types/auth.type";
import { httpClient } from "../lib/axios/httpClient";

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