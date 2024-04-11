"use client";
import {
  ShoppingCart,
  PackagePlus,
  LogOut,
  X,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const pages = [
  { title: "Batteurs Mélangeurs", route: "/batteurs", icon: ShoppingCart },
  { title: "Pétrins Spirale", route: "/petrins", icon: ShoppingCart },
  { title: "Ajouter un batteur", route: "/add-batteur", icon: PackagePlus },
  { title: "Ajouter un pétrin", route: "/add-petrin", icon: PackagePlus },
  { title: "Se Déconnecter", route: "/", icon: LogOut },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <nav className="hidden w-fit min-h-screen sm:flex flex-col justify-start rounded-r-3xl items-center bg-white px-4 py-6 gap-12 shadow-2xl shadow-gray-200">
        <Link href="/" className="flex lg:hidden">
          <img src="/logo.svg" alt="logo" className="h-12" />
        </Link>
        <Link href="/" className="hidden lg:flex">
          <img src="/main-logo.svg" alt="logo" className="md:h-32 w-full" />
        </Link>
        <div className="flex flex-col items-center justify-center w-full gap-4">
          {pages.map((page, index) => (
            <Link
              href={page.route}
              key={index}
              className={`${
                pathname === page.route ? "bg-blue-100" : ""
              } group rounded-xl flex items-center justify-start gap-4 w-full py-4 px-6 hover:bg-blue-50 cursor-pointer app_transition `}
            >
              <page.icon size={26} color="#234189" />
              <span className="hidden lg:flex font-bold text-primary truncate">
                {page.title}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <nav className="sm:hidden w-full h-fit fixed z-[50] flex flex-row justify-between items-center px-4 py-6 bg-white">
        <Link href="/" className="flex lg:hidden">
          <img src="/logo.svg" alt="logo" className="h-12" />
        </Link>
        <div className="sm:hidden w-[35px] h-[35px] relative flex justify-center items-center ">
          <ChevronDown
            onClick={() => setToggle(true)}
            className="w-[100%] h-[100%] "
            color="#234189"
          />

          {toggle && (
            <div className="lg:hidden fixed z-[5] w-full h-fit flex justify-end items-end flex-col bg-white py-6 pb-16 right-0 inset-y-0 text-center">
              <div className="w-[35px] h-[35px]  flex justify-center items-center rounded-full mx-4 my-2">
                <X
                  className="w-[100%] h-[100%] text-primary "
                  onClick={() => setToggle(false)}
                />
              </div>

              <ul className="h-full w-full flex justify-center items-center flex-col m-0 px-8 list-none gap-8 select-none cursor-pointer ">
                {pages.map((page, index) => (
                  <Link
                    href={page.route}
                    key={index}
                    className={`${
                      pathname === page.route ? "bg-blue-100" : ""
                    } group rounded-xl flex items-center justify-start gap-4 w-full py-4 px-6 hover:bg-blue-50 cursor-pointer app_transition `}
                  >
                    <page.icon size={26} color="#234189" />
                    <span className="flex font-bold text-primary truncate">
                      {page.title}
                    </span>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
