"use client";

import React, { useState, useEffect, useRef } from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Image from "next/image";

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

  const images: ReactImageGalleryItem[] = secureImageUrls.map((url, index) => ({
    original: url,
    thumbnail: url,
    thumbnailAlt: "car",
    loading: index === 0 ? "eager" : "lazy",
    originalHeight: 600,
    originalWidth: 1000,
  }));

  const renderImage = (item: ReactImageGalleryItem) => {
    // Common props for Image component
    const imageProps = {
      src: item.original,
      alt: "car picture",
      fill: true,
      loading: item.loading as "eager" | "lazy",
      sizes: isFullscreen ? "100vw" : "(max-width: 768px) 100vw, 75vw",
      priority: item.loading === "eager",
    };

    if (isFullscreen) {
      return (
        <div className="relative h-screen w-full">
          <Image {...imageProps} className="object-contain" />
        </div>
      );
    }

    if (isMobile) {
      return (
        <div className="relative w-full pb-[66.67%]">
          <Image {...imageProps} className="absolute inset-0 object-cover" />
        </div>
      );
    }

    return (
      <div className="relative h-[500px]">
        <Image {...imageProps} className="object-contain" />
      </div>
    );
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
      `}</style>
      <ImageGallery
        ref={galleryRef}
        items={images}
        showPlayButton={false}
        showFullscreenButton={true}
        onClick={handleImageClick}
        thumbnailPosition={thumbnailPosition}
        renderItem={renderImage}
        onScreenChange={handleScreenChange}
      />
    </div>
  );
};

export default ImageGalleryComponent;
