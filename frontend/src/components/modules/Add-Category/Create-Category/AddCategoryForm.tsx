"use client";

import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Tag, Link as LinkIcon } from 'lucide-react';
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
    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: ICategoryPayload) => createCategoryAction(payload),
        onSuccess: (res) => {
            if (res?.success) {
                queryClient.invalidateQueries({ queryKey: ['categories'] });
                queryClient.invalidateQueries({ queryKey: ['category-list'] });
                form.reset();
                router.refresh();
                if (onSuccess) onSuccess();
            }
        }
    });

    const form = useForm({
        defaultValues: {
            name: "",
            icon: "",
            subCategories: [{ name: "", items: [{ name: "", image: "" }] }] as ICategoryPayload['subCategories'],
        },
        validators: {
            onChange: categorySchema,
        },
        onSubmit: async ({ value }) => {
            const promise = mutateAsync(value);

            toast.promise(promise, {
                loading: 'Creating category...',
                success: (res) => {
                    if (res?.success) {
                        return res.message || "Category created successfully!";
                    } else {
                        throw new Error(res?.message || "Failed to create category");
                    }
                },
                error: (err) => err.message || "Something went wrong on the client.",
            });
        }
    });

    if (!isMounted) return null;

    const handleReset = () => {
        form.reset();
        toast.info("All fields have been cleared");
    };

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
                            <LinkIcon size={14} className="text-green-500" /> Icon URL
                        </label>
                        <form.Field name="icon">
                            {(field) => <AppField field={field} label="" placeholder="https://..." className="rounded-xl h-11" />}
                        </form.Field>
                    </div>
                </div>

                {/* Sub Categories Dynamic List */}
                <div className="bg-muted/40 dark:bg-zinc-900/40 p-4 rounded-2xl border border-border/60">
                    <SubCategoryList form={form} />
                </div>

                {/* Actions Footer */}
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
                        className="px-8 bg-green-500 hover:bg-zinc-900 text-white font-semibold rounded-xl h-11 text-xs transition-all disabled:opacity-70"
                    >
                        {isPending ? <Loader2 className="animate-spin mr-1.5 h-4 w-4" /> : null}
                        {isPending ? "Creating..." : "Create Category"}
                    </Button>
                </div>
            </form>
        </div>
    );
}