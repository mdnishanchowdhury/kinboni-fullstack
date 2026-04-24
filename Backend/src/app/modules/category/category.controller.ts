import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const product = await CategoryService.createCategory(payload);

        res.status(201).json({
            success: true,
            message: "Category created successfully!",
            data: product
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};

const getSimpleCategories = async (req: Request, res: Response) => {
    try {
        const result = await CategoryService.getSimpleCategories();

        res.status(200).json({
            success: true,
            message: "Categories fetched successfully!",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

const addSubCategory = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        const result = await CategoryService.addSubCategory(payload);

        res.status(201).json({
            success: true,
            message: "Sub-category added successfully!",
            data: result
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to add sub-category"
        });
    }
};

const addItemsToSubCategory = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        const result = await CategoryService.addItemsToSubCategory(payload);

        res.status(201).json({
            success: true,
            message: "Items added to sub-category successfully!",
            data: result
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to add items"
        });
    }
};

export const CategoryController = {
    createCategory,
    getSimpleCategories,
    addSubCategory,
    addItemsToSubCategory
}