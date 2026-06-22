import { prisma } from "../../lib/prisma";

const createOrder = async (payload: { data: IOrderPayload }) => {
  const { userId, addressData, totalAmount, provider, items } = payload.data;

  if (!addressData) {
    throw new Error("Address data is missing!");
  }

  return await prisma.$transaction(async (tx) => {
    const newAddress = await tx.address.create({
      data: {
        userId,
        fullName: addressData.fullName,
        phone: addressData.phone,
        street: addressData.street,
        city: addressData.city,
        area: addressData.area,
        postCode: addressData.postCode,
        isDefault: addressData.isDefault || false,
      },
    });

    return await tx.order.create({
      data: {
        userId,
        totalAmount,
        addressId: newAddress.id,
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        payment: {
          create: {
            amount: totalAmount,
            provider: provider,
            status: "PENDING",
          },
        },
      },
    });
  }, {
    timeout: 15000,
    maxWait: 10000,
  });
};

const getAllOrders = async (params: IOrderQueryParams) => {

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const status = params.status;
  const searchTerm = params.searchTerm;

  const skip = (page - 1) * limit;
  const where: any = {};

  if (status) {
    where.status = status;
  }

  if (searchTerm) {
    where.OR = [
      { user: { email: { contains: searchTerm, mode: 'insensitive' } } },
      { user: { phone: { contains: searchTerm, mode: 'insensitive' } } },
    ];
  }

  const orders = await prisma.order.findMany({
    where,
    skip,
    take: limit,
    select: {
      id: true,
      totalAmount: true,
      status: true,
      createdAt: true,
      user: {
        select: { name: true, email: true, phone: true }
      },
      address: true,
      payment: true,
      orderItems: {
        select: {
          quantity: true,
          price: true,
          product: {
            select: { name: true, thumbnail: true }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const total = await prisma.order.count({ where });

  return {
    meta: {
      page,
      limit,
      total,
      pageCount: Math.ceil(total / limit)
    },
    data: orders
  };
};

const updateOrderStatus = async (orderId: string, status: string) => {
  return await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: status as any,
    },
  });
};

export const OrderService = {
  createOrder,
  getAllOrders,
  updateOrderStatus
};