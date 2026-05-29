"use client";

import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Package, Loader2, Tag, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { itemCreateCategory } from '@/services/category.services';
import ItemList from './ItemList';
import { IItemsPayload, itemsSchema } from '@/zod/category.validation';
import { useGetSubCategoryList } from '@/hooks/useGetSubCategoryList';

interface AddItemsFormProps {
    onSuccess?: () => void;
}

export default function AddItemsForm({ onSuccess }: AddItemsFormProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isMounted, setIsMounted] = useState(false);
    const { data: categories, isLoading, isError } = useGetSubCategoryList();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await itemCreateCategory(formData);
            if (!response || response.success === false) {
                throw new Error(response.message || "Server rejected the request");
            }
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['category-list'] });
            form.reset();
            router.refresh();
            if (onSuccess) onSuccess();
        }
    });

    const form = useForm({
        defaultValues: {
            subCategoryId: "",
            items: [{ name: "", image: undefined as unknown as File }] as IItemsPayload['items'],
        },
        validators: {
            onSubmit: itemsSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                const safeItems = (value.items || []).filter(Boolean);
                const jsonTextData = {
                    subCategoryId: value.subCategoryId,
                    items: safeItems.map((item) => ({ name: item.name || "" }))
                };

                const formData = new FormData();
                formData.append("data", JSON.stringify(jsonTextData));
                safeItems.forEach((item) => {
                    if (item?.image && typeof item.image === 'object' && 'size' in item.image) {
                        formData.append("image", item.image);
                    } else {
                        const blankBlob = new Blob([""], { type: "image/png" });
                        formData.append("image", blankBlob, "empty.png");
                    }
                });

                const promise = mutateAsync(formData);

                toast.promise(promise, {
                    loading: 'Creating item-category...',
                    success: "Items added successfully!",
                    error: (err) => err.message || "Something went wrong.",
                });
            } catch (err: any) {
                toast.error(err.message || "Failed to process form data.");
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
            {/* Modal Header */}
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
                {/* Sub Category Target Dropdown Field */}
                <div className="max-w-md space-y-1.5">
                    <label htmlFor="subCategoryId" className="text-xs font-bold uppercase flex items-center gap-2 px-1 text-slate-500">
                        <Tag size={14} className="text-amber-500" /> Sub Category
                    </label>
                    <form.Field name="subCategoryId">
                        {(field) => (
                            <div className="space-y-1">
                                <div className="relative">
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        disabled={isLoading}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        className="w-full h-9 px-3 bg-background border border-input rounded-xl text-xs font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                    >
                                        <option value="" disabled className="text-muted-foreground">
                                            {isLoading ? "Loading sub-categories..." : "Select a Sub Category"}
                                        </option>
                                        {isError && (
                                            <option value="" disabled>Failed to load sub-categories</option>
                                        )}
                                        {categories && categories.map((category: any) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Custom arrow indicator */}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-muted-foreground/70">
                                        {isLoading ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <ChevronDown size={16} className="transition-transform duration-200" />
                                        )}
                                    </div>
                                </div>

                                {/* Validation error message display */}
                                {field.state.meta.errors ? (
                                    <p className="text-[11px] font-medium text-destructive px-1">
                                        {field.state.meta.errors.join(', ')}
                                    </p>
                                ) : null}
                            </div>
                        )}
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
                        disabled={isPending}
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