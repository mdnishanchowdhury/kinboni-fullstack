"use client";

import React from 'react';
import { Trash2, Plus, Image as ImageIcon, ImagePlus } from 'lucide-react';
import { AppField } from '@/components/Shared/Form/Appfield';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SectionProps {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    title: string;
    children: React.ReactNode;
}

function Section({ icon: Icon, title, children }: SectionProps) {
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
    const MAX_IMAGE_SIZE = 1 * 1024 * 1024;
    return (
        <Section icon={ImageIcon} title="Product Images">
            <form.Field name="images" mode="array">
                {(imgFields: any) => {
                    const values = Array.isArray(imgFields.state.value) ? imgFields.state.value : [];

                    return (
                        <div className="space-y-3">
                            {values.map((item: any, i: number) => (
                                <div
                                    key={i}
                                    className="flex flex-col md:flex-row gap-4 items-stretch md:items-center bg-[#fbfaf7] dark:bg-zinc-900/40 p-3 md:p-4 rounded-xl border border-[#f3f0e8] dark:border-zinc-800/80 shadow-2xs"
                                >
                                    {/* Icon */}
                                    <div className="hidden sm:flex items-center justify-center w-11 h-11 rounded-lg border border-gray-200/60 bg-white dark:bg-zinc-900 text-slate-400 shrink-0 shadow-3xs">
                                        <ImageIcon size={18} />
                                    </div>

                                    {/* File Input */}
                                    <div className="flex-[2.5] w-full">
                                        <form.Field name={`images[${i}].file`}>
                                            {(f: any) => (
                                                <div className="relative flex items-center h-8 w-full bg-white dark:bg-zinc-950 border border-input rounded-lg px-3 shadow-xs hover:border-gray-300 transition-all">
                                                    <ImagePlus size={15} className="text-slate-400 mr-2 shrink-0" />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="w-full bg-transparent text-xs text-zinc-500 file:mr-2 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer focus:outline-none"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                if (file.size > MAX_IMAGE_SIZE) {
                                                                    toast.error(`Image ${i + 1} is too large (Max 1MB)`);
                                                                    e.target.value = "";
                                                                    f.handleChange(undefined);
                                                                    return;
                                                                }
                                                                f.handleChange(file);
                                                            } else {
                                                                f.handleChange(undefined);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </form.Field>
                                    </div>

                                    {/* Alt Text & Order Fields */}
                                    <div className="flex-1">
                                        <form.Field name={`images[${i}].alt`}>
                                            {(f: any) => <AppField field={f} label="" placeholder="Alt text" className="h-10 text-sm" />}
                                        </form.Field>
                                    </div>
                                    <div className="w-16 pt-1">
                                        <form.Field name={`images[${i}].order`}>
                                            {(f: any) => (
                                                <input
                                                    type="number"
                                                    value={f.state.value ?? i + 1}
                                                    onChange={(e) => f.handleChange(parseInt(e.target.value))}
                                                    className="w-full h-8 rounded-lg border border-input bg-white text-center text-sm"
                                                />
                                            )}
                                        </form.Field>
                                    </div>

                                    {/* Actions */}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => imgFields.removeValue(i)}
                                        className="h-10 w-10 p-0 text-slate-400 hover:text-red-500"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            ))}

                            <Button
                                type="button"
                                onClick={() => imgFields.pushValue({ file: undefined, alt: "", order: values.length + 1 })}
                                className="w-full h-11 bg-white hover:bg-slate-50 text-slate-700 border rounded-xl flex items-center justify-center gap-2"
                            >
                                <Plus size={16} /> Add Another Image
                            </Button>
                        </div>
                    );
                }}
            </form.Field>
        </Section>
    );
}