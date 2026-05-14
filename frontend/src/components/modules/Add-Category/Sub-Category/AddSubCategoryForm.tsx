"use client";

import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { ListTree, Boxes, Loader2, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppField } from '@/components/Shared/Form/Appfield';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { subCreateCategory } from '@/services/category.services';
import ItemsListSection from './ItemsListSection';
import { ISubCategoryPayload, subCategorySchema } from '@/zod/category.validation';



export default function AddSubCategoryForm() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // 2. Mutation
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
            const promise = mutateAsync(value);

            toast.promise(promise, {
                loading: 'Creating sub-category...',
                success: (res) => {
                    form.reset();
                    return res?.message || "Sub-Category created successfully!";
                },
                error: (err) => err.message || "Failed to create sub-category.",
            });
        }
    });

    // Reset Handler
    const handleReset = () => {
        form.reset();
        toast.info("All fields have been cleared");
    };

    if (!isMounted) return null;

    return (
        <div className="pt-[170px] md:pt-15 md:p-15 flex items-center justify-center">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] rounded-full" />
            </div>

            <Card className='w-full max-w-5xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-2xl rounded-[20px] md:rounded-[28px] overflow-hidden z-10'>
                <CardHeader className='border-b border-slate-100 dark:border-zinc-900 pb-6 px-5 md:px-8'>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600">
                                <ListTree className="h-6 w-6" />
                            </div>
                            <div>
                                <CardTitle className='text-xl md:text-2xl font-bold'>Add Sub Category</CardTitle>
                                <CardDescription>Map products to main categories</CardDescription>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className='p-5 md:p-10'>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className='space-y-8'
                    >
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase flex items-center gap-2">
                                    <Tag size={14} className="text-blue-500" /> Parent Category ID
                                </label>
                                <form.Field name="categoryId">
                                    {(field) => <AppField field={field} label="" placeholder="UUID from Main Category" />}
                                </form.Field>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase flex items-center gap-2">
                                    <Boxes size={14} className="text-blue-500" /> Sub Category Name
                                </label>
                                <form.Field name="name">
                                    {(field) => <AppField field={field} label="" placeholder="e.g. Watches" />}
                                </form.Field>
                            </div>
                        </div>

                        <ItemsListSection form={form} />

                        <div className="flex flex-col md:flex-row justify-end gap-4 pt-6 border-t border-gray-100 dark:border-zinc-900">

                            {/* Reset Button */}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleReset}
                                disabled={isPending}
                                className="px-8 rounded-xl font-bold h-12 order-2 md:order-1"
                            >
                                Clear Form
                            </Button>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="px-12 bg-blue-600 hover:bg-black text-white font-bold rounded-xl h-12 transition-all active:scale-95 disabled:opacity-70 order-1 md:order-2"
                            >
                                {
                                    isPending ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>Creating...</span>
                                        </div>
                                    ) : (
                                        "Create Sub-Category"
                                    )
                                }
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}