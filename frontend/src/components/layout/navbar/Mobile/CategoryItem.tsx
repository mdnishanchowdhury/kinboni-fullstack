import { cn } from "@/lib/utils";
import Link from "next/link";

export const CategoryItem = ({ item, pathname, setOpen }: any) => {
  const itemSlug = `/product/${item.slug || item.name.toLowerCase().replace(/\s+/g, '-')}`;
  const isActive = pathname === itemSlug;

  return (
    <Link
      href={itemSlug}
      onClick={() => setOpen(false)}
      className={cn(
        "flex items-center gap-3 p-1 rounded-lg transition-all border",
        isActive
          ? "bg-orange-50 w-[220px] border-orange-200 text-orange-600 shadow-sm translate-x-1"
          : "bg-white border-transparent text-slate-600 hover:bg-slate-50"
      )}
    >
      {item.image && (
        <div className={cn("w-7 h-7 rounded-md object-cover overflow-hidden shrink-0 border", isActive ? "border-orange-200" : "border-slate-100")}>
          <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
        </div>
      )}
      <span className={cn("text-[13px]", isActive ? "font-bold" : "font-medium")}>
        {item.name}
      </span>
    </Link>
  );
};