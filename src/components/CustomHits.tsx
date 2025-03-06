import React from "react";
import { CarCard } from "../app/_components/car-card";
import { useHits } from "react-instantsearch";
import type { UseHitsProps } from "react-instantsearch";

const PLACEHOLDER_IMAGE = "/images/no-image-placeholder.png"; // Define the placeholder

function CustomHits(props: UseHitsProps) {
  const { items } = useHits(props);

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {items.map((hit) => {
        // Define carImage inside the map function for each hit
        const carImage = hit["Photo Url List"]?.trim() || PLACEHOLDER_IMAGE;

        return (
          <CarCard
            key={hit["Stock #"]}
            carJpg={carImage}
            altText={`${hit.Year} ${hit.Make}-${hit.Model}-${hit.Body}`}
            carTitle={`${hit.Year} ${hit.Make} ${hit.Model} ${hit.Body}`}
            carPrice={hit.Price}
            vin={hit.VIN}
            link={`/inventory/${encodeURIComponent(`${hit.Make}-${hit.Model}-${hit.Body}-${hit.VIN}`)}`}
          />
        );
      })}
    </div>
  );
}

export default CustomHits;
