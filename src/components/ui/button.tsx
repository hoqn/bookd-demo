import { polymorphicForwardRef } from "@/utils/polymorphic-ref";
import { VariantProps, cva } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

const $button = cva(
  ["rounded border border-solid font-semibold transition", "hover:shadow"],
  {
    variants: {
      intent: {
        tonal: null,
        contained: "active:ring",
      },
      tint: {
        primary: null,
        neutral: null,
      },
      size: {
        md: "text-sm font-semibold leading-8 px-4 py-0"
      }
    },
    compoundVariants: [
      {
        intent: "tonal",
        tint: "primary",
        className: "bg-blue-200 border-blue-400 text-blue-900 active:bg-blue-300",
      },
      {
        intent: "tonal",
        tint: "neutral",
        className: "bg-slate-200 border-slate-400 text-slate-900 active:bg-slate-300",
      },
      {
        intent: "contained",
        tint: "primary",
        className: "bg-blue-600 border-blue-600 text-blue-50 active:bg-blue-700",
      },
      {
        intent: "contained",
        tint: "neutral",
        className: "bg-slate-600 border-slate-600 text-slate-50 active:bg-slate-700",
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
}

const Button = polymorphicForwardRef<"button", ButtonProps>(({ as, className, children, intent, size, tint, ...restProps }, ref) => {
  const Component = as || "button";

  return (
    <Component className={twMerge($button({ intent, size, tint }), className)} ref={ref} {...restProps}>
      {children}
    </Component>
  )
});

Button.displayName = "hoqn@button";

export default Button;