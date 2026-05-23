import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FolderPlus, ListTree, Package, LucideIcon } from "lucide-react";
import AddCategoryForm from "@/components/modules/Add-Category/Create-Category/AddCategoryForm";
import AddSubCategoryForm from "@/components/modules/Add-Category/Sub-Category/AddSubCategoryForm";
import AddItemsForm from "@/components/modules/Add-Category/Item-Category/AddItemsForm";

type TabType = "category" | "sub" | "item";

interface ModalConfig {
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    Component: React.ComponentType<{ onSuccess: () => void }>;
}

const MODAL_CONFIGS: Record<TabType, ModalConfig> = {
    category: {
        title: "Create New Category",
        description: "Enter the details below to add a new category to your inventory.",
        icon: FolderPlus,
        color: "text-emerald-500",
        Component: AddCategoryForm,
    },
    sub: {
        title: "Add Sub Category",
        description: "Create a sub-category under your selected main category to organize your products.",
        icon: ListTree,
        color: "text-blue-500",
        Component: AddSubCategoryForm,
    },
    item: {
        title: "Add Product Items",
        description: "Add new product items to your sub-category to expand your inventory.",
        icon: Package,
        color: "text-amber-500",
        Component: AddItemsForm,
    },
};

export default function AddModals({
    activeTab,
    setActiveTab,
    refetch
}: {
    activeTab: TabType | null;
    setActiveTab: (tab: TabType | null) => void;
    refetch: () => void
}) {
    const config = activeTab ? MODAL_CONFIGS[activeTab] : null;
    const Icon = config?.icon;

    const handleSuccess = () => {
        setActiveTab(null);
        refetch();
    };

    return (
        <Dialog open={!!activeTab} onOpenChange={(open) => !open && setActiveTab(null)}>
            <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto rounded-2xl p-6">
                {config && (
                    <>
                        <DialogHeader className="pb-2 border-b border-slate-100 dark:border-zinc-800">
                            <DialogTitle className={`text-lg font-bold flex items-center gap-2 ${config.color}`}>
                                {Icon && <Icon className="h-5 w-5" />} {config.title}
                            </DialogTitle>
                            <DialogDescription className="text-xs text-muted-foreground">
                                {config.description}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                            <config.Component onSuccess={handleSuccess} />
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}