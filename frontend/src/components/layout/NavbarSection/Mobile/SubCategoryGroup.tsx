import { CategoryItem } from "./CategoryItem";
export const SubCategoryGroup = ({ sub, openSubCategory, setOpenSubCategory, setOpen }: any) => {
    return (
        <div className="mt-1">
            <div
                onClick={() => setOpenSubCategory(openSubCategory === sub.name ? null : sub.name)}
                className="flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-slate-50"
            >
                <span className="text-[13px]">{sub.name}</span>
            </div>

            {
                openSubCategory === sub.name && (
                    <div className="ml-2 pl-3 border-l border-slate-100 space-y-1 mt-1">
                        {
                            sub.items?.map((item: any) => (
                                <CategoryItem
                                    key={item.id}
                                    item={item}
                                    setOpen={setOpen}
                                />
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};