"use client";

import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ListTree, Boxes, Loader2, Tag, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AppField } from '@/components/Shared/Form/Appfield';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { subCreateCategory } from '@/services/category.services';
import ItemsListSection from './ItemsListSection';
import { ISubCategoryPayload, subCategorySchema } from '@/zod/category.validation';
import { useGetSubCategoryList } from '@/hooks/useGetSubCategoryList';

interface AddSubCategoryFormProps {
    onSuccess?: () => void;
}

export default function AddSubCategoryForm({ onSuccess }: AddSubCategoryFormProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: categories, isLoading, isError } = useGetSubCategoryList();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await subCreateCategory(formData);
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
            categoryId: "",
            name: "",
            items: [{ name: "", image: undefined as unknown as File }] as ISubCategoryPayload['items'],
        },
        validators: {
            onSubmit: subCategorySchema,
        },
        onSubmit: async ({ value }) => {
            try {
                const safeItems = (value.items || []).filter(Boolean);

                const jsonTextData = {
                    categoryId: value.categoryId,
                    name: value.name,
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
                    loading: 'Creating sub-category...',
                    success: "Sub-Category created successfully!",
                    error: (err) => err.message || "Something went wrong.",
                });
            } catch (err: any) {
                toast.error(err.message || "Failed to process form data.");
            }
        }
    });

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
                    {/* Updated Parent Category Dropdown Field */}
                    <div className="space-y-1.5 pt-[5px]">
                        <label className="text-xs font-bold uppercase flex items-center gap-2 px-1 text-foreground">
                            <Tag size={14} className="text-blue-500" /> Parent Category
                        </label>
                        <form.Field name="categoryId">
                            {(field) => (
                                <div className="relative">
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        disabled={isLoading}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="w-full h-8 px-3 bg-background border border-input rounded-xl text-xs font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                    >
                                        <option value="" disabled className="text-muted-foreground">
                                            {isLoading ? "Loading categories..." : "Select a Category"}
                                        </option>
                                        {isError && (
                                            <option value="" disabled>Failed to load categories</option>
                                        )}
                                        {categories && categories.map((category: any) => (
                                            <option key={category.id} value={category.categoryId || category.id}>
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
                            )}
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
                        onClick={() => form.reset()}
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