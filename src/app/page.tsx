import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { MapPin, Clock10 } from "lucide-react";
import { Racing_Sans_One } from "next/font/google";
import mapPic from "../../public/images/map.png";
import frontUnitedAuto from "../../public/images/front-building-3.jpg";
//TODO: match all else images like the one above

const racingSansOne = Racing_Sans_One({
  subsets: ["latin"], // specify the subsets you want to use
  weight: ["400"], // specify the weights you want to use
});

export default async function Home() {
  noStore();
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className="relative  sm:items-center sm:justify-center">
      <div className="relative">
        <div className="mx-auto">
          <div className="relative pt-48 shadow-xl">
            <div className="absolute inset-0">
              <Image
                className="h-full w-full object-cover"
                src={frontUnitedAuto}
                alt="Front of United Auto building"
                width={500}
                height={500}
              />
              <div className="absolute inset-0 bg-[color:rgba(30,23,38,0.5)] mix-blend-multiply" />
              <div className="absolute bottom-0 left-1/2 mb-4 flex -translate-x-1/2 transform gap-4">
                <Button
                  asChild
                  className="hidden rounded border-2 border-blue-300 bg-blue-600 px-2 py-0 text-base text-white hover:bg-blue-800 sm:px-4 sm:py-2 sm:text-xl"
                >
                  <Link href="/service">Service</Link>
                </Button>
                <Button
                  asChild
                  className="rounded border-2 border-blue-300 bg-blue-600 px-2 py-0 text-base text-white hover:bg-blue-800 sm:px-4 sm:py-2 sm:text-xl"
                >
                  <Link href="/inventory">Inventory</Link>
                </Button>
                <Button
                  asChild
                  className="hidden rounded border-2 border-blue-300 bg-blue-600 px-2 py-0 text-base text-white hover:bg-blue-800 sm:px-4 sm:py-2 sm:text-xl"
                >
                  <Link href="/emissions">Emissions</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex justify-center bg-slate-50 py-10">
        <div className="w-full max-w-4xl space-y-2 px-8 sm:px-20">
          <h1
            className={`${racingSansOne.className} text-2xl sm:text-3xl md:text-4xl`}
          >
            Welcome to United Auto!
          </h1>
          <p className="max-w-prose text-sm sm:text-base">
            Welcome to United Auto! Located at 219 Congress Ave, Waterbury, CT
            06708, United Auto is your first choice for quality pre-owned cars,
            trucks, and SUVs. Our mission is to provide you with the perfect
            vehicle at a great price and with the exceptional customer service
            our name is known for. Simply put, we are committed to ensuring that
            your auto buying experience is the best it can possibly be.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="mx-auto grid h-1/2 h-full max-h-fit grid-cols-1 items-center justify-center justify-items-start bg-black md:grid-cols-2 md:justify-items-center">
          <div className="mx-2 mb-3 flex flex-col justify-center gap-1 pl-4 text-white md:gap-4 md:pl-0">
            <h2 className="mb-1 mt-4 text-xl uppercase md:mx-auto lg:text-2xl">
              Get Directions
            </h2>
            <span className="my-2 flex items-center gap-2 text-sm font-light lg:text-base">
              <MapPin className="h-4 w-4 md:h-6 md:w-6 lg:h-6 lg:w-6" />
              219 Congress Ave, Waterbury, CT 06708
            </span>
            <span className="my-2 flex items-center gap-2 text-sm font-light lg:text-base">
              <Clock10 className="h-4 w-4 md:h-6 md:w-6 lg:h-6 lg:w-6" />{" "}
              <div className="flex flex-col">
                <p>Open Today! Sales: 9am-5pm</p>
                <p>Open Today! Service: 9am-5pm</p>
              </div>
            </span>
          </div>
          <Image
            className="object-fit order-first  max-h-64 w-full md:order-last"
            alt="map location of United Auto"
            src={mapPic}
            priority={true}
          />
        </div>
      </div>
    </main>
  );
}
