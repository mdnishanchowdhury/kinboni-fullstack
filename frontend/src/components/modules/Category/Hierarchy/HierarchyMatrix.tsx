import { Grid } from "lucide-react";
import { ICategory } from "@/types/category.type";
import MobileHierarchy from "./MobileHierarchy";
import DesktopHierarchy from "./DesktopHierarchy";

interface HierarchyMatrixProps {
    categories: ICategory[];
    isLoading: boolean;
    onEdit: (type: string, id: string, name: string) => void;
    onDelete: (type: string, id: string) => void;
}

export default function HierarchyMatrix({ categories, isLoading, onEdit, onDelete }: HierarchyMatrixProps) {

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-background rounded-2xl border border-border/60 shadow-sm">
                <div className="h-8 w-8 text-emerald-500 animate-spin border-2 border-current border-t-transparent rounded-full" />
                <p className="text-xs text-muted-foreground mt-2 font-medium">Loading...</p>
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="text-center py-12 bg-background rounded-2xl border border-border text-muted-foreground text-sm">
                No hierarchy layers constructed yet. Use the wizard above to create data.
            </div>
        );
    }

    return (
        <div className="pt-4 border-t border-border/60">
            <h2 className="text-lg font-bold tracking-tight mb-4 flex items-center gap-2">
                <Grid className="h-5 w-5 text-emerald-500" /> Current Hierarchy Matrix
            </h2>

            <div className="block lg:hidden">
                <MobileHierarchy categories={categories} onEdit={onEdit} onDelete={onDelete} />
            </div>

            <div className="hidden lg:block">
                <DesktopHierarchy categories={categories} onEdit={onEdit} onDelete={onDelete} />
            </div>
        </div>
    );
}