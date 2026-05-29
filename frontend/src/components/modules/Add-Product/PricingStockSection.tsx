"use client";

import { useEffect } from "react";
import { BarChart2 } from 'lucide-react';
import { AppField } from '@/components/Shared/Form/Appfield';
import { useStore } from "@tanstack/react-form";

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

function ErrorMessage({ meta }: { meta: any }) {
    if (!meta.errors || meta.errors.length === 0) return null;
    const error = meta.errors[0];
    const message = typeof error === 'object' ? (error as any)?.message || "Invalid input" : String(error);
    return (
        <p className="text-xs text-red-500 mt-1 px-1 font-medium animate-in fade-in-50 duration-200">
            {message}
        </p>
    );
}

const numCls = "w-full rounded-xl border border-input bg-background px-4 h-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 dark:bg-zinc-950 dark:border-zinc-800 transition-all duration-200";

export default function PricingStockSection({ form }: { form: any }) {

    const oldPrice = useStore(form.store, (state: any) => state.values.oldPrice);
    const discountPercent = useStore(form.store, (state: any) => state.values.discountPercent);
    

    useEffect(() => {
        const original = parseFloat(oldPrice) || 0;
        const discount = parseFloat(discountPercent) || 0;

        if (original > 0) {
            const calculatedPrice = original - (original * discount) / 100;
            const integerPrice = Math.round(calculatedPrice);

            form.setFieldValue("currentPrice", integerPrice > 0 ? integerPrice : 0);
        } else {
            form.setFieldValue("currentPrice", 0);
        }
    }, [oldPrice, discountPercent, form]);

    return (
        <Section icon={BarChart2} title="Pricing & Stock">

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {/* Old Price */}
                <div>
                    <FieldLabel>Price ($)</FieldLabel>
                    <form.Field name="oldPrice">
                        {(field: any) => (
                            <div>
                                <input
                                    type="number"
                                    min={0}
                                    value={field.state.value || ""}
                                    onChange={(e) => field.handleChange(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
                                    onBlur={field.handleBlur}
                                    placeholder="0"
                                    className={`${numCls} !h-8 ${field.state.meta.errors?.length > 0 ? "border-red-500 focus:ring-red-500/20" : ""}`}
                                />
                                <ErrorMessage meta={field.state.meta} />
                            </div>
                        )}
                    </form.Field>
                </div>

                {/* Discount */}
                <div>
                    <FieldLabel>Discount (%)</FieldLabel>
                    <form.Field name="discountPercent">
                        {(field: any) => (
                            <div>
                                <input
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={field.state.value || ""}
                                    onChange={(e) => field.handleChange(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
                                    onBlur={field.handleBlur}
                                    placeholder="0"
                                    className={`${numCls} !h-8 ${field.state.meta.errors?.length > 0 ? "border-red-500 focus:ring-red-500/20" : ""}`}
                                />
                                <ErrorMessage meta={field.state.meta} />
                            </div>
                        )}
                    </form.Field>
                </div>

                {/* Current Price */}
                <div>
                    <FieldLabel>Current Price ($)</FieldLabel>
                    <form.Field name="currentPrice">
                        {(field: any) => (
                            <div>
                                <input
                                    type="number"
                                    value={field.state.value !== undefined ? field.state.value : 0}
                                    disabled
                                    readOnly
                                    placeholder="0"
                                    className={`${numCls} !h-8 bg-slate-50 dark:bg-zinc-900/50 font-bold text-green-600 dark:text-green-400 cursor-not-allowed border-dashed`}
                                />
                                <ErrorMessage meta={field.state.meta} />
                            </div>
                        )}
                    </form.Field>
                </div>

                {/* Stock */}
                <div>
                    <FieldLabel>Stock</FieldLabel>
                    <form.Field name="stock">
                        {(field: any) => (
                            <div>
                                <input
                                    type="number"
                                    min={0}
                                    value={field.state.value || ""}
                                    onChange={(e) => field.handleChange(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
                                    onBlur={field.handleBlur}
                                    placeholder="0"
                                    className={`${numCls} !h-8 ${field.state.meta.errors?.length > 0 ? "border-red-500 focus:ring-red-500/20" : ""}`}
                                />
                                <ErrorMessage meta={field.state.meta} />
                            </div>
                        )}
                    </form.Field>
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                {/* Units Sold */}
                <div>
                    <FieldLabel>Units Sold</FieldLabel>
                    <form.Field name="sold">
                        {(field: any) => (
                            <div>
                                <input
                                    type="number"
                                    min={0}
                                    value={field.state.value || ""}
                                    onChange={(e) => field.handleChange(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
                                    onBlur={field.handleBlur}
                                    placeholder="0"
                                    className={`${numCls} !h-8 mt-1 ${field.state.meta.errors?.length > 0 ? "border-red-500 focus:ring-red-500/20" : ""}`}
                                />
                            </div>
                        )}
                    </form.Field>
                </div>

                {/* Timer Label */}
                <div>
                    <FieldLabel>Timer Label</FieldLabel>
                    <form.Field name="timerLabel">
                        {(field: any) => (
                            <div>
                                <AppField field={field} label="" placeholder="e.g. Footwear Extravaganza" className="rounded-xl h-12" />
                            </div>
                        )}
                    </form.Field>
                </div>
            </div>
        </Section>
    );
}