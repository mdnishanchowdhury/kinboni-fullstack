import { Router } from "express";
import { ProductRouter } from "../modules/product/product.router";
import { CategoryRouter } from "../modules/category/category.router";

const router = Router();

router.use("/category", CategoryRouter);
router.use("/product", ProductRouter);

export const IndexRoutes = router;