import Link from "next/link";
import React from "react";

type PageHeaderProps = { title: string; backTo: string };
const PageHeader = ({ title, backTo }: PageHeaderProps) => {
  return (
    <header className="w-full h-[59px] sticky top-0 flex justify-center items-center bg-white  border-b-[3px] border-background text-center relative">
      <Link href={backTo} className="absolute left-5">
        {"<"}
      </Link>
      {title}
    </header>
  );
};

export default PageHeader;
