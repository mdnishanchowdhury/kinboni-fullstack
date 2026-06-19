import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { sendResponse } from '../../shared/sendResponse';

const createOrder = async (req: Request, res: Response) => {

    const data = req.body
    const order = await OrderService.createOrder({ data })

    sendResponse(res, {
        httpStatusCode: 201,
        success: true,
        message: "Order successfully!",
        data: order
    });
};

export const OrderController = {
    createOrder
}