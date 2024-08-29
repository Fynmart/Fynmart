"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/imdos-ui/alert-dialog";
import { useImdosUI } from "@/providers/ImdosProvider";
import toast from "react-hot-toast";

export default function ConfirmAlert() {
  const { confirmAlert, setConfirmAlert } = useImdosUI();

  const handleConfirm = async () => {
    if (confirmAlert.action) {
      confirmAlert.action();
    } else {
      try {
        const formData = new FormData();
        formData.append("refId", confirmAlert?.refId);
        const request = await fetch(
          `/api/imdos/${confirmAlert?.table}/delete`,
          {
            method: "POST",
            body: formData,
          }
        );

        const response = await request.json();

        if (!request.ok) {
          throw new Error(response.message);
        }

        setConfirmAlert("");
        confirmAlert.mutate();
        toast.success(response.message);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <AlertDialog
        open={confirmAlert?.open}
        onOpenChange={() => setConfirmAlert({ open: false, refId: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAlert.message ??
                "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-red-600 text-white"
              onClick={handleConfirm}
            >
              {confirmAlert.confirmText ?? "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
