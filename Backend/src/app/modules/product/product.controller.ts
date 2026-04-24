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

export const ProductController = {
    createProduct
}