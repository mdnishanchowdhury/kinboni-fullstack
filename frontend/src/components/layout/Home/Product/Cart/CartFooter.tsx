import { Button } from "../../../../ui/button";
interface CartFooterProps {
    subtotal: number;
    onCheckout?: () => void;
}

export default function CartFooter({ subtotal, onCheckout }: CartFooterProps) {
    return (
        <div className="mt-6 border-t pt-6 space-y-4">
            {/* Pricing Summary */}
            <div className="flex justify-between items-center text-black">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="text-xl font-bold">${subtotal.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <Button
                onClick={onCheckout}
                className="w-full rounded-2xl bg-black py-7 text-center font-bold text-white hover:bg-gray-800 shadow-xl transition-all active:scale-[0.98]"
            >
                Proceed to Checkout
            </Button>

            {/* Helper Text */}
            <p className="text-center text-[10px] text-gray-400 uppercase tracking-wider">
                Taxes and shipping calculated at checkout
            </p>
        </div>
    );
}