import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

const createCategory = catchAsync(async (req: Request, res: Response) => {

    const data = JSON.parse(req.body.data || "{}");
    const files = req.files as { [key: string]: Express.Multer.File[] };
    let imgIdx = 0;

    const payload = {
        ...data,
        icon: files.icon?.[0]?.path || data.icon || "",
        subCategories: (data.subCategories || []).map((sub: any) => ({
            ...sub,
            items: (sub.items || []).map((item: any) => ({
                ...item,
                image: files.image?.[imgIdx++]?.path || item.image || ""
            }))
        }))
    };

    const product = await CategoryService.createCategory(payload);
    sendResponse(res, {
        httpStatusCode: 201,
        success: true,
        message: "Category created successfully!",
        data: product
    });
});


const getSimpleCategories = catchAsync(
    async (req: Request, res: Response) => {
        const result = await CategoryService.getSimpleCategories();

        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: "Categories fetched successfully!",
            data: result
        });
    }
);

const addSubCategory = catchAsync(async (req: Request, res: Response) => {
    const data = JSON.parse(req.body.data || "{}");
    const files = req.files as { [key: string]: Express.Multer.File[] };
    let imgIdx = 0;

    const payload = {
        ...data,
        items: (data.items || []).map((item: any) => ({
            ...item,
            image: files.image?.[imgIdx++]?.path || item.image || ""
        }))
    };
    const result = await CategoryService.addSubCategory(payload);

    sendResponse(res, {
        httpStatusCode: 201,
        success: true,
        message: "Sub-category added successfully!",
        data: result
    });
});

const addItemsToSubCategory = catchAsync(
    async (req: Request, res: Response) => {
        const data = JSON.parse(req.body.data || "{}");

        const files = req.files as { [key: string]: Express.Multer.File[] };
        let imgIdx = 0;

        const payload = {
            ...data,
            items: (data.items || []).map((item: any) => ({
                ...item,
                image: files?.image?.[imgIdx++]?.path || item.image || ""
            }))
        };
        const result = await CategoryService.addItemsToSubCategory(payload);

        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: "Items added to sub-category successfully!",
            data: result
        });
    }
);

const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await CategoryService.updateCategory(id as string, payload);

    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Category updated successfully!",
        data: result
    });
});

const updateSubCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await CategoryService.updateSubCategory(id as string, payload);

    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Sub-category updated successfully!",
        data: result
    });
});

const updateItem = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await CategoryService.updateItem(id as string, payload);

    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Item updated successfully!",
        data: result
    });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryService.deleteCategory(id as string);

    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Category deleted successfully!",
        data: result
    });
});

const deleteSubCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryService.deleteSubCategory(id as string);

    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Sub-category deleted successfully!",
        data: result
    });
});


const deleteItem = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryService.deleteItem(id as string);

    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Item deleted successfully!",
        data: result
    });
});

const getSubCategories = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.getSubCategories();

    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Sub-categories fetched successfully!",
        data: result
    });
});
const getItemsCategories = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.getItemsCategories();

    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Items fetched successfully!",
        data: result
    });
});


export const CategoryController = {
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
    getItemsCategories
};