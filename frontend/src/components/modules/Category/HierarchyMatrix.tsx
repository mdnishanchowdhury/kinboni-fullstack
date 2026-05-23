import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Grid, Tag, Edit2, Trash2 } from "lucide-react";
import { ICategory } from "@/types/category";

interface HierarchyMatrixProps {
    categories: ICategory[];
    isLoading: boolean;
    onEdit: (type: string, id: string, name: string) => void;
    onDelete: (type: string, id: string) => void;
}

export default function HierarchyMatrix({ categories, isLoading, onEdit, onDelete }: HierarchyMatrixProps) {


    const handleEditTrigger = (type: string, id: string, name: string) => {
        onEdit(type, id, name);
    };

    const handleDeleteTrigger = (type: string, id: string) => {
        onDelete(type, id);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-background rounded-2xl border border-border/60 shadow-sm">
                <div className="h-8 w-8 text-emerald-500 animate-spin border-2 border-current border-t-transparent rounded-full" />
                <p className="text-xs text-muted-foreground mt-2 font-medium">Loading Kinboni matrix database...</p>
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

            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64 bg-background rounded-2xl border border-border/60 shadow-sm">
                    <div className="h-8 w-8 text-emerald-500 animate-spin border-2 border-current border-t-transparent rounded-full" />
                    <p className="text-xs text-muted-foreground mt-2 font-medium">Loading Kinboni matrix database...</p>
                </div>
            ) : categories.length === 0 ? (
                <div className="text-center py-12 bg-background rounded-2xl border border-border text-muted-foreground text-sm">
                    No hierarchy layers constructed yet. Use the wizard above to create data.
                </div>
            ) : (
                <>
                    {/* MOBILE VERSION */}
                    <div className="block lg:hidden space-y-4">
                        {categories.map((category) => (
                            <div key={category.id} className="bg-background rounded-2xl border border-border shadow-xs p-4 space-y-4">
                                <div className="flex items-start justify-between border-b border-border pb-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 rounded-xl border border-border bg-muted">
                                            <AvatarImage src={category.icon} className="object-cover" />
                                            <AvatarFallback className="bg-emerald-500/10 text-emerald-500 font-semibold text-xs">{category.name?.[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-bold text-foreground text-[15px]">{category.name}</h3>
                                            <p className="text-[10px] text-muted-foreground">Main Category</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-border">
                                        <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-blue-500" onClick={() => handleEditTrigger("category", category.id, category.name)}>
                                            <Edit2 className="h-3 w-3" />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-red-500" onClick={() => handleDeleteTrigger("category", category.id)}>
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>

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
                                                        <button className="text-[11px] text-muted-foreground hover:text-blue-500 font-medium" onClick={() => handleEditTrigger("subCategory", sub.id, sub.name)}>Edit</button>
                                                        <span className="text-muted-foreground/40 text-[10px]">|</span>
                                                        <button className="text-[11px] text-muted-foreground hover:text-red-500 font-medium" onClick={() => handleDeleteTrigger("subCategory", sub.id)}>Delete</button>
                                                    </div>
                                                </div>

                                                {
                                                    sub.items && sub.items.length > 0 && (
                                                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40 mt-2">
                                                            {sub.items.map((item) => (
                                                                <div key={item.id} className="inline-flex items-center gap-1.5 bg-background text-foreground border border-border rounded-lg pl-2.5 pr-1 py-1 text-[11px] font-medium shadow-3xs">
                                                                    <span>{item.name}</span>
                                                                    <div className="flex items-center bg-muted rounded-md border border-border">
                                                                        <button className="text-muted-foreground hover:text-blue-500 p-1" onClick={() => handleEditTrigger("item", item.id, item.name)}>
                                                                            <Edit2 className="h-2.5 w-2.5" />
                                                                        </button>
                                                                        <button className="text-muted-foreground hover:text-red-500 p-1" onClick={() => handleDeleteTrigger("item", item.id)}>
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
                        ))}
                    </div>

                    {/* DESKTOP VERSION */}
                    <div className="hidden lg:block rounded-2xl border border-border bg-background shadow-xs overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
                                    <TableHead className="w-[100px] text-xs font-bold text-muted-foreground uppercase py-4 pl-6">Icon</TableHead>
                                    <TableHead className="w-[250px] text-xs font-bold text-muted-foreground uppercase py-4">Main Category</TableHead>
                                    <TableHead className="text-xs font-bold text-muted-foreground uppercase py-4 pr-6">Sub Categories & Product Items</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    categories.map((category) => (
                                        <TableRow key={category.id} className="align-middle border-b border-border hover:bg-muted/20 transition-colors last:border-none">
                                            <TableCell className="py-5 pl-6 align-top">
                                                <Avatar className="h-12 w-12 rounded-xl border border-border shadow-3xs bg-muted">
                                                    <AvatarImage src={category.icon} className="object-cover" />
                                                    <AvatarFallback className="bg-emerald-500/10 text-emerald-500 font-bold text-sm">{category.name?.[0]}</AvatarFallback>
                                                </Avatar>
                                            </TableCell>

                                            <TableCell className="py-5 align-top">
                                                <div className="space-y-2 pt-1">
                                                    <div className="font-bold text-foreground text-[16px] tracking-tight">{category.name}</div>
                                                    <div className="flex items-center gap-1">
                                                        <Button size="sm" variant="ghost" className="h-6 px-2 text-[11px] text-muted-foreground hover:text-blue-500 hover:bg-blue-500/5 gap-1 rounded-md" onClick={() => handleEditTrigger("category", category.id, category.name)}>
                                                            <Edit2 className="h-3 w-3" /> Edit
                                                        </Button>
                                                        <Button size="sm" variant="ghost" className="h-6 px-2 text-[11px] text-muted-foreground hover:text-red-500 hover:bg-red-500/5 gap-1 rounded-md" onClick={() => handleDeleteTrigger("category", category.id)}>
                                                            <Trash2 className="h-3 w-3" /> Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell className="py-4 pr-6 align-top">
                                                <div className="w-full space-y-3">
                                                    {
                                                        category.subCategories?.map((sub) => (
                                                            <div key={sub.id} className="grid grid-cols-[220px_1fr] items-start bg-muted/20 hover:bg-muted/40 border border-border rounded-xl overflow-hidden transition-all shadow-3xs">
                                                                <div className="p-3 bg-background border-r border-border h-full flex flex-col justify-between group min-h-[52px]">
                                                                    <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                                                                        <Tag className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                                                                        <span className="truncate">{sub.name}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity pt-1 mt-1 border-t border-border">
                                                                        <button className="text-[10px] text-muted-foreground hover:text-blue-500 font-semibold" onClick={() => handleEditTrigger("subCategory", sub.id, sub.name)}>Edit</button>
                                                                        <span className="text-muted-foreground/30 text-[9px]">|</span>
                                                                        <button className="text-[10px] text-muted-foreground hover:text-red-500 font-semibold" onClick={() => handleDeleteTrigger("subCategory", sub.id)}>Delete</button>
                                                                    </div>
                                                                </div>

                                                                <div className="p-3 flex flex-wrap gap-2 items-center min-h-[52px]">
                                                                    {
                                                                        sub.items && sub.items.length > 0 ? (
                                                                            sub.items.map((item) => (
                                                                                <div key={item.id} className="inline-flex items-center gap-2 bg-background text-muted-foreground border border-border shadow-4xs rounded-lg pl-3 pr-1.5 py-1 text-xs hover:border-border-hover transition-all group/item">
                                                                                    <span className="font-medium text-foreground text-[12px]">{item.name}</span>
                                                                                    <div className="flex items-center gap-0.5 bg-muted border border-border rounded-md p-0.5 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                                                        <button className="text-muted-foreground hover:text-blue-500 p-0.5" onClick={() => handleEditTrigger("item", item.id, item.name)}>
                                                                                            <Edit2 className="h-2.5 w-2.5" />
                                                                                        </button>
                                                                                        <button className="text-muted-foreground hover:text-red-500 p-0.5" onClick={() => handleDeleteTrigger("item", item.id)}>
                                                                                            <Trash2 className="h-2.5 w-2.5" />
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                            <span className="text-xs text-muted-foreground italic pl-1">No product items added</span>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}
        </div>
    );
}