"use client";

import { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineSwitchHorizontal } from "react-icons/hi";
import Image from "next/image";
import logo from "../../../../public/image/logo/logoT.png";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import AnnouncementBar from "@/components/layout/navbar/Announcement/AnnouncementBar";
import MobileDrawerContent from "@/components/layout/navbar/Mobile/MobileDrawerContent";
import DesktopSearch from "@/components/layout/navbar/Desktop/DesktopSearch";
import MessageDropdown from "@/components/layout/navbar/Dropdowns/MessageDropdown";
import CartDropdown from "@/components/layout/navbar/Dropdowns/CartDropdown";
import AccountDropdown from "@/components/layout/navbar/Dropdowns/AccountDropdown";
import MobileSearchBar from "@/components/layout/navbar/Mobile/MobileSearchBar";
import DesktopNavigation from "@/components/layout/navbar/Desktop/DesktopNavigation";
import { categoriesData } from "@/components/layout/navbar/Category/categories";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isSellerMode, setIsSellerMode] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  if (!mounted) return null;

  return (
    <>
      <AnnouncementBar isSellerMode={isSellerMode} />

      <header className="w-full sticky top-0 z-[100] bg-white shadow-sm font-DM pt-1 lg:pt-0">
        <div className="max-w-[1440px] mx-auto py-[2px] flex items-center justify-between gap-6">

          <div className="flex items-center gap-3">

            {/* Mobile Drawer */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <HiOutlineMenu className="text-2xl text-gray-700" />
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
                  />
                </div>
              </SheetContent>
            </Sheet>

            <div className="relative h-8 w-24 lg:h-11 lg:w-32 cursor-pointer">
              <Image
                src={logo}
                alt="KINBONI"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <DesktopSearch />

          <div className="flex items-center gap-2 lg:gap-6">
            <Button
              variant={isSellerMode ? "default" : "outline"}
              onClick={handleModeToggle}
              className={`hidden md:flex gap-2 rounded-full font-bold text-xs h-9 px-5 transition-all active:scale-95 ${isSellerMode
                  ? "bg-green-600 hover:bg-black text-white border-none"
                  : "text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
            >
              <HiOutlineSwitchHorizontal className="text-lg" />
              {isSellerMode ? "Switch to Buying" : "Switch to Selling"}
            </Button>

            <div className="flex items-center gap-1 lg:gap-3">
              <MessageDropdown />
              <CartDropdown isSellerMode={isSellerMode} />
              <AccountDropdown />
            </div>
          </div>
        </div>

        <div className="relative z-[40]">
          <MobileSearchBar />
        </div>

        <DesktopNavigation
          navLinks={navLinks}
          categoriesData={categoriesData}
          isSellerMode={isSellerMode}
        />
      </header>
    </>
  );
}

export default Navbar;