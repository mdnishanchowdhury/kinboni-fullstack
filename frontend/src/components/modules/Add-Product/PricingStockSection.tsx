"use client";

import { BarChart2 } from 'lucide-react';
import { AppField } from '@/components/Shared/Form/Appfield';

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

const numCls = "w-full rounded-xl border border-input bg-background px-4 h-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 dark:bg-zinc-950 dark:border-zinc-800";

export default function PricingStockSection({ form }: { form: any }) {
    return (
        <Section icon={BarChart2} title="Pricing & Stock">

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {/* Current Price */}
                <div>
                    <FieldLabel>Current Price ($)</FieldLabel>
                    <form.Field name="currentPrice">
                        {(field: any) => (
                            <div>
                                <input
                                    type="number"
                                    step="0.01"
                                    min={0}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder="0.00"
                                    className={numCls}
                                />
                                {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                                    <p className="text-xs text-red-500 mt-1 px-1">
                                        {typeof field.state.meta.errors[0] === 'object'
                                            ? field.state.meta.errors[0]?.message
                                            : String(field.state.meta.errors[0])}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>
                </div>

                {/* Old Price */}
                <div>
                    <FieldLabel>Old Price ($)</FieldLabel>
                    <form.Field name="oldPrice">
                        {(field: any) => (
                            <div>
                                <input
                                    type="number"
                                    step="0.01"
                                    min={0}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder="0.00"
                                    className={numCls}
                                />
                                {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                                    <p className="text-xs text-red-500 mt-1 px-1">
                                        {typeof field.state.meta.errors[0] === 'object'
                                            ? field.state.meta.errors[0]?.message
                                            : String(field.state.meta.errors[0])}
                                    </p>
                                )}
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
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder="0"
                                    className={numCls}
                                />
                                {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                                    <p className="text-xs text-red-500 mt-1 px-1">
                                        {typeof field.state.meta.errors[0] === 'object'
                                            ? field.state.meta.errors[0]?.message
                                            : String(field.state.meta.errors[0])}
                                    </p>
                                )}
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
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder="0"
                                    className={numCls}
                                />
                                {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                                    <p className="text-xs text-red-500 mt-1 px-1">
                                        {typeof field.state.meta.errors[0] === 'object'
                                            ? field.state.meta.errors[0]?.message
                                            : String(field.state.meta.errors[0])}
                                    </p>
                                )}
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
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder="0"
                                    className={numCls}
                                />
                                {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                                    <p className="text-xs text-red-500 mt-1 px-1">
                                        {typeof field.state.meta.errors[0] === 'object'
                                            ? field.state.meta.errors[0]?.message
                                            : String(field.state.meta.errors[0])}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>
                </div>

                {/* Timer Label */}
                <div>
                    <FieldLabel>Timer Label</FieldLabel>
                    <form.Field name="timerLabel">
                        {(field: any) => <AppField field={field} label="" placeholder="e.g. Footwear Extravaganza" className="rounded-xl h-12" />}
                    </form.Field>
                </div>
            </div>
        </Section>
    );
}