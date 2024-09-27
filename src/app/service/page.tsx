import React from "react";
import Image from "next/image";
import { Racing_Sans_One } from "next/font/google";
import { Button } from "~/components/ui/button";

const racingSansOne = Racing_Sans_One({
  subsets: ["latin"],
  weight: ["400"],
});

const ServiceCenter = () => {
  return (
    <div className="relative">
      <div className="h-64 overflow-hidden sm:h-80 md:h-96">
        <Image
          className="w-full object-cover "
          src="https://images.pexels.com/photos/3807811/pexels-photo-3807811.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Blasius United Auto Service Center"
          width={1260}
          height={750}
          priority
        />
      </div>
      <div className="container mx-auto p-6">
        <div className="relative -mt-16 flex justify-center">
          <div className="w-full max-w-4xl space-y-6 rounded-lg bg-slate-50 px-8 py-10 shadow-lg sm:px-20">
            <h1
              className={`${racingSansOne.className} text-center text-3xl sm:text-4xl md:text-5xl`}
            >
              Service Center
            </h1>
            <h2 className="text-center text-xl font-semibold sm:text-2xl">
              Schedule Service – 203-756-8851
            </h2>
            <p className="text-sm sm:text-base">
              By bringing your vehicle to United Auto for all your service and
              repair needs, from regularly scheduled appointments to major
              repairs, you can count on a continued driving experience unlike
              any other – for every single mile of your ownership. United Auto
              technicians are highly trained to perform whatever work you may
              need on your vehicle including:
            </p>
            <ul className="grid list-disc grid-cols-1 gap-2 pl-5 text-sm sm:grid-cols-2 sm:text-base">
              <li>General Automotive Repair</li>
              <li>Preventative Car Maintenance</li>
              <li>Air Conditioning and Heater Service</li>
              <li>Cooling System and Radiator Repair</li>
              <li>Synthetic Motor Oil Replacement</li>
              <li>Oil Filter Replacement</li>
              <li>Brake Repair</li>
              <li>Engine Diagnostic</li>
              <li>Tune-Up</li>
              <li>Belts, Hoses, Fluids</li>
              <li>Air Filters</li>
              <li>Alternators</li>
              <li>Batteries</li>
              <li>Headlights</li>
              <li>Starters</li>
              <li>Transmission Services</li>
              <li>Struts</li>
              <li>All Fluid Level Checks & Corrections</li>
            </ul>
            <div className="mt-6 flex justify-center">
              <Button asChild>
                <a href="tel:203-756-8851">Call 203-756-8851</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCenter;
