import React from "react";
import Form from "./Form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
} from "@/components/imdos-ui/dialog";
import { useImdosUI } from "@/providers/ImdosProvider";

const FormModal = ({ title, description, form }) => {
  const { formModal, setFormModal } = useImdosUI();
  return (
    <Dialog
      open={formModal.show}
      onOpenChange={() => setFormModal({ show: false })}
    >
      <DialogOverlay>
        <DialogContent className="max-h-[calc(100vh-40px)] overflow-y-scroll no-scrollbar">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <Form
            fields={form.fields}
            schema={form.schema}
            onSubmit={form.onSubmit}
            onCancel={() => {
              setFormModal({ show: false });
            }}
          />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default FormModal;
