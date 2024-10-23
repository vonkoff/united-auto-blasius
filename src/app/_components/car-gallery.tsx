"use client";
// components/ImageGalleryComponent.js

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
  const galleryRef = useRef<ImageGallery>(null);

  // State to track fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Ensure all URLs start with https instead of http
  const secureImageUrls = imageUrls.map((url) =>
    url.startsWith("http://") ? url.replace("http://", "https://") : url,
  );

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth <= 768) {
          setThumbnailPosition("bottom");
        } else {
          setThumbnailPosition("right");
        }
      }
    };

    // Set initial position
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

  // Handler for fullscreen changes
  const handleScreenChange = (isFullScreen: boolean) => {
    setIsFullscreen(isFullScreen);
  };

  // Map the secure image URLs to the format expected by react-image-gallery
  const images: ReactImageGalleryItem[] = secureImageUrls.map((url, index) => ({
    original: url,
    thumbnail: url, // Using the same image for thumbnail
    thumbnailAlt: "car",
    loading: index === 0 ? "eager" : "lazy", // Load the first image eagerly, others lazily
    originalHeight: 600, // Adjust as needed
    originalWidth: 1000, // Adjust as needed
  }));

  // Custom render function for normal mode
  const renderImage = (item: ReactImageGalleryItem) => {
    // In normal mode, apply the fixed-height container
    return (
      <div style={{ height: "500px", overflow: "hidden" }}>
        <Image
          src={item.original}
          alt="car picture"
          fill={true}
          loading={item.loading}
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
        />
      </div>
    );
  };

  // Conditionally set renderItem
  const renderItem = isFullscreen ? undefined : renderImage;

  return (
    <div>
      <ImageGallery
        ref={galleryRef}
        items={images}
        showPlayButton={false}
        showFullscreenButton={true}
        onClick={handleImageClick}
        thumbnailPosition={thumbnailPosition}
        renderItem={renderItem} // Conditionally use custom render function
        onScreenChange={handleScreenChange} // Handle fullscreen changes
      />
    </div>
  );
};

export default ImageGalleryComponent;
