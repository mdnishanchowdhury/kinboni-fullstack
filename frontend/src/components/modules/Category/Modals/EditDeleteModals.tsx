import { Dispatch, SetStateAction } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ModalState {
    open: boolean;
    type: string;
    id: string;
    name?: string;
}

interface EditDeleteModalsProps {
    editModal: ModalState;
    setEditModal: Dispatch<SetStateAction<ModalState>>;
    deleteModal: ModalState;
    setDeleteModal: Dispatch<SetStateAction<ModalState>>;
    onConfirmEdit: () => void;
    onConfirmDelete: () => void;
}

export default function EditDeleteModals({
    editModal,
    setEditModal,
    deleteModal,
    setDeleteModal,
    onConfirmEdit,
    onConfirmDelete,
}: EditDeleteModalsProps) {
    return (
        <>
            <Dialog open={editModal.open} onOpenChange={(io) => setEditModal((prev) => ({ ...prev, open: io }))}>
                <DialogContent className="sm:max-w-[425px] rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-base font-bold capitalize">
                            Edit {editModal.type === "subCategory" ? "Sub-Category" : editModal.type}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground">
                            Update the name for the selected {editModal.type}.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-3">
                        <Input
                            value={editModal.name || ""}
                            onChange={(e) => setEditModal((prev) => ({ ...prev, name: e.target.value }))}
                            className="rounded-xl"
                            placeholder="Enter new name..."
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            className="rounded-xl text-xs"
                            onClick={() => setEditModal((prev) => ({ ...prev, open: false }))}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="rounded-xl text-xs bg-emerald-600 hover:bg-emerald-700"
                            onClick={onConfirmEdit}
                        >
                            Save Changes
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <AlertDialog open={deleteModal.open} onOpenChange={(io) => setDeleteModal((prev) => ({ ...prev, open: io }))}>
                <AlertDialogContent className="rounded-2xl sm:max-w-[400px]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-base font-bold text-destructive">
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-xs">
                            This action cannot be undone. This will permanently delete the selected item.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2 sm:gap-0">
                        <AlertDialogCancel className="rounded-xl text-xs">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="rounded-xl text-xs bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={onConfirmDelete}
                        >
                            Continue Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}