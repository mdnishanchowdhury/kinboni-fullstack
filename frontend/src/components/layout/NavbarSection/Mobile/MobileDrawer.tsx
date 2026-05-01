"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineDashboard, MdOutlineAddBox } from "react-icons/md";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../../ui/sheet";
import { Switch } from "../../../ui/switch";
import { Button } from "../../../ui/button";

interface NavLinkItem {
  name: string;
  path: string;
}

interface MobileDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  logo: string;
  isSellerMode: boolean;
  setIsSellerMode: (val: boolean) => void;
  navLinks: NavLinkItem[];
}

export default function MobileDrawer({
  open,
  setOpen,
  logo,
  isSellerMode,
  setIsSellerMode,
  navLinks,
}: MobileDrawerProps) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-[300px] p-0 border-r-0">

        {/* Header Section */}
        <SheetHeader className="p-5 border-b bg-slate-50/50 flex flex-row items-center justify-between space-y-0">
          <SheetTitle>
            <img className="h-8 w-auto" src={logo} alt="Kinboni Logo" />
          </SheetTitle>
        </SheetHeader>

        <div className="p-6">

          {/* Mode Switcher Section */}
          <div className="mb-8 bg-green-50 p-4 rounded-2xl flex items-center justify-between border border-green-100">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-black text-green-600 tracking-widest">Mode</span>
              <span className="text-sm font-bold text-slate-800">
                {isSellerMode ? "Seller Central" : "Buyer Mode"}
              </span>
            </div>
            <Switch
              checked={isSellerMode}
              onCheckedChange={setIsSellerMode}
              className="data-[state=checked]:bg-green-500"
            />
          </div>

          <nav className="flex flex-col gap-1">

            {/* Seller Quick Actions */}
            {isSellerMode && (
              <div className="flex flex-col gap-3 mb-6 animate-in slide-in-from-left-4">
                <Button
                  asChild
                  variant="secondary"
                  className="w-full justify-start gap-3 py-6 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 border-none"
                >
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    <MdOutlineDashboard className="text-xl" /> Dashboard
                  </Link>
                </Button>

                <Button
                  asChild
                  className="w-full justify-start gap-3 py-6 rounded-xl font-bold bg-green-500 hover:bg-black transition-all shadow-md"
                >
                  <Link href="/add-product" onClick={() => setOpen(false)}>
                    <MdOutlineAddBox className="text-xl" /> Add Product
                  </Link>
                </Button>
                <div className="h-[1px] bg-slate-100 my-2 w-full" />
              </div>
            )}

            {/* Navigation Links */}
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">Menu</p>
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setOpen(false)}
                    className={`flex items-center px-4 py-3.5 text-sm font-bold rounded-xl transition-all ${isActive
                        ? "bg-green-500 text-white shadow-lg shadow-green-200"
                        : "text-slate-600 hover:bg-green-50 hover:text-green-600"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Footer Area */}
        <div className="absolute bottom-8 left-0 w-full px-6 text-center">
          <p className="text-[10px] text-slate-400 font-bold">© 2026 KINBONI. All rights reserved.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}