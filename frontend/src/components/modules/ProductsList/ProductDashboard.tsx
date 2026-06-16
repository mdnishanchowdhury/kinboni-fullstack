"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, LayoutList, LayoutGrid, Package, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddProductDialog } from "./AddProductDialog";
import { StatsRow } from "./StatsRow";
import { ProductTable } from "./ProductTable";
import { ProductGrid } from "./ProductGrid";
import { useProducts } from "@/hooks/useProduct";
import { SortOption, StatusFilter, ViewMode, Gender, ProductFilters } from "@/types/product.types";

const PER_PAGE = 10;

export function ProductDashboard() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [view, setView] = useState<ViewMode>("list");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [query]);

  const backendFilters: ProductFilters = useMemo(() => {
    let status = undefined;
    if (statusFilter === "active") status = "Active";
    if (statusFilter === "flash") status = "Flash sale";
    if (statusFilter === "out") status = "Out of stock";

    let sort = undefined;
    if (sortOption === "price-asc") sort = "Price: low → high";
    if (sortOption === "price-desc") sort = "Price: high → low";
    if (sortOption === "stock") sort = "Stock: low → high";

    return {
      search: debouncedQuery || undefined,
      gender: (genderFilter === "all" ? undefined : genderFilter) as Gender | undefined,
      status: status as any,
      sort: sort as any,
      page,
      limit: PER_PAGE
    };
  }, [debouncedQuery, genderFilter, statusFilter, sortOption, page]);

  const { data: apiResponse, isLoading, isFetching } = useProducts(backendFilters);

  const products = (apiResponse as any)?.products || (apiResponse as any)?.data?.products || [];
  const totalFiltered = (apiResponse as any)?.meta?.totalProducts || (apiResponse as any)?.data?.meta?.totalProducts || 0;

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    alert(`Delete triggers for: ${id}`);
  }

  function handleEdit(id: string) {
    alert(`Edit triggers for: ${id}`);
  }

  function handleFilterChange(setter: () => void) {
    setter();
    setPage(1);
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Catalog Matrix</h1>
              <p className="text-sm text-muted-foreground">Manage products & variations</p>
            </div>
          </div>
          <AddProductDialog />
        </div>

        <div className="mb-6">
          <StatsRow products={products} />
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Query name, description, brand…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={genderFilter} onValueChange={(v) => handleFilterChange(() => setGenderFilter(v))}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="All genders" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All genders</SelectItem>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="KIDS">Kids</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(v) => handleFilterChange(() => setStatusFilter(v as StatusFilter))}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="flash">Flash sale</SelectItem>
              <SelectItem value="out">Out of stock</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOption} onValueChange={(v) => setSortOption(v as SortOption)}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="price-asc">Price: low → high</SelectItem>
              <SelectItem value="price-desc">Price: high → low</SelectItem>
              <SelectItem value="stock">Stock: low → high</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex rounded-md border overflow-hidden">
            <Button variant={view === "list" ? "secondary" : "ghost"} size="icon" className="h-9 w-9 rounded-none border-0" onClick={() => setView("list")}>
              <LayoutList className="h-4 w-4" />
            </Button>
            <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" className="h-9 w-9 rounded-none border-0 border-l" onClick={() => setView("grid")}>
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className={`relative transition-opacity duration-200 ${isFetching ? "opacity-70 pointer-events-none" : "opacity-100"}`}>
          {isFetching && (
            <div className="absolute top-2 right-25 flex items-center gap-2 bg-background/90 px-3 py-1 rounded-md border text-xs text-muted-foreground z-10 shadow-sm">
              <Loader2 className="h-3 w-3 animate-spin text-green-500" />
              Syncing...
            </div>
          )}

          {view === "list" ? (
            <ProductTable
              products={products}
              page={page}
              perPage={PER_PAGE}
              totalFiltered={totalFiltered}
              onPageChange={setPage}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  );
}