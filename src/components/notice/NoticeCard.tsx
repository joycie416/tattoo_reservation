import { Notice } from "@/types/supabase";
import { getPublicUrl } from "@/utils/common";
import Image from "next/image";
import PushPinFixed from "/public/icons/pushpin-fixed.svg";
import PushPinUnfixed from "/public/icons/pushpin-unfixed.svg";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NoticeCard = ({ notice }: { notice: Notice }) => {
  const imageUrl = getPublicUrl("notice", notice.id, 0);

  return (
    <Link
      href={`/notice/${notice.id}`}
      className={cn("px-6 py-3 flex gap-4", {
        "bg-gray-10": notice.hidden,
      })}
    >
      <Image
        src={imageUrl}
        alt={`notice_${notice.title}`}
        width={72}
        height={72}
        className="w-[72px] h-[72px] shrink-0 border border-gray-50 rounded-md object-cover"
      />
      <div className="flex gap-[9px] items-center">
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
        />
      </div>
    </Link>
  );
};

export default NoticeCard;
