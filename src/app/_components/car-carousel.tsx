//@ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/non-nullable-type-assertion-style */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

interface CarCarouselProps {
  item: string[];
}

const CarCarousel: React.FC<CarCarouselProps> = ({ item }) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const openZoomedImage = (imageUrl: string) => {
    setZoomedImage(imageUrl);
  };

  const closeZoomedImage = () => {
    setZoomedImage(null);
  };

  console.log("Carousel Images:", item);

  return (
    <>
      <div className="mb-6 flex max-w-full items-center justify-center">
        <Carousel className="w-full max-w-4xl">
          <CarouselContent className="flex">
            {item.map((url, index) => (
              <CarouselItem
                key={index}
                className="relative flex h-96 w-full flex-shrink-0 items-center justify-center"
              >
                <div
                  onClick={() => openZoomedImage(url)}
                  className="relative h-full w-full"
                >
                  <Image
                    src={url}
                    // src={getImageSrc(url)}
                    alt={`Slide ${index + 1}`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-xl"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 transform" />
          <CarouselNext className="right-2 top-1/2 -translate-y-1/2 transform" />
        </Carousel>
      </div>

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
    </>
  );
};

export default CarCarousel;
