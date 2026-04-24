import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/', CategoryController.createCategory);
router.get('/', CategoryController.getSimpleCategories);
router.post("/add-sub-category", CategoryController.addSubCategory);
router.post("/add-items", CategoryController.addItemsToSubCategory);


export const CategoryRouter = router;