"use client";

import { usePathname } from "next/navigation";
import Footer from "../../components/Shared/Footer/Footer";
import Navbar from "../../components/Shared/Navbar/Navbar";
import { Toaster } from "sonner";

export default function CommonLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const hideNavbarFooter = pathname === "/login" || pathname === "/register";

    return (
        <div>
           <Toaster richColors position="top-center" />
            {!hideNavbarFooter && <Navbar />}

            <main className={`${!hideNavbarFooter ? "max-w-[1440px] mx-auto mt-4" : "w-full"}`}>
                {children}
            </main>

            {!hideNavbarFooter && <Footer />}
        </div>
    );
}