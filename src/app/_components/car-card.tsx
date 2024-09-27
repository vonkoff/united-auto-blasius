import Link from "next/link";
import Image from "next/image";

interface CarCardProps {
  carJpg: string;
  altText: string;
  carTitle: string;
  carPrice: string;
  link: string;
}

export function CarCard({
  carJpg,
  altText,
  carTitle,
  carPrice,
  link,
}: CarCardProps) {
  const formatter = new Intl.NumberFormat("en-US");
  const formattedPrice = formatter.format(carPrice);
  const WORKER_URL = "https://unitedautoimages.ivukusic.workers.dev";
  const R2_URL_PREFIX = "https://unitedauto.r2.cloudflarestorage.com/";

  const getFirstImageUrl = (urlList: string): string => {
    const firstUrl = urlList.split("|")[0];
    const objectKey = firstUrl!.replace(R2_URL_PREFIX, "");
    const encodedObjectKey = encodeURIComponent(objectKey);
    return `${WORKER_URL}/${encodedObjectKey}.jpg`;
  };

  const firstImageUrl = getFirstImageUrl(carJpg);
  console.log("LINKS: ", link);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
      <Link href={link} className="block" prefetch={false}>
        <Image
          // src={`/images/cars/${carJpg}`}
          src={firstImageUrl}
          width={400}
          height={300}
          alt={altText}
          className="aspect-[4/3] w-full object-cover"
        />
        <div className="space-y-2 p-4">
          <h3 className="text-lg font-semibold">{carTitle}</h3>
          <p className="text-gray-500 dark:text-gray-400">${formattedPrice}</p>
        </div>
      </Link>
    </div>
  );
}
