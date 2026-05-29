import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { SubCategory } from "../../../generated/prisma/client";
import { deleteFileFromCloudinary } from "../../config/cloudinary.config";

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
    const deletedCategory = await prisma.category.delete({
        where: { id },
        include: {
            subCategories: {
                include: {
                    items: true,
                },
            },
        },
    });

    const deletePromises: Promise<void>[] = [];

    if (deletedCategory.icon) {
        deletePromises.push(
            (async () => {
                try {
                    await deleteFileFromCloudinary(deletedCategory.icon as string);
                } catch (err) {
                    console.error("Failed to delete category icon from Cloudinary:", err);
                }
            })()
        );
    }

    if (deletedCategory.subCategories && deletedCategory.subCategories.length > 0) {
        deletedCategory.subCategories.forEach((sub: any) => {
            if (sub.items && sub.items.length > 0) {
                sub.items.forEach((item: any) => {
                    if (item.image) {
                        deletePromises.push(
                            (async () => {
                                try {
                                    await deleteFileFromCloudinary(item.image as string);
                                } catch (err) {
                                    console.error(`Failed to delete image for item ${item.id} from Cloudinary:`, err);
                                }
                            })()
                        );
                    }
                });
            }
        });
    }

    if (deletePromises.length > 0) {
        await Promise.all(deletePromises);
    }

    return deletedCategory;
};

const deleteSubCategory = async (id: string) => {
    const deletedSubCategory = await prisma.subCategory.delete({
        where: { id },
        include: { items: true },
    });

    if (deletedSubCategory.items && deletedSubCategory.items.length > 0) {

        const deletePromises = deletedSubCategory.items.map(async (item: any) => {
            if (item.image) {
                try {
                    await deleteFileFromCloudinary(item.image);
                } catch (err) {
                    console.error(`Failed to delete image from Cloudinary:`, err);
                }
            }
        });
        await Promise.all(deletePromises);
    }

    return deletedSubCategory;
};

const deleteItem = async (id: string) => {
    const deletedItem = await prisma.item.delete({
        where: { id },
    });

    if (deletedItem.image) {
        await deleteFileFromCloudinary(deletedItem.image);
    }

    return deletedItem;
};

const getSubCategories = async (): Promise<SubCategory[]> => {
    const result = await prisma.subCategory.findMany();
    return result;
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
    deleteItem,
    getSubCategories,
};