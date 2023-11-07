import * as RadixDialog from "@radix-ui/react-dialog";
import { MouseEventHandler, PropsWithChildren, ReactNode, forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface UseDialogOptions {
  withScaffold?: boolean;
  positiveButton?: ReactNode | string;
  negativeButton?: ReactNode | string;
}

export function useDialog({ withScaffold = true }: UseDialogOptions = {}) {
  const [open, setOpen] = useState<boolean>(false);
  const [onClickPositiveButton, setOnClickPositiveButton] = useState<MouseEventHandler<HTMLButtonElement>>();
  const [onClickNegativeButton, setOnClickNegativeButton] = useState<MouseEventHandler<HTMLButtonElement>>();

  const ChildrenWrapper = forwardRef<HTMLDivElement, PropsWithChildren>(({ children }, ref) => (
    <div ref={ref} className={twMerge("rounded-lg shadow-lg bg-slate-100 m-4")}>
      {children}
    </div>
  ));

  const Component = ({ children, trigger }: any = {}) => (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.DialogPortal>
        <RadixDialog.DialogOverlay className="fixed inset-0 bg-black/50 z-40 data-[state=open]:animate-overlayShow" />
        <RadixDialog.Content className="fixed w-[90vw] max-w-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 data-[state=open]:animate-contentShow">
          {withScaffold ? <ChildrenWrapper>{children}</ChildrenWrapper> : children}
        </RadixDialog.Content>
      </RadixDialog.DialogPortal>
    </RadixDialog.Root>
  );

  return {
    open,
    setOpen,
    Component,
    setOnClickPositiveButton,
    setOnClickNegativeButton,
  };
}
