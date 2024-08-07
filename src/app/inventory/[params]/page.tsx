// @ts-nocheck
import { db } from "~/db/index";
import { eq } from "drizzle-orm";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "~/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
// import Image from "next/image";
import CarCarousel from "~/app/_components/car-carousel";

interface InventoryPageProps {
  params: {
    params: string;
  };
}

export async function generateStaticParams() {
  const result = await db.query.vehicles.findMany();

  if (!Array.isArray(result)) {
    console.error("Database query did not return an array.");
    return [];
  }

  const paths = result.map((vehicle) => {
    const vehicleName = `${vehicle.vehicle.replace(/ /g, "-")}-${vehicle.vin}`;
    console.log("VEHICLE NAME: ", vehicleName);
    return {
      params: encodeURIComponent(vehicleName),
    };
  });

  console.log("Generated paths:", paths);

  return paths;
}

const InventoryItemPage = async ({
  params,
}: {
  params: { params: string };
}) => {
  try {
    const decodedParams = params.params;
    const paramsArray = decodedParams.split("-");
    const vin = paramsArray[paramsArray.length - 1];
    console.log("VIN: ", vin);

    const vehicle = await db.query.vehicles.findFirst({
      where: (veh, { eq }) => eq(veh.vin, vin),
      include: {
        body: true,
        color: true,
        class: true,
        drivetrainType: true,
        exteriorBaseColor: true,
        interior: true,
        interiorMaterial: true,
        make: true,
        transmission: true,
      },
    });
    console.log(vehicle);

    if (!vehicle) {
      return <div>Item not found</div>;
    }
    // Parse the imageUrls string into an array
    let imageUrls: string[] = [];
    try {
      imageUrls = JSON.parse(vehicle.imageUrls);
    } catch (error) {
      console.error("Error parsing imageUrls:", error);
    }
    console.log(imageUrls);

    return (
      <div className="container mx-auto p-6">
        <CarCarousel item={imageUrls} />
        <Card className="rounded-lg bg-white shadow-md">
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-semibold">Basic Info</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="font-medium">Exterior:</span>
                <span>{vehicle.color}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Mileage:</span>
                <span>{vehicle.odometer}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Year:</span>
                <span>{vehicle.year}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Make:</span>
                <span>{vehicle.make}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Model:</span>
                <span>{vehicle.model}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Price:</span>
                <span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(vehicle.price)}
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    return <div>Failed to load vehicle data</div>;
  }
};

export default InventoryItemPage;
