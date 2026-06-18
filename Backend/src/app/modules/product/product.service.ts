import { Product } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createProduct = async (payload: any): Promise<Product> => {
    const { images, variants, metadata, aiStylistInfo, ...productData } = payload;

    const isSlugExists = await prisma.product.findUnique({
        where: { slug: productData.slug }
    });

    if (isSlugExists) {
        throw new Error("This product slug already exists. Please use a unique slug.");
    }

    return await prisma.product.create({
        data: {
            ...productData,
            aiStylistInfo: { ...aiStylistInfo, metadata },
            images: { create: images?.map((img: any) => ({ url: img.url, alt: img.alt, order: img.order || 1 })) },
            variants: { create: variants?.map((v: any) => ({ name: v.name, hex: v.hex, sizes: v.sizes })) },
        },
        include: { images: true, variants: true }
    });
};

const getAllProducts = async (filters: {
    search?: string;
    gender?: string;
    status?: string;
    sort?: string;
    page?: number;
    limit?: number;
    itemId?: string;
    min?: number;
    max?: number;
}) => {
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 5;
    const skip = (page - 1) * limit;

    const { search, gender, status, sort, itemId, min, max } = filters;
    const whereClause: any = {};

    if (min !== undefined || max !== undefined) {
        whereClause.currentPrice = {};
        if (min !== undefined) whereClause.currentPrice.gte = Number(min);
        if (max !== undefined) whereClause.currentPrice.lte = Number(max);
    }

    if (search) {
        whereClause.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { brandName: { contains: search, mode: 'insensitive' } }
        ];
    }

    if (itemId) {
        whereClause.itemId = itemId;
    }

    if (gender) {
        whereClause.gender = gender;
    }

    if (status) {
        if (status === "Flash sale") {
            whereClause.isFlashSale = true;
        } else if (status === "Out of stock") {
            whereClause.stock = 0;
        } else if (status === "Active") {
            whereClause.stock = { gt: 0 };
        }
    }

    let orderByClause: any = { id: 'desc' };

    if (sort === "Price: low → high") {
        orderByClause = { currentPrice: 'asc' };
    } else if (sort === "Price: high → low") {
        orderByClause = { currentPrice: 'desc' };
    } else if (sort === "Stock: low → high") {
        orderByClause = { stock: 'asc' };
    }

    const totalProducts = await prisma.product.count({
        where: whereClause
    });

    const products = await prisma.product.findMany({
        where: whereClause,
        orderBy: orderByClause,
        skip: skip,
        take: limit,
        include: {
            images: true,
            variants: true,
        }
    });

    const mappedProducts = products.map((product: any) => ({
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
        timer: {
            isFlashSale: !!product.isFlashSale,
            expiresAt: product.flashExpiresAt || null,
            timerLabel: product.timerLabel || "Flash Sale",
            flashDiscount: product.flashDiscount || 0
        },
        variants: product.variants.map((v: any) => ({
            id: v.id,
            name: v.name,
            hex: v.hex,
            sizes: v.sizes
        }))
    }));

    return {
        meta: {
            page,
            limit,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit)
        },
        products: mappedProducts
    };
};

const getALlProductList = async (): Promise<Product[]> => {
    const products = await prisma.product.findMany({
        include: { images: true, variants: true }
    });

    return products.map((p: any) => ({
        ...p,
        brand: { name: p.brandName || "Unknown", origin: p.brandOrigin || "Imported" },
        category: { main: p.categoryMain || "", sub: p.categorySub || "", item: p.categoryItem || "" },
        pricing: { currentPrice: p.currentPrice, oldPrice: p.oldPrice, discountPercent: p.discountPercent },
        media: { thumbnail: p.thumbnail, images: p.images || [] },
        inventory: { stock: p.stock, sold: p.sold || 0 },
        ratings: { average: p.ratingAvg || 0, count: p.ratingCount || 0, reviews: [] },
        timer: { isFlashSale: !!p.isFlashSale, expiresAt: p.flashExpiresAt, timerLabel: p.timerLabel || "Flash Sale" }
    })) as unknown as Product[];
};

const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            images: true,
            variants: true
        }
    });

    if (!product) return null;

    return {
        ...product,
        brand: {
            name: product.brandName,
            origin: product.brandOrigin
        },
        pricing: {
            currentPrice: product.currentPrice,
            oldPrice: product.oldPrice,
            discountPercent: product.discountPercent
        },
        media: {
            thumbnail: product.thumbnail,
            images: product.images
        },
        inventory: {
            stock: product.stock,
            sold: product.sold
        },
        timer: {
            isFlashSale: product.isFlashSale,
            expiresAt: product.flashExpiresAt,
            timerLabel: product.timerLabel
        }
    };
};

export const ProductService = {
    createProduct,
    getAllProducts,
    getALlProductList,
    getProductById
};