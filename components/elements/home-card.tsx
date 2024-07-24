import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description: string;
  icon: string;
  background: string;
  handleClick: () => void;
}

const HomeCard = ({
  title,
  description,
  icon,
  background,
  handleClick,
}: Props) => {
  return (
    <div
      className={cn(
        "px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer",
        background
      )}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={icon} alt="meeting" width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
