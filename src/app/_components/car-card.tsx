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
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
      <Link href={link} className="block" prefetch={false}>
        <Image
          src={`/images/cars/${carJpg}`}
          width={400}
          height={300}
          alt={altText}
          className="aspect-[4/3] w-full object-cover"
        />
        <div className="space-y-2 p-4">
          <h3 className="text-lg font-semibold">{carTitle}</h3>
          <p className="text-gray-500 dark:text-gray-400">{carPrice}</p>
        </div>
      </Link>
    </div>
  );
}
