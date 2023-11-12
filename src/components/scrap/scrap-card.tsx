import { UserScrap } from "@/types/user-lib.types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";
import Button from "@/components/ui/button";

interface ScrapCardProps extends BaseProps {
  data: UserScrap;
  onDeleteButtonClick?: MouseEventHandler<HTMLButtonElement>;
  onImageGenButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function ScrapCard({
  data,
  className,
  onDeleteButtonClick,
  onImageGenButtonClick,
  ...restProps
}: ScrapCardProps) {
  return (
    <div className={twMerge("card relative", className)} {...restProps}>
      <div className="p-4">
        <p className="quote italic">{data.scrap}</p>
      </div>
      <div className="p-4">
        <p>{data.memo}</p>
      </div>
      {(onDeleteButtonClick || onImageGenButtonClick) && (
        <div className="p-4 border-t border-t-slate-300 flex flex-row justify-end space-x-2">
          {onDeleteButtonClick && (
            <Button tint="neutral" className="" onClick={onDeleteButtonClick}>
              삭제
            </Button>
          )}
          {onImageGenButtonClick && (
            <Button tint="primary" intent="contained" className="" onClick={onImageGenButtonClick}>
              이미지 생성
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
