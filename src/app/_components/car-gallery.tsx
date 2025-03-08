"use client";

import React, { useState, useEffect, useRef } from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
// NOT BEING USED ANYMORE BECAUSE HAVE TO PAY!
// import Image from "next/image";

interface ImageGalleryComponentProps {
  imageUrls: string[];
}

const ImageGalleryComponent: React.FC<ImageGalleryComponentProps> = ({
  imageUrls,
}) => {
  const [thumbnailPosition, setThumbnailPosition] = useState<
    "bottom" | "right"
  >("right");
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef<ImageGallery>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const secureImageUrls = imageUrls.map((url) =>
    url.startsWith("http://") ? url.replace("http://", "https://") : url,
  );

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
        setThumbnailPosition(mobile ? "bottom" : "right");
      }
    };

    handleResize();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleImageClick = () => {
    if (galleryRef.current) {
      galleryRef.current.fullScreen();
    }
  };

  const handleScreenChange = (isFullScreen: boolean) => {
    setIsFullscreen(isFullScreen);
  };

  const handleSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const renderCustomControls = () => {
    return (
      <div className="absolute bottom-4 left-4 z-10">
        <span className="inline-block rounded bg-black/50 px-3 py-1.5 text-sm text-white">
          {currentIndex + 1}/{imageUrls.length}
        </span>
      </div>
    );
  };

  const images: ReactImageGalleryItem[] = secureImageUrls.map((url, index) => ({
    original: url,
    thumbnail: url,
    thumbnailAlt: "car",
    loading: index === 0 ? "eager" : "lazy",
    originalHeight: 600,
    originalWidth: 1000,
  }));

  const renderImage = (item: ReactImageGalleryItem) => {
    const imageProps = {
      src: item.original,
      alt: "car picture",
      fill: "true",
      loading: item.loading as "eager" | "lazy",
      sizes: isFullscreen ? "100vw" : "(max-width: 768px) 100vw, 75vw",
      // priority: item.loading === "eager",
    };

    if (isFullscreen) {
      return (
        <div className="relative h-screen w-full">
          {/* <Image {...imageProps} className="object-contain" /> */}
          <img
            {...imageProps}
            className="object-contain"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      );
    }

    if (isMobile) {
      return (
        <div className="relative w-full pb-[66.67%]">
          {/* <Image {...imageProps} className="absolute inset-0 object-cover" /> */}
          <img
            {...imageProps}
            className="absolute inset-0 object-cover"
            width="100%"
            height="100%"
          />
        </div>
      );
    }

    return (
      <div className="relative h-[500px]">
        {/* <Image {...imageProps} className="object-contain" /> */}
        <img {...imageProps} className="object-contain" />
      </div>
    );
  };

  const renderThumbnail = (item: ReactImageGalleryItem) => {
    if (isMobile) {
      return (
        <div className="relative h-full w-full">
          {/* <Image */}
          {/*   //TODO: Figure out if ok to add ! */}
          {/*   src={item.thumbnail!} */}
          {/*   alt={item.thumbnailAlt ?? "thumbnail"} */}
          {/*   fill={true} */}
          {/*   className="object-cover" */}
          {/*   sizes="100px" */}
          {/* /> */}
          <img
            src={item.thumbnail}
            alt={item.thumbnailAlt ?? "thumbnail"}
            loading="lazy"
            decoding="async"
            className="object-cover"
            sizes="100px"
            width="100"
            height="67"
          />
        </div>
      );
    }
    return undefined;
  };

  return (
    <div
      className={`image-gallery-wrapper ${isMobile && !isFullscreen ? "mobile-view" : ""}`}
    >
      <style jsx global>{`
        .mobile-view .image-gallery-slide {
          height: auto !important;
        }
        .mobile-view .image-gallery-swipe {
          height: auto !important;
        }
        .fullscreen .image-gallery-slide {
          height: 100vh !important;
        }
        .image-gallery-content.fullscreen {
          background: black;
        }
        .image-gallery-content.fullscreen .image-gallery-slide-wrapper {
          height: 100vh;
        }
        @media (max-width: 768px) {
          .image-gallery-thumbnail {
            width: 100px;
            height: 67px;
          }
          .image-gallery-thumbnail-inner {
            height: 100%;
          }
          .image-gallery-thumbnail img {
            object-fit: cover;
            width: 100%;
            height: 100%;
          }
          .image-gallery-thumbnails-container {
            height: auto !important;
          }
        }
      `}</style>
      <ImageGallery
        ref={galleryRef}
        items={images}
        showPlayButton={false}
        showFullscreenButton={true}
        onClick={handleImageClick}
        thumbnailPosition={thumbnailPosition}
        renderItem={renderImage}
        //TODO: Figure out the tyepscript error issue here
        renderThumbnail={renderThumbnail}
        onScreenChange={handleScreenChange}
        onSlide={handleSlide}
        renderCustomControls={renderCustomControls}
      />
    </div>
  );
};

export default ImageGalleryComponent;
