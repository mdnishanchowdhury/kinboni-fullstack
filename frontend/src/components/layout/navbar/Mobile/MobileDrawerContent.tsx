"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineDashboard, MdOutlineAddBox } from "react-icons/md";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface MobileDrawerContentProps {
  setOpen: (open: boolean) => void;
  logo: any;
  isSellerMode: boolean;
  setIsSellerMode: (val: boolean) => void;
  navLinks: { name: string; path: string }[];
}

export default function MobileDrawerContent({
  setOpen,
  logo,
  isSellerMode,
  setIsSellerMode,
  navLinks,
}: MobileDrawerContentProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-5 border-b flex items-center justify-between">
        <img className="h-8 w-auto" src={logo?.src || logo} alt="Logo" />
      </div>

      <div className="p-6 overflow-y-auto">
        {/* Mode Switcher */}
        <div className="mb-8 bg-green-50 p-4 rounded-2xl flex items-center justify-between border border-green-100">
          <span className="text-sm font-bold text-slate-800">
            {isSellerMode ? "Seller Mode" : "Buyer Mode"}
          </span>
          <Switch checked={isSellerMode} onCheckedChange={setIsSellerMode} />
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1">
          {isSellerMode && (
            <div className="flex flex-col gap-3 mb-6">
              <Button asChild variant="secondary" className="justify-start gap-3 py-6 rounded-xl font-bold bg-slate-100">
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  <MdOutlineDashboard className="text-xl" /> Dashboard
                </Link>
              </Button>
              <Button asChild className="justify-start gap-3 py-6 rounded-xl font-bold bg-green-500">
                <Link href="/add-product" onClick={() => setOpen(false)}>
                  <MdOutlineAddBox className="text-xl" /> Add Product
                </Link>
              </Button>
              <div className="h-[1px] bg-slate-100 my-2 w-full" />
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setOpen(false)}
              className={`px-4 py-3.5 text-sm font-bold rounded-xl transition-all ${
                pathname === link.path ? "bg-green-500 text-white" : "text-slate-600 hover:bg-green-50"
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