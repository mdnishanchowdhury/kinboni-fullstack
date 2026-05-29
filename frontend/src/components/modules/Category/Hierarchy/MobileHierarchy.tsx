import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tag, Edit2, Trash2 } from "lucide-react";
import { ICategory } from "@/types/category.type";

interface MobileHierarchyProps {
    categories: ICategory[];
    onEdit: (type: string, id: string, name: string) => void;
    onDelete: (type: string, id: string) => void;
}

export default function MobileHierarchy({ categories, onEdit, onDelete }: MobileHierarchyProps) {
    return (
        <div className="space-y-4">
            {
                categories.map((category) => (
                    <div key={category.id} className="bg-background rounded-2xl border border-border shadow-xs p-4 space-y-4">

                        {/* Header */}
                        <div className="flex items-start justify-between border-b border-border pb-3">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 rounded-xl border border-border bg-muted">
                                    <AvatarImage src={category.icon} className="object-cover" />
                                    <AvatarFallback className="bg-emerald-500/10 text-emerald-500 font-semibold text-xs">
                                        {category.name?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold text-foreground text-[15px]">{category.name}</h3>
                                    <p className="text-[10px] text-muted-foreground">Main Category</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-border">
                                <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-blue-500" onClick={() => onEdit("category", category.id, category.name)}>
                                    <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-red-500" onClick={() => onDelete("category", category.id)}>
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>

                        {/* Sub-categories */}
                        <div className="space-y-3 pl-1">
                            {
                                category.subCategories?.map((sub) => (
                                    <div key={sub.id} className="space-y-2 bg-muted/30 rounded-xl p-3 border border-border/50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                                                <Tag className="h-3 w-3 text-blue-500 shrink-0" />
                                                <span>{sub.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="text-[11px] text-muted-foreground hover:text-blue-500 font-medium" onClick={() => onEdit("subCategory", sub.id, sub.name)}>Edit</button>
                                                <span className="text-muted-foreground/40 text-[10px]">|</span>
                                                <button className="text-[11px] text-muted-foreground hover:text-red-500 font-medium" onClick={() => onDelete("subCategory", sub.id)}>Delete</button>
                                            </div>
                                        </div>

                                        {/* Items */}
                                        {
                                            sub.items?.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40 mt-2">
                                                    {sub.items.map((item) => (
                                                        <div key={item.id} className="inline-flex items-center gap-1.5 bg-background text-foreground border border-border rounded-lg pl-2.5 pr-1 py-1 text-[11px] font-medium shadow-3xs">
                                                            <span>{item.name}</span>
                                                            <div className="flex items-center bg-muted rounded-md border border-border">
                                                                <button className="text-muted-foreground hover:text-blue-500 p-1" onClick={() => onEdit("item", item.id, item.name)}>
                                                                    <Edit2 className="h-2.5 w-2.5" />
                                                                </button>
                                                                <button className="text-muted-foreground hover:text-red-500 p-1" onClick={() => onDelete("item", item.id)}>
                                                                    <Trash2 className="h-2.5 w-2.5" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
}