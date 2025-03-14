// Carouselother.tsx
"use client";
import React, { useState } from "react";

interface CarouselProps {
  images: string[];
}

const Carouselother: React.FC<CarouselProps> = ({ images }) => {
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
      {/* Render the images */}
      {images.map((url, index) => (
        <div
          key={index}
          className="relative h-60 w-full"
          onClick={() => openZoomedImage(url)}
        >
          <img
            src={`/images/cars/${url}`}
            alt={`image ${index + 1}`}
            className="absolute h-full w-full object-cover"
          />
          {/* <Image */}
          {/*   src={`/images/cars/${url}`} */}
          {/*   alt={`image ${index + 1}`} */}
          {/*   layout="fill" */}
          {/*   objectFit="cover" */}
          {/* /> */}
        </div>
      ))}
      {/* Render the zoomed image */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeZoomedImage}
        >
          <div className="relative h-3/4 w-3/4">
            <img
              src={`/images/cars/${zoomedImage}`}
              alt="zoomed-image"
              className="h-full w-full object-contain"
            />
            {/* <Image */}
            {/*   src={`/images/cars/${zoomedImage}`} */}
            {/*   alt="zoomed-image" */}
            {/*   layout="fill" */}
            {/*   objectFit="contain" */}
            {/* /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Carouselother;
