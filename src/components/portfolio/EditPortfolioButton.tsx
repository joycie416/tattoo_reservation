"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import Image from "next/image";
import SeeMore from "/public/icons/ellipsis-vertical.svg";
import { useSetAtom } from "jotai";
import { checkedPortfolioStore } from "@/store/portfolioStore";
import { useState } from "react";
import { usePortfolios } from "@/hooks/useQueryData";

const EditPortfolioButton = () => {
  const portfolios = usePortfolios();
  const hiddenPortfolios = portfolios
    .filter((portfolio) => portfolio.hidden)
    .map((portfolio) => portfolio.id);
  const fixedPortfolios = portfolios
    .filter((portfolio) => portfolio.fixed)
    .map((portfolio) => portfolio.id);

  const [open, setOpen] = useState(false);
  const setCheck = useSetAtom(checkedPortfolioStore);
  const beginCheck = () => {
    setOpen(false);
  };
  const checkHidden = () => {
    setCheck({
      checking: "hidden",
      initialChecked: hiddenPortfolios,
      checkedPortfolios: hiddenPortfolios,
    });
  };
  const checkFixed = () => {
    setCheck({
      checking: "fixed",
      initialChecked: fixedPortfolios,
      checkedPortfolios: fixedPortfolios,
    });
  };

  return (
    <Popover open={open}>
      <PopoverTrigger
        className="absolute right-4"
        onClick={() => setOpen(!open)}
      >
        <Image
          src={SeeMore}
          alt="수정 · 삭제"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </PopoverTrigger>
      <PopoverContent className="w-[101px] p-0 mt-[13px] mr-6 flex flex-col text-body-md text-gray-70 border-gray-30 rounded-md shadow-none">
        <Link
          href="/admin/portfolio/add"
          className="py-3 text-center hover:bg-blue-20"
        >
          등록하기
        </Link>
        <button
          className="py-3 text-center hover:bg-blue-20"
          onClick={() => {
            checkHidden();
            beginCheck();
          }}
        >
          고정하기
        </button>
        <button
          className="py-3 text-center hover:bg-blue-20"
          onClick={() => {
            checkFixed();
            beginCheck();
          }}
        >
          숨기기
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default EditPortfolioButton;
