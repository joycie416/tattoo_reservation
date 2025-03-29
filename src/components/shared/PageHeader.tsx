import Image from "next/image";
import Link from "next/link";
import React from "react";
import LeftArrow from "/public/icons/left-arrow.svg";

type PageHeaderProps = { title: string; backTo: string };
const PageHeader = ({ title, backTo }: PageHeaderProps) => {
  return (
    <header className="w-full h-[59px] sticky top-0 flex justify-center items-center bg-white border-b-[3px] border-background text-font1 text-title-lg text-center relative z-10">
      <Link href={backTo} className="absolute left-5">
        <Image
          src={LeftArrow}
          alt="이전 페이지로"
          className="w-[28px] h-[29px]"
        />
      </Link>
      {title}
    </header>
  );
};

export default PageHeader;
