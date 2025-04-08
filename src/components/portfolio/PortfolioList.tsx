"use client";

import { useAdmin, usePortfolios } from "@/hooks/useQueryData";
import PortfolioCard from "./PortfolioCard";
import { useAtom } from "jotai";
import { checkedPortfolioStore } from "@/store/portfolioStore";
import { useEffect } from "react";

const PortfolioList = () => {
  const portfolios = usePortfolios();
  const admin = useAdmin();
  const [{ checking }, setCheck] = useAtom(checkedPortfolioStore);
  const isEditing = checking !== "none";

  useEffect(() => {
    setCheck((prev) => ({
      ...prev,
      checkedPortfolios: portfolios
        .filter((portfolio) => !portfolio.hidden)
        .map((portfolio) => portfolio.id),
    }));
  }, []);

  const onCheckSubmitClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setCheck((prev) => ({ ...prev, checking: "none" }));
  };

  return (
    <>
      <div className="columns-2 gap-[15px] *:mb-[15px]">
        {portfolios
          .filter((portfolio) => !!admin || !portfolio.hidden)
          .map((portfolio) => (
            <PortfolioCard portfolio={portfolio} key={portfolio.id} />
          ))}
      </div>
      {isEditing && (
        <div className="w-full px-6 pb-[6px] bg-gradient-to-b from-transparent to-gray-10 to-50% flex flex-col fixed bottom-0 right-0 left-0">
          <button
            className="w-full h-11 bg-gray-70 rounded-md text-button-md text-white"
            onClick={onCheckSubmitClick}
          >
            확인
          </button>
        </div>
      )}
    </>
  );
};

export default PortfolioList;
