import { polymorphicForwardRef } from "@/utils/polymorphic-ref";
import { VariantProps, cva } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

const $button = cva(
  ["outline outline-solid font-semibold transition", "hover:shadow disabled:cursor-not-allowed disabled:opacity-50"],
  {
    variants: {
      intent: {
        tonal: null,
        contained: "",
      },
      tint: {
        primary: null,
        neutral: null,
      },
      size: {
        md: "rounded text-sm font-semibold leading-8 px-4 py-0",
        lg: "rounded-lg text-base font-semibold leading-8 px-4 py-2",
      },
    },
    compoundVariants: [
      {
        intent: "tonal",
        tint: "primary",
        className: "bg-blue-200 outline-blue-400 text-blue-900 active:bg-blue-300",
      },
      {
        intent: "tonal",
        tint: "neutral",
        className: "bg-slate-200 outline-slate-400 text-slate-900 active:bg-slate-300",
      },
      {
        intent: "contained",
        tint: "primary",
        className: "bg-blue-600 outline-blue-600 text-blue-50 active:bg-blue-700",
      },
      {
        intent: "contained",
        tint: "neutral",
        className: "bg-slate-600 outline-slate-600 text-slate-50 active:bg-slate-700",
      },
    ],
    defaultVariants: {
      intent: "tonal",
      tint: "neutral",
      size: "md",
    }
  }
);

interface ButtonProps extends BaseProps, PropsWithChildren, VariantProps<typeof $button> {
  disabled?: boolean;
}

const Button = polymorphicForwardRef<"button", ButtonProps>(({ as, className, children, intent, size, tint, disabled = false, ...restProps }, ref) => {
  const Component = as || "button";

  return (
    <Component className={twMerge($button({ intent, size, tint }), className)} ref={ref} {...restProps}>
      {children}
    </Component>
  )
});

Button.displayName = "hoqn@button";

export default Button;