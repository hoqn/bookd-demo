import { twMerge } from "tailwind-merge";
import StepHead from "./step-head";
import { PropsWithChildren } from "react";

interface StepScaffoldProps extends BaseProps, PropsWithChildren {
  index: number | string;
  title: string;
  disabled?: boolean;
  complete?: boolean;
}

export default function StepScaffold({
  className,
  title,
  index,
  disabled = false,
  complete = false,
  children,
  ...restProps
}: StepScaffoldProps) {
  return (
    <section className={twMerge("py-4", className)} {...restProps}>
      <StepHead className={twMerge("relative", complete && "bg-slate-600 text-slate-50")} stepTitle={title} stepIndex={index}>
        {complete && "v"}
      </StepHead>
      {!(complete || disabled) && <div>{children}</div>}
    </section>
  );
}
