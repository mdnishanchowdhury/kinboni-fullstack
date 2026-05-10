"use client";

import { usePathname } from "next/navigation";
import { UserInfo } from "../../../types/auth.type";
import { NavSection } from "../../../types/dashboard.types";
import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "../../ui/scroll-area";
import { cn } from "../../../lib/utils";
import { getIconComponent } from "../../../lib/constants/iconMapper";
import { MdLogout } from "react-icons/md";
import { useLogout } from "../../../hooks/useLogout";

interface DashboardSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

function DashboardSidebarContent({
  dashboardHome,
  navItems,
}: DashboardSidebarContentProps) {
  const pathname = usePathname();
  const { logout, isLoading } = useLogout();

  return (
    <div
      className="hidden md:flex h-full w-64 flex-col bg-[#f8fafc] border-r border-slate-200 text-slate-800"
      suppressHydrationWarning
    >
      {/* LOGO */}
      <div className="flex h-[73px] items-center px-6 border-b border-slate-200">
        <Link href={dashboardHome} className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 rounded-xl overflow-hidden">
            <Image
              src="/image/logo/logoB.png"
              alt="Kinboni Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-800 group-hover:text-indigo-600 transition">
            Kinboni
          </span>
        </Link>
      </div>

      {/* NAV */}
      <ScrollArea className="flex-1 px-3 py-6">
        <nav className="space-y-6">
          {navItems.map((section, sectionId) => (
            <div key={sectionId} className="space-y-2">
              {section.title && (
                <h4 className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                  {section.title}
                </h4>
              )}

              <div className="space-y-1">
                {section.items.map((item, id) => {
                  const isActive = pathname === item.href;
                  const Icon = getIconComponent(item.icon);

                  return (
                    <Link
                      href={item.href}
                      key={id}
                      className={cn(
                        "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                        isActive
                          ? "bg-white shadow-sm text-indigo-600"
                          : "text-slate-600 hover:bg-white hover:text-slate-900"
                      )}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-0 h-full w-1 rounded-r bg-indigo-600" />
                      )}

                      <Icon
                        className={cn(
                          "h-5 w-5 transition",
                          isActive
                            ? "text-indigo-600"
                            : "text-slate-400 group-hover:text-slate-700"
                        )}
                      />

                      <span className="font-medium">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Logout Button */}
        <div className="flex items-center gap-3 px-3 pb-3">
          <button
          onClick={logout}
          disabled={isLoading}
          className={cn(
            "flex items-center justify-center gap-3 w-full py-2.5 rounded-xl transition-all duration-200 font-bold text-sm",
            "border border-red-100 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white hover:shadow-md",
            isLoading && "opacity-50 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200"
          )}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Please wait...</span>
            </>
          ) : (
            <>
              <MdLogout className="text-lg" />
              <span>Sign out</span>
            </>
          )}
        </button>
        </div>
      </div>
  );
}

export default DashboardSidebarContent;