import { UserScrap } from "@/types/user-lib.types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";
import Button from "@/components/ui/button";

interface ScrapCardProps extends BaseProps {
  data: UserScrap;
  onDeleteButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function ScrapCard({ data, className, onDeleteButtonClick, ...restProps }: ScrapCardProps) {
  return <div className={twMerge("card relative", className)} {...restProps}>
    <div className="p-4">
      <p className="quote italic">{data.scrap}</p>
    </div>
    <div className="p-4">
      <p>{data.memo}</p>
    </div>
    <div className="p-4 border-t border-t-slate-300">
      <Button tint="neutral" className="block ml-auto" onClick={onDeleteButtonClick}>삭제</Button>
    </div>
  </div>
}