"use client";

import { usePortfolio } from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { getPublicUrl } from "@/utils/common";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PortfolioDetail = ({ portfolioId }: { portfolioId: string }) => {
  const router = useRouter();
  const portfolio = usePortfolio(portfolioId);

  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!portfolio) {
    alert("존재하지 않는 게시물입니다.");
    router.replace("/portfolio");
  }

  const imageUrl = getPublicUrl("portfolio", portfolioId, 0);

  return (
    <div
      className="w-full min-h-screen flex"
      onClick={() => setVisible((prev) => !prev)}
    >
      <Image
        src={imageUrl}
        alt="포트폴리오 이미지"
        width={1000}
        height={1000}
        className="w-full object-contain bg-gray-100 place-self-center"
      />
      {visible && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
          className={cn(
            "w-full fixed bottom-0 px-[30px] bg-gradient-to-b from-transparent from-[2%] to-gray-100 to-[85%] text-white",
            {
              "max-h-[50vh] overflow-scroll": open,
              "max-h-[20vh] overflow-hidden": !open,
            }
          )}
        >
          <div className="pt-6 pb-2">
            <p className="text-body-lg break-all whitespace-pre-line pointer-events-none">
              {portfolio?.content}
            </p>
          </div>
          <div className="pt-4 pb-6 space-y-2">
            <div className="space-x-6 flex">
              <p className="shrink-0 text-gray-60">추천 부위</p>
              <div className="flex gap-[6px]">
                {portfolio?.part.split(", ").map((part) => (
                  <div
                    key={part}
                    className="px-2 py-[2px] bg-gray-70/30 rounded-md text-white"
                  >
                    {part}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-x-6 flex">
              <p className="shrink-0 text-gray-60">최소 사이즈</p>
              {/* <div className="flex gap-[6px]">
                {portfolio?.size.split(", ").map((part) => (
                  <div className="px-2 py-[2px] bg-gray-70/30 rounded-md text-white">
                    {part}
                  </div>
                ))}
              </div> */}
              <p className="text-white">{portfolio?.size}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioDetail;
