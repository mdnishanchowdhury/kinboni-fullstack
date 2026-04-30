"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineDashboard, MdOutlineAddBox, MdKeyboardArrowDown } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import MobileCategoryMenu from "./MobileCategoryMenu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface MobileDrawerContentProps {
  setOpen: (open: boolean) => void;
  logo: any;
  isSellerMode: boolean;
  setIsSellerMode: (val: boolean) => void;
  navLinks: { name: string; path: string }[];
  categoriesData: any[];
  isLoading: boolean;
}

export default function MobileDrawerContent({
  setOpen,
  logo,
  isSellerMode,
  setIsSellerMode,
  categoriesData,
  isLoading,
  navLinks,
}: MobileDrawerContentProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-3 border-b flex items-center justify-between">
        <img className="h-8 w-auto" src={logo?.src || logo} alt="Logo" />
      </div>

      <div className="flex-1 overflow-y-auto p-6">


        {/* Mode Switcher */}
        <div className="mb-2 w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="w-full flex items-center justify-between px-5 py-5 rounded-md bg-[#F4F7FA] hover:bg-[#E8EEF5] border-none transition-all group focus-visible:ring-0 dark:bg-slate-100 dark:text-black"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[15px] font-semibold dark:text-black">
                    {isSellerMode ? "Seller Mode" : "Buyer Mode"}
                  </span>
                </div>

                <MdKeyboardArrowDown className="text-2xl text-slate-500 group-data-[state=open]:rotate-180 transition-transform duration-300" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="bottom"
              align="center"
              sideOffset={10}
              className="w-[calc(100vw-3rem)] w-[280px] rounded-md p-2 shadow-md border-none bg-white z-[9999] animate-in fade-in zoom-in-95 "
            >
              {[
                { label: "Buyer Mode", value: false },
                { label: "Seller Mode", value: true }
              ].map((mode) => (
                <DropdownMenuItem
                  key={mode.label}
                  onClick={() => setIsSellerMode(mode.value)}
                  className={`flex items-center gap-3 font-bold p-2 rounded-mdcursor-pointer transition-all mb-1 last:mb-0 ${isSellerMode === mode.value
                    ? "bg-green-600 text-white shadow-lg shadow-green-100"
                    : "text-slate-600 hover:bg-slate-50 hover:text-green-700"
                    }`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full border-2 ${isSellerMode === mode.value ? "bg-white border-white" : "bg-slate-200 border-slate-300"
                    }`} />
                  {mode.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/*Category Section */}
        {!isSellerMode && (
          <div className="w-full mb-4">
            {isLoading ? (
              <Button disabled className="w-full justify-center gap-3 py-6 rounded-xl font-bold bg-green-500">
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading Categories...
              </Button>
            ) : (
              <MobileCategoryMenu
                categoriesData={categoriesData}
                setOpen={setOpen}
              />
            )}
          </div>
        )}

        {/* Links */}
        <nav className="flex flex-col gap-1">
          {isSellerMode && (
            <div className="flex flex-col gap-3 mb-4">
              <Button asChild variant="secondary" className="justify-start gap-3 py-5 rounded-md font-bold bg-slate-100 dark:text-black ">
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  <MdOutlineDashboard className="text-xl dark:text-black" /> Dashboard
                </Link>
              </Button>
              <Button asChild className="justify-start gap-3 py-5 rounded-md font-bold bg-green-500">
                <Link href="/add-product" onClick={() => setOpen(false)}>
                  <MdOutlineAddBox className="text-xl" /> Add Product
                </Link>
              </Button>
              <div className="h-[1px] bg-slate-100 my-1 w-full" />
            </div>
          )}


          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setOpen(false)}
              className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${pathname === link.path
                ? "bg-green-500 text-white shadow-md"
                : "text-slate-600 hover:bg-green-50"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}