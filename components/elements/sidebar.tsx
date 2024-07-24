"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants/items";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link, idx) => {
          const isActive = pathname === link.route;
          return (
            <Link
              href={link.route}
              key={idx}
              className={cn(
                "flex justify-start items-center gap-4 p-3 rounded-lg",
                { "bg-blue-1": isActive }
              )}
            >
              <Image
                src={link.icon}
                alt={link.label.toLowerCase()}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
