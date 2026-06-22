import { Router } from 'express';
import { OrderController } from './order.controller';

const router = Router();

router.get('/details', OrderController.getAllOrders);
router.post('/', OrderController.createOrder);
router.patch("/:orderId/status", OrderController.updateOrderStatus);


export const OrderRouter = router;