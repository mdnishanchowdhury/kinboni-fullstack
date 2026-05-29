"use client";

import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Tag, ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppField } from '@/components/Shared/Form/Appfield';
import { Button } from '@/components/ui/button';
import { createCategoryAction } from '@/app/(dashboardLayout)/[role]/dashboard/category/_action';
import { toast } from 'sonner';
import { categorySchema, ICategoryPayload } from '@/zod/category.validation';
import SubCategoryList from './SubCategoryList';

interface AddCategoryFormProps {
    onSuccess?: () => void;
}

export default function AddCategoryForm({ onSuccess }: AddCategoryFormProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [resetKey, setResetKey] = useState(0);
    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleFormClear = () => {
        form.reset();
        setResetKey((prev) => prev + 1);
    };

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (formData: FormData) => {
            const res = await createCategoryAction(formData);
            if (!res.success) {
                throw new Error(res.message || "Failed to create category");
            }
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['category-list'] });
            handleFormClear();
            router.refresh();
            if (onSuccess) onSuccess();
        }
    });

    const form = useForm({
        defaultValues: {
            name: "",
            icon: undefined as unknown as File,
            subCategories: [{ name: "", items: [{ name: "", image: undefined as unknown as File }] }] as ICategoryPayload['subCategories'],
        },
        validators: {
            onChange: categorySchema,
        },
        onSubmit: async ({ value }) => {
            try {
                const jsonTextData = {
                    name: value.name,
                    subCategories: value.subCategories.map((sub) => ({
                        name: sub.name,
                        items: (sub.items || []).map((item) => ({ name: item.name }))
                    }))
                };

                const formData = new FormData();
                formData.append("data", JSON.stringify(jsonTextData));
                if (value.icon) {
                    formData.append("icon", value.icon);
                }

                value.subCategories.forEach((sub) => {
                    (sub.items || []).forEach((item) => {
                        if (item.image) {
                            formData.append("image", item.image);
                        }
                    });
                });

                const promise = mutateAsync(formData);

                toast.promise(promise, {
                    loading: 'Creating category...',
                    success: "Category created successfully!",
                    error: (err) => err.message || "Something went wrong.",
                });
            } catch (err: any) {
                toast.error(err.message || "Failed to process form data.");
            }
        }
    });

    if (!isMounted) return null;

    return (
        <div className="w-full bg-transparent px-1 py-2">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-6"
            >
                {/* Main Category Fields */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold flex items-center gap-2 px-1 text-zinc-700 dark:text-zinc-300">
                            <Tag size={14} className="text-green-500" /> Category Name
                        </label>
                        <form.Field name="name">
                            {(field) => <AppField field={field} label="" placeholder="e.g. Men's Fashion" className="rounded-xl h-11" />}
                        </form.Field>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold flex items-center gap-2 px-1 text-zinc-700 dark:text-zinc-300">
                            <ImageIcon size={14} className="text-green-500" /> Icon File
                        </label>
                        <form.Field name="icon">
                            {(field) => {
                                const errorMsg = field.state.meta.errors?.[0];
                                const displayError = typeof errorMsg === 'object' ? (errorMsg as any).message : errorMsg;

                                return (
                                    <div className="flex flex-col gap-1 items-center text-center">
                                        <input
                                            key={`main-icon-${resetKey}`}
                                            type="file"
                                            accept="image/*"
                                            className="w-full bg-transparent h-10 text-xs text-zinc-500 file:mr-2 file:py-2 file:px-2 pt-[5px] file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const maxFileSize = 1 * 1024 * 1024;

                                                    if (file.size > maxFileSize) {
                                                        toast.error("File size limit exceeded! Image must be less than 1MB.");
                                                        e.target.value = "";
                                                        field.handleChange(undefined as unknown as File);
                                                        return;
                                                    }

                                                    field.handleChange(file);
                                                }
                                            }}
                                        />
                                        {displayError && (
                                            <span className="text-[11px] text-red-500 font-medium px-1 mt-0.5">
                                                {displayError}
                                            </span>
                                        )}
                                    </div>
                                );
                            }}
                        </form.Field>
                    </div>
                </div>

                {/* Sub Categories Dynamic List */}
                <div className="bg-muted/40 dark:bg-zinc-900/40 p-4 rounded-2xl border border-border/60">
                    <SubCategoryList form={form} resetKey={resetKey} />
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-zinc-900">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleFormClear}
                        className="px-6 rounded-xl font-semibold h-10 text-xs"
                    >
                        Clear
                    </Button>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="px-8 bg-green-500 hover:bg-zinc-900 text-white font-semibold rounded-xl h-10 text-xs transition-all disabled:opacity-70"
                    >
                        {isPending && <Loader2 className="animate-spin mr-1.5 h-4 w-4" />}
                        {isPending ? "Creating..." : "Create Category"}
                    </Button>
                </div>
            </form>
        </div>
    );
}