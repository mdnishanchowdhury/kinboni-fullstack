"use client";

import { HiOutlineChatAlt2 } from "react-icons/hi";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../../../ui/dropdown-menu";
import { Button } from "../../../ui/button";

interface MessageDropdownProps { }

export default function MessageDropdown({ }: MessageDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer hover:text-green-600 text-gray-700 outline-none transition-colors group">
          <HiOutlineChatAlt2 className="text-2xl  dark:text-white" />

          {/* Notification */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 mt-4 p-6 bg-white shadow-2xl rounded-2xl border-gray-100 z-[110] animate-in slide-in-from-top-2"
      >
        <h3 className="text-sm font-extrabold text-gray-800 text-left mb-6 uppercase tracking-tight">
          Messages
        </h3>

        <div className="text-center py-2">
          <div className="w-20 h-16 bg-green-50 mx-auto rounded-xl flex items-center justify-center mb-4 transition-transform hover:scale-105">
            <HiOutlineChatAlt2 className="text-3xl text-green-500" />
          </div>

          <p className="text-gray-500 text-[11px] mb-6 font-extrabold uppercase tracking-wide">
            No new messages yet
          </p>

          <Button
            variant="default"
            asChild
            className="w-full bg-green-500 hover:bg-black text-white font-bold py-6 rounded-full transition-all text-xs tracking-widest shadow-md"
          >
            <Link href="/messages">VIEW MORE</Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}