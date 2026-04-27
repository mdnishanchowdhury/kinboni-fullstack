"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DesktopSearch() {
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        console.log("Searching for:", query);
    };

    return (
        <form
            onSubmit={handleSearch}
            className="hidden lg:flex flex-1 relative max-w-2xl group ml-60"
        >
            <div className="relative w-full">
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for products, brands and more..."
                    className="w-full bg-slate-100 py-[18px] px-6 rounded-full text-sm outline-none border-2 border-transparent focus:bg-white focus:border-green-600 focus-visible:ring-0 transition-all placeholder:text-slate-400 text-slate-700"
                />

                <Button
                    type="submit"
                    size="icon"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-black text-white rounded-full h-8 w-8 transition-all duration-300 shadow-sm"
                >
                    <FiSearch className="text-lg" />
                </Button>
            </div>
        </form>
    );
}