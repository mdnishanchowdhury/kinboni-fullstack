import { Plus, Trash2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppField } from '@/components/Shared/Form/Appfield';
import { toast } from 'sonner';
import { ProductItemRow } from './ProductItemRow';

interface SubCategoryItemProps {
    form: any;
    subCatFields: any;
    index: number;
    resetKey: number;
}

export function SubCategoryItem({ form, subCatFields, index, resetKey }: SubCategoryItemProps) {
    return (
        <div className="md:p-6 rounded-[24px] border border-gray-100 dark:border-zinc-900 bg-slate-50/30 dark:bg-zinc-900/10 relative transition-all">

            {/* Delete Sub-Category Button */}
            <Button
                type="button"
                variant="ghost"
                onClick={() => {
                    if (subCatFields.state.value.length > 1) {
                        form.removeFieldValue('subCategories', index);
                        toast.error("Sub-category removed");
                    }
                }}
                className="absolute -top-[5px] md:top-4 right-4 text-slate-300 hover:text-red-500 rounded-full h-8 w-8 p-0"
            >
                <Trash2 size={16} className='text-green-500' />
            </Button>

            {/* Sub-Category Name Input */}
            <div className="max-w-md mb-6 space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest px-1">Sub-Category Name</label>
                <form.Field name={`subCategories[${index}].name`}>
                    {(field: any) => (
                        <div className="space-y-1">
                            <AppField field={field} label="" placeholder="e.g. T-Shirts" className="rounded-xl bg-white" />
                        </div>
                    )}
                </form.Field>
            </div>

            {/* Nested Product Items List */}
            <div className="md:pl-6 md:border-l-2 border-green-500/20 space-y-4 md:ml-2">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                    <Sparkles size={12} className="text-green-500" /> Product Items
                </p>

                <form.Field name={`subCategories[${index}].items`} mode="array">
                    {(itemFields: any) => (
                        <div className="space-y-4">
                            <div className="grid gap-3">
                                {(itemFields.state.value || []).map((productItem: any, j: number) => {
                                    const itemKey = productItem?.id || `item-dynamic-${index}-${j}`;
                                    return (
                                        <ProductItemRow
                                            key={itemKey}
                                            form={form}
                                            subCatIndex={index}
                                            itemIndex={j}
                                            itemFields={itemFields}
                                            resetKey={resetKey}
                                        />
                                    );
                                })}
                            </div>

                            {/* Add Item Button */}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    form.pushFieldValue(`subCategories[${index}].items`, { name: "", image: undefined });
                                    toast.success("New product item added");
                                }}
                                className="w-full py-5 border-dashed border-gray-200 dark:border-zinc-800 hover:border-green-500 hover:bg-green-50/20 rounded-2xl text-xs font-semibold text-slate-500 hover:text-green-600 transition-all flex items-center justify-center gap-1"
                            >
                                <Plus size={14} /> Add Item
                            </Button>
                        </div>
                    )}
                </form.Field>
            </div>
        </div>
    );
}