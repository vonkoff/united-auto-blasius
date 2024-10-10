import { Fragment } from "react";
import { Montserrat } from "next/font/google";
import { db } from "~/db/index";
import { eq, like, and } from "drizzle-orm";
import { inventory } from "~/db/schema";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import CarCarousel from "~/app/_components/car-carousel";
import type { Metadata } from "next";
import { createVehicleSchema } from "~/lib/constants";
import { type VehicleSchemaProps } from "~/lib/constants";
import { notFound } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

type Props = {
  params: { params: string };
};

// Define a type for the vehicle data
type VehicleData = {
  VIN: string;
  Make: string;
  Model: string;
  Year: number;
  Colour: string;
  PhotoUrlList: string;
  Description: string;
  Series: string;
  Stock: string;
  Odometer: number;
  Price: number;
  NewUsed: string;
  Transmission: string;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vehicle = await getVehicleData(params.params);

  //TODO: Make is so Photo Url List is required. Image coming soon should be put if not images found
  if (!vehicle) {
    return {};
  }

  let newOrUsed: "U" | "N" = "U";
  if (vehicle.NewUsed === "N") newOrUsed = "N";

  const vehicleSchemaProps: VehicleSchemaProps = {
    vin: vehicle.VIN ?? "",
    make: vehicle.Make ?? "",
    colour: vehicle.Colour ?? "",
    mainImage: vehicle.PhotoUrlList.split("|")[0] ?? "",
    autoWriterDescription: vehicle.Description ?? "",
    vehicle: `${vehicle.Year}-${vehicle.Make}-${vehicle.Model}-${vehicle.Series}`,
    model: vehicle.Model ?? "",
    year: vehicle.Year ?? 0,
    stockNumber: vehicle.Stock ?? "",
    color: vehicle.Colour ?? "",
    odometer: vehicle.Odometer ?? 0,
    price: vehicle.Price ?? 0,
    newOrUsed: newOrUsed,

    //TODO: ADD
    // numberOfDoors: number;
    // fuelEfficiency: {
    //   city: number;
    //   highway: number;
    // };
  };

  const vehicleSchema = createVehicleSchema(vehicleSchemaProps);

  return {
    title: `Pre-Owned ${vehicle.Year} ${vehicle.Make ?? ""} ${vehicle.Model ?? ""} - $${vehicle.Price.toLocaleString()}`,
    description:
      `$${vehicle.Price.toLocaleString()} - ${vehicle.Description}` ?? "",
    openGraph: {
      images: [vehicle.PhotoUrlList.split("|")[0] ?? ""],
    },
    other: {
      "application/ld+json": JSON.stringify(vehicleSchema),
    },
  };
}

async function getVehicleData(params: string): Promise<VehicleData | null> {
  const decodedParams = params;
  const paramsArray = decodedParams.split("-");
  const vin = paramsArray[paramsArray.length - 1];

  if (!vin) {
    return null;
  }

  const vehicle = await db.query.inventory.findFirst({
    where: and(eq(inventory.VIN, vin), like(inventory.Stock, "G%")),
  });

  return vehicle as VehicleData | null;
}

export async function generateStaticParams() {
  const result = await db.query.inventory.findMany({
    where: like(inventory.Stock, "G%"),
  });

  if (!Array.isArray(result)) {
    console.error("Database query did not return an array.");
    return [];
  }

  return result.map((vehicle) => ({
    params: encodeURIComponent(
      `${vehicle.Year}-${vehicle.Make}-${vehicle.Model}-${vehicle.Body}-${vehicle.VIN}`,
    ),
  }));
}

export const revalidate = 3600; // Revalidate every hour

export default async function InventoryItemPage({ params }: Props) {
  const vehicle = await getVehicleData(params.params);

  //TODO: Change it so Price is needed and not optional
  // if (!vehicle || !vehicle?.Price || !vehicle?.PhotoUrlList) {
  //   notFound();
  // }
  if (!vehicle) {
    notFound();
  }

  const imageUrls = vehicle.PhotoUrlList.split("|");

  const vehiclePrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(vehicle.Price);

  const infoItems = [
    { label: "Exterior", value: vehicle.Colour },
    { label: "Transmission", value: vehicle.Transmission },
    { label: "Mileage", value: vehicle.Odometer?.toLocaleString() },
    { label: "Make", value: vehicle.Make },
    { label: "Model", value: vehicle.Model },
    { label: "Price", value: vehiclePrice },
  ];

  return (
    <>
      <header className="mb-6 bg-[#333333] p-4 text-white">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <div className="mb-4 md:mb-0">
            <h1 className={`text-3xl font-bold ${montserrat.className}`}>
              <span className="font-normal">Pre-Owned</span> {vehicle.Year}{" "}
              {vehicle.Make} {vehicle.Model}
            </h1>
            <div className="mt-0.5 text-sm">
              <span className={`mr-4 ${montserrat.className}`}>
                <span className="font-semibold">VIN:</span> {vehicle.VIN}
              </span>
              <span>
                <span className={`font-semibold ${montserrat.className}`}>
                  Stock:
                </span>{" "}
                {vehicle.Stock}
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-6 pb-6">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full pr-0 lg:w-2/3 lg:pr-6">
            <CarCarousel item={imageUrls} />
            <h2
              className={`mb-2 mt-6 text-xl font-semibold ${montserrat.className}`}
            >
              Basic Info
            </h2>
            <Card className="rounded-none shadow-none">
              <CardContent className="p-0">
                <ul
                  className={`grid grid-cols-1 gap-x-4 gap-y-2 bg-[#F2F2F2] p-4 text-sm md:grid-cols-2 `}
                >
                  {infoItems.map((item, index) => (
                    <li
                      key={index}
                      className={`py-2 ${index < 4 ? "border-b border-gray-300" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`${montserrat.className}font-semibold`}
                        >
                          {item.label}:
                        </span>
                        <span
                          className={`${montserrat.className}font-semibold text-right`}
                        >
                          {item.value}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <h2
              className={`mb-2 mt-6 text-xl font-semibold ${montserrat.className}`}
            >
              Description
            </h2>
            <Card className="w-full rounded-none shadow-none">
              <CardContent className="p-0">
                <div
                  className={`bg-[#F2F2F2] p-4 text-sm ${montserrat.className}`}
                >
                  {vehicle.Description.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 hidden w-full lg:mt-0 lg:block lg:w-1/3">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className={`${montserrat.className}`}>
                  Pricing Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`${montserrat.className}`}>
                      Sale Price
                    </span>
                    <span
                      className={`text-lg font-bold ${montserrat.className}`}
                    >
                      {vehiclePrice}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
