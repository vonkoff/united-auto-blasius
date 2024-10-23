"use client";
// components/ImageGalleryComponent.js

import React, { useState, useEffect, useRef } from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

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

  // Map the image URLs to the format expected by react-image-gallery
  const images: ReactImageGalleryItem[] = imageUrls.map((url) => ({
    original: url,
    thumbnail: url, // Using the same image for thumbnail
    originalHeight: 600, // Adjust as needed
    originalWidth: 1000, // Adjust as needed
  }));

  // Custom render function for normal mode
  const renderImage = (item: ReactImageGalleryItem) => {
    // In normal mode, apply the fixed-height container
    return (
      <div style={{ height: "500px", overflow: "hidden" }}>
        <img
          src={item.original}
          alt={item.description}
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
        />
      </div>
    );
  };

  // Conditionally set renderItem
  const renderItem = isFullscreen ? undefined : renderImage;

  return (
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
  );
};

export default ImageGalleryComponent;

//
// 'use client'
// import React, { useState, useRef, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
// import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
// import type { Swiper as SwiperType } from 'swiper';
//
// interface CarGalleryProps {
//   item: string[];
// }
//
// const CarGallery: React.FC<CarGalleryProps> = ({ item }) => {
//   const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
//   const [fullscreenThumbsSwiper, setFullscreenThumbsSwiper] = useState<SwiperType | null>(null);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const mainSwiperRef = useRef<SwiperType>();
//   const fullscreenSwiperRef = useRef<SwiperType>();
//   const thumbsContainerRef = useRef<HTMLDivElement>(null);
//
//   const toggleFullscreen = (index: number) => {
//     setIsFullscreen(!isFullscreen);
//     if (!isFullscreen) {
//       setActiveIndex(index);
//       // Wait for fullscreen swiper to initialize
//       setTimeout(() => {
//         if (fullscreenSwiperRef.current) {
//           fullscreenSwiperRef.current.slideTo(index);
//         }
//       }, 100);
//     }
//   };
//
//   const handleSlideChange = (swiper: SwiperType) => {
//     const index = swiper.activeIndex;
//     setActiveIndex(index);
//
//     // Scroll thumbnail into view
//     if (thumbsContainerRef.current) {
//       const thumbnailElement = thumbsContainerRef.current.querySelector(
//         `.swiper-slide[data-index="${index}"]`
//       ) as HTMLElement;
//
//       if (thumbnailElement) {
//         const container = thumbsContainerRef.current;
//         const isVertical = window.innerWidth >= 1024;
//
//         if (isVertical) {
//           const containerHeight = container.clientHeight;
//           const scrollOffset = thumbnailElement.offsetTop - containerHeight / 2 + thumbnailElement.clientHeight / 2;
//           container.scrollTo({ top: scrollOffset, behavior: 'smooth' });
//         } else {
//           const containerWidth = container.clientWidth;
//           const scrollOffset = thumbnailElement.offsetLeft - containerWidth / 2 + thumbnailElement.clientWidth / 2;
//           container.scrollTo({ left: scrollOffset, behavior: 'smooth' });
//         }
//       }
//     }
//   };
//
//   return (
//     <div className="gallery-container">
//       {/* Main Gallery */}
//       <div className="main-swiper-container">
//         <Swiper
//           onSwiper={(swiper) => { mainSwiperRef.current = swiper; }}
//           onSlideChange={handleSlideChange}
//           spaceBetween={10}
//           navigation={{
//             prevEl: '.custom-prev',
//             nextEl: '.custom-next',
//           }}
//           thumbs={{ swiper: thumbsSwiper }}
//           modules={[FreeMode, Navigation, Thumbs]}
//           className="main-swiper"
//         >
//           {item.map((url, index) => (
//             <SwiperSlide key={index}>
//               <div className="main-slide">
//                 <img src={url} alt={`Slide ${index + 1}`} />
//                 <button
//                   className="fullscreen-button"
//                   onClick={() => toggleFullscreen(index)}
//                   aria-label="View fullscreen"
//                 >
//                   <Maximize2 size={20} />
//                 </button>
//               </div>
//             </SwiperSlide>
//           ))}
//           <button className="custom-prev">
//             <ChevronLeft size={20} />
//           </button>
//           <button className="custom-next">
//             <ChevronRight size={20} />
//           </button>
//         </Swiper>
//       </div>
//
//       {/* Thumbnails */}
//       <div ref={thumbsContainerRef} className="thumbnails-container">
//         <Swiper
//           onSwiper={setThumbsSwiper}
//           spaceBetween={10}
//           slidesPerView="auto"
//           direction="vertical"
//           freeMode={true}
//           watchSlidesProgress={true}
//           modules={[FreeMode, Navigation, Thumbs]}
//           className="thumb-swiper"
//         >
//           {item.map((url, index) => (
//             <SwiperSlide key={index} data-index={index}>
//               <div className="thumb-slide">
//                 <img src={url} alt={`Thumbnail ${index + 1}`} />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//
//       {/* Fullscreen Modal */}
//       {isFullscreen && (
//         <div className="fullscreen-modal">
//           <button className="close-fullscreen" onClick={() => setIsFullscreen(false)}>
//             <X size={24} />
//           </button>
//
//           <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
//             {/* Fullscreen Main Swiper */}
//             <Swiper
//               onSwiper={(swiper) => { fullscreenSwiperRef.current = swiper; }}
//               initialSlide={activeIndex}
//               spaceBetween={10}
//               navigation={{
//                 prevEl: '.fullscreen-prev',
//                 nextEl: '.fullscreen-next',
//               }}
//               thumbs={{ swiper: fullscreenThumbsSwiper }}
//               modules={[FreeMode, Navigation, Thumbs]}
//               className="fullscreen-swiper"
//             >
//               {item.map((url, index) => (
//                 <SwiperSlide key={index}>
//                   <div className="fullscreen-slide">
//                     <img src={url} alt={`Fullscreen ${index + 1}`} />
//                   </div>
//                 </SwiperSlide>
//               ))}
//               <button className="fullscreen-prev">
//                 <ChevronLeft size={24} />
//               </button>
//               <button className="fullscreen-next">
//                 <ChevronRight size={24} />
//               </button>
//             </Swiper>
//
//             {/* Fullscreen Thumbnails */}
//             <div className="fullscreen-thumbnails">
//               <Swiper
//                 onSwiper={setFullscreenThumbsSwiper}
//                 spaceBetween={10}
//                 slidesPerView="auto"
//                 freeMode={true}
//                 watchSlidesProgress={true}
//                 modules={[FreeMode, Navigation, Thumbs]}
//                 className="fullscreen-thumb-swiper"
//               >
//                 {item.map((url, index) => (
//                   <SwiperSlide key={index}>
//                     <div className="thumb-slide">
//                       <img src={url} alt={`Thumbnail ${index + 1}`} />
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>
//           </div>
//         </div>
//       )}
//
//       <style jsx global>{`
//         .gallery-container {
//           width: 100%;
//           max-width: 1200px;
//           margin: 0 auto;
//           display: flex;
//           gap: 16px;
//           padding: 16px;
//         }
//
//         .main-swiper-container {
//           flex: 1;
//           min-width: 0;
//         }
//
//         .main-swiper {
//           width: 100%;
//           border-radius: 8px;
//           background: white;
//         }
//
//         .main-slide {
//           aspect-ratio: 4/3;
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: white;
//           position: relative;
//         }
//
//         .main-slide img {
//           max-width: 100%;
//           max-height: 100%;
//           object-fit: contain;
//           width: 100%;
//           height: 100%;
//           padding: 12px;
//         }
//
//         .thumbnails-container {
//           width: 120px;
//           height: 400px;
//           overflow: hidden;
//         }
//
//         .thumb-swiper {
//           height: 100%;
//         }
//
//         .thumb-swiper .swiper-slide {
//           width: 120px !important;
//           height: 80px !important;
//           opacity: 0.6;
//           border: 2px solid transparent;
//           border-radius: 4px;
//           overflow: hidden;
//           cursor: pointer;
//         }
//
//         .thumb-swiper .swiper-slide-thumb-active {
//           opacity: 1;
//           border-color: #3b82f6;
//         }
//
//         .thumb-slide {
//           width: 100%;
//           height: 100%;
//           background: white;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//
//         .thumb-slide img {
//           width: 100%;
//           height: 100%;
//           object-fit: contain;
//           padding: 4px;
//         }
//
//         /* Fullscreen Modal Styles */
//         .fullscreen-modal {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.95);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 1000;
//         }
//
//         .fullscreen-content {
//           width: 100%;
//           height: 100%;
//           display: flex;
//           flex-direction: column;
//           padding: 40px;
//         }
//
//         .fullscreen-swiper {
//           flex: 1;
//           width: 100%;
//           margin-bottom: 20px;
//         }
//
//         .fullscreen-slide {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           height: calc(100vh - 200px);
//         }
//
//         .fullscreen-slide img {
//           max-width: 100%;
//           max-height: 100%;
//           object-fit: contain;
//         }
//
//         .fullscreen-thumbnails {
//           height: 100px;
//           width: 100%;
//         }
//
//         .fullscreen-thumb-swiper {
//           height: 100%;
//         }
//
//         .fullscreen-thumb-swiper .swiper-slide {
//           width: 120px !important;
//           height: 80px !important;
//           opacity: 0.6;
//           border: 2px solid transparent;
//           border-radius: 4px;
//           overflow: hidden;
//           cursor: pointer;
//         }
//
//         .fullscreen-thumb-swiper .swiper-slide-thumb-active {
//           opacity: 1;
//           border-color: #3b82f6;
//         }
//
//         /* Navigation Buttons */
//         .custom-prev,
//         .custom-next,
//         .fullscreen-prev,
//         .fullscreen-next {
//           position: absolute;
//           top: 50%;
//           transform: translateY(-50%);
//           z-index: 10;
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.8);
//           border: none;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #3b82f6;
//           transition: all 0.3s ease;
//         }
//
//         .fullscreen-prev,
//         .fullscreen-next {
//           background: rgba(255, 255, 255, 0.15);
//           color: white;
//         }
//
//         .custom-prev,
//         .fullscreen-prev {
//           left: 10px;
//         }
//
//         .custom-next,
//         .fullscreen-next {
//           right: 10px;
//         }
//
//         .fullscreen-button {
//           position: absolute;
//           right: 10px;
//           top: 10px;
//           background: rgba(255, 255, 255, 0.8);
//           border: none;
//           border-radius: 50%;
//           width: 35px;
//           height: 35px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           color: #3b82f6;
//           transition: all 0.3s ease;
//           z-index: 10;
//         }
//
//         .close-fullscreen {
//           position: absolute;
//           top: 20px;
//           right: 20px;
//           background: rgba(255, 255, 255, 0.15);
//           border: none;
//           border-radius: 50%;
//           width: 40px;
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           color: white;
//           transition: all 0.3s ease;
//           z-index: 1001;
//         }
//
//         /* Responsive Layout */
//         @media (max-width: 1023px) {
//           .gallery-container {
//             flex-direction: column;
//             gap: 8px;
//           }
//
//           .thumbnails-container {
//             width: 100%;
//             height: 100px;
//           }
//
//           .thumb-swiper {
//             height: 100%;
//           }
//
//           .thumb-swiper .swiper-wrapper {
//             display: flex;
//             flex-direction: row !important;
//           }
//
//           .thumb-swiper .swiper-slide {
//             width: 120px !important;
//             margin-right: 8px !important;
//           }
//
//           .fullscreen-content {
//             padding: 20px;
//           }
//
//           .fullscreen-slide {
//             height: calc(100vh - 180px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };
//
// export default CarGallery;

// "use client";
// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode, Navigation, Thumbs } from "swiper/modules";
// import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import type { Swiper as SwiperType } from "swiper";
//
// interface CarGalleryProps {
//   item: string[];
// }
//
// const CarGallery: React.FC<CarGalleryProps> = ({ item }) => {
//   const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
//
//   const toggleFullscreen = (imageUrl: string) => {
//     setFullscreenImage(imageUrl);
//     setIsFullscreen(!isFullscreen);
//   };
//
//   return (
//     <div className="gallery-container">
//       {/* Main Swiper */}
//       <div className="main-swiper-container">
//         <Swiper
//           spaceBetween={10}
//           navigation={{
//             prevEl: ".custom-prev",
//             nextEl: ".custom-next",
//           }}
//           thumbs={{ swiper: thumbsSwiper }}
//           modules={[FreeMode, Navigation, Thumbs]}
//           className="main-swiper"
//         >
//           {item.map((url, index) => (
//             <SwiperSlide key={index}>
//               <div className="main-slide">
//                 <img src={url} alt={`Slide ${index + 1}`} />
//                 <button
//                   className="fullscreen-button"
//                   onClick={() => toggleFullscreen(url)}
//                   aria-label="View fullscreen"
//                 >
//                   <Maximize2 size={20} />
//                 </button>
//               </div>
//             </SwiperSlide>
//           ))}
//           <button className="custom-prev">
//             <ChevronLeft size={20} />
//           </button>
//           <button className="custom-next">
//             <ChevronRight size={20} />
//           </button>
//         </Swiper>
//       </div>
//
//       {/* Thumbnail Swiper */}
//       <Swiper
//         onSwiper={setThumbsSwiper}
//         spaceBetween={10}
//         slidesPerView="auto"
//         direction="vertical"
//         freeMode={true}
//         watchSlidesProgress={true}
//         modules={[FreeMode, Navigation, Thumbs]}
//         className="thumb-swiper"
//       >
//         {item.map((url, index) => (
//           <SwiperSlide key={index}>
//             <div className="thumb-slide">
//               <img src={url} alt={`Thumbnail ${index + 1}`} />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//
//       {/* Fullscreen Modal */}
//       {isFullscreen && fullscreenImage && (
//         <div
//           className="fullscreen-modal"
//           onClick={() => setIsFullscreen(false)}
//         >
//           <button
//             className="close-fullscreen"
//             onClick={() => setIsFullscreen(false)}
//           >
//             <X size={24} />
//           </button>
//           <div
//             className="fullscreen-image-container"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <img src={fullscreenImage} alt="Fullscreen view" />
//           </div>
//         </div>
//       )}
//
//       <style jsx global>{`
//         .gallery-container {
//           width: 100%;
//           max-width: 1200px;
//           margin: 0 auto;
//           display: flex;
//           gap: 16px;
//           padding: 16px;
//         }
//
//         .main-swiper-container {
//           flex: 1;
//           min-width: 0;
//         }
//
//         .main-swiper {
//           width: 100%;
//           border-radius: 8px;
//           background: white;
//         }
//
//         .main-slide {
//           aspect-ratio: 4/3;
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: white;
//           position: relative;
//         }
//
//         .main-slide img {
//           max-width: 100%;
//           max-height: 100%;
//           object-fit: contain;
//           width: 100%;
//           height: 100%;
//           padding: 12px;
//         }
//
//         .thumb-swiper {
//           width: 120px;
//           height: 400px;
//           max-height: 500px;
//         }
//
//         .thumb-swiper .swiper-slide {
//           width: 120px !important;
//           height: 80px !important;
//           opacity: 0.6;
//           border: 2px solid transparent;
//           border-radius: 4px;
//           overflow: hidden;
//           cursor: pointer;
//         }
//
//         .thumb-swiper .swiper-slide-thumb-active {
//           opacity: 1;
//           border-color: #3b82f6;
//         }
//
//         .thumb-slide {
//           width: 100%;
//           height: 100%;
//           background: white;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//
//         .thumb-slide img {
//           width: 100%;
//           height: 100%;
//           object-fit: contain;
//           padding: 4px;
//         }
//
//         /* Custom Navigation Buttons */
//         .custom-prev,
//         .custom-next {
//           position: absolute;
//           top: 50%;
//           transform: translateY(-50%);
//           z-index: 10;
//           width: 35px;
//           height: 35px;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.8);
//           border: none;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #3b82f6;
//           transition: all 0.3s ease;
//         }
//
//         .custom-prev {
//           left: 10px;
//         }
//
//         .custom-next {
//           right: 10px;
//         }
//
//         .custom-prev:hover,
//         .custom-next:hover {
//           background: rgba(255, 255, 255, 0.95);
//         }
//
//         /* Fullscreen Button */
//         .fullscreen-button {
//           position: absolute;
//           right: 10px;
//           top: 10px;
//           background: rgba(255, 255, 255, 0.8);
//           border: none;
//           border-radius: 50%;
//           width: 35px;
//           height: 35px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           color: #3b82f6;
//           transition: all 0.3s ease;
//           z-index: 10;
//         }
//
//         .fullscreen-button:hover {
//           background: rgba(255, 255, 255, 0.95);
//         }
//
//         /* Fullscreen Modal */
//         .fullscreen-modal {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.9);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 1000;
//         }
//
//         .fullscreen-image-container {
//           max-width: 90vw;
//           max-height: 90vh;
//           position: relative;
//         }
//
//         .fullscreen-image-container img {
//           max-width: 100%;
//           max-height: 90vh;
//           object-fit: contain;
//         }
//
//         .close-fullscreen {
//           position: absolute;
//           top: 20px;
//           right: 20px;
//           background: rgba(255, 255, 255, 0.8);
//           border: none;
//           border-radius: 50%;
//           width: 40px;
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           color: #3b82f6;
//           transition: all 0.3s ease;
//           z-index: 1001;
//         }
//
//         .close-fullscreen:hover {
//           background: rgba(255, 255, 255, 0.95);
//         }
//
//         /* Responsive layout */
//         @media (max-width: 1023px) {
//           .gallery-container {
//             flex-direction: column;
//             gap: 8px;
//           }
//
//           .thumb-swiper {
//             width: 100%;
//             height: 80px !important;
//           }
//
//           .thumb-swiper .swiper-wrapper {
//             display: flex;
//             flex-direction: row !important;
//           }
//
//           .thumb-swiper .swiper-slide {
//             width: 120px !important;
//             margin-right: 8px !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };
//
// export default CarGallery;

// "use client";
// import react from "react";
// import imagegallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";
//
// interface cargalleryprops {
//   item: string[];
// }
//
// const cargallery: react.fc<cargalleryprops> = ({ item }) => {
//   const images = item.map((url) => ({
//     original: url,
//     thumbnail: url,
//     thumbnailclass: "gallery-thumbnail",
//     originalheight: "100%",
//     originalwidth: "100%",
//     loading: "lazy",
//     thumbnailloading: "lazy",
//   }));
//
//   return (
//     <div classname="gallery-container">
//       <imagegallery
//         items={images}
//         showplaybutton={false}
//         showfullscreenbutton={true}
//         shownav={true}
//         showthumbnails={true}
//         thumbnailposition="left"
//         slideduration={300}
//         lazyload={true}
//         infinite={false}
//         thumbnailheight={80}
//         thumbnailwidth={120}
//         usebrowserfullscreen={false}
//         showindex={false}
//       />
//     </div>
//   );
// };
//
// export default cargallery;
