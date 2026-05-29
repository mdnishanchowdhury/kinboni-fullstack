import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Tag, Edit2, Trash2 } from "lucide-react";
import { ICategory } from "@/types/category.type";

interface CategoryRowProps {
    category: ICategory;
    onEdit: (type: string, id: string, name: string) => void;
    onDelete: (type: string, id: string) => void;
}

export default function CategoryRow({ category, onEdit, onDelete }: CategoryRowProps) {
    return (
        <TableRow className="align-middle border-b border-border hover:bg-muted/20 transition-colors last:border-none">
            {/* Icon */}
            <TableCell className="py-5 pl-6 align-top">
                <Avatar className="h-12 w-12 rounded-xl border border-border shadow-3xs bg-muted">
                    <AvatarImage src={category.icon} className="object-cover" />
                    <AvatarFallback className="bg-emerald-500/10 text-emerald-500 font-bold text-sm">
                        {category.name?.[0]}
                    </AvatarFallback>
                </Avatar>
            </TableCell>

            {/* Main Category Details */}
            <TableCell className="py-5 align-top">
                <div className="space-y-2 pt-1">
                    <div className="font-bold text-foreground text-[16px] tracking-tight">{category.name}</div>
                    <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" className="h-6 px-2 text-[11px] text-muted-foreground hover:text-blue-500 gap-1 rounded-md" onClick={() => onEdit("category", category.id, category.name)}>
                            <Edit2 className="h-3 w-3" /> Edit
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 px-2 text-[11px] text-muted-foreground hover:text-red-500 gap-1 rounded-md" onClick={() => onDelete("category", category.id)}>
                            <Trash2 className="h-3 w-3" /> Delete
                        </Button>
                    </div>
                </div>
            </TableCell>

            {/* Sub Categories & Items */}
            <TableCell className="py-4 pr-6 align-top">
                <div className="w-full space-y-3">
                    {category.subCategories?.map((sub) => (
                        <div key={sub.id} className="grid grid-cols-[220px_1fr] items-start bg-muted/20 hover:bg-muted/40 border border-border rounded-xl overflow-hidden transition-all shadow-3xs">
                            <div className="p-3 bg-background border-r border-border h-full flex flex-col justify-between group min-h-[52px]">
                                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                                    <Tag className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                                    <span className="truncate">{sub.name}</span>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity pt-1 mt-1 border-t border-border">
                                    <button className="text-[10px] text-muted-foreground hover:text-blue-500 font-semibold" onClick={() => onEdit("subCategory", sub.id, sub.name)}>Edit</button>
                                    <span className="text-muted-foreground/30 text-[9px]">|</span>
                                    <button className="text-[10px] text-muted-foreground hover:text-red-500 font-semibold" onClick={() => onDelete("subCategory", sub.id)}>Delete</button>
                                </div>
                            </div>

                            <div className="p-3 flex flex-wrap gap-2 items-center min-h-[52px]">
                                {sub.items?.length > 0 ? (
                                    sub.items.map((item) => (
                                        <div key={item.id} className="inline-flex items-center gap-2 bg-background text-muted-foreground border border-border shadow-4xs rounded-lg pl-3 pr-1.5 py-1 text-xs hover:border-border-hover transition-all group/item">
                                            <span className="font-medium text-foreground text-[12px]">{item.name}</span>
                                            <div className="flex items-center gap-0.5 bg-muted border border-border rounded-md p-0.5 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                <button className="text-muted-foreground hover:text-blue-500 p-0.5" onClick={() => onEdit("item", item.id, item.name)}>
                                                    <Edit2 className="h-2.5 w-2.5" />
                                                </button>
                                                <button className="text-muted-foreground hover:text-red-500 p-0.5" onClick={() => onDelete("item", item.id)}>
                                                    <Trash2 className="h-2.5 w-2.5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-xs text-muted-foreground italic pl-1">No product items added</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </TableCell>
        </TableRow>
    );
}