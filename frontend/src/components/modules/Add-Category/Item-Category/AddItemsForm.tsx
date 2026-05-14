"use client";

import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { Package, Loader2, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppField } from '@/components/Shared/Form/Appfield';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { itemCreateCategory } from '@/services/category.services';
import ItemList from './ItemList';
import { IItemsPayload, itemsSchema } from '@/zod/category.validation';


export default function AddItemsForm() {
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
        <div className="pt-[170px] md:pt-15 md:p-15 flex items-center justify-center">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 dark:bg-amber-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/5 dark:bg-orange-500/10 blur-[120px] rounded-full" />
            </div>

            <Card className='w-full max-w-5xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-2xl rounded-[20px] md:rounded-[28px] overflow-hidden z-10'>
                <CardHeader className='border-b border-slate-100 dark:border-zinc-900 pb-6 px-5 md:px-8'>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
                                <Package className="h-6 w-6" />
                            </div>
                            <div>
                                <CardTitle className='text-xl md:text-2xl font-bold tracking-tight'>Add Product Items</CardTitle>
                                <CardDescription>Update Kinboni Inventory</CardDescription>
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
                        <div className="max-w-md space-y-2">
                            <label className="text-xs font-bold uppercase flex items-center gap-2 ml-1 text-slate-500">
                                <Tag size={14} className="text-amber-500" /> Sub Category ID
                            </label>
                            <form.Field name="subCategoryId">
                                {(field) => <AppField field={field} label="" placeholder="Paste Sub-Category UUID" />}
                            </form.Field>
                        </div>

                        {/* nested Items list */}
                        <ItemList form={form} />

                        <div className="flex justify-end gap-4 pt-6 border-t border-slate-100 dark:border-zinc-900">
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
                                className="px-12 bg-amber-600 hover:bg-black text-white font-bold rounded-xl h-12 shadow-lg transition-all active:scale-95"
                            >
                                {
                                    isPending ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="animate-spin h-5 w-5" /> Processing...
                                        </div>
                                    ) : "Add Items"
                                }
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}