"use client";

import { ChevronDown, Info, Loader2, ImagePlus } from 'lucide-react';
import { AppField } from '@/components/Shared/Form/Appfield';
import { useGetItemCategoryList } from '@/hooks/useGetItemCategoryList';
import { toast } from 'sonner';

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h3 className="text-base font-bold flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <Icon size={18} className="text-green-500" /> {title}
            </h3>
            <div className="p-5 md:p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-[#fbfaf7] dark:bg-zinc-900/20 space-y-5">
                {children}
            </div>
        </div>
    );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest px-1 block mb-1">
            {children}
        </label>
    );
}

const textareaCls = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500/40 dark:bg-zinc-950 dark:border-zinc-800";
const selectCls = "w-full h-9 px-4 rounded-xl appearance-none cursor-pointer bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 text-sm font-medium text-slate-700 dark:text-zinc-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500";

export default function BasicInfoSection({ form }: { form: any }) {
    const { data: itemCategories, isLoading: isCategoryLoading } = useGetItemCategoryList();
    const MAX_THUMBNAIL_SIZE = 1 * 1024 * 1024;

    return (
        <Section icon={Info} title="Basic Information">

            {/* Product Name & Slug */}
            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <FieldLabel>Product Name</FieldLabel>
                    <form.Field name="name">
                        {(field: any) => <AppField field={field} label="" placeholder="e.g. Full-Grain Leather Chelsea Boots" className="rounded-xl h-12" />}
                    </form.Field>
                </div>
                <div>
                    <FieldLabel>Slug</FieldLabel>
                    <form.Field name="slug">
                        {(field: any) => <AppField field={field} label="" placeholder="e.g. leather-chelsea-boots-tan" className="rounded-xl h-12" />}
                    </form.Field>
                </div>
            </div>

            {/* Description */}
            <div>
                <FieldLabel>Description</FieldLabel>
                <form.Field name="description">
                    {(field: any) => (
                        <div>
                            <textarea
                                value={field.state.value || ""}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                placeholder="Describe the product in detail..."
                                rows={3}
                                className={textareaCls}
                            />
                            {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                                <p className="text-xs text-red-500 mt-1 px-1">
                                    {typeof field.state.meta.errors[0] === 'object'
                                        ? (field.state.meta.errors[0] as any)?.message || "Invalid input"
                                        : String(field.state.meta.errors[0])}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>
            </div>

            {/* Category, Gender, Brand */}
            <div className="grid gap-5 md:grid-cols-3">
                <div className='pt-1'>
                    <FieldLabel>Category</FieldLabel>
                    <form.Field name="itemId">
                        {(field: any) => (
                            <div className="relative group">
                                <select
                                    value={field.state.value || ""}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    className={`${selectCls} ${field.state.meta.errors?.length > 0 ? "border-red-500 focus:ring-red-500/20" : ""}`}
                                    disabled={isCategoryLoading}
                                >
                                    <option value="" disabled>
                                        {isCategoryLoading ? "Loading categories..." : "Select Category"}
                                    </option>
                                    {itemCategories && itemCategories.map((cat: any) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>

                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
                                    {isCategoryLoading ? (
                                        <Loader2 size={16} className="animate-spin text-green-500" />
                                    ) : (
                                        <ChevronDown size={18} />
                                    )}
                                </div>
                            </div>
                        )}
                    </form.Field>
                </div>

                <div className='pt-1'>
                    <FieldLabel>Gender</FieldLabel>
                    <form.Field name="gender">
                        {(field: any) => (
                            <div className="relative group">
                                <select
                                    value={field.state.value || ""}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    className={`${selectCls} ${field.state.meta.errors?.length > 0 ? "border-red-500 focus:ring-red-500/20" : ""}`}
                                >
                                    <option value="" disabled>Select Gender</option>
                                    {(["Male", "Female", "Kids"] as const).map((g) => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
                                    <ChevronDown size={18} />
                                </div>
                            </div>
                        )}
                    </form.Field>
                </div>

                <div>
                    <FieldLabel>Brand Name</FieldLabel>
                    <form.Field name="brandName">
                        {(field: any) => <AppField field={field} label="" placeholder="e.g. Apex" className="rounded-xl h-12" />}
                    </form.Field>
                </div>
            </div>

            {/* Brand Origin & Thumbnail File Input */}
            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <FieldLabel>Brand Origin</FieldLabel>
                    <form.Field name="brandOrigin">
                        {(field: any) => <AppField field={field} label="" placeholder="e.g. Bangladesh" className="rounded-xl h-12" />}
                    </form.Field>
                </div>

                <div>
                    <FieldLabel>Product Thumbnail Image</FieldLabel>
                    <form.Field name="thumbnail">
                        {(field: any) => (
                            <div className="flex flex-col justify-center w-full pt-1">
                                <div className="relative flex items-center h-8 w-full bg-background border border-input rounded-xl px-3 shadow-sm hover:border-gray-300 transition-all">
                                    <ImagePlus size={16} className="text-slate-400 mr-2 shrink-0" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full bg-transparent text-xs text-zinc-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer focus:outline-none"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                if (file.size > MAX_THUMBNAIL_SIZE) {
                                                    toast.error("Thumbnail image exceeds 1MB limit!");
                                                    e.target.value = "";
                                                    field.handleChange(undefined);
                                                    return;
                                                }
                                                field.handleChange(file);
                                            } else {
                                                field.handleChange(undefined);
                                            }
                                        }}
                                    />
                                </div>

                                {field.state.value && typeof field.state.value !== 'string' && (
                                    <span className="text-[10px] text-green-600 font-medium px-1 mt-1 block truncate">
                                        Selected: {field.state.value.name}
                                    </span>
                                )}

                                {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                                    <p className="text-xs text-red-500 mt-1 px-1">
                                        {typeof field.state.meta.errors[0] === 'object' && field.state.meta.errors[0] !== null
                                            ? (field.state.meta.errors[0] as any).message
                                            : String(field.state.meta.errors[0])}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>
                </div>
            </div>
        </Section>
    );
}