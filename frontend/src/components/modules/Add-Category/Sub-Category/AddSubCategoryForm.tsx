"use client";

import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { ListTree, Boxes, Loader2, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AppField } from '@/components/Shared/Form/Appfield';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { subCreateCategory } from '@/services/category.services';
import ItemsListSection from './ItemsListSection';
import { ISubCategoryPayload, subCategorySchema } from '@/zod/category.validation';

interface AddSubCategoryFormProps {
    onSuccess?: () => void;
}

export default function AddSubCategoryForm({ onSuccess }: AddSubCategoryFormProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (payload: ISubCategoryPayload) => {
            const response = await subCreateCategory(payload);
            if (!response || response.success === false) {
                throw new Error(response.message || "Server rejected the request");
            }
            return response;
        },
    });

    const form = useForm({
        defaultValues: {
            categoryId: "",
            name: "",
            items: [{ name: "", image: "" }] as ISubCategoryPayload['items'],
        },
        validators: {
            onChange: subCategorySchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating sub-category...");
            try {
                const res = await mutateAsync(value);
                toast.success(res?.message || "Sub-Category created successfully!", {
                    id: toastId,
                });
                form.reset();
                onSuccess?.();
            } catch (error: any) {
                toast.error(error.message || "Failed to create sub-category.", {
                    id: toastId,
                });
            }
        }
    });

    const handleReset = () => {
        form.reset();
        toast.info("All fields have been cleared");
    };

    if (!isMounted) return null;

    return (
        <div className="w-full bg-transparent">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-zinc-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 shrink-0">
                    <ListTree className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                        Add Sub Category
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Map products to main categories in <span className="text-blue-600 dark:text-blue-500 font-bold">Kinboni</span> structure
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
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase flex items-center gap-2 px-1 text-foreground">
                            <Tag size={14} className="text-blue-500" /> Parent Category ID
                        </label>
                        <form.Field name="categoryId">
                            {(field) => <AppField field={field} label="" placeholder="UUID from Main Category" className="rounded-xl h-11" />}
                        </form.Field>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase flex items-center gap-2 px-1 text-foreground">
                            <Boxes size={14} className="text-blue-500" /> Sub Category Name
                        </label>
                        <form.Field name="name">
                            {(field) => <AppField field={field} label="" placeholder="e.g. Watches" className="rounded-xl h-11" />}
                        </form.Field>
                    </div>
                </div>

                <div className="bg-muted/30 dark:bg-zinc-900/30 p-4 rounded-2xl border border-border/60">
                    <ItemsListSection form={form} />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-zinc-900">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        disabled={isPending}
                        className="px-6 rounded-xl font-semibold h-11 text-xs"
                    >
                        Clear Form
                    </Button>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="px-8 bg-blue-600 hover:bg-zinc-900 text-white font-semibold rounded-xl h-11 text-xs transition-all disabled:opacity-70"
                    >
                        {isPending ? (
                            <div className="flex items-center gap-1.5">
                                <Loader2 className="animate-spin h-4 w-4" /> Creating...
                            </div>
                        ) : (
                            "Create Sub-Category"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}