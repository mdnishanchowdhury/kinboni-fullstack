"use client";

import { usePathname } from "next/navigation";
import { UserInfo } from "../../../types/auth.type";
import { NavSection } from "../../../types/dashboard.types";
import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "../../ui/scroll-area";
import { cn } from "../../../lib/utils";
import { getIconComponent } from "../../../lib/constants/iconMapper";
import { LogOut } from "lucide-react";
import { Button } from "../../ui/button";

interface DashboardSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

function DashboardSidebarContent({
  dashboardHome,
  navItems,
  userInfo,
}: DashboardSidebarContentProps) {
  const pathname = usePathname();

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

      {/* UPDATED USER CARD WITH LOGOUT */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
            {userInfo.name?.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">
              {userInfo.name}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {userInfo.role}
            </p>
          </div>

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
            onClick={() => {
              console.log("Logging out...");
            }}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebarContent;