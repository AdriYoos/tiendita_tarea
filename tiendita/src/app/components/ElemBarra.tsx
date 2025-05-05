'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

// npm i react-icons
// https://react-icons.github.io/react-icons/


interface Props {
    path: string
    icon: JSX.Element;
    title: string;
    subtitle: string;
}

export const BarraLateralElem = (  {path, icon, title, subtitle}: Props) => {
    const currentPath = usePathname();
    const isActive = currentPath === path;

    return (
        <Link
        href={path}
        className={`flex items-center space-x-4 px-4 py-3 rounded-md transition-colors duration-200 ${
          isActive ? 'bg-blue-500' : 'hover:bg-blue-600'
        }`}
      >
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm">{subtitle}</div>
        </div>
      </Link>
    );
     
}
  