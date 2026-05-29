"use client";

import { Plus, Trash2, Boxes } from 'lucide-react';
import { AppField } from '@/components/Shared/Form/Appfield';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function ItemList({ form }: { form: any }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4 border-slate-100 dark:border-zinc-900">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Boxes className="h-5 w-5 text-amber-500" /> Items List
                </h3>
                <Button
                    type="button"
                    onClick={() => {
                        form.pushFieldValue('items', { name: "", image: undefined as unknown as File });
                        toast.success("New row added");
                    }}
                    className="bg-amber-500 hover:bg-black text-white rounded-xl transition-all"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Row
                </Button>
            </div>

            <form.Field name="items" mode="array">
                {(itemFields: any) => {
                    const currentItems = itemFields.state.value || [];

                    return (
                        <div className="grid gap-4 p-4 md:p-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 dark:bg-zinc-900/20">
                            {currentItems.map((item: any, i: number) => {
                                if (item === null || item === undefined) return null;

                                return (
                                    <div key={i} className="flex flex-col md:flex-row gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl border shadow-sm items-center">

                                        {/* Item Name Input */}
                                        <div className="w-full md:flex-1">
                                            <form.Field name={`items[${i}].name`}>
                                                {(f: any) => <AppField field={f} label="" placeholder="Item Name" />}
                                            </form.Field>
                                        </div>

                                        <div className="hidden sm:block w-[1px] h-6 bg-gray-100 dark:bg-zinc-800" />

                                        {/* Actual File Upload Input */}
                                        <div className="w-full md:flex-1">
                                            <form.Field name={`items[${i}].image`}>
                                                {(f: any) => {
                                                    const errorMsg = f.state.meta.errors?.[0];
                                                    const itemImageError = typeof errorMsg === 'object' && errorMsg !== null
                                                        ? (errorMsg as any).message
                                                        : errorMsg;
                                                    const inputKey = f.state.value ? `file-input-${i}-active` : `file-input-${i}-empty`;

                                                    return (
                                                        <div className="flex flex-col justify-center w-full">
                                                            <input
                                                                key={inputKey}
                                                                type="file"
                                                                accept="image/*"
                                                                className="w-full bg-transparent h-10 text-xs text-zinc-500 file:mr-2 file:py-2 pt-[5px] file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        const maxItemFileSize = 1 * 1024 * 1024;
                                                                        if (file.size > maxItemFileSize) {
                                                                            toast.error("Item image exceeds 1MB limit!");
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
                                                            {itemImageError && (
                                                                <span className="text-[11px] text-red-500 font-medium px-1 mt-0.5 block">
                                                                    {itemImageError}
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                }}
                                            </form.Field>
                                        </div>

                                        {/* Delete Action Button */}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            disabled={currentItems.filter(Boolean).length <= 1}
                                            onClick={() => {
                                                form.removeFieldValue('items', i);
                                                toast.error("Row removed");
                                            }}
                                            className="text-slate-400 hover:text-red-500"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    );
                }}
            </form.Field>
        </div>
    );
}

export default ItemList;