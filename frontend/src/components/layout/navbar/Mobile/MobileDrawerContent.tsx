"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineDashboard, MdOutlineAddBox } from "react-icons/md";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import MobileCategoryMenu from "./MobileCategoryMenu";

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
        <div className="mb-8 bg-green-50 p-2 rounded-md flex items-center justify-between border border-green-100">
          <span className="text-sm font-bold text-slate-800">
            {isSellerMode ? "Seller Mode" : "Buyer Mode"}
          </span>
          <Switch checked={isSellerMode} onCheckedChange={setIsSellerMode} />
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
              <Button asChild variant="secondary" className="justify-start gap-3 py-5 rounded-md font-bold bg-slate-100">
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  <MdOutlineDashboard className="text-xl" /> Dashboard
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