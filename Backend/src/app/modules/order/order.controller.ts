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


const getAllOrders = async (req: Request, res: Response) => {
    const filters = req.query;

    const data = await OrderService.getAllOrders(filters);

    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Order details retrieved successfully!",
        data: data
    });
};

const updateOrderStatus = async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await OrderService.updateOrderStatus(orderId as string, status);

    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Order status updated successfully!",
        data: updatedOrder
    });
};

export const OrderController = {
    createOrder,
    getAllOrders,
    updateOrderStatus
}