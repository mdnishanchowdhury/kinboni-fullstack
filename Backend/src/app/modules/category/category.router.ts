import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/', CategoryController.createCategory);
router.get('/', CategoryController.getSimpleCategories);
router.post("/add-sub-category", CategoryController.addSubCategory);
router.post("/add-items", CategoryController.addItemsToSubCategory);

router.patch("/:id", CategoryController.updateCategory);
router.patch("/sub-category/:id", CategoryController.updateSubCategory);
router.patch("/item/:id", CategoryController.updateItem);

router.delete("/:id", CategoryController.deleteCategory);
router.delete("/sub-category/:id", CategoryController.deleteSubCategory);
router.delete("/item/:id", CategoryController.deleteItem);

export const CategoryRouter = router;