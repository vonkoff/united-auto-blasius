/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Script from "next/script";

interface CarCardProps {
  carJpg: string;
  altText: string;
  carTitle: string;
  carPrice: string;
  link: string;
}

// CarGurusBadge component - just renders the span element
const CarGurusBadge = ({ vin, price }: { vin: string; price: number }) => {
  return <span data-cg-vin={vin} data-cg-price={price}></span>;
};

// CarGurus script initialization component
export function CarGurusScript() {
  return (
    <>
      <Script id="cargurus-config" strategy="afterInteractive">
        {`
          var CarGurus = window.CarGurus || {}; 
          window.CarGurus = CarGurus;
          CarGurus.DealRatingBadge = window.CarGurus.DealRatingBadge || {};
          CarGurus.DealRatingBadge.options = {
            style: "STYLE1",
            minRating: "GOOD_PRICE",
            defaultHeight: "60"
          };
        `}
      </Script>
      <Script
        src="https://static.cargurus.com/js/api/en_US/1.0/dealratingbadge.js"
        strategy="afterInteractive"
        id="cargurus-badge-script"
      />
    </>
  );
}

export function CarCard({
  carJpg,
  altText,
  carTitle,
  carPrice,
  link,
  vin,
}: CarCardProps & { vin: string }) {
  const formatter = new Intl.NumberFormat("en-US");
  const formattedPrice = formatter.format(carPrice);

  const getFirstImageUrl = (urlList: string): string => {
    const firstUrl = urlList.split("|")[0];
    return firstUrl!;
  };

  const firstImageUrl = getFirstImageUrl(carJpg);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
      <Link href={link} className="block" prefetch={false}>
        {/* NOT PAYING FOR NEXTJS IMAGE ANYMORE! */}
        {/* <Image */}
        {/*   src={firstImageUrl} */}
        {/*   width={400} */}
        {/*   height={300} */}
        {/*   alt={altText} */}
        {/*   className="aspect-[4/3] w-full object-cover" */}
        {/* /> */}
        <img
          src={firstImageUrl}
          alt={altText}
          width="400"
          height="300"
          loading="lazy" // Native lazy loading
          decoding="async" // Asynchronous decoding for performance
          className="aspect-[4/3] w-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw" // Responsive sizes
        />
        <div className="space-y-2 p-4">
          <h3 className="text-lg font-semibold">{carTitle}</h3>
          <p className="text-gray-500 dark:text-gray-400">${formattedPrice}</p>
          <CarGurusBadge vin={vin} price={Number(carPrice)} />
        </div>
      </Link>
    </div>
  );
}

// export function CarCard({
//   carJpg,
//   altText,
//   carTitle,
//   carPrice,
//   link,
// }: CarCardProps) {
//   const formatter = new Intl.NumberFormat("en-US");
//   const formattedPrice = formatter.format(carPrice);
//   // const WORKER_URL = "https://unitedautoimages.ivukusic.workers.dev";
//   // const R2_URL_PREFIX = "https://unitedauto.r2.cloudflarestorage.com/";
//
//   const getFirstImageUrl = (urlList: string): string => {
//     const firstUrl = urlList.split("|")[0];
//     return firstUrl!;
//     // const objectKey = firstUrl!.replace(R2_URL_PREFIX, "");
//     // const encodedObjectKey = encodeURIComponent(objectKey);
//     // return `${WORKER_URL}/${encodedObjectKey}.jpg`;
//   };
//
//   const firstImageUrl = getFirstImageUrl(carJpg);
//   console.log("LINKS: ", link);
//
//   return (
//     <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
//       <Link href={link} className="block" prefetch={false}>
//         <Image
//           // src={`/images/cars/${carJpg}`}
//           src={firstImageUrl}
//           width={400}
//           height={300}
//           alt={altText}
//           className="aspect-[4/3] w-full object-cover"
//         />
//         <div className="space-y-2 p-4">
//           <h3 className="text-lg font-semibold">{carTitle}</h3>
//           <p className="text-gray-500 dark:text-gray-400">${formattedPrice}</p>
//         </div>
//       </Link>
//     </div>
//   );
// }
