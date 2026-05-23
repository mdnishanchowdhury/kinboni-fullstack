"use client";

import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { Package, Loader2, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AppField } from '@/components/Shared/Form/Appfield';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { itemCreateCategory } from '@/services/category.services';
import ItemList from './ItemList';
import { IItemsPayload, itemsSchema } from '@/zod/category.validation';

interface AddItemsFormProps {
    onSuccess?: () => void;
}

export default function AddItemsForm({ onSuccess }: AddItemsFormProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (payload: IItemsPayload) => {
            const response = await itemCreateCategory(payload);
            if (!response || response.success === false) {
                throw new Error(response.message || "Server Error");
            }
            return response;
        },
    });

    const form = useForm({
        defaultValues: {
            subCategoryId: "",
            items: [{ name: "", image: "" }] as IItemsPayload['items'],
        },
        validators: {
            onChange: itemsSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Updating inventory... Please wait.");

            try {
                const res = await mutateAsync(value);
                toast.success(res.message || "Items added successfully!", {
                    id: toastId,
                });
                form.reset();
                onSuccess?.();
            } catch (error: any) {
                toast.error(error.message || "Something went wrong", {
                    id: toastId,
                });
            }
        }
    });

    // Reset Handler
    const handleReset = () => {
        form.reset();
        toast.info("All fields have been cleared");
    };

    if (!isMounted) return null;

    return (
        <div className="w-full bg-transparent">
            {/* Modal Header Sync */}
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-zinc-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 shrink-0">
                    <Package className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                        Add Product Items
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Update Kinboni Inventory structure
                    </p>
                </div>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-6"
            >
                {/* Sub Category Target Field */}
                <div className="max-w-md space-y-1.5">
                    <label className="text-xs font-bold uppercase flex items-center gap-2 px-1 text-slate-500">
                        <Tag size={14} className="text-amber-500" /> Sub Category ID
                    </label>
                    <form.Field name="subCategoryId">
                        {(field) => <AppField field={field} label="" placeholder="Paste Sub-Category UUID" className="rounded-xl h-11" />}
                    </form.Field>
                </div>

                {/* Nested Items List Container */}
                <div className="bg-muted/30 dark:bg-zinc-900/30 p-4 rounded-2xl border border-border/60">
                    <ItemList form={form} />
                </div>

                {/* Action Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-zinc-900">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        className="px-6 rounded-xl font-semibold h-11 text-xs"
                    >
                        Clear
                    </Button>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="px-8 bg-amber-600 hover:bg-zinc-900 text-white font-semibold rounded-xl h-11 text-xs transition-all disabled:opacity-70"
                    >
                        {isPending ? (
                            <div className="flex items-center gap-1.5">
                                <Loader2 className="animate-spin h-4 w-4" /> Processing...
                            </div>
                        ) : (
                            "Add Items"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}