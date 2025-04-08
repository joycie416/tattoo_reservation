import { checkedPortfolioStore } from "@/store/portfolioStore";
import { Portfolio } from "@/types/supabase";
import { getPublicUrl } from "@/utils/common";
import { useAtom } from "jotai";
import Image from "next/image";
import CheckIcon from "/public/icons/check.svg";
import Link from "next/link";

const PortfolioCard = ({ portfolio }: { portfolio: Portfolio }) => {
  const [{ checking, checkedPortfolios }, setCheckedPortfolios] = useAtom(
    checkedPortfolioStore
  );

  const imageUrl = getPublicUrl("portfolio", portfolio.id, 0);
  const isEditing = checking !== "none";
  const isChecked = checkedPortfolios.includes(portfolio.id);

  const handleCheck = () => {
    if (isChecked) {
      setCheckedPortfolios((prev) => ({
        ...prev,
        checkedPortfolios: prev.checkedPortfolios.filter(
          (id) => id !== portfolio.id
        ),
      }));
      return;
    }
    setCheckedPortfolios((prev) => ({
      ...prev,
      checkedPortfolios: [...prev.checkedPortfolios, portfolio.id],
    }));
  };

  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isEditing) {
      e.preventDefault();
      handleCheck();
    }
  };

  return (
    <Link
      href={`/portfolio/${portfolio.id}`}
      onClick={onClick}
      className="block bg-white rounded-md overflow-hidden relative"
    >
      <Image
        src={imageUrl}
        alt={`포트폴리오_${portfolio.id}`}
        height={500}
        width={500}
      />
      {isEditing && (
        <>
          {isChecked && (
            <div className="w-full h-full absolute top-0 flex p-[10px] justify-end bg-gray-100/60" />
          )}
          <div className="w-[26px] h-[26px] absolute top-[10px] right-[10px] grid bg-white border border-gray-50 rounded-full">
            {isChecked && (
              <Image src={CheckIcon} alt="체크" className="place-self-center" />
            )}
          </div>
        </>
      )}
    </Link>
  );
};

export default PortfolioCard;
