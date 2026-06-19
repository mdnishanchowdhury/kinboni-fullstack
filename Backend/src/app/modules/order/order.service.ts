import { prisma } from "../../lib/prisma";

const createOrder = async (payload: { data: IOrderPayload }) => {
  const { userId, addressData, totalAmount, provider, items } = payload.data;

  if (!addressData) {
    throw new Error("Address data is missing!");
  }

  const result = await prisma.$transaction(
    async (tx) => {
      return await tx.order.create({
        data: {
          userId,
          totalAmount,
          address: {
            create: {
              userId,
              fullName: addressData.fullName,
              phone: addressData.phone,
              street: addressData.street,
              city: addressData.city,
              area: addressData.area,
              postCode: addressData.postCode,
              isDefault: addressData.isDefault || false,
            },
          },
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
    },
    {
      timeout: 15000,
      maxWait: 10000,
    }
  );

  return result;
};

export const OrderService = { createOrder };