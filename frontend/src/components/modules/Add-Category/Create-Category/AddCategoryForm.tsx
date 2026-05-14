"use client";

import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { Loader2, Tag, Link as LinkIcon, FolderPlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppField } from '@/components/Shared/Form/Appfield';
import { Button } from '@/components/ui/button';
import { createCategoryAction } from '@/app/(dashboardLayout)/[role]/dashboard/add-category/_action';
import { toast } from 'sonner';
import { categorySchema, ICategoryPayload } from '@/zod/category.validation';
import SubCategoryList from './SubCategoryList';

export default function AddCategoryForm() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: ICategoryPayload) => createCategoryAction(payload),
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
                        form.reset();
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

    // Reset Handler
    const handleReset = () => {
        form.reset();
        toast.info("All fields have been cleared");
    };

    return (
        <div className="pt-[170px] md:pt-15 md:p-15 flex items-center justify-center">

            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 dark:bg-green-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full" />
            </div>

            <Card className='w-full max-w-5xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-2xl rounded-[20px] md:rounded-[28px] overflow-hidden z-10'>
                <CardHeader className='border-b border-slate-100 dark:border-zinc-900 pb-6 px-5 md:px-8'>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-green-500/10 text-green-600 dark:text-green-500 shadow-sm">
                                <FolderPlus className="h-6 w-6 md:h-7 md:w-7" />
                            </div>
                            <div>
                                <CardTitle className='text-xl md:text-2xl font-bold tracking-tight'>
                                    Create New Category
                                </CardTitle>
                                <CardDescription className='text-sm md:text-base'>
                                    Organize products with <span className="text-green-600 dark:text-green-500 font-bold">Kinboni</span> structure
                                </CardDescription>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className='px-6 md:px-10 pb-10 pt-8'>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className='space-y-8'
                    >
                        {/* Main Category Fields */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-bold flex items-center gap-2 px-1">
                                    <Tag size={16} className="text-green-500" /> Category Name
                                </label>
                                <form.Field name="name">
                                    {(field) => <AppField field={field} label="" placeholder="e.g. Men's Fashion" className="rounded-xl h-12" />}
                                </form.Field>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold flex items-center gap-2 px-1">
                                    <LinkIcon size={16} className="text-green-500" /> Icon URL
                                </label>
                                <form.Field name="icon">
                                    {(field) => <AppField field={field} label="" placeholder="https://..." className="rounded-xl h-12" />}
                                </form.Field>
                            </div>
                        </div>

                        {/* Sub Categories Dynamic List */}
                        <SubCategoryList form={form} />

                        {/* Actions */}
                        <div className="flex flex-col md:flex-row justify-end gap-4 pt-6 border-t border-gray-100 dark:border-zinc-900">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleReset}
                                className="px-8 rounded-xl font-bold h-12"
                            >
                                Clear
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="px-12 bg-green-500 hover:bg-black text-white font-bold rounded-xl h-12 transition-all disabled:opacity-70"
                            >
                                {isPending ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
                                {isPending ? "Creating..." : "Create Category"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}