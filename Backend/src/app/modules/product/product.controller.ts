import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { sendResponse } from "../../shared/sendResponse";
import { catchAsync } from "../../shared/catchAsync";

const createProduct = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const product = await ProductService.createProduct(payload);

        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: "Product created successfully!",
            data: product
        });

    }
);

const getAllProducts = catchAsync(
    async (req: Request, res: Response) => {
        const products = await ProductService.getAllProducts();

        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: "Products fetched successfully!",
            data: products
        });
    }
);

export const ProductController = {
    createProduct,
    getAllProducts
}