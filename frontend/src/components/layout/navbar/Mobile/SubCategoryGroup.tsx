import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryItem } from "./CategoryItem";
import { cn } from "@/lib/utils";
export const SubCategoryGroup = ({ sub, openSubCategory, setOpenSubCategory, pathname, setOpen }: any) => {
    const isOpen = openSubCategory === sub.name;

    return (
        <div key={sub.name}>
            <div
                onClick={() => setOpenSubCategory(isOpen ? null : sub.name)}
                className={cn(
                    "flex items-center justify-between py-2 text-[13px] cursor-pointer transition-colors",
                    isOpen ? "text-orange-600 font-bold" : "text-slate-500 hover:text-slate-800"
                )}
            >
                <span>{sub.name}</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="grid grid-cols-1 gap-1.5 py-1">
                        {sub.items?.map((item: any, i: number) => (
                            <CategoryItem key={i} item={item} pathname={pathname} setOpen={setOpen} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};