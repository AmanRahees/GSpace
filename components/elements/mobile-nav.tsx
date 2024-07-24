"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants/items";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            alt="bar"
            width={36}
            height={36}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              alt="GSpace"
              width={40}
              height={40}
              className="max-sm:size-10"
            />
            <p className="font-semibold text-[26px] text-white">GSpace</p>
          </Link>
          <div className="flex h-[calc(100vh - 72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-4 pt-16 text-white">
                {sidebarLinks.map((link, idx) => {
                  const isActive = pathname === link.route;
                  return (
                    <SheetClose asChild key={idx}>
                      <Link
                        href={link.route}
                        className={cn(
                          "flex items-center gap-4 p-3 w-full max-w-60 rounded-lg",
                          { "bg-blue-1": isActive }
                        )}
                      >
                        <Image
                          src={link.icon}
                          alt={link.label.toLowerCase()}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
