"use client";

import {
    FolderPlus,
    ListTree,
    Package,
    LayoutDashboard,
} from "lucide-react";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import AddCategoryForm from "@/components/modules/Add-Category/Create-Category/AddCategoryForm";
import AddSubCategoryForm from "@/components/modules/Add-Category/Sub-Category/AddSubCategoryForm";
import AddItemsForm from "@/components/modules/Add-Category/Item-Category/AddItemsForm";

export default function CategoryPage() {
    return (
        <div className="min-h-screen mt-2 bg-gradient-to-br from-background via-background to-muted/30">
            <div className="w-full mx-auto">

                {/* CONTENT */}
                <div className="">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <LayoutDashboard className="h-10 w-10 text-primary" />

                            <div>
                                <h1 className="text-md md:text-2xl font-bold tracking-tight">
                                    Category Management
                                </h1>

                                <p className="text-[10px] text-muted-foreground">
                                    Manage categories, sub-categories & product items
                                    professionally
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TABS */}
                <div className="mt-4">
                    <Tabs defaultValue="category" className="space-y-6">
                        {/* TAB LIST */}
                        <TabsList className="grid h-auto w-full grid-cols-1 gap-3 rounded-2xl bg-transparent p-0 md:grid-cols-3">
                            {/* CATEGORY */}
                            <TabsTrigger
                                value="category"
                                className="group h-16 rounded-2xl border border-border/80 bg-background/70 px-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/5 data-[state=active]:border-emerald-500/40 data-[state=active]:bg-emerald-500/10"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 transition-all group-data-[state=active]:bg-emerald-500 group-data-[state=active]:text-white">
                                        <FolderPlus className="h-5 w-5" />
                                    </div>

                                    <div className="text-left">
                                        <p className="text-sm font-semibold">
                                            Add Category
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            Create new categories
                                        </p>
                                    </div>
                                </div>
                            </TabsTrigger>

                            {/* SUB CATEGORY */}
                            <TabsTrigger
                                value="subcategory"
                                className="group h-16 rounded-2xl border border-border/80 bg-background/70 px-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/5 data-[state=active]:border-blue-500/40 data-[state=active]:bg-blue-500/10"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition-all group-data-[state=active]:bg-blue-500 group-data-[state=active]:text-white">
                                        <ListTree className="h-5 w-5" />
                                    </div>

                                    <div className="text-left">
                                        <p className="text-sm font-semibold">
                                            Add Sub Category
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            Organize sub sections
                                        </p>
                                    </div>
                                </div>
                            </TabsTrigger>

                            {/* ITEMS */}
                            <TabsTrigger
                                value="items"
                                className="group h-16 rounded-2xl border border-border/80 bg-background/70 px-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-amber-500/40 hover:bg-amber-500/5 data-[state=active]:border-amber-500/40 data-[state=active]:bg-amber-500/10"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 transition-all group-data-[state=active]:bg-amber-500 group-data-[state=active]:text-white">
                                        <Package className="h-5 w-5" />
                                    </div>

                                    <div className="text-left">
                                        <p className="text-sm font-semibold">
                                            Add Items
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            Manage product items
                                        </p>
                                    </div>
                                </div>
                            </TabsTrigger>
                        </TabsList>

                        {/* CONTENT */}
                        <div className="rounded-3xl">
                            <TabsContent
                                value="category"
                                className="mt-0 animate-in fade-in-50 duration-300"
                            >
                                <AddCategoryForm />
                            </TabsContent>

                            <TabsContent
                                value="subcategory"
                                className="mt-0 animate-in fade-in-50 duration-300"
                            >
                                <AddSubCategoryForm />
                            </TabsContent>

                            <TabsContent
                                value="items"
                                className="mt-0 animate-in fade-in-50 duration-300"
                            >
                                <AddItemsForm />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}