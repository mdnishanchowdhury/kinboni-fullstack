"use client";

import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";

export const NoDealsState = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center py-24 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200"
        >
            <div className="mb-4 p-4 bg-white rounded-full shadow-sm">
                <PackageSearch className="w-10 h-10 text-slate-300" />
            </div>

            <div className="space-y-2">
                <p className="text-slate-500 text-xl font-semibold italic">
                    No active flash deals at the moment!
                </p>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">
                    Don&apos;t worry! Check back later for our next exclusive summer fashion discounts.
                </p>
            </div>

            <button
                onClick={() => window.location.reload()}
                className="mt-6 text-[#C6002C] font-bold text-sm hover:underline transition-all"
            >
                Refresh Page
            </button>
        </motion.div>
    );
};