import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

const createCategory = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const product = await CategoryService.createCategory(payload);

        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: "Category created successfully!",
            data: product
        });

    }
);

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

const addSubCategory = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;

        const result = await CategoryService.addSubCategory(payload);

        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: "Sub-category added successfully!",
            data: result
        });
    }
);

const addItemsToSubCategory = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;

        const result = await CategoryService.addItemsToSubCategory(payload);

        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: "Items added to sub-category successfully!",
            data: result
        });
    }
);

export const CategoryController = {
    createCategory,
    getSimpleCategories,
    addSubCategory,
    addItemsToSubCategory
}