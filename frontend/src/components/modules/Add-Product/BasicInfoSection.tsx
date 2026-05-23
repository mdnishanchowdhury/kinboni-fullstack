"use client";

import { ChevronDown, Info } from 'lucide-react';
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

const textareaCls = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500/40 dark:bg-zinc-950 dark:border-zinc-800";
export default function BasicInfoSection({ form }: { form: any }) {
    return (
        <Section icon={Info} title="Basic Information">

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
                                value={field.state.value}
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

            <div className="grid gap-5 md:grid-cols-3">

                <div className='pt-1'>
                    <FieldLabel>Gender</FieldLabel>
                    <form.Field name="gender">
                        {(field: any) => (
                            <div className="relative group">
                                <select
                                    value={field.state.value || ""}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    className={`
                        w-full h-9 px-4 rounded-xl appearance-none cursor-pointer
                        bg-white dark:bg-zinc-950 
                        border border-gray-100 dark:border-zinc-800
                        text-sm font-medium text-slate-700 dark:text-zinc-300
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500
                        ${field.state.meta.errors.length > 0 ? "border-red-500 focus:ring-red-500/20" : ""}
                    `}
                                >
                                    <option value="" disabled>Select Gender</option>

                                    {(["Men", "Women", "Kids"] as const).map((g) => (
                                        <option key={g} value={g}>
                                            {g}
                                        </option>
                                    ))}
                                </select>

                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
                                    <ChevronDown size={18} />
                                </div>

                                {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                                    <p className="text-xs text-red-500 mt-1.5 px-1 font-medium">
                                        {typeof field.state.meta.errors[0] === 'object'
                                            ? (field.state.meta.errors[0] as any)?.message || "Invalid selection"
                                            : String(field.state.meta.errors[0])}
                                    </p>
                                )}
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
                <div>
                    <FieldLabel>Brand Origin</FieldLabel>
                    <form.Field name="brandOrigin">
                        {(field: any) => <AppField field={field} label="" placeholder="e.g. Bangladesh" className="rounded-xl h-12" />}
                    </form.Field>
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <FieldLabel>Item ID (UUID)</FieldLabel>
                    <form.Field name="itemId">
                        {(field: any) => <AppField field={field} label="" placeholder="e.g. 26b70552-aca0-4b84-b682-..." className="rounded-xl h-12" />}
                    </form.Field>
                </div>
                <div>
                    <FieldLabel>Thumbnail URL</FieldLabel>
                    <form.Field name="thumbnail">
                        {(field: any) => <AppField field={field} label="" placeholder="https://..." className="rounded-xl h-12" />}
                    </form.Field>
                </div>
            </div>
        </Section>
    );
}