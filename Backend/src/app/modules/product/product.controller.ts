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

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
    const filters = {
        search: req.query.search as string,
        gender: req.query.gender as string,
        status: req.query.status as string,
        sort: req.query.sort as string,
        page: req.query.page ? Number(req.query.page) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        itemId: req.query.itemId as string,
        min: req.query.min ? Number(req.query.min) : undefined,
        max: req.query.max ? Number(req.query.max) : undefined,
    };
    const result = await ProductService.getAllProducts(filters);
    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Products fetched successfully!",
        data: result
    });
});
const getAllProductList = catchAsync(async (req: Request, res: Response) => {
    const products = await ProductService.getALlProductList();
    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "All products fetched successfully!",
        data: products
    });
});
export const ProductController = {
    createProduct,
    getAllProducts,
    getAllProductList
}