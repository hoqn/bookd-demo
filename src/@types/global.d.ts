import type { HTMLAttributes } from "react";

declare global {
  export interface BaseProps extends Pick<HTMLAttributes<HTMLElement>, "className"> {}
}