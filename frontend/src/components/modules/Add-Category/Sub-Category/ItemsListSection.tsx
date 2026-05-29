"use client";

import { Plus, Trash2, ImageIcon } from 'lucide-react';
import { AppField } from '@/components/Shared/Form/Appfield';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ItemsListSectionProps {
    form: any;
}

function ItemsListSection({ form }: ItemsListSectionProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-blue-500" /> Items List
                </h3>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        form.pushFieldValue('items', { name: "", image: undefined as unknown as File });
                        toast.success("New row added");
                    }}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Row
                </Button>
            </div>

            <form.Field name="items" mode="array">
                {(itemFields: any) => {
                    const currentItems = itemFields.state.value || [];

                    return (
                        <div className="grid gap-4 p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/30 dark:bg-zinc-900/20">
                            {currentItems.map((item: any, i: number) => {
                                if (item === null || item === undefined) return null;

                                return (
                                    <div key={i} className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-zinc-900 p-3 rounded-xl border shadow-sm items-center">

                                        {/* Item Name Input */}
                                        <form.Field name={`items[${i}].name`}>
                                            {(f: any) => (
                                                <div className="flex-1 w-full">
                                                    <AppField field={f} label="" placeholder="Item Name" />
                                                </div>
                                            )}
                                        </form.Field>

                                        <div className="hidden sm:block w-[1px] h-6 bg-gray-100 dark:bg-zinc-800" />

                                        {/* File Input */}
                                        <form.Field name={`items[${i}].image`}>
                                            {(f: any) => {
                                                const errorMsg = f.state.meta.errors?.[0];
                                                const itemImageError = typeof errorMsg === 'object' && errorMsg !== null
                                                    ? (errorMsg as any).message
                                                    : errorMsg;
                                                const inputKey = f.state.value ? `file-${i}-has-value` : `file-${i}-empty`;

                                                return (
                                                    <div className="flex-1 w-full flex flex-col justify-center">
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

                                        {/* Delete Row Button */}
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

export default ItemsListSection;