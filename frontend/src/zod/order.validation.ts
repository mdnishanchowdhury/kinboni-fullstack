import { z } from "zod";

export const checkoutSchema = z.object({
    fullName: z.string().min(3, "Full Name must be at least 3 characters"),

    phone: z
        .string()
        .regex(/^(\+8801|01)[3-9]\d{8}$/, "Invalid phone number format"),

    street: z.string().min(3, "Street address is required"),

    area: z.string().min(1, "Area is required"),

    postCode: z
        .string()
        .min(1, "Post Code is required")
        .regex(/^\d+$/, "Post Code must be a number"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;