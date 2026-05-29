import { Plus, Layers3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { SubCategoryItem } from './SubCategoryItem';

interface SubCategoryListProps {
    form: any;
    resetKey: number;
}

function SubCategoryList({ form, resetKey }: SubCategoryListProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Layers3 className="text-green-500" size={20} /> Sub Categories
                </h3>
                <Button
                    type="button"
                    onClick={() => {
                        form.pushFieldValue('subCategories', { name: "", items: [{ name: "", image: undefined }] });
                        toast.success("New sub-category added");
                    }}
                    className="bg-green-500 hover:bg-black text-white rounded-xl font-bold h-8 transition-all"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Sub Category
                </Button>
            </div>

            {/* Sub Categories Main Loop */}
            <form.Field name="subCategories" mode="array">
                {(subCatFields: any) => (
                    <div className="grid gap-8">
                        {(subCatFields.state.value || []).map((subCatItem: any, i: number) => {
                            const subCatKey = subCatItem?.id || `sub-cat-dynamic-${i}`;
                            return (
                                <SubCategoryItem
                                    key={subCatKey}
                                    form={form}
                                    subCatFields={subCatFields}
                                    index={i}
                                    resetKey={resetKey}
                                />
                            );
                        })}
                    </div>
                )}
            </form.Field>
        </div>
    );
}

export default SubCategoryList;