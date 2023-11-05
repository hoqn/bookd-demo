import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface HeaderProps extends BaseProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ className, title = "ComcreteUtopia DEMO", subtitle }: HeaderProps) {
  return (
    <div className={twMerge("h-16 leading-16 flex flex-row justify-between bg-blue-100/90 backdrop-blur z-30", className)}>
      <div className="h-full flex justify-center items-center flex-1 text-center font-black text-xl text-slate-900">
        <Link className="transition italic hover:opacity-80 active:opacity-50" to="/">
          {title}
        </Link>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  )
}