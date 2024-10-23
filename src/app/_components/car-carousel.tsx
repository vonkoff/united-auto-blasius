//@ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/non-nullable-type-assertion-style, @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/prefer-optional-chain, @typescript-eslint/prefer-nullish-coalescing */
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
  const [mainApi, setMainApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Refs for handling click-and-drag scrolling
  const isDown = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeft = useRef(0);
  const scrollTop = useRef(0);

  const dragStartX = useRef(0);
  const dragStartY = useRef(0);

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
        const container = thumbnailsRef.current;
        const thumbnail = container.children[index] as HTMLElement;

        const isVertical = window.innerWidth >= 1024; // Assuming lg breakpoint at 1024px

        if (isVertical) {
          // Vertical scrolling
          const offsetTop = thumbnail.offsetTop - container.offsetTop;
          container.scrollTo({
            top:
              offsetTop -
              container.clientHeight / 2 +
              thumbnail.clientHeight / 2,
            behavior: "smooth",
          });
        } else {
          // Horizontal scrolling
          const offsetLeft = thumbnail.offsetLeft - container.offsetLeft;
          container.scrollTo({
            left:
              offsetLeft -
              container.clientWidth / 2 +
              thumbnail.clientWidth / 2,
            behavior: "smooth",
          });
        }
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

      if (thumbnailsRef.current && thumbnailsRef.current.children[index]) {
        const container = thumbnailsRef.current;
        const thumbnail = container.children[index] as HTMLElement;

        const isVertical = window.innerWidth >= 1024; // Assuming lg breakpoint at 1024px

        if (isVertical) {
          // Vertical scrolling
          const offsetTop = thumbnail.offsetTop - container.offsetTop;
          container.scrollTo({
            top:
              offsetTop -
              container.clientHeight / 2 +
              thumbnail.clientHeight / 2,
            behavior: "smooth",
          });
        } else {
          // Horizontal scrolling
          const offsetLeft = thumbnail.offsetLeft - container.offsetLeft;
          container.scrollTo({
            left:
              offsetLeft -
              container.clientWidth / 2 +
              thumbnail.clientWidth / 2,
            behavior: "smooth",
          });
        }
      }
    },
    [mainApi],
  );

  // Mouse event handlers for click-and-drag scrolling
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDown.current = true;
    isDragging.current = false;

    startX.current = e.pageX - (thumbnailsRef.current?.offsetLeft || 0);
    startY.current = e.pageY - (thumbnailsRef.current?.offsetTop || 0);
    scrollLeft.current = thumbnailsRef.current?.scrollLeft || 0;
    scrollTop.current = thumbnailsRef.current?.scrollTop || 0;

    dragStartX.current = e.pageX;
    dragStartY.current = e.pageY;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDown.current) return;
    e.preventDefault();

    const deltaX = Math.abs(e.pageX - dragStartX.current);
    const deltaY = Math.abs(e.pageY - dragStartY.current);

    // Set isDragging to true if the movement exceeds a threshold
    if (deltaX > 5 || deltaY > 5) {
      isDragging.current = true;
    }

    const y = e.pageY - (thumbnailsRef.current?.offsetTop || 0);
    const x = e.pageX - (thumbnailsRef.current?.offsetLeft || 0);
    const walkY = y - startY.current;
    const walkX = x - startX.current;

    if (thumbnailsRef.current) {
      const isVertical = window.innerWidth >= 1024; // lg breakpoint at 1024px
      if (isVertical) {
        thumbnailsRef.current.scrollTop = scrollTop.current - walkY;
      } else {
        thumbnailsRef.current.scrollLeft = scrollLeft.current - walkX;
      }
    }
  };

  const handleMouseUp = () => {
    isDown.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Clean up event listeners on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const renderThumbnails = () => (
    <div
      ref={thumbnailsRef}
      className="mt-2 flex select-none flex-row space-x-2 overflow-x-auto scrollbar-hide
      lg:mt-0 lg:max-h-[32rem] lg:flex-col lg:space-x-0 lg:space-y-2 lg:overflow-y-auto"
      onMouseDown={handleMouseDown}
    >
      {item.map((url, index) => (
        <div
          key={index}
          className={cn(
            // "h-28 w-1/3 flex-shrink-0 cursor-pointer lg:h-[7.5rem] lg:w-full",
            "h-28 w-1/3 flex-shrink-0 cursor-pointer border", // Mobile sizing
            "lg:h-[7.5rem] lg:w-full", // Desktop sizing
          )}
          onClick={() => {
            if (isDragging.current) return;
            onThumbClick(index);
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src={url}
              alt={`Thumbnail ${index + 1}`}
              layout="fill"
              objectFit="contain" // Use cover for mobile
              // className="object-cover" // Use contain only for desktop
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
        className="relative flex max-w-full items-start justify-center lg:w-3/4"
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
                  className="relative pb-[75%]" // 4:3 aspect ratio
                  // className="relative w-full pb-[75%]"
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
