interface IOrderItem {
  productId: string;
  variantId?: string | null;
  quantity: number;
  price: number;
}

interface IAddressData {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  area?: string | null;
  postCode?: string | null;
  isDefault?: boolean;
}

interface IOrderPayload {
  userId: string;
  addressData: IAddressData;
  totalAmount: number;
  provider: string;
  items: IOrderItem[];
}

interface IOrderQueryParams {
  status?: string;
  searchTerm?: string;
  page?: string | number;
  limit?: string | number;
}