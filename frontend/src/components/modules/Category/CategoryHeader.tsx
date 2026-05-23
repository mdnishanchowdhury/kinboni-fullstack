import { useMemo } from "react";
import { LayoutDashboard, Grid, ListTree, Layers, LucideIcon } from "lucide-react";

interface CategoryHeaderProps {
    categories: any[];
    isLoading: boolean;
}

const StatBadge = ({ icon: Icon, color, count, label }: { icon: LucideIcon, color: string, count: number, label: string }) => (
    <div className={`inline-flex items-center gap-1.5 bg-${color}-500/5 border border-${color}-500/20 text-foreground text-xs font-medium px-3 py-1.5 rounded-full`}>
        <Icon className={`h-3.5 w-3.5 text-${color}-500`} />
        <span><strong>{count}</strong> {count === 1 ? label : `${label}s`}</span>
    </div>
);

export default function CategoryHeader({ categories, isLoading }: CategoryHeaderProps) {

    const { totalCategories, totalSubCategories, totalItems } = useMemo(() => {
        const cats = categories.length;
        const subs = categories.reduce((acc, curr) => acc + (curr.subCategories?.length || 0), 0);
        const items = categories.reduce((acc, curr) =>
            acc + (curr.subCategories?.reduce((subAcc: number, subCurr: any) => subAcc + (subCurr.items?.length || 0), 0) || 0), 0);

        return { totalCategories: cats, totalSubCategories: subs, totalItems: items };
    }, [categories]);

    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border/60 pb-6">
            <div className="flex items-center gap-3">
                <LayoutDashboard className="h-8 w-8 text-primary" />
                <div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight">Category Management</h1>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Manage categories, sub-categories & product items professionally
                    </p>
                </div>
            </div>

            {
                !isLoading && categories.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2.5">

                        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span>Active</span>
                        </div>

                        <StatBadge icon={Grid} color="emerald" count={totalCategories} label="category" />
                        <StatBadge icon={ListTree} color="blue" count={totalSubCategories} label="sub-category" />
                        <StatBadge icon={Layers} color="amber" count={totalItems} label="item" />
                    </div>
                )
            }
        </div>
    );
}