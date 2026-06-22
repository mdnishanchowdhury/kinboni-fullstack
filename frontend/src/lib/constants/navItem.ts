import { UserRole } from "../../types/auth.type";
import { NavSection } from "../../types/dashboard.types";
import { getDefaultDashboardRoute } from "../auth/authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);
    const roleBase = role.toLowerCase().replace("_", "-");

    return [
        {
            items: [
                {
                    title: "Home",
                    href: "/",
                    icon: "Home"
                },
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard"
                },
                {
                    title: "My Profile",
                    href: `/${roleBase}/dashboard/my-profile`,
                    icon: "User"
                }
            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: `/${roleBase}/dashboard/change-password`,
                    icon: "Settings"
                }
            ]
        }
    ]
}

export const superAdminNavItems: NavSection[] = [
    {
        title: "System Control",
        items: [
            {
                title: "Manage Admins",
                href: "/super-admin/dashboard/manage-admins",
                icon: "ShieldCheck"
            },
            {
                title: "Platform Statistics",
                href: "/super-admin/dashboard/stats",
                icon: "BarChart3"
            },
            {
                title: "System Logs",
                href: "/super-admin/dashboard/logs",
                icon: "Activity"
            },
        ]
    }
];

export const adminNavItems: NavSection[] = [
    {
        title: "Admin Management",
        items: [
            {
                title: "Categorys",
                href: "/admin/dashboard/category",
                icon: "Tags"
            },
            {
                title: "Products",
                href: "/admin/dashboard/products",
                icon: "PlusCircle"
            },
            {
                title: "Orders",
                href: "/admin/dashboard/orders",
                icon: "ListOrdered"
            },
        ]
    }
];

export const sellerNavItems: NavSection[] = [
    {
        title: "Shop Management",
        items: [
            {
                title: "My Products",
                href: "/seller/dashboard/my-products",
                icon: "Package"
            },
            {
                title: "Add Product",
                href: "/seller/dashboard/add-product",
                icon: "Plus"
            },
            {
                title: "Sales Orders",
                href: "/seller/dashboard/orders",
                icon: "ShoppingCart"
            },
            {
                title: "Earnings",
                href: "/seller/dashboard/earnings",
                icon: "Wallet"
            },
        ]
    }
];

export const customerNavItems: NavSection[] = [
    {
        title: "Personal Account",
        items: [
            {
                title: "My Orders",
                href: "/customer/dashboard/orders",
                icon: "ShoppingBag"
            },
            {
                title: "My Wishlist",
                href: "/customer/dashboard/wishlist",
                icon: "Heart"
            },
            {
                title: "Support Ticket",
                href: "/customer/dashboard/support",
                icon: "LifeBuoy"
            },
        ]
    }
];

export const managerNavItems: NavSection[] = [
    {
        title: "Operations",
        items: [
            {
                title: "Staff List",
                href: "/manager/dashboard/staff",
                icon: "Users"
            },
            {
                title: "Inventory Check",
                href: "/manager/dashboard/inventory",
                icon: "ClipboardList"
            },
            {
                title: "Performance",
                href: "/manager/dashboard/performance",
                icon: "TrendingUp"
            },
        ]
    }
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "SUPER_ADMIN":
            return [...commonNavItems, ...superAdminNavItems];

        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];

        case "SELLER":
            return [...commonNavItems, ...sellerNavItems];

        case "MANAGER":
            return [...commonNavItems, ...managerNavItems];

        case "CUSTOMER":
            return [...commonNavItems, ...customerNavItems];

        default:
            return commonNavItems;
    }
}