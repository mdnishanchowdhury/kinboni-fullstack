"use client";

import { useState, useTransition } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useGetItemCategoryList } from '@/hooks/useGetItemCategoryList';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ShopSidebar() {
  const { data: categories, isLoading } = useGetItemCategoryList();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  // Price Filter State
  const [minPrice, setMinPrice] = useState(searchParams.get('min') || "0");
  const [maxPrice, setMaxPrice] = useState(searchParams.get('max') || "30");

  const activeItemId = searchParams.get('itemId');
  const activeGender = searchParams.get('gender');
  const activeStatus = searchParams.get('status');

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === value) params.delete(key);
    else params.set(key, value);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handlePriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('min', minPrice);
    params.set('max', maxPrice);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className={`border border-slate-100 p-6 rounded-2xl bg-white shadow-sm space-y-8 transition-opacity duration-300 ${isPending ? "opacity-60" : "opacity-100"}`}>

      {/* Price Filter Section */}
      <div>
        <h3 className="font-bold text-slate-800 mb-4">Widget price filter</h3>
        <div className="flex items-center gap-2 mb-4">
          <Input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} suppressHydrationWarning className="w-20" />
          <span>-</span>
          <Input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-20" />
        </div>
        <Button onClick={handlePriceFilter} disabled={isPending} className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-lg">
          {isPending ? "Applying..." : "Filter"}
        </Button>
        <p className="text-sm text-slate-500 mt-2">Price: ${minPrice} — ${maxPrice}</p>
      </div>

      {/* Category Section */}
      <div>
        <h3 className="font-bold text-slate-800 mb-4">Product Categories</h3>
        {isLoading ? <p className="text-sm text-slate-400">Loading...</p> : (
          <ul className="space-y-1">
            <li
              className={`flex justify-between cursor-pointer px-3 py-2 rounded-lg transition-all ${!activeItemId ? "bg-slate-900 text-white font-medium" : "hover:bg-slate-100 text-slate-600"}`}
              onClick={() => startTransition(() => router.push(pathname, { scroll: false }))}
            >
              All <span>+</span>
            </li>
            {categories?.map((item: any) => (
              <li
                key={item.id}
                className={`flex justify-between cursor-pointer px-3 py-2 rounded-lg transition-all ${activeItemId === item.id ? "bg-slate-900 text-white font-medium" : "hover:bg-slate-100 text-slate-600"}`}
                onClick={() => handleFilter('itemId', item.id)}
              >
                {item.name} <span>+</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Product Status */}
      <div>
        <h3 className="font-bold text-slate-800 mb-4">Product Status</h3>
        <div className="space-y-3">
          {['Active', 'Flash sale', 'Out of stock'].map((s) => (
            <div key={s} className="flex items-center space-x-2">
              <Checkbox
                checked={activeStatus === s}
                onCheckedChange={() => handleFilter('status', s)}
                disabled={isPending}
              />
              <label className="text-sm cursor-pointer text-slate-600" onClick={() => handleFilter('status', s)}>
                {s}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <h3 className="font-bold text-slate-800 mb-4">Gender</h3>
        <div className="space-y-3">
          {['MALE', 'FEMALE', 'KIDS'].map((g) => (
            <div key={g} className="flex items-center space-x-2">
              <Checkbox
                checked={activeGender === g}
                onCheckedChange={() => handleFilter('gender', g)}
                disabled={isPending}
              />
              <label className="text-sm cursor-pointer text-slate-600" onClick={() => handleFilter('gender', g)}>
                {g.charAt(0) + g.slice(1).toLowerCase()}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}