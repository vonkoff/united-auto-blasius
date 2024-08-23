import React from "react";
import Image from "next/image";
import { Racing_Sans_One } from "next/font/google";
import { Button } from "~/components/ui/button";

const racingSansOne = Racing_Sans_One({
  subsets: ["latin"],
  weight: ["400"],
});

const EmissionsInfo = () => {
  return (
    <div className="relative">
      <div className="h-64 overflow-hidden sm:h-80 md:h-96">
        <Image
          className="w-full object-cover object-center"
          src="https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Emissions Testing Center"
          width={1260}
          height={750}
          priority
        />
      </div>
      <div className="container mx-auto p-6">
        <div className="relative -mt-16 flex justify-center">
          <div className="w-full max-w-4xl space-y-6 rounded-lg bg-slate-50 px-8 py-10 shadow-lg sm:px-20">
            <h1
              className={`${racingSansOne.className} text-center text-2xl sm:text-3xl md:text-4xl`}
            >
              Emissions Testing Information
            </h1>
            <ul className="list-disc space-y-4 pl-5">
              <li className="text-sm sm:text-base">
                Full-Service Test Centers can perform emissions testing on all
                eligible vehicles regardless of fuel type or model year.
              </li>
              <li className="text-sm sm:text-base">Cost is $20</li>
            </ul>
            <div className="mt-6 flex justify-center">
              <Button asChild>
                <a
                  href="https://ctemissions.com/explore-program-information"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More About Emissions Testing
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmissionsInfo;
