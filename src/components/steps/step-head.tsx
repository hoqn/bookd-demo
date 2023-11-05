import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface StepHeadProps extends BaseProps, PropsWithChildren {
  stepIndex: number;
  stepTitle: string;
}

export default function StepHead({ stepIndex, stepTitle, children, className, ...restProps }: StepHeadProps) {
  return (
    <>
      <div className={twMerge("w-full py-4", className)} {...restProps}>
        <div className="rounded-full w-8 h-8 bg-slate-800 text-white text-center leading-8 text-lg font-bold float-left">{stepIndex}</div>
        <h2 className="text-xl leading-8 ml-12 font-bold">{stepTitle}</h2>
      </div>
      {children}
    </>
  )
}