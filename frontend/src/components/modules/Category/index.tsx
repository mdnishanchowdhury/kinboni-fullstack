"use client";

import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import CategoryHeader from "./CategoryHeader";
import ActionButtons from "./ActionButtons";
import HierarchyMatrix from "./HierarchyMatrix";
import AddModals from "./Modals/AddModals";
import EditDeleteModals from "./Modals/EditDeleteModals";
import { ICategory } from "@/types/category";

export default function Category() {
    const { data: categoryResponse, isLoading, refetch } = useCategories();
    const categories = (categoryResponse?.data as unknown as ICategory[]) || [];

    const [activeTab, setActiveTab] = useState<"category" | "sub" | "item" | null>(null);

    const [editModal, setEditModal] = useState({ open: false, type: "", id: "", name: "" });
    const [deleteModal, setDeleteModal] = useState({ open: false, type: "", id: "" });

    const handleConfirmEdit = () => {
        console.log(`Updating ${editModal.type} to: ${editModal.name}`);
        setEditModal(prev => ({ ...prev, open: false }));
    };

    const handleConfirmDelete = () => {
        console.log(`Deleting ${deleteModal.type}`);
        setDeleteModal(prev => ({ ...prev, open: false }));
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