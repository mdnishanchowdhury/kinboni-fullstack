"use client";

import React, { useState } from 'react';
import { Sparkles, X, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h3 className="text-base font-bold  flex items-center gap-2 text-slate-700 dark:text-slate-200">
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
        <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest px-1 block mb-2">
            {children}
        </label>
    );
}

const textareaCls = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500/40 dark:bg-zinc-950 dark:border-zinc-800";

export default function AIStylistSection({ form }: { form: any }) {
    const [bodyTypeInput, setBodyTypeInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("");

    return (
        <Section icon={Sparkles} title="AI Stylist Info">

            {/* Suitable For (Body Types) */}
            <div>
                <FieldLabel>Suitable For (Body Types)</FieldLabel>
                <form.Field name="aiStylistInfo.suitableFor" mode="array">
                    {
                        (arrField) => {
                            const values: string[] = (arrField.state.value || []).filter(Boolean);

                            const handleAddBodyType = (e: React.FormEvent) => {
                                e.preventDefault();
                                if (bodyTypeInput.trim()) {
                                    form.pushFieldValue('aiStylistInfo.suitableFor', bodyTypeInput.trim());
                                    setBodyTypeInput("");
                                }
                            };

                            return (
                                <div className="space-y-3">
                                    {/* Inline Tags Container */}
                                    {values.length > 0 && (
                                        <div className="flex flex-wrap gap-2 items-center">
                                            {
                                                values.map((val, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center gap-2 pl-3 pr-1 py-1 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium transition-all"
                                                    >
                                                        <User size={14} className="text-slate-400" />
                                                        <span>{val}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => form.removeFieldValue('aiStylistInfo.suitableFor', i)}
                                                            className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )}

                                    {/* Inline Add Input Box */}
                                    <div className="flex gap-2 max-w-md">
                                        <input
                                            type="text"
                                            value={bodyTypeInput}
                                            onChange={(e) => setBodyTypeInput(e.target.value)}
                                            placeholder="e.g. Curvy"
                                            className="flex-1 px-4 py-2 text-sm bg-transparent border border-gray-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/40"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddBodyType(e);
                                                }
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleAddBodyType}
                                            className="px-4 border border-gray-200 dark:border-zinc-800 rounded-xl font-medium"
                                        >
                                            Add
                                        </Button>
                                    </div>

                                    {/* Zod Error Message Rendering */}
                                    {arrField.state.meta.errors && arrField.state.meta.errors.length > 0 && (
                                        <p className="text-xs text-red-500 mt-1 px-1">
                                            {typeof arrField.state.meta.errors[0] === 'object'
                                                ? (arrField.state.meta.errors[0] as any)?.message || "Invalid input"
                                                : String(arrField.state.meta.errors[0])}
                                        </p>
                                    )}
                                </div>
                            );
                        }
                    }
                </form.Field>
            </div>

            {/* Compatible Categories */}
            <div>
                <FieldLabel>Compatible Categories</FieldLabel>
                <form.Field name="aiStylistInfo.compatibleCategories" mode="array">
                    {(arrField) => {
                        const values: string[] = (arrField.state.value || []).filter(Boolean);

                        const handleAddCategory = (e: React.FormEvent) => {
                            e.preventDefault();
                            if (categoryInput.trim()) {
                                form.pushFieldValue('aiStylistInfo.compatibleCategories', categoryInput.trim());
                                setCategoryInput("");
                            }
                        };

                        return (
                            <div className="space-y-3">
                                {/* Inline Tags Container */}
                                {values.length > 0 && (
                                    <div className="flex flex-wrap gap-2 items-center">
                                        {
                                            values.map((val, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2 pl-3 pr-1 py-1 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium transition-all"
                                                >
                                                    <Tag size={14} className="text-slate-400" />
                                                    <span>{val}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => form.removeFieldValue('aiStylistInfo.compatibleCategories', i)}
                                                        className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )}

                                {/* Inline Add Input Box */}
                                <div className="flex gap-2 max-w-md">
                                    <input
                                        type="text"
                                        value={categoryInput}
                                        onChange={(e) => setCategoryInput(e.target.value)}
                                        placeholder="e.g. Formal"
                                        className="flex-1 px-4 py-2 text-sm bg-transparent border border-gray-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/40"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddCategory(e);
                                            }
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleAddCategory}
                                        className="px-4 border border-gray-200 dark:border-zinc-800 rounded-xl font-medium"
                                    >
                                        Add
                                    </Button>
                                </div>

                                {
                                    arrField.state.meta.errors && arrField.state.meta.errors.length > 0 && (
                                        <p className="text-xs text-red-500 mt-1 px-1">
                                            {typeof arrField.state.meta.errors[0] === 'object'
                                                ? (arrField.state.meta.errors[0] as any)?.message || "Invalid input"
                                                : String(arrField.state.meta.errors[0])}
                                        </p>
                                    )
                                }
                            </div>
                        );
                    }}
                </form.Field>
            </div>

            {/* Style Note */}
            <div>
                <FieldLabel>Style Note</FieldLabel>
                <form.Field name="aiStylistInfo.styleNote">
                    {
                        (field) => (
                            <div>
                                <textarea
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder="Describe styling suggestions for this product..."
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
                        )
                    }
                </form.Field>
            </div>
        </Section>
    );
}