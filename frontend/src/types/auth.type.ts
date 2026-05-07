export interface ILoginResponse {
    token: string;
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: UserRole;
        image: string | null;
        phone: string | null;
        gender: Gender;
        status: UserStatus;
        needPasswordChange: boolean;
        isDeleted: boolean;
        emailVerified: boolean;
    }
}
export type UserRole = "SUPER_ADMIN" | "ADMIN" | "SELLER" | "CUSTOMER" | "MANAGER";
export type UserStatus = "ACTIVE" | "BLOCKED" | "PENDING";
export type Gender = "MALE" | "FEMALE" | "OTHER" | "UNSPECIFIED";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status?: UserStatus;
    bio?: string;
    address?: string;
    phone?: string;
    gender?: Gender;
    totalIdeasShared?: number;
    totalPurchases?: number;
    needPasswordChange?: boolean;
}

export interface IRegisterResponse {
    success: boolean;
    message: string;
    data: {
        data: {
            token: string | null;
            accessToken: string;
            refreshToken: string;
            user: {
                needPasswordChange: boolean;
                email: string;
                name: string;
                role: string;
                image: string;
                isActive: boolean;
                isDeleted: boolean;
                emailVerified: boolean;
            }
        }
    }
}

export interface IUserPayload {
    userId: string;
    role: UserRole;
    email: string;
    emailVerified: boolean;
    name?: string;
}

export interface RefreshTokenResponse {
    tokenRefreshed: boolean;
    success: boolean;
    accessToken?: string;
    message?: string;
}