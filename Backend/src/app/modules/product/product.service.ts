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

const getAllProducts = async () => {
    const products = await prisma.product.findMany({
        include: {
            images: true,
            variants: true,
        }
    });

    return products.map((product: any) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        brand: {
            name: product.brandName || "Unknown",
            origin: product.brandOrigin || "Imported"
        },

        aiStylistInfo: {
            suitableFor: product.aiStylistInfo?.suitableFor || [],
            compatibleCategories: product.aiStylistInfo?.compatibleCategories || [],
            styleNote: product.aiStylistInfo?.styleNote || "No style note available."
        },

        category: {
            main: product.categoryMain,
            sub: product.categorySub,
            item: product.categoryItem
        },
        gender: product.gender,
        pricing: {
            currentPrice: product.currentPrice,
            oldPrice: product.oldPrice,
            discountPercent: product.discountPercent
        },
        media: {
            thumbnail: product.thumbnail || (product.images[0]?.url),
            images: product.images.map((img: any) => ({
                url: img.url,
                alt: img.alt,
                order: img.order
            }))
        },
        inventory: {
            stock: product.stock,
            sold: product.sold || 0
        },
        ratings: {
            average: product.ratingAvg || 0,
            count: product.ratingCount || 0,
            reviews: []
        },
        timer: product.isFlashSale ? {
            isFlashSale: true,
            expiresAt: product.flashExpiresAt,
            timerLabel: product.timerLabel || "Flash Sale"
        } : undefined,

        variants: product.variants.map((v: any) => ({
            id: v.id,
            name: v.name,
            hex: v.hex,
            sizes: v.sizes
        }))
    }));
};

export const ProductService = {
    createProduct,
    getAllProducts
};