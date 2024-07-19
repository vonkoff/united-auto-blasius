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

interface CarouselProps {
  item: {
    Stock: string;
    Year: string;
    Make: string;
    Model: string;
    Color: string;
    Mileage: string;
    Price: string;
    ImageURLs: string[];
  };
}

const CarCarousel: React.FC<CarouselProps> = ({ item }) => {
  // State variable for managing zoomed image
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Function to open zoomed image
  const openZoomedImage = (imageUrl: string) => {
    setZoomedImage(imageUrl);
  };

  // Function to close zoomed image
  const closeZoomedImage = () => {
    setZoomedImage(null);
  };

  return (
    <>
      <div className="mb-6 flex max-w-full items-center justify-center">
        <Carousel className="w-full max-w-4xl">
          <CarouselContent className="flex">
            {item.ImageURLs.map((url, index) => (
              <CarouselItem
                key={index}
                className="relative flex h-96 w-full flex-shrink-0 items-center justify-center"
              >
                <div
                  onClick={() => openZoomedImage(url)}
                  className="relative h-full w-full"
                >
                  <Image
                    src={`/images/cars/${url}`}
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

      {/* Render the zoomed image */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeZoomedImage}
        >
          <div className="relative h-3/4 w-3/4">
            <Image
              src={`/images/cars/${zoomedImage}`}
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
