import React from 'react';
import { Button } from '../ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

const Confirmation = ({
  open,
  onClose,
  onConfirm,
  title,
  children,
  confirmText,
  cancelText,
  loading = false,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
          </AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter className="mt-4 flex justify-center gap-5">
          <Button className="w-32 bg-[var(--light-grey)] hover:bg-[var(--grey)] active:bg-[var(--grey)] text-black" onClick={onClose}>
            {cancelText}
          </Button>
          <Button className="w-32 bg-[var(--red)] hover:bg-[var(--dark-red)] active:bg-[var(--dark-red)]" onClick={onConfirm} disabled={loading}>
            {loading ? 'Please wait...' : confirmText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );};

export default Confirmation;
