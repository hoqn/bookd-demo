import Header from "@/components/common/header";
import { HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface MainLayout extends PropsWithChildren {
  contentClassName?: HTMLAttributes<HTMLDivElement>["className"];
}

export default function MainLayout({ children, contentClassName }: MainLayout) {
  return (
    <>
      <Header className="fixed inset-0" />
      {/* <div className={twMerge("max-w-screen-sm mt-16 mx-auto px-4", contentClassName)}> */}
      <div className="h-16"></div>
      <div className={twMerge("container mx-auto px-4", contentClassName)}>
        {children}
      </div>
    </>
  )
}