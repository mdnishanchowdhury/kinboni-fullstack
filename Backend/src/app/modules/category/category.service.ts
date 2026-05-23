import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";

const createCategory = async (payload: ICategoryPayload) => {
    const { name, icon, subCategories = [] } = payload;

    const result = await prisma.category.create({
        data: {
            name,
            icon,
            subCategories: {
                create: subCategories.map((sub) => ({
                    name: sub.name,
                    items: {
                        create: (sub.items || []).map((item) => ({
                            name: item.name,
                            image: item.image,
                        })),
                    },
                })),
            },
        },
        include: {
            subCategories: {
                include: {
                    items: true,
                },
            },
        },
    });

    return result;
};


const getSimpleCategories = async () => {
    const result = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
            icon: true,
            subCategories: {
                select: {
                    id: true,
                    name: true,
                    items: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
};

const addSubCategory = async (payload: any) => {
    const { categoryId, name, items } = payload;

    const result = await prisma.subCategory.create({
        data: {
            name: name,
            categoryId: categoryId,
            items: {
                create: items.map((item: any) => ({
                    name: item.name,
                    image: item.image,
                })),
            },
        },
        include: {
            items: true,
        },
    });

    return result;
};

const addItemsToSubCategory = async (payload: any) => {
    const { subCategoryId, items } = payload;

    const subCategoryExists = await prisma.subCategory.findUnique({
        where: { id: subCategoryId }
    });

    if (!subCategoryExists) {
        throw new AppError(status.NOT_FOUND, "SubCategory ID not found!");
    }

    const result = await prisma.subCategory.update({
        where: {
            id: subCategoryId,
        },
        data: {
            items: {
                create: items.map((item: any) => ({
                    name: item.name,
                    image: item.image,
                })),
            },
        },
        include: {
            items: true,
        },
    });

    return result;
};

const updateCategory = async (id: string, payload: { name?: string; icon?: string }) => {
    return await prisma.category.update({
        where: { id },
        data: payload,
    });
};

const updateSubCategory = async (id: string, payload: { name: string }) => {
    return await prisma.subCategory.update({
        where: { id },
        data: { name: payload.name },
    });
};

const updateItem = async (id: string, payload: { name?: string; image?: string }) => {
    return await prisma.item.update({
        where: { id },
        data: payload,
    });
};

const deleteCategory = async (id: string) => {
    return await prisma.category.delete({
        where: { id },
    });
};

const deleteSubCategory = async (id: string) => {
    return await prisma.subCategory.delete({
        where: { id },
    });
};

const deleteItem = async (id: string) => {
    return await prisma.item.delete({
        where: { id },
    });
};

export const CategoryService = {
    createCategory,
    getSimpleCategories,
    addSubCategory,
    addItemsToSubCategory,
    updateCategory,
    updateSubCategory,
    updateItem,
    deleteCategory,
    deleteSubCategory,
    deleteItem
};