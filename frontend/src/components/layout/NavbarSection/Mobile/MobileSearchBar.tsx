"use client";

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";

export default function MobileSearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log("Mobile search for:", query);
  };

  return (
    <div className="px-4 py-2 lg:hidden w-full">
      <form onSubmit={handleSearch} className="relative group">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="I'm searching for..."
          className="w-full bg-slate-100 border-none h-11 px-5 pr-12 rounded-full text-sm outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus:bg-white transition-all placeholder:text-slate-400
          dark:border-slate-700 dark:bg-slate-800 dark:focus:bg-slate-900 dark:placeholder:text-slate-500"
        />

        <Button
          type="submit"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-black text-white rounded-full h-9 w-9 shadow-md transition-all active:scale-95"
        >
          <FiSearch className="text-lg" />
        </Button>
      </form>
    </div>
  );
}