"use client";

import { Notice } from "@/types/supabase";
import { getPublicUrl } from "@/utils/common";
import Image from "next/image";
import PushPinFixed from "/public/icons/pushpin-fixed.svg";
import PushPinUnfixed from "/public/icons/pushpin-unfixed.svg";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAdmin } from "@/hooks/useAdmin";

const NoticeCard = ({ notice }: { notice: Notice }) => {
  // 클라이언트 컴포넌트 내부에 작성되어 있어 클라이언트 컴포넌트임.
  const admin = useAdmin();
  const imageUrl = getPublicUrl("notice", notice.id, 0);

  return (
    <Link
      href={`/notice/${notice.id}`}
      className={cn("px-6 py-3 flex gap-4", {
        "bg-gray-10": notice.hidden,
      })}
    >
      <Image
        src={`${imageUrl}?cache=${crypto.randomUUID()}`}
        alt={`notice_${notice.title}`}
        width={72}
        height={72}
        className="w-[72px] h-[72px] shrink-0 border border-gray-50 rounded-md object-cover"
      />
      <div className="w-full flex gap-[9px] justify-between items-center">
        <div className="w-full overflow-hidden">
          <h3
            className={cn("break-all line-clamp-1", {
              "text-gray-60": notice.hidden,
            })}
          >
            {notice.title}
          </h3>
          <p
            className={cn(
              "break-all line-clamp-1 text-subtitle-md text-gray-70",
              {
                "text-gray-60": notice.hidden,
              }
            )}
          >
            {notice.content}
          </p>
        </div>
        <Image
          src={notice.fixed ? PushPinFixed : PushPinUnfixed}
          alt="고정핀"
          className={`${!!admin || notice.fixed || "invisible"}`} // 관리자 X, 고정안됨 : 공간은 유지
        />
      </div>
    </Link>
  );
};

export default NoticeCard;
