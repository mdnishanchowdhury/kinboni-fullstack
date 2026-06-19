import { Router } from "express";
import { ProductRouter } from "../modules/product/product.router";
import { CategoryRouter } from "../modules/category/category.router";
import { OrderRouter } from "../modules/order/order.router";

const router = Router();

router.use("/category", CategoryRouter);
router.use("/product", ProductRouter);
router.use("/order", OrderRouter);


export const IndexRoutes = router;