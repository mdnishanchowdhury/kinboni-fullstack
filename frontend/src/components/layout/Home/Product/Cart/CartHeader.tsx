import { X, ShoppingBag } from "lucide-react";
import { Button } from "../../../../ui/button";

interface CartHeaderProps {
    onClose: () => void;
    itemCount?: number;
}

export default function CartHeader({ onClose, itemCount = 1 }: CartHeaderProps) {
    return (
        <div className="mb-8 flex items-center justify-between border-b pb-6">
            <div className="flex items-center gap-3 text-black">
                <div className="relative">
                    <ShoppingBag className="w-6 h-6" />
                    {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#C6002C] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            {itemCount}
                        </span>
                    )}
                </div>
                <h2 className="text-xl font-bold">Shopping Cart</h2>
            </div>

            <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full text-gray-400 hover:text-black transition-colors"
            >
                <X className="w-5 h-5" />
            </Button>
        </div>
    );
}