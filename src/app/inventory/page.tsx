import Link from "next/link";
import { CarCard } from "../_components/car-card";

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
      <div className="container">
        <div className="flex flex-col items-center space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Our Car Collection
            </h2>
            <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
              Browse through our diverse selection of the latest car models,
              each offering exceptional performance, style, and comfort.
            </p>
          </div>
          <div className="grid  grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            <CarCard
              carJpg="Focus.jpg"
              altText="Red Ford Focus"
              carTitle="2014 Ford Focus"
              carPrice=""
            />
            <CarCard
              carJpg="fit.jpg"
              altText="Honda Fit"
              carTitle="Fit car"
              carPrice="9,250"
            />
            <CarCard
              carJpg="Altima 1.jpg"
              altText="2016 Grey Nissan Altima"
              carTitle="2016 Nissan Altima"
              carPrice="9,500"
            />
            <CarCard
              carJpg="Juke.jpg"
              altText="2012 Blue Nissan Juke"
              carTitle="2012 Nissan Juke"
              carPrice="40,000"
            />
            <CarCard
              carJpg="VW Jetta 11.png"
              altText="2013 Red VW Jetta"
              carTitle="2013 VW Jetta"
              carPrice="7,900"
            />
            <CarCard
              carJpg="Insight.jpg"
              altText="2012 White Honda Insight"
              carTitle="2012 Honda Insight"
              carPrice=""
            />
            <CarCard
              carJpg="Honda CR-V.jpg"
              altText="2011 Grey Honda CR-V"
              carTitle="2011 Honda CR-V"
              carPrice=""
            />
            <CarCard
              carJpg="VW Golf 1.jpg"
              altText="2011 Black VW Golf GTI"
              carTitle="VW Golf GTI"
              carPrice="7,800"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
