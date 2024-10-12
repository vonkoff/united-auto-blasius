//@ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/non-nullable-type-assertion-style, @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/prefer-optional-chain */
"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { cn } from "~/lib/utils";

interface CarCarouselProps {
  item: string[];
}

const CarCarousel: React.FC<CarCarouselProps> = ({ item }) => {
  // TODO: Fix up
  const [mainApi, setMainApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const openZoomedImage = (imageUrl: string) => {
    setZoomedImage(imageUrl);
  };

  const closeZoomedImage = () => {
    setZoomedImage(null);
  };

  useEffect(() => {
    if (!mainApi) return;

    const onSelect = () => {
      const index = mainApi.selectedScrollSnap();
      setCurrentIndex(index);
      if (thumbnailsRef.current && thumbnailsRef.current.children[index]) {
        const thumbnail = thumbnailsRef.current.children[index] as HTMLElement;
        thumbnail.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    };

    mainApi.on("select", onSelect);
    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi],
  );

  const renderThumbnails = () => (
    <div
      ref={thumbnailsRef}
      className="mt-4 flex h-24 select-none flex-row space-x-2 overflow-x-auto lg:mt-0 lg:h-full lg:max-h-96 lg:flex-col 
      lg:space-x-0 lg:space-y-2 lg:overflow-y-auto"
    >
      {item.map((url, index) => (
        <div
          key={index}
          className={cn(
            "w-24 flex-shrink-0 cursor-pointer border lg:w-full",
            index === currentIndex ? "border-blue-500" : "border-transparent",
          )}
          onClick={() => onThumbClick(index)}
        >
          <div className="relative pb-[75%]">
            <Image
              src={url}
              alt={`Thumbnail ${index + 1}`}
              layout="fill"
              objectFit="cover"
              draggable="false"
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row">
      <div
        className="relative  flex max-w-full items-center justify-center lg:w-3/4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Carousel
          className="w-full max-w-4xl"
          setApi={setMainApi}
          opts={{ loop: false }}
        >
          <CarouselContent>
            {item.map((url, index) => (
              <CarouselItem key={index}>
                <div
                  onClick={() => openZoomedImage(url)}
                  className="relative w-full pb-[75%]"
                >
                  <Image
                    src={url}
                    alt={`Slide ${index + 1}`}
                    layout="fill"
                    objectFit="contain"
                    priority={index === 0}
                    quality={40}
                    className="transition-opacity duration-300 ease-in-out"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className={`left-2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-30"
            }`}
          />
          <CarouselNext
            className={`right-2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-30"
            }`}
          />
        </Carousel>
      </div>

      {/* Thumbnails */}
      <div className="lg:w-1/4 lg:pl-4">{renderThumbnails()}</div>

      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeZoomedImage}
        >
          <div className="relative h-3/4 w-3/4">
            <Image
              src={zoomedImage}
              alt="zoomed-image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CarCarousel;
