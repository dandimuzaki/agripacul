import React from 'react';
import { Button } from '../ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { useProducts } from '@/context/ProductsContext';
import { Spinner } from '@heroui/spinner';
import { ClipLoader } from 'react-spinners';

const Confirmation = ({
  open,
  onClose,
  onConfirm,
  title,
  children,
  confirmText,
  cancelText,
}) => {
  const { isLoading } = useProducts();
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
          <Button className="w-32 bg-[var(--red)] hover:bg-[var(--dark-red)] active:bg-[var(--dark-red)]" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? (<div className="flex items-center justify-center gap-2">
              <ClipLoader color='#ffffff' size={16} />
              <span>Deleting</span>
            </div>) : confirmText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );};

export default Confirmation;
