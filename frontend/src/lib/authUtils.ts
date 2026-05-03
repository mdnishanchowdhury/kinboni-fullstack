import { UserRole } from "../types/auth.type";

export const authRoutes = ["/login", "/register", "/forget-password", "/reset-password", "/verify-email"];

export const isAuthRoute = (pathname: string) => authRoutes.includes(pathname);

export type RouteConfig = {
    exact: string[],
    pattern: RegExp[]
}

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/change-password"],
    pattern: [/^\/profile/],
}

export const adminProtectedRoutes: RouteConfig = {
    exact: ["/admin/dashboard", "/admin/dashboard/manage-users"],
    pattern: [/^\/admin\/dashboard/, /^\/super-admin/],
}

export const sellerProtectedRoutes: RouteConfig = {
    exact: ["/seller/dashboard", "/seller/dashboard/manage-products"],
    pattern: [/^\/seller\/dashboard/],
}

export const customerProtectedRoutes: RouteConfig = {
    exact: [
        "/member/dashboard",
        "/member/dashboard/my-purchases",
        "/member/dashboard/payment/success"
    ],
    pattern: [/^\/member\/dashboard/],
}

export const managerProtectedRoutes: RouteConfig = {
    exact: ["/manager/dashboard"],
    pattern: [/^\/manager\/dashboard/],
}

export const isRouteMatch = (pathname: string, routes: RouteConfig) => {
    return routes.exact.includes(pathname) || routes.pattern.some((p) => p.test(pathname));
}

export const getRouteOwner = (pathname: string): UserRole | "COMMON" | null => {
    if (isRouteMatch(pathname, adminProtectedRoutes)) return "ADMIN";
    if (isRouteMatch(pathname, sellerProtectedRoutes)) return "SELLER";
    if (isRouteMatch(pathname, customerProtectedRoutes)) return "CUSTOMER";
    if (isRouteMatch(pathname, managerProtectedRoutes)) return "MANAGER";
    if (isRouteMatch(pathname, commonProtectedRoutes)) return "COMMON";
    return null;
}

export const getDefaultDashboardRoute = (role: UserRole): string => {
    const dashboardMap: Record<UserRole, string> = {
        SUPER_ADMIN: "/super-admin/dashboard",
        ADMIN: "/admin/dashboard",
        SELLER: "/seller/dashboard",
        CUSTOMER: "/user/dashboard",
        MANAGER: "/manager/dashboard",
    };
    return dashboardMap[role] || "/";
}

export const isValidRedirectForRole = (redirectPath: string, role: UserRole) => {
    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") return true;

    if (role === "SUPER_ADMIN" && routeOwner === "ADMIN") return true;

    return routeOwner === role;
}