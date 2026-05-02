import { motion } from "framer-motion";
import { Button } from "../../../ui/button";

const MotionButton = motion.create(Button);

export const DiscountHeader = ({ label }: { label: string }) => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 border-b border-slate-100 pb-6 gap-4"
    >
        <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
                <span className="w-2 h-10 bg-[#C6002C] rounded-full inline-block"></span>
                Flash Sale
            </h2>
            <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">{label}</p>
        </div>
        <MotionButton variant="secondary" className="rounded-full px-8 py-6 font-bold text-sm shadow-sm">
            View All Offers
        </MotionButton>
    </motion.div>
);