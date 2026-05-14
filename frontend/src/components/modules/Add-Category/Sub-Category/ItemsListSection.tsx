import { Plus, Trash2, ImageIcon, Tag } from 'lucide-react';
import { AppField } from '@/components/Shared/Form/Appfield';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function ItemsListSection({ form }: { form: any }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-blue-500" /> Items List
                </h3>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        form.pushFieldValue('items', { name: "", image: "" });
                        toast.success("New row added");
                    }}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Row
                </Button>
            </div>

            <form.Field name="items" mode="array">
                {(itemFields) => (
                    <div className="grid gap-4 p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/30 dark:bg-zinc-900/20">
                        {itemFields.state.value.map((_, i) => (
                            <div key={i} className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-zinc-900 p-3 rounded-xl border shadow-sm">
                                <form.Field name={`items[${i}].name`}>
                                    {(f) => <div className="flex-1"><AppField field={f} label="" placeholder="Item Name" /></div>}
                                </form.Field>

                                <div className="hidden sm:block w-[1px] h-6 bg-gray-100 dark:bg-zinc-800" />

                                <form.Field name={`items[${i}].image`}>
                                    {(f) => <div className="flex-1"><AppField field={f} label="" placeholder="Image URL" /></div>}
                                </form.Field>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    disabled={itemFields.state.value.length <= 1}
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

export default ItemsListSection