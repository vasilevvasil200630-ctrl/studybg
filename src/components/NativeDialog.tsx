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
  const pressedOutsideRef = useRef<boolean>(false);

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

  const isPointerOutside = (event: React.PointerEvent<HTMLDialogElement>, dialog: HTMLDialogElement): boolean => {
    const rect = dialog.getBoundingClientRect();
    return (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    );
  };

  // Fallback за браузъри без closedby="any": изискваме и pointerdown, и pointerup да са извън панела,
  // за да не се затваря прозорецът при маркиране на текст с мишката, което завършва върху фона.
  const handlePointerDown = (event: React.PointerEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || 'closedBy' in HTMLDialogElement.prototype) return;
    pressedOutsideRef.current = event.target === dialog && isPointerOutside(event, dialog);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || 'closedBy' in HTMLDialogElement.prototype) return;
    if (pressedOutsideRef.current && event.target === dialog && isPointerOutside(event, dialog)) {
      pressedOutsideRef.current = false;
      onClose();
    } else {
      pressedOutsideRef.current = false;
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      onCancel={handleCancel}
      onClose={onClose}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      {...({ closedby: 'any' } as React.DialogHTMLAttributes<HTMLDialogElement>)}
      className={`m-auto w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] ${widthClassName} bg-transparent p-0 border-0 overflow-visible backdrop:bg-black/50 backdrop:backdrop-blur-xs`}
    >
      {children}
    </dialog>
  );
};
