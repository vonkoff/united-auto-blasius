// components/MapSection.tsx
"use client";

import { MapPin, Clock10 } from "lucide-react";
import DynamicMap from "./DynamicMap";
import type { LatLngExpression } from "leaflet";

const MapSection = ({
  position,
  address,
  mapUrl,
}: {
  position: LatLngExpression;
  address: string;
  mapUrl: string;
}) => {
  return (
    <div className="mx-auto grid h-full max-h-fit grid-cols-1 items-center justify-center justify-items-start bg-black md:grid-cols-2 md:justify-items-center">
      <div className="order-first mx-2 mb-3 flex flex-col justify-center gap-1 pl-4 text-white  md:gap-4 md:pl-0">
        <h2 className="mb-1 mt-4 text-xl uppercase md:mx-auto md:mt-0 lg:text-2xl">
          Get Directions
        </h2>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="my-2 flex items-center gap-2 text-sm font-light transition-colors hover:text-blue-300 lg:text-base"
        >
          <MapPin className="h-4 w-4 md:h-6 md:w-6 lg:h-6 lg:w-6" />
          {address}
        </a>
        <span className="my-2 flex items-center gap-2 text-sm font-light lg:text-base">
          <Clock10 className="h-4 w-4 md:h-6 md:w-6 lg:h-6 lg:w-6" />
          <div className="flex flex-col">
            <p>
              Open Monday-Friday!{" "}
              <u>
                <strong>Sales</strong>
              </u>
              : 8am-5pm
            </p>
            <p>
              Open Monday-Friday!{" "}
              <u>
                <strong>Service</strong>
              </u>
              : 8am-5pm
            </p>
            <p>
              Saturday Only!{" "}
              <u>
                <strong>Emissions</strong>
              </u>
              : 8am-1pm
            </p>
          </div>
        </span>
      </div>
      <div className="order-first w-full" style={{ height: "300px" }}>
        <DynamicMap pos={position} />
      </div>
    </div>
  );
};

export default MapSection;