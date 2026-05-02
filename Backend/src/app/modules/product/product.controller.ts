import { Request, Response } from "express";
import { ProductService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const product = await ProductService.createProduct(payload);

        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: product
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductService.getAllProducts();

        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            count: products.length,
            data: products
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};

export const ProductController = {
    createProduct,
    getAllProducts
}