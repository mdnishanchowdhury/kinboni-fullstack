import { FolderPlus, ListTree, Package, LucideIcon } from "lucide-react";

interface ActionButtonsProps {
    setActiveTab: (tab: "category" | "sub" | "item" | null) => void;
}

const ActionButton = ({
    icon: Icon,
    label,
    subLabel,
    colorClass,
    onClick
}: {
    icon: LucideIcon,
    label: string,
    subLabel: string,
    colorClass: string,
    onClick: () => void
}) => (
    <button
        onClick={onClick}
        className={`group flex h-16 items-center gap-3 rounded-2xl border border-border/80 bg-background/70 px-5 text-left shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-${colorClass}-500/40 hover:bg-${colorClass}-500/5`}
    >
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${colorClass}-500/10 text-${colorClass}-500 transition-all group-hover:bg-${colorClass}-500 group-hover:text-white`}>
            <Icon className="h-5 w-5" />
        </div>
        <div>
            <p className="text-sm font-semibold">{label}</p>
            <p className="text-xs text-muted-foreground">{subLabel}</p>
        </div>
    </button>
);

export default function ActionButtons({ setActiveTab }: ActionButtonsProps) {
    return (
        <div className="mt-4 grid h-auto w-full grid-cols-1 gap-3 rounded-2xl bg-transparent p-0 md:grid-cols-3">
            <ActionButton
                icon={FolderPlus}
                label="Add Category"
                subLabel="Create new categories"
                colorClass="emerald"
                onClick={() => setActiveTab("category")}
            />
            <ActionButton
                icon={ListTree}
                label="Add Sub Category"
                subLabel="Organize sub sections"
                colorClass="blue"
                onClick={() => setActiveTab("sub")}
            />
            <ActionButton
                icon={Package}
                label="Add Items"
                subLabel="Manage product items"
                colorClass="amber"
                onClick={() => setActiveTab("item")}
            />
        </div>
    );
}