"use client";

import { Palette, Trash2, Plus, Ruler } from 'lucide-react';
import { toast } from 'sonner';
import { AppField } from '@/components/Shared/Form/Appfield';
import { Button } from '@/components/ui/button';

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h3 className="text-base font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <Icon size={20} className="text-emerald-600 dark:text-emerald-500" /> {title}
            </h3>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}

interface ColorVariantsSectionProps {
    form: any;
}

export default function ColorVariantsSection({ form }: ColorVariantsSectionProps) {
    return (
        <Section icon={Palette} title="Color Variants">
            <form.Field name="variants" mode="array">
                {
                    (variantFields: any) => {
                        const variants = Array.isArray(variantFields.state.value) ? variantFields.state.value : [];

                        return (
                            <div className="space-y-4 ">
                                {
                                    variants.map((variant: any, vi: number) => {
                                        const currentHex = form.getFieldValue(`variants[${vi}].hex`) || "#000000";

                                        const variantKey = variant.id || `variant-${vi}`;

                                        return (
                                            <div
                                                key={variantKey}
                                                className="flex bg-[#fbfaf7]  dark:bg-zinc-900/50 rounded-xl border border-gray-200/80 dark:border-zinc-800/80 overflow-hidden shadow-2xs"
                                            >
                                                <div
                                                    className="w-1.5 shrink-0 transition-colors duration-200"
                                                    style={{ backgroundColor: currentHex }}
                                                />

                                                {/* Main Content Area */}
                                                <div className="flex-1 p-4 md:p-5 space-y-4">

                                                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                                                        <div className="flex-1 w-full">
                                                            <form.Field name={`variants[${vi}].name`}>
                                                                {(f: any) => (
                                                                    <AppField
                                                                        field={f}
                                                                        label=""
                                                                        placeholder="Variant Name (e.g. Tan Brown)"
                                                                        className="h-11 rounded-lg border-gray-200 dark:border-zinc-800 bg-transparent text-sm focus-visible:ring-emerald-500/20"
                                                                    />
                                                                )}
                                                            </form.Field>
                                                        </div>

                                                        {/* Color Picker Box & Input */}
                                                        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                                                            <form.Field name={`variants[${vi}].hex`}>
                                                                {
                                                                    (f: any) => (
                                                                        <div className="flex items-center gap-2.5 bg-transparent w-full sm:w-auto">

                                                                            <label
                                                                                className="w-9 h-9 rounded-lg cursor-pointer shrink-0 shadow-3xs border border-gray-100 dark:border-zinc-800 transition-transform active:scale-95"
                                                                                style={{ backgroundColor: f.state.value || "#000000" }}
                                                                            >
                                                                                <input
                                                                                    type="color"
                                                                                    value={f.state.value || "#000000"}
                                                                                    onChange={(e) => f.handleChange(e.target.value)}
                                                                                    className="sr-only"
                                                                                    onBlur={f.handleBlur}
                                                                                />
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                value={f.state.value || ""}
                                                                                onChange={(e) => f.handleChange(e.target.value)}
                                                                                onBlur={f.handleBlur}
                                                                                placeholder="#8B6F47"
                                                                                className="w-full sm:w-28 h-11 rounded-lg border border-gray-200 dark:border-zinc-800 bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/30 uppercase font-mono"
                                                                            />
                                                                        </div>
                                                                    )
                                                                }
                                                            </form.Field>
                                                        </div>
                                                    </div>

                                                    {/* Nested Sizes Section */}
                                                    <div className="space-y-2 pt-1">
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-1.5">
                                                            <Ruler size={12} className="text-emerald-600 dark:text-emerald-500" /> SIZES
                                                        </span>

                                                        <form.Field name={`variants[${vi}].sizes`} mode="array">
                                                            {
                                                                (sizeFields: any) => {
                                                                    const sizes = Array.isArray(sizeFields.state.value) ? sizeFields.state.value : [];

                                                                    return (
                                                                        <div className="flex flex-wrap gap-2.5 items-center">
                                                                            {sizes.map((sizeValue: any, si: number) => {
                                                                                const sizeKey = `size-${vi}-${si}`;

                                                                                return (
                                                                                    <div
                                                                                        key={sizeKey}
                                                                                        className="flex items-center h-9 pl-3 pr-1 bg-[#fbfaf7] dark:bg-zinc-900 border border-[#f3f0e8] dark:border-zinc-800 rounded-lg group transition-all focus-within:border-emerald-500/40"
                                                                                    >
                                                                                        <form.Field name={`variants[${vi}].sizes[${si}]`}>
                                                                                            {(f: any) => (
                                                                                                <input
                                                                                                    value={f.state.value || ""}
                                                                                                    onChange={(e) => f.handleChange(e.target.value)}
                                                                                                    onBlur={f.handleBlur}
                                                                                                    placeholder="40"
                                                                                                    className="w-8 bg-transparent text-sm font-medium text-slate-700 dark:text-zinc-300 focus:outline-none text-center"
                                                                                                />
                                                                                            )}
                                                                                        </form.Field>
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() => {
                                                                                                if (sizes.length > 1) {
                                                                                                    sizeFields.removeValue(si);
                                                                                                } else {
                                                                                                    toast.error("At least one size is required");
                                                                                                }
                                                                                            }}
                                                                                            className="w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 border border-transparent hover:border-red-100 dark:hover:border-red-900/30 transition-all cursor-pointer"
                                                                                        >
                                                                                            <span className="text-[11px]">✕</span>
                                                                                        </button>
                                                                                    </div>
                                                                                );
                                                                            })
                                                                            }

                                                                            {/* Inline Add Size Badge Button */}
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => sizeFields.pushValue("")}
                                                                                className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 h-9 bg-white dark:bg-zinc-950 hover:bg-slate-50 transition-all cursor-pointer"
                                                                            >
                                                                                <Plus size={13} /> Add Size
                                                                            </button>
                                                                        </div>
                                                                    );
                                                                }}
                                                        </form.Field>
                                                    </div>
                                                </div>

                                                {/* Right Sidebar Delete Column */}
                                                <div className="w-12 shrink-0 flex items-center justify-center border-l border-gray-100 dark:border-zinc-800/80 bg-slate-50/30 dark:bg-zinc-900/20">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        onClick={() => {
                                                            if (variants.length > 1) {
                                                                variantFields.removeValue(vi);
                                                            } else {
                                                                toast.error("At least one variant is required");
                                                            }
                                                        }}
                                                        className="h-full w-full rounded-none text-slate-300 hover:text-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-all cursor-pointer"
                                                    >
                                                        <Trash2 size={15} />
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })}

                                {/* Add Variant Big Button */}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        variantFields.pushValue({
                                            id: crypto.randomUUID(),
                                            name: "",
                                            hex: "#000000",
                                            sizes: ["40"]
                                        });
                                        toast.success("New variant card added");
                                    }}
                                    className="w-full h-11 bg-white hover:bg-slate-50 text-slate-700 dark:bg-zinc-950 dark:hover:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl font-medium text-sm flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                                >
                                    <Plus size={15} /> Add Variant
                                </Button>
                            </div>
                        );
                    }
                }
            </form.Field>
        </Section>
    );
}