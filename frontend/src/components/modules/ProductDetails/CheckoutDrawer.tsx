"use client";

import { useState } from "react";
import {
  X,
  Loader2,
  MapPin,
  Phone,
  User,
  Truck,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";
import { useOrderProduct } from "@/hooks/useOrderProduct";
import { checkoutSchema } from "@/zod/order.validation";
import { InputGroup } from "./InputGroup";

export default function CheckoutDrawer({ isOpen, onClose, orderData }: any) {
  if (!isOpen) return null;

  const { mutate: placeOrder, isPending } = useOrderProduct();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    area: "",
    postCode: "",
    city: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleConfirmOrder = () => {
    const result = checkoutSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(newErrors);
      toast.error("Please fill in the required fields correctly.");
      return;
    }

    const finalOrderData = {
      userId: orderData.userId,
      totalAmount: orderData.totalAmount,
      provider: orderData.provider,
      items: orderData.items.map((item: any) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.price,
      })),
      addressData: { ...result.data, city: formData.city, isDefault: false },
    };

    placeOrder(finalOrderData, {
      onSuccess: () => {
        toast.success("Order placed successfully!");
        onClose();
      },
      onError: (err: any) =>
        toast.error(err.message || "Failed to place order"),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 text-green-600 rounded-full">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Checkout</h2>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Confirm your order
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
          <InputGroup
            name="fullName"
            value={formData.fullName}
            placeholder="Full Name"
            icon={<User size={16} />}
            onChange={handleChange}
            error={errors.fullName}
          />
          <InputGroup
            name="phone"
            value={formData.phone}
            placeholder="Phone"
            icon={<Phone size={16} />}
            onChange={handleChange}
            error={errors.phone}
          />
          <InputGroup
            name="street"
            value={formData.street}
            placeholder="Street Address"
            icon={<Truck size={16} />}
            onChange={handleChange}
            error={errors.street}
          />
          <div className="flex gap-2">
            <InputGroup
              name="city"
              value={formData.city}
              placeholder="City"
              onChange={handleChange}
              error={errors.city}
            />
            <InputGroup
              name="area"
              value={formData.area}
              placeholder="Area"
              icon={<MapPin size={16} />}
              onChange={handleChange}
              error={errors.area}
            />
            <InputGroup
              name="postCode"
              value={formData.postCode}
              placeholder="Post Code"
              onChange={handleChange}
              error={errors.postCode}
            />
          </div>
        </div>

        <div className="p-5 bg-gray-50 border-t border-gray-100">
          <button
            onClick={handleConfirmOrder}
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-xl font-bold hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              `Pay ৳${orderData.totalAmount}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
