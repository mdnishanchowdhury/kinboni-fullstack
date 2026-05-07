"use client";

import { useEffect, useState } from "react";
import { UserInfo } from "../../../types/auth.type";
import { NavSection } from "../../../types/dashboard.types";
import { Bell, Menu, MessageSquare, Search, Settings, X } from "lucide-react";
import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
import UserDropdown from "./UserDropdown";

interface DashboardNavbarContentProps {
  userInfo: UserInfo;
  navItems?: NavSection[];
  dashboardHome?: string;
}

const DashboardNavbarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardNavbarContentProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-2 z-50 w-full bg-[#f8fafc] border-b border-slate-200">
      <div
        className={cn(
          "w-full mx-auto flex h-12 md:h-16 items-center justify-between px-3 md:px-6 rounded-2xl border transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-slate-200"
            : "bg-white/60 backdrop-blur-md border-transparent"
        )}
      >
        {/* MOBILE SEARCH OVERLAY */}
        {isMobileSearchOpen && (
          <div className="absolute inset-0 z-50 flex items-center bg-white/90 backdrop-blur-lg px-4 md:hidden rounded-2xl">
            <div className="relative flex flex-1 items-center">
              <Search className="absolute left-4 h-4 w-4 text-slate-400" />
              <input
                autoFocus
                type="search"
                placeholder="Search anything..."
                className="w-full h-11 pl-11 pr-10 bg-slate-100 border border-slate-200 rounded-full text-sm outline-none focus:border-indigo-500"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1"
                onClick={() => setIsMobileSearchOpen(false)}
              >
                <X className="h-5 w-5 text-slate-500" />
              </Button>
            </div>
          </div>
        )}

        {/* LEFT */}
        <div className={cn("flex items-center gap-2", isMobileSearchOpen && "opacity-0")}>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5 text-slate-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <DashboardMobileSidebar
                userInfo={userInfo}
                navItems={navItems || []}
                dashboardHome={dashboardHome || "/dashboard"}
              />
            </SheetContent>
          </Sheet>

          {/* LOGO */}
          <h1 className="hidden md:block text-sm font-semibold text-slate-700">
            Dashboard
          </h1>
        </div>

        {/* CENTER SEARCH */}
        <div className="flex-1 hidden md:flex justify-center px-6">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Search projects, users..."
              className="w-full h-11 pl-11 pr-4 bg-white/70 border border-slate-200 rounded-full text-sm shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className={cn("flex items-center gap-2 md:gap-3", isMobileSearchOpen && "opacity-0")}>

          {/* Mobile search */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileSearchOpen(true)}
          >
            <Search className="h-5 w-5 text-slate-600" />
          </Button>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-1">
            <Button variant="ghost" size="icon" className="hover:bg-slate-100 rounded-full">
              <Settings className="h-5 w-5 text-slate-500 hover:text-indigo-600" />
            </Button>
          </div>



          {/* Notification */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
              <Bell className="h-5 w-5 text-slate-600" />
            </Button>
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white" />
          </div>

          {/* Messages */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
              <MessageSquare className="h-5 w-5 text-slate-600" />
            </Button>
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </div>

          {/* Divider */}
          <div className="hidden md:block h-6 w-px bg-slate-200 mx-2" />

          {/* USER */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="hidden lg:block text-right leading-tight">
              <p className="text-sm font-medium text-slate-800 group-hover:text-indigo-600 transition">
                {userInfo.name}
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                {userInfo.role}
              </p>
            </div>

            <div className="ring-2 ring-transparent group-hover:ring-indigo-400 rounded-full transition">
              <UserDropdown userInfo={userInfo} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbarContent;