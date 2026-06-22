"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IOrderQueryParams } from "@/types/order.types";

export const getOrders = async (filters: IOrderQueryParams) => {
  try {
    const response = await httpClient.get("/order/details", {
      params: filters
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};


type UpdateOrderStatusResponse = {
  success: boolean;
  message?: string;
  data: any;
};

export const updateOdersStatus = async (
  id: string,
  payload: any
): Promise<UpdateOrderStatusResponse> => {
  try {
    const result = await httpClient.patch(`/order/${id}/status`, payload);
    console.log(result.data);
    return { success: true, data: result.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update item",
      data: null,
    };
  }
};