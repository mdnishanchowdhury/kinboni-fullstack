import { Plus, Trash2, Layers3, Sparkles } from 'lucide-react';
import { AppField } from '@/components/Shared/Form/Appfield';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function SubCategoryList({ form }: { form: any }) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Layers3 className="text-green-500" size={20} /> Sub Categories
                </h3>
                <Button
                    type="button"
                    onClick={() => {
                        form.pushFieldValue('subCategories', { name: "", items: [{ name: "", image: "" }] });
                        toast.success("New sub-category added");
                    }}
                    className="bg-green-500 hover:bg-black text-white rounded-xl font-bold h-10 transition-all"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Sub Category
                </Button>
            </div>

            <form.Field name="subCategories" mode="array">
                {(subCatFields) => (
                    <div className="grid gap-8">
                        {subCatFields.state.value.map((_, i) => (
                            <div key={`sub-${i}`} className="p-6 rounded-[24px] border border-gray-100 dark:border-zinc-900 bg-slate-50/30 dark:bg-zinc-900/10 relative transition-all animate-in fade-in zoom-in-95">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => {
                                        if (subCatFields.state.value.length > 1) {
                                            form.removeFieldValue('subCategories', i);
                                            toast.error("Sub-category removed");
                                        }
                                    }}
                                    className="absolute top-4 right-4 text-slate-300 hover:text-red-500 rounded-full h-8 w-8 p-0"
                                >
                                    <Trash2 size={16} />
                                </Button>

                                <div className="max-w-md mb-6 space-y-2">
                                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest px-1">Sub-Category Name</label>
                                    <form.Field name={`subCategories[${i}].name`}>
                                        {(field) => <AppField field={field} label="" placeholder="e.g. T-Shirts" className="rounded-xl bg-white" />}
                                    </form.Field>
                                </div>

                                {/* Nested Items */}
                                <div className="pl-6 border-l-2 border-green-500/20 space-y-4 ml-2">
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                        <Sparkles size={12} className="text-green-500" /> Product Items
                                    </p>
                                    <form.Field name={`subCategories[${i}].items`} mode="array">
                                        {(itemFields) => (
                                            <div className="grid gap-3">
                                                {itemFields.state.value.map((_, j) => (
                                                    <div key={`item-${i}-${j}`} className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-gray-100 dark:border-zinc-800">
                                                        <form.Field name={`subCategories[${i}].items[${j}].name`}>
                                                            {(f) => <div className="flex-1"><AppField field={f} label="" placeholder="Item Name" className="border-none bg-transparent h-10 focus:ring-0 text-sm" /></div>}
                                                        </form.Field>

                                                        <div className="hidden sm:block w-[1px] h-6 bg-gray-100 dark:bg-zinc-800" />

                                                        <form.Field name={`subCategories[${i}].items[${j}].image`}>
                                                            {(f) => <div className="flex-1"><AppField field={f} label="" placeholder="Image URL" className="border-none bg-transparent h-10 focus:ring-0 text-sm" /></div>}
                                                        </form.Field>

                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            onClick={() => {
                                                                if (itemFields.state.value.length > 1) form.removeFieldValue(`subCategories[${i}].items`, j);
                                                            }}
                                                            className="h-10 w-10 text-slate-300 hover:text-red-500"
                                                        >
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={() => form.pushFieldValue(`subCategories[${i}].items`, { name: "", image: "" })}
                                                    className="w-full border-dashed border-2 border-slate-200 text-slate-400 text-xs h-10 hover:bg-white hover:text-green-500 rounded-xl transition-all"
                                                >
                                                    <Plus size={14} className="mr-1" /> Add Item
                                                </Button>
                                            </div>
                                        )}
                                    </form.Field>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </form.Field>
        </div>
    )
}

export default SubCategoryList