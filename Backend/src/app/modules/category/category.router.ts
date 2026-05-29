import express from 'express';
import { CategoryController } from './category.controller';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();

const uploadFieldsCategory = multerUpload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'image' }
]);

const uploadFieldsSubAndItems = multerUpload.fields([
    { name: 'image' }
]);

router.post('/',
    uploadFieldsCategory,
    CategoryController.createCategory
);

router.get('/', CategoryController.getSimpleCategories);
router.get('/sub-categories', CategoryController.getSubCategories);
router.get('/items', CategoryController.getItemsCategories);

router.post(
    "/add-sub-category",
    uploadFieldsSubAndItems,
    CategoryController.addSubCategory
);

router.post("/add-items",
    uploadFieldsSubAndItems,
    CategoryController.addItemsToSubCategory
);

router.patch("/:id", CategoryController.updateCategory);
router.patch("/sub-category/:id", CategoryController.updateSubCategory);
router.patch("/item/:id", CategoryController.updateItem);

router.delete("/:id", CategoryController.deleteCategory);
router.delete("/sub-category/:id", CategoryController.deleteSubCategory);
router.delete("/item/:id", CategoryController.deleteItem);

export const CategoryRouter = router;