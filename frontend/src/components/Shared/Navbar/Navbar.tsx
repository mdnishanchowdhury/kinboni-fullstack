"use client";

import { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineSwitchHorizontal } from "react-icons/hi";
import Image from "next/image";
import logo from "../../../../public/image/logo/logoT.png";

import AnnouncementBar from "../../layout/NavbarSection/Announcement/AnnouncementBar";
import MobileDrawerContent from "../../layout/NavbarSection/Mobile/MobileDrawerContent";
import DesktopSearch from "../../layout/NavbarSection/Desktop/DesktopSearch";
import MessageDropdown from "../../layout/NavbarSection/Dropdowns/MessageDropdown";
import CartDropdown from "../../layout/NavbarSection/Dropdowns/CartDropdown";
import AccountDropdown from "../../layout/NavbarSection/Dropdowns/AccountDropdown";
import MobileSearchBar from "../../layout/NavbarSection/Mobile/MobileSearchBar";
import DesktopNavigation from "../../layout/NavbarSection/Desktop/DesktopNavigation";
import { Button } from "../../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { useCategories } from "../../../hooks/useCategories";
import Link from "next/link";
import { useUser } from "../../../hooks/useUser";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isSellerMode, setIsSellerMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data, isLoading: isCategoryLoading } = useCategories();
  const { user, isLoading: isUserLoading } = useUser();

  const userRole = user?.role ? user.role.toLowerCase().replace('_', '-') : null;
  const categoriesData = data?.data || [];

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem("isSellerMode");
    if (savedMode === "true") setIsSellerMode(true);
  }, []);

  const handleModeToggle = () => {
    setIsSellerMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("isSellerMode", String(newMode));
      return newMode;
    });
  };

  const handleDrawerModeChange = (val: boolean) => {
    setIsSellerMode(val);
    localStorage.setItem("isSellerMode", String(val));
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Seller", path: "/seller" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  if (userRole) {
    navLinks.push({ name: "Dashboard", path: `/${userRole}/dashboard` });
  }

  if (!mounted) return null;

  return (
    <>
      <AnnouncementBar isSellerMode={isSellerMode} />

      <header className="w-full sticky top-0 z-[100] bg-white shadow-sm font-DM pt-1 lg:pt-0 dark:bg-black">
        <div className="max-w-[1440px] mx-auto py-[2px] px-2 flex items-center justify-between gap-1">

          <div className="flex items-center gap-3">
            {/* Mobile Drawer */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <HiOutlineMenu className="text-2xl text-gray-700 dark:text-white" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="p-0 w-[280px] border-none bg-white z-[1001] shadow-2xl"
              >
                <div className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </div>
                <div className="h-full bg-white">
                  <MobileDrawerContent
                    setOpen={setOpen}
                    logo={logo}
                    isSellerMode={isSellerMode}
                    setIsSellerMode={handleDrawerModeChange}
                    navLinks={navLinks}
                    categoriesData={categoriesData}
                    isLoading={isCategoryLoading}
                  />
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="relative h-8 w-24 lg:h-11 lg:w-32 cursor-pointer">
              <Image
                src={logo}
                alt="KINBONI"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 128px"
              />
            </Link>
          </div>

          <DesktopSearch />

          <div className="flex items-center gap-2 lg:gap-6">
            {/* Mode Switcher */}
            <Button
              variant={isSellerMode ? "default" : "outline"}
              onClick={handleModeToggle}
              className={`hidden md:flex gap-2 rounded-full font-bold text-xs h-9 px-5 transition-all active:scale-95 ${isSellerMode
                ? "bg-green-600 hover:bg-black text-white border-none"
                : "text-gray-600 border-gray-200 hover:bg-gray-50 dark:text-white"
                }`}
            >
              <HiOutlineSwitchHorizontal className="text-lg" />
              {isSellerMode ? "Switch to Buying" : "Switch to Selling"}
            </Button>

            {/* Icons & Account Section */}
            <div className="flex items-center gap-1 lg:gap-3">

              <CartDropdown isSellerMode={isSellerMode} />
              {!isUserLoading && (
                user ? (
                  <>
                    <MessageDropdown />
                    <AccountDropdown />
                  </>
                ) : (
                  <div className="flex items-center space-x-1 lg:space-x-2 ml-1 lg:ml-2">
                    <Link href="/login">
                      <Button variant="outline" size="sm" className="h-7 text-xs lg:h-8 lg:text-sm px-2 lg:px-4">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button size="sm" className="h-7 text-xs lg:h-8 lg:text-sm px-2 lg:px-4 bg-green-500 hover:bg-black text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="relative z-[40]">
          <MobileSearchBar />
        </div>

        <DesktopNavigation
          navLinks={navLinks}
          categoriesData={categoriesData}
          isLoading={isCategoryLoading}
          isSellerMode={isSellerMode}
        />
      </header>
    </>
  );
}

export default Navbar;