"use client";

import { PortfolioFormType } from "@/api/portfolio";
import { useAddPortfolio, useUpdatePortfolio } from "@/hooks/usePortfolio";
import { usePortfolio } from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

type AddPortfolioFormProps = { searchParams: { id?: string; modify?: string } };
const AddPortfolioForm = ({
  searchParams: { id, modify },
}: AddPortfolioFormProps) => {
  const data = usePortfolio(id);

  const [portfolio, setPortfolio] = useState<PortfolioFormType>(() => {
    const defaultData: PortfolioFormType = {
      image: [],
      content: "",
      part: "",
      size: "",
      fixed: false,
      hidden: false,
    };
    let initData: PortfolioFormType | null = null;
    // const data = usePortfolio(id);
    if (data) {
      initData = {
        image: [],
        content: data.content,
        part: data.part,
        size: data.size,
        fixed: !!data.fixed,
        hidden: !!data.hidden,
      };
    }
    return initData ?? defaultData;
  });

  const { mutate: addPortfolio } = useAddPortfolio();
  const { mutate: updatePortfolio } = useUpdatePortfolio();

  const imgRef = useRef<HTMLInputElement>(null);
  const handleImageChange = () => {
    if (imgRef.current && imgRef.current.files?.length) {
      console.log("이미지 변경", imgRef.current.files);
      const file = Array.from(imgRef.current.files);
      setPortfolio((prev) => ({ ...prev, image: file }));
    }
    // 취소시 기존 이미지 파일 유지
  };

  const handleImageDelete = () => {
    setPortfolio((prev) => ({ ...prev, image: [] }));
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resizeTextarea = () => {
    // textarea 높이 자동 조절
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const isValid =
    portfolio.image.length > 0 &&
    !!portfolio.content &&
    !!portfolio.part &&
    !!portfolio.size;
  const onSubmitClick = () =>
    // e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    {
      if (!isValid) {
        alert("모두 입력해주세요.");
        return;
      }
      if (modify == "true" && !!id) {
        console.log("수정");
        updatePortfolio({ ...portfolio, id });
        return;
      }
      console.log("추가");
      addPortfolio(portfolio);
    };

  return (
    <div className="pt-6">
      <form className="pb-4 space-y-8">
        <div className="space-y-4">
          <div className="space-y-1">
            <h3>이미지를 추가해주세요. (1장 필수)</h3>
            <p className="text-subtitle-sm text-gray-70">
              * 사진 1장당 50mb 제한 있습니다.
            </p>
          </div>
          <div className="w-full overflow-x-scroll mb-8">
            <div className="w-max flex gap-2">
              <div
                className="w-[84px] h-[84px] flex justify-center items-center bg-background rounded-[8px] text-center cursor-pointer"
                onClick={() => imgRef.current?.click()}
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={imgRef}
                  className="hidden"
                  onChange={() => handleImageChange()}
                />
                <Plus size={48} color="#636363" className="w-12 h-12" />
              </div>
              {portfolio.image.map((file) => (
                <div
                  className={`w-[84px] h-[84px] rounded-[8px] overflow-hidden relative`}
                  key={`notice_image`}
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`이미지 미리보기`}
                    width={84}
                    height={84}
                    className="w-[84px] h-[84px] object-cover"
                  />
                  <div className="w-full h-full bg-gradient-to-b from-black/50 to-transparent absolute top-0 left-0" />
                  <button
                    type="button"
                    className="absolute top-1 right-1"
                    onClick={() => handleImageDelete()}
                  >
                    <X size={16} color="#FFF" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-grow space-y-2 flex flex-col">
          <h3>소개글을 입력해주세요.</h3>
          <textarea
            ref={textareaRef}
            id="content"
            name="content"
            placeholder="내용을 입력해주세요"
            defaultValue={portfolio.content}
            onInput={() => resizeTextarea()}
            onChange={(e) =>
              setPortfolio((prev) => ({ ...prev, content: e.target.value }))
            }
            className="w-full min-h-[287px] p-4 mb-4 resize-none border border-backgound rounded-[4px] text-body-md placeholder:text-font2 placeholder:text-body-md"
          />
        </div>
        <div className="space-y-2">
          <h3>추천 부위를 입력해주세요.</h3>
          <input
            placeholder="부위를 입력해주세요"
            defaultValue={portfolio.part}
            onChange={(e) =>
              setPortfolio((prev) => ({ ...prev, part: e.target.value }))
            }
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <h3>추천 사이즈를 입력해주세요.</h3>
          <input
            placeholder="사이즈를 입력해주세요"
            defaultValue={portfolio.size}
            onChange={(e) =>
              setPortfolio((prev) => ({ ...prev, size: e.target.value }))
            }
            className="w-full"
          />
        </div>
      </form>
      <div className="py-[6px]">
        <button
          type="button"
          aria-disabled={!isValid}
          onClick={onSubmitClick}
          className={cn(
            "w-full h-11 flex justify-center items-center bg-font2 rounded-[4px] text-white",
            {
              "bg-guide": !isValid,
            }
          )}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AddPortfolioForm;
