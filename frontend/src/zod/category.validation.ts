import { z } from 'zod';

// category validation
export const categorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
    icon: z.string().url("Valid Icon URL is required"),
    subCategories: z.array(
        z.object({
            name: z.string().min(1, "Sub-category name is required"),
            items: z.array(
                z.object({
                    name: z.string().min(1, "Item name is required"),
                    image: z.string().url("Valid image URL is required"),
                })
            ).min(1, "At least one item is required"),
        })
    ).min(1, "At least one sub-category is required"),
});

export type ICategoryPayload = z.infer<typeof categorySchema>;

// sub-category validation
export const subCategorySchema = z.object({
    categoryId: z.string().min(1, "Parent Category ID is required"),
    name: z.string().min(2, "Sub-category name must be at least 2 characters"),
    items: z.array(
        z.object({
            name: z.string().min(1, "Item name is required"),
            image: z.string().url("Please enter a valid image URL"),
        })
    ).min(1, "At least one item is required"),
});

export type ISubCategoryPayload = z.infer<typeof subCategorySchema>;

// item validation
export const itemsSchema = z.object({
    subCategoryId: z.string().min(1, "Sub Category ID is required"),
    items: z.array(
        z.object({
            name: z.string().min(1, "Item name is required"),
            image: z.string().url("Valid image URL is required"),
        })
    ).min(1, "At least one item is required"),
});

export type IItemsPayload = z.infer<typeof itemsSchema>;
