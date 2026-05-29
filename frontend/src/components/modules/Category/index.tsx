"use client";

import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import CategoryHeader from "./CategoryHeader";
import ActionButtons from "./ActionButtons";
import HierarchyMatrix from "./Hierarchy/HierarchyMatrix";
import AddModals from "./Modals/AddModals";
import EditDeleteModals from "./Modals/EditDeleteModals";
import { ICategory } from "@/types/category.type";
import { deleteCategory, deleteItem, deleteSubCategory, updateCategory, updateItem, updateSubCategory } from "@/services/category.services";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Category() {
    const queryClient = useQueryClient();
    const { data: categoryResponse, isLoading, refetch } = useCategories();
    const categories = (categoryResponse?.data as unknown as ICategory[]) || [];

    const [activeTab, setActiveTab] = useState<"category" | "sub" | "item" | null>(null);
    const [editModal, setEditModal] = useState({ open: false, type: "", id: "", name: "" });
    const [deleteModal, setDeleteModal] = useState({ open: false, type: "", id: "" });

    // Update Mutation
    const { mutate: handleUpdate } = useMutation({
        mutationFn: async ({ type, id, name }: { type: string, id: string, name: string }) => {
            if (type === 'category') return await updateCategory(id, { name });
            if (type === 'subCategory') return await updateSubCategory(id, { name });
            return await updateItem(id, { name });
        },
        onSuccess: (result: any) => {
            if (result && result.id) {
                toast.success("Updated successfully!");
                queryClient.invalidateQueries({ queryKey: ["category-menu"] });
                setEditModal({ open: false, type: "", id: "", name: "" });
            } else {
                toast.error("Update failed: Invalid response");
            }
        },
    });

    // Delete Mutation
    const { mutate: handleDelete } = useMutation({
        mutationFn: async ({ type, id }: { type: 'category' | 'subCategory' | 'item', id: string }) => {
            if (type === 'category') return await deleteCategory(id);
            if (type === 'subCategory') return await deleteSubCategory(id);
            return await deleteItem(id);
        },
        onSuccess: (result: any) => {
            toast.success("Deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["category-menu"] });
            setDeleteModal({ open: false, type: "", id: "" });
        }
    });

    const handleConfirmEdit = () => {
        handleUpdate({ type: editModal.type, id: editModal.id, name: editModal.name });
    };

    const handleConfirmDelete = () => {
        handleDelete({ type: deleteModal.type as any, id: deleteModal.id });
    };

    return (
        <div className="min-h-screen mt-2 space-y-8 pb-10">
            <CategoryHeader categories={categories} isLoading={isLoading} />

            <ActionButtons setActiveTab={setActiveTab} />

            <HierarchyMatrix
                categories={categories}
                isLoading={isLoading}
                onEdit={(type, id, name) => setEditModal({ open: true, type, id, name })}
                onDelete={(type, id) => setDeleteModal({ open: true, type, id })}
            />

            <AddModals
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                refetch={refetch}
            />

            <EditDeleteModals
                editModal={editModal}
                setEditModal={setEditModal}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                onConfirmEdit={handleConfirmEdit}
                onConfirmDelete={handleConfirmDelete}
            />
        </div>
    );
}