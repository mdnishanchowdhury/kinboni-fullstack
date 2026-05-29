import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppField } from '@/components/Shared/Form/Appfield';
import { toast } from 'sonner';

interface ProductItemRowProps {
    form: any;
    subCatIndex: number;
    itemIndex: number;
    itemFields: any;
    resetKey: number;
}

export function ProductItemRow({ form, subCatIndex, itemIndex, itemFields, resetKey }: ProductItemRowProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-gray-100 dark:border-zinc-800">

            {/* Item Name Input */}
            <form.Field name={`subCategories[${subCatIndex}].items[${itemIndex}].name`}>
                {(f: any) => (
                    <div className="flex-1">
                        <AppField field={f} label="" placeholder="Item Name (e.g. shirt)" className="border-none bg-transparent h-10 focus:ring-0 text-sm" />
                    </div>
                )}
            </form.Field>

            <div className="hidden sm:block w-[1px] h-6 bg-gray-100 dark:bg-zinc-800" />

            {/* Item Image Input */}
            <form.Field name={`subCategories[${subCatIndex}].items[${itemIndex}].image`}>
                {(f: any) => {
                    const errorMsg = f.state.meta.errors?.[0];
                    const itemImageError = typeof errorMsg === 'object' && errorMsg !== null ? (errorMsg as any).message : errorMsg;

                    return (
                        <div className="flex-1 flex flex-col justify-center">
                            <input
                                key={`sub-item-file-${subCatIndex}-${itemIndex}-${resetKey}`}
                                type="file"
                                accept="image/*"
                                className="w-full bg-transparent h-10 text-xs text-zinc-500 file:mr-2 file:py-2 pt-[5px] file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const maxItemFileSize = 1 * 1024 * 1024;
                                        if (file.size > maxItemFileSize) {
                                            toast.error("Sub-category item image exceeds 1MB limit!");
                                            e.target.value = "";
                                            f.handleChange(undefined as unknown as File);
                                            return;
                                        }
                                        f.handleChange(file);
                                    } else {
                                        f.handleChange(undefined as unknown as File);
                                    }
                                }}
                            />
                            {itemImageError && (
                                <span className="text-[11px] text-red-500 font-medium px-1 mt-0.5 block">
                                    {itemImageError}
                                </span>
                            )}
                        </div>
                    );
                }}
            </form.Field>

            {/* Remove Item Button */}
            <Button
                type="button"
                variant="ghost"
                onClick={() => {
                    if (itemFields.state.value.length > 1) {
                        form.removeFieldValue(`subCategories[${subCatIndex}].items`, itemIndex);
                    }
                }}
                className="h-10 w-10 text-slate-300 hover:text-red-500"
            >
                <Trash2 size={16} className='text-green-500' />
            </Button>
        </div>
    );
}