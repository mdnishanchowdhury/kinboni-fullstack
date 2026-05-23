import { z } from 'zod';

const GENDER_MAP = {
    Men: "MALE",
    Women: "FEMALE",
    Kids: "KIDS",
} as const

const imageSchema = z.object({
    url: z.string().url("Valid image URL required"),
    alt: z.string().min(1, "Alt text required"),
    order: z.coerce.number().min(1),
});

const variantSchema = z.object({
    name: z.string().min(1, "Variant name required"),
    hex: z.string().regex(
        /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/,
        "Valid hex color required (e.g. #fff or #ffffff)"
    ),
    sizes: z.array(z.string()).min(1, "At least one size required").refine(
        (arr) => arr.every((s) => s.trim().length > 0),
        { message: "All sizes must be filled" }
    ),
});

const aiStylistInfoSchema = z.object({
    suitableFor: z
        .array(z.string().min(1, "Body type cannot be empty"))
        .min(1, "At least one body type required"),

    compatibleCategories: z
        .array(z.string().min(1, "Category cannot be empty"))
        .min(1, "At least one compatible category required"),

    styleNote: z.string().min(10, "Style note must be at least 10 characters"),
});

const metadataSchema = z.object({
    primaryColor: z.string().min(1, "Primary color required"),
    accentColor: z.string().min(1, "Accent color required"),
    pattern: z.string().min(1, "Pattern required"),
    fabric: z.string().min(1, "Fabric required"),
});

export const productSchema = z.object({
    name: z.string().min(3, "Product name must be at least 3 characters"),
    slug: z
        .string()
        .min(3, "Slug must be at least 3 characters")
        .regex(/^[a-z0-9-]+$/, "Slug: only lowercase letters, numbers and hyphens"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    
    gender: z.string().min(1, "Please select a gender").pipe(
    z.enum(["Men", "Women", "Kids"]).transform((val) => GENDER_MAP[val])
),

    brandName: z.string().min(1, "Brand name required"),
    brandOrigin: z.string().min(1, "Brand origin required"),
    itemId: z.string().uuid("Must be a valid UUID"),


    currentPrice: z.coerce
        .number({ message: "Price must be a number" })
        .min(1, "Price must be at least 1"),

    oldPrice: z.coerce
        .number({ message: "Old price must be a number" })
        .min(1, "Old price must be at least 1"),

    discountPercent: z.coerce
        .number({ message: "Discount must be a number" })
        .min(0)
        .max(100, "Discount must be between 0 and 100"),

    stock: z.coerce
        .number({ message: "Stock must be a number" })
        .int("Stock must be an integer")
        .min(1, "Stock must be at least 1"),

    sold: z.coerce
        .number({ message: "Sold count must be a number" })
        .int("Sold count must be an integer")
        .min(0, "Sold cannot be negative"),


    thumbnail: z.string().url("Valid thumbnail URL required"),
    timerLabel: z.string().min(1, "Timer label required"),
    aiStylistInfo: aiStylistInfoSchema,
    metadata: metadataSchema,
    images: z.array(imageSchema).min(1, "At least one image required"),
    variants: z.array(variantSchema).min(1, "At least one variant required"),
});

export type IProductInput = z.input<typeof productSchema>;
export type IProductOutput = z.output<typeof productSchema>; 