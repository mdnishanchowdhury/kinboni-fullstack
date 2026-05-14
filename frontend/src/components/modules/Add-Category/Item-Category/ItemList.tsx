import { Plus, Trash2, Boxes } from 'lucide-react';
import { AppField } from '@/components/Shared/Form/Appfield';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function ItemList({ form }: { form: any }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4 border-slate-100 dark:border-zinc-900">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Boxes className="h-5 w-5 text-amber-500" /> Items List
                </h3>
                <Button
                    type="button"
                    onClick={() => form.pushFieldValue('items', { name: "", image: "" })}
                    className="bg-amber-500 hover:bg-black text-white rounded-xl transition-all"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Row
                </Button>
            </div>

            <form.Field name="items" mode="array">
                {(itemFields) => (
                    <div className="grid gap-4 p-4 md:p-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 dark:bg-zinc-900/20">
                        {itemFields.state.value.map((_, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl border shadow-sm items-center">
                                <div className="w-full md:flex-1">
                                    <form.Field name={`items[${i}].name`}>
                                        {(f) => <AppField field={f} label="" placeholder="Item Name" />}
                                    </form.Field>
                                </div>

                                <div className="hidden sm:block w-[1px] h-6 bg-gray-100 dark:bg-zinc-800" />

                                <div className="w-full md:flex-1">
                                    <form.Field name={`items[${i}].image`}>
                                        {(f) => <AppField field={f} label="" placeholder="Image URL" />}
                                    </form.Field>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    disabled={itemFields.state.value.length === 1}
                                    onClick={() => {
                                        form.removeFieldValue('items', i);
                                        toast.error("Row removed");
                                    }}
                                    className="text-slate-400 hover:text-red-500"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </form.Field>
        </div>
    )
}

export default ItemList