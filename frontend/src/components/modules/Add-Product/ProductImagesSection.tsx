"use client";

import { Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { AppField } from '@/components/Shared/Form/Appfield';
import { Button } from '@/components/ui/button';

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-base font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <Icon size={20} className="text-emerald-600 dark:text-emerald-500" /> {title}
                </h3>
                <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    <span className="text-sm">✥</span> drag to reorder
                </span>
            </div>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );
}

export default function ProductImagesSection({ form }: { form: any }) {
    return (
        <Section icon={ImageIcon} title="Product Images">
            <form.Field name="images" mode="array">
                {
                    (imgFields: any) => {
                        const values = Array.isArray(imgFields.state.value) ? imgFields.state.value : [];

                        return (
                            <div className="space-y-3">
                                {values.map((_: any, i: number) => (
                                    <div
                                        key={i}
                                        className="flex flex-col md:flex-row gap-3 items-stretch md:items-center bg-[#fbfaf7] dark:bg-zinc-900/40 p-2.5 md:p-3 rounded-xl border border-[#f3f0e8] dark:border-zinc-800/80 shadow-2xs"
                                    >
                                        <div className="hidden sm:flex items-center justify-center w-11 h-11 rounded-lg border border-gray-200/60 bg-white dark:bg-zinc-900 text-slate-400 shrink-0 shadow-3xs">
                                            <ImageIcon size={18} />
                                        </div>

                                        {/* Image URL Input Field */}
                                        <div className="flex-[2.5] w-full">
                                            <form.Field name={`images[${i}].url`}>
                                                {(f: any) => (
                                                    <AppField
                                                        field={f}
                                                        label=""
                                                        placeholder="Image URL"
                                                        className="border-none bg-white dark:bg-zinc-950 md:bg-transparent h-10 text-sm w-full focus-visible:ring-0 focus-visible:bg-white dark:focus-visible:bg-zinc-900 px-3 md:px-2 rounded-lg"
                                                    />
                                                )}
                                            </form.Field>
                                        </div>

                                        {/* Alt Text Input Field */}
                                        <div className="flex-1 w-full">
                                            <form.Field name={`images[${i}].alt`}>
                                                {(f: any) => (
                                                    <AppField
                                                        field={f}
                                                        label=""
                                                        placeholder="Alt text"
                                                        className="border-none bg-white dark:bg-zinc-950 md:bg-transparent h-10 text-sm w-full focus-visible:ring-0 focus-visible:bg-white dark:focus-visible:bg-zinc-900 px-3 md:px-2 rounded-lg"
                                                    />
                                                )}
                                            </form.Field>
                                        </div>

                                        <div className="w-14 shrink-0">
                                            <form.Field name={`images[${i}].order`}>
                                                {(f: any) => (
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        value={f.state.value ?? ""}
                                                        onChange={(e) => f.handleChange(parseInt(e.target.value) || 1)}
                                                        onBlur={f.handleBlur}
                                                        placeholder="1"
                                                        className="w-full h-10 rounded-lg border-none bg-white dark:bg-zinc-950 md:bg-transparent text-center text-sm focus:outline-none focus:bg-white dark:focus:bg-zinc-900"
                                                    />
                                                )}
                                            </form.Field>
                                        </div>

                                        {/* Primary Tag*/}
                                        <div className="flex items-center justify-start md:justify-center px-2 shrink-0">
                                            {i === 0 ? (
                                                <span className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40 rounded-md border border-emerald-100/50 dark:border-emerald-900/30">
                                                    Primary
                                                </span>
                                            ) : (
                                                <span className="w-[49px]" />
                                            )}
                                        </div>

                                        {/* Actions Separator / Delete Button Wrapper */}
                                        <div className="flex items-center justify-end border-t border-gray-100 dark:border-zinc-800 md:border-none pt-2 md:pt-0">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    if (values.length > 1) {
                                                        imgFields.removeValue(i);
                                                    }
                                                }}
                                                className="h-9 w-9 p-0 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-slate-400 hover:text-red-500 hover:border-red-100 dark:hover:border-red-900/50 rounded-lg transition-all shrink-0"
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                                {/*Add Image Flat Button */}
                                <Button
                                    type="button"
                                    onClick={() => {
                                        imgFields.pushValue({
                                            url: "",
                                            alt: "",
                                            order: values.length + 1
                                        });
                                    }}
                                    className="w-full h-11 bg-white hover:bg-slate-50 text-slate-700 dark:bg-zinc-950 dark:hover:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl font-medium text-sm flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                                >
                                    <Plus size={15} /> Add Image
                                </Button>

                                {/* Validation Error Block */}
                                {imgFields.state.meta.errors && imgFields.state.meta.errors.length > 0 && (
                                    <p className="text-xs text-red-500 mt-1 px-1">
                                        {String(imgFields.state.meta.errors[0])}
                                    </p>
                                )}
                            </div>
                        );
                    }
                }
            </form.Field>
        </Section>
    );
}