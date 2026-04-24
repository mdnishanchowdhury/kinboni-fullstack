import { Product } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createProduct = async (payload: any): Promise<Product> => {
    const {
        images,
        variants,
        metadata,
        aiStylistInfo,
        ...productData
    } = payload;

    const result = await prisma.product.create({
        data: {
            ...productData,

            aiStylistInfo: {
                ...aiStylistInfo,
                metadata: metadata
            },

            images: {
                create: images?.map((img: any) => ({
                    url: img.url,
                    alt: img.alt || null,
                    order: img.order || 1
                })),
            },

            variants: {
                create: variants?.map((v: any) => ({
                    name: v.name,
                    hex: v.hex || null,
                    sizes: v.sizes || []
                })),
            },
        },
        include: {
            images: true,
            variants: true
        }
    });

    return result;
};

export const ProductService = {
    createProduct
};