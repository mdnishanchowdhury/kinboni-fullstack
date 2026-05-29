import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { sendResponse } from "../../shared/sendResponse";
import { catchAsync } from "../../shared/catchAsync";

const createProduct = catchAsync(async (req: Request, res: Response) => {
    const data = req.body.data ? JSON.parse(req.body.data) : req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const uploadedFiles = files['images'] || [];
    const thumbnailFile = files['thumbnail'] ? files['thumbnail'][0] : null;

    const fileImages = uploadedFiles.map((file, index) => ({
        url: file.path,
        alt: data.title || "Product Image",
        order: index + 1
    }));

    const payload = {
        ...data,
        thumbnail: thumbnailFile ? thumbnailFile.path : null,
        images: [...(data.images || []), ...fileImages]
    };

    const product = await ProductService.createProduct(payload);

    sendResponse(res, {
        httpStatusCode: 201,
        success: true,
        message: "Product created successfully!",
        data: product
    });
});

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