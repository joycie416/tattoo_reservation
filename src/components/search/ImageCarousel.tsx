"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ImageCarouselProps = {
  startIndex: string;
  imageUrls: string[];
};

const ImageCarousel = ({ startIndex, imageUrls }: ImageCarouselProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(Number(startIndex) + 1);
  const imageNum = imageUrls.length;

  const router = useRouter();

  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on("select", () => {
      const index = carouselApi.selectedScrollSnap();
      setCurrentIndex(index + 1);
    });
  }, [carouselApi]);

  return (
    <div
      onClick={() => router.back()}
      className="w-full h-[100vh] flex flex-col justify-center gap-4 bg-gray-100/70 text-white relative"
    >
      <Carousel
        setApi={setCarouselApi}
        opts={{ startIndex: Number(startIndex) }}
        className=""
        onClick={(e) => e.stopPropagation()}
      >
        <CarouselContent className="flex items-center">
          {imageUrls.map((url, i) => (
            <CarouselItem key={`예약 이미지 ${i}`}>
              <div className="px-6 h-fit max-h-[450px] flex justify-center">
                <Image
                  src={url}
                  alt="예약 이미지"
                  width={1000}
                  height={1000}
                  // className="w-auto max-w-full h-auto max-h-full rounded-lg object-contain"
                  className="w-full max-w-full h-auto max-h-full rounded-lg object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <p className="mx-auto text-body-md text-white">
        {currentIndex} / {imageNum}
      </p>
    </div>
  );
};

export default ImageCarousel;
