import React from "react";
import { CarCard } from "../app/_components/car-card";
import { useHits } from "react-instantsearch";
import type { UseHitsProps } from "react-instantsearch";

function CustomHits(props: UseHitsProps) {
  const { items } = useHits(props);

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {items.map((hit) => (
        <CarCard
          key={hit["Stock #"]}
          carJpg={hit.R2_Photo_Url_List}
          altText={`${hit.Year} ${hit.Make}-${hit.Model}-${hit.Body}`}
          carTitle={`${hit.Year} ${hit.Make} ${hit.Model} ${hit.Body}`}
          carPrice={hit.Price}
          // eslint-disable-next-line
          link={`/inventory/${encodeURIComponent(`${hit.Make}-${hit.Model}-${hit.Body}-${hit.VIN}`)}`}
        />
      ))}
    </div>
  );
}

export default CustomHits;
