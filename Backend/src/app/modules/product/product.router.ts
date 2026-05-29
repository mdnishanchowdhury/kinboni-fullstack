import express from 'express';
import { ProductController } from './product.controller';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();

router.get('/', ProductController.getAllProducts);

router.post(
    '/',
    multerUpload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 10 }
    ]),
    ProductController.createProduct
);

export const ProductRouter = router;