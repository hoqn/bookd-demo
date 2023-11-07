import { HTMLAttributes } from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const $textarea = {
  default: twMerge("rounded p-2 outline outline-1 outline-slate-400 slate-200", "focus:outline-cyan-600 focus:outline-2"),
  onError: "outline-2 outline-red-400 red-200 focus:outline-red-600",
}

interface FormColumnProps extends BaseProps, HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  // name: string;
}

export default function FormColumn<Values extends {}>(props: UseControllerProps<Values> & FormColumnProps) {
  const {
    className,
    title, description, name,
    ...restProps
  } = props;

  const { field, fieldState } = useController(props);

  return (
    <div className={twMerge("flex flex-col", className)} {...restProps}>
      <div className="pb-2 relative">
        <label className="font-bold text-lg" htmlFor={name}>
          {title}
        </label>
        {/* {description && <span>
          {description}
        </span>} */}
        {fieldState.error?.type === "required" && <div className="absolute bottom-2 right-0 text-sm text-red-700">여긴 반드시 입력해주셔야 해요</div>}
      </div>
      <textarea className={twMerge($textarea.default, fieldState.error && $textarea.onError)} placeholder={description} {...field} />
    </div>
  );
}