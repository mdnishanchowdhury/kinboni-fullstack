"use client";

import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, ShoppingBag, } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createProductAction } from '@/app/(dashboardLayout)/[role]/dashboard/add-product/_action';
import AIStylistSection from './AIStylistSection';
import PricingStockSection from './PricingStockSection';
import BasicInfoSection from './BasicInfoSection';
import ProductImagesSection from './ProductImagesSection';
import ColorVariantsSection from './ColorVariantsSection';
import MetadataSection from './MetadataSection';
import { IProductInput, IProductOutput, productSchema } from '@/zod/product.validation';

export default function AddProductForm() {
    const queryClient = useQueryClient();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: IProductOutput) => createProductAction(payload),
        onSuccess: (res) => {
            if (res?.success) {
                queryClient.invalidateQueries({ queryKey: ["products"] });
            }
        },
    });

    const form = useForm({
        defaultValues: {
            name: "",
            slug: "",
            description: "",
            gender: "" as any,
            brandName: "",
            brandOrigin: "",
            itemId: "",
            currentPrice: "",
            oldPrice: "",
            discountPercent: "",
            stock: "",
            sold: "0",
            thumbnail: "",
            timerLabel: "",
            aiStylistInfo: {
                suitableFor: [],
                compatibleCategories: [],
                styleNote: "",
            },
            metadata: {
                primaryColor: "",
                accentColor: "",
                pattern: "",
                fabric: "",
            },
            images: [{ url: "", alt: "", order: 1 }],
            variants: [{ name: "", hex: "#000000", sizes: ["40"] }],
        } as IProductInput,

        validators: {
            onChange: productSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                const validatedData = productSchema.parse(value);

                console.log("Submitting perfectly parsed data:", validatedData);
                const res = await mutateAsync(validatedData);

                if (res?.success) {
                    form.reset();
                    toast.success(res.message || "Product created successfully!");
                } else {
                    toast.error(res?.message || "Failed to create product");
                }
            } catch (err: any) {
                console.error("Submit error:", err);
                toast.error(err?.message || "Something went wrong.");
            }
        },
        onSubmitInvalid: () => {
            toast.error("Please fix all errors before submitting");
        },
    });

    if (!isMounted) return null;

    const handleReset = () => {
        form.reset();
        toast.info("All fields have been cleared");
    };
    return (
      <div className="relative flex items-center justify-center w-full">

            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 dark:bg-green-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full" />
            </div>

          <Card className="w-full max-w-5xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-2xl rounded-[20px] md:rounded-[28px] overflow-hidden z-10">
                <CardHeader className="border-b border-slate-100 dark:border-zinc-900 pb-6 px-5 md:px-8">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-green-500/10 text-green-600 dark:text-green-500 shadow-sm">
                            <ShoppingBag className="h-6 w-6 md:h-7 md:w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-xl md:text-2xl font-bold tracking-tight">
                                Add New Product
                            </CardTitle>
                            <CardDescription className="text-sm md:text-base">
                                List a product on{" "}
                                <span className="text-green-600 dark:text-green-500 font-bold">Kinboni</span>
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="px-6 md:px-10 pb-10 pt-8">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="space-y-10"
                    >

                        {/* basic info */}
                        <BasicInfoSection form={form} />

                        {/* price */}
                        <PricingStockSection form={form} />

                        {/* metadata */}
                        <MetadataSection form={form} />

                        {/* Ai atylist info */}
                        <AIStylistSection form={form} />

                        {/* images*/}
                        <ProductImagesSection form={form} />

                        {/* variants */}
                        <ColorVariantsSection form={form} />

                        {/* actions */}
                        <div className="flex flex-col md:flex-row justify-end gap-4 pt-6 border-t border-gray-100 dark:border-zinc-900">
                            <Button
                                type="button" variant="outline"
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
                                {isPending ? "Creating..." : "Create Product"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}