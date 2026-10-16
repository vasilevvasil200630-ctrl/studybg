import React, { useEffect, useRef } from 'react';

interface NativeDialogProps {
  onClose: () => void;
  /** id на заглавието вътре в диалога (за aria-labelledby) */
  labelledBy: string;
  /** Максимална ширина на панела, напр. 'max-w-2xl' */
  widthClassName?: string;
  children: React.ReactNode;
}

/**
 * Модален прозорец върху нативния <dialog> + showModal():
 * фокус трап и inert фон от браузъра, Esc (cancel → close) и light-dismiss при клик върху фона.
 * Монтира се, когато е отворен — родителят го размонтира при onClose.
 */
export const NativeDialog: React.FC<NativeDialogProps> = ({
  onClose,
  labelledBy,
  widthClassName = 'max-w-2xl',
  children
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  // Esc и light-dismiss при closedby="any" минават през синхронния 'cancel'.
  // Не чакаме асинхронния 'close' — родителят размонтира диалога веднага.
  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onClose();
  };

  // Light-dismiss за браузъри без closedby="any": клик извън панела затваря диалога
  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    const inside =
      rect.top <= event.clientY &&
      event.clientY <= rect.bottom &&
      rect.left <= event.clientX &&
      event.clientX <= rect.right;
    if (!inside) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      aria-modal="true"
      onCancel={handleCancel}
      onClose={onClose}
      onClick={handleClick}
      {...({ closedby: 'any' } as React.DialogHTMLAttributes<HTMLDialogElement>)}
      className={`m-auto w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] ${widthClassName} bg-transparent p-0 border-0 overflow-visible backdrop:bg-black/50 backdrop:backdrop-blur-xs`}
    >
      {children}
    </dialog>
  );
};
