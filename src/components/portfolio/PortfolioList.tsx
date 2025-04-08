"use client";

import { useAdmin, usePortfolios } from "@/hooks/useQueryData";
import PortfolioCard from "./PortfolioCard";
import { useAtom } from "jotai";
import { checkedPortfolioStore } from "@/store/portfolioStore";
import { useUpdateFixedHidden } from "@/hooks/usePortfolio";
import { cn } from "@/lib/utils";

const PortfolioList = () => {
  const portfolios = usePortfolios();
  const admin = useAdmin();
  const [{ checking, initialChecked, checkedPortfolios }, setCheck] = useAtom(
    checkedPortfolioStore
  );
  const isEditing = checking !== "none";

  const { mutate: update, isPending } = useUpdateFixedHidden();

  const onCheckSubmitClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (checking !== "none") {
      update({ mode: checking, initialChecked, checkedPortfolios });
    }
    setCheck((prev) => ({ ...prev, checking: "none" }));
  };

  return (
    <div
      className={cn(
        "w-full min-h-[calc(100vh-var(--header-height))] p-6 flex flex-col space-y-4",
        {
          "bg-gray-10": checking === "none",
          "bg-gray-50": checking !== "none",
        }
      )}
    >
      {checking === "fixed" && (
        <p className="text-title-md">
          메인페이지에 고정할 고정할 게시물을 선택하세요.
        </p>
      )}
      <div className="columns-2 gap-[15px] *:mb-[15px]">
        {portfolios
          .filter((portfolio) => !!admin || !portfolio.hidden)
          .map((portfolio) => (
            <PortfolioCard portfolio={portfolio} key={portfolio.id} />
          ))}
      </div>
      {isEditing && (
        <div className="w-full px-6 pb-[6px] bg-gradient-to-b from-transparent to-gray-50 to-50% flex flex-col fixed bottom-0 right-0 left-0">
          <button
            className="w-full h-11 bg-gray-70 rounded-md text-button-md text-white"
            onClick={onCheckSubmitClick}
          >
            확인
          </button>
        </div>
      )}
      {isPending && <div className="w-full h-[100vh] fixed top-0 z-50" />}
    </div>
  );
};

export default PortfolioList;
