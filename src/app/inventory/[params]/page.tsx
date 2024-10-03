import { Fragment } from "react";
import { Montserrat } from "next/font/google";
import { db } from "~/db/index";
import { eq, like, and } from "drizzle-orm";
import { inventory } from "~/db/schema";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
// import Image from "next/image";
import CarCarousel from "~/app/_components/car-carousel";
import type { Metadata, ResolvingMetadata } from "next";
import { createVehicleSchema } from "~/lib/constants";
import { type VehicleSchemaProps } from "~/lib/constants";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"], // You can adjust these weights as needed
});

type Props = {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export async function generateMetadata(
  { params }: { params: { params: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const decodedParams = params.params;
  const paramsArray = decodedParams.split("-");
  const vin = paramsArray[paramsArray.length - 1];

  if (!vin) {
    return {};
  }

  const vehicle = await db.query.inventory.findFirst({
    where: (veh, { eq }) => eq(veh.VIN, vin),
  });

  if (!vehicle) {
    return {};
  }

  if (!vehicle.PhotoUrlList) return {};

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
  };

  const vehicleSchema = createVehicleSchema(vehicleSchemaProps);

  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title: `${vehicle.Year} ${vehicle.Make ?? ""} ${vehicle.Model ?? ""}`,
    description: vehicle.Description ?? "",
    openGraph: {
      images: [vehicle.PhotoUrlList.split("|")[0] ?? "", ...previousImages],
    },
    other: {
      "application/ld+json": JSON.stringify(vehicleSchema),
    },
  };
}

export async function generateStaticParams() {
  const result = await db.query.inventory.findMany({
    where: like(inventory.Stock, "G%"),
  });

  if (!Array.isArray(result)) {
    console.error("Database query did not return an array.");
    return [];
  }

  const paths = result.map((vehicle) => {
    const vehicleName = `${vehicle.Year}-${vehicle.Make}-${vehicle.Model}-${vehicle.Body}-${vehicle.VIN}`;
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

    if (!vin) {
      return <div>Invalid VIN</div>;
    }

    const vehicle = await db.query.inventory.findFirst({
      where: and(eq(inventory.VIN, vin), like(inventory.Stock, "G%")),
    });

    if (!vehicle) {
      return <div>Item not found</div>;
    }

    if (!vehicle.Price) {
      return <div>Item not found</div>;
    }

    if (!vehicle.PhotoUrlList) {
      return <div>Item not found</div>;
    }

    // New image processing logic
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
      {
        label: "Price",
        value: vehiclePrice,
      },
    ];

    const keyFeatures = [
      { icon: "awd", label: "AWD" },
      { icon: "camera", label: "Backup Camera" },
      { icon: "monitor", label: "Blind Spot Monitor" },
      { icon: "seat", label: "Heated Seats" },
      { icon: "accents", label: "Interior Accents" },
      { icon: "remote", label: "Remote Start" },
      { icon: "airbag", label: "Side-Impact Air Bags" },
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
            <div>
              {/* <ul className="flex space-x-4"> */}
              {/*   <li> */}
              {/*     <button */}
              {/*       className="hover:underline" */}
              {/*       aria-label="Share this vehicle" */}
              {/*     > */}
              {/*       Share */}
              {/*     </button> */}
              {/*   </li> */}
              {/*   <li> */}
              {/*     <button */}
              {/*       className="hover:underline" */}
              {/*       aria-label="Save this vehicle" */}
              {/*     > */}
              {/*       Save */}
              {/*     </button> */}
              {/*   </li> */}
              {/*   <li> */}
              {/*     <button */}
              {/*       className="hover:underline" */}
              {/*       aria-label="Print this vehicle" */}
              {/*     > */}
              {/*       Print */}
              {/*     </button> */}
              {/*   </li> */}
              {/* </ul> */}
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
                    {vehicle.Description?.split("STOP BY").map(
                      (part, index) => (
                        <Fragment key={index}>
                          {index > 0 && (
                            <>
                              <br />
                              <br />
                            </>
                          )}
                          {index > 0 ? "STOP BY" : ""}
                          {part}
                        </Fragment>
                      ),
                    )}
                    <br />
                    <br />
                    <p>
                      Price excludes tax, title, registration, and dealer
                      conveyance fee. Dealer conveyance fee is $600.00. Dealer
                      not responsible for typographical errors. See dealer for
                      details.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Key Features Section */}
              {/* <div className="vdp-component vdp-key-features mt-6"> */}
              {/*   <h2 className="component-title text-xl font-semibold"> */}
              {/*     Key Features */}
              {/*   </h2> */}
              {/*   <div className="vdp-component__container mt-4"> */}
              {/*     <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"> */}
              {/*       <li className="flex flex-col items-center justify-center border border-gray-300 p-4"> */}
              {/*         <svg */}
              {/*           className="di-svg mb-2" */}
              {/*           fill="#000000" */}
              {/*           height="48" */}
              {/*           viewBox="0 0 48 48" */}
              {/*           width="48" */}
              {/*           xmlns="http://www.w3.org/2000/svg" */}
              {/*         > */}
              {/*           <path */}
              {/*             d="M28.788,12.943c0,2.672-2.14,4.839-4.788,4.839c-2.645,0-4.792-2.167-4.792-4.839S21.355,8.105,24,8.105 */}
              {/*           C26.648,8.105,28.788,10.271,28.788,12.943z" */}
              {/*           ></path> */}
              {/*           <path */}
              {/*             d="M28.788,35.14c0,2.671-2.14,4.843-4.788,4.843c-2.645,0-4.792-2.172-4.792-4.843c0-2.672,2.147-4.835,4.792-4.835 */}
              {/*           C26.648,30.305,28.788,32.468,28.788,35.14z" */}
              {/*           ></path> */}
              {/*           <path */}
              {/*             d="M11.348,5C9.676,5,8.158,5.355,7,5.94v13.594c1.158,0.585,2.676,0.94,4.348,0.94s3.19-0.355,4.348-0.94V5.94 */}
              {/*           C14.539,5.355,13.021,5,11.348,5z" */}
              {/*           ></path> */}
              {/*           <path */}
              {/*             d="M11.348,27.525c-1.672,0-3.19,0.359-4.348,0.936v13.604C8.158,42.641,9.676,43,11.348,43s3.19-0.359,4.348-0.936V28.461 */}
              {/*           C14.539,27.885,13.021,27.525,11.348,27.525z" */}
              {/*           ></path> */}
              {/*           <path */}
              {/*             d="M36.652,5c-1.668,0-3.189,0.355-4.348,0.94v13.594c1.158,0.585,2.68,0.94,4.348,0.94c1.669,0,3.19-0.355,4.348-0.94V5.94 */}
              {/*           C39.843,5.355,38.321,5,36.652,5z" */}
              {/*           ></path> */}
              {/*           <path */}
              {/*             d="M36.652,27.525c-1.668,0-3.189,0.359-4.348,0.936v13.604C33.463,42.641,34.984,43,36.652,43 */}
              {/*           c1.669,0,3.19-0.359,4.348-0.936V28.461C39.843,27.885,38.321,27.525,36.652,27.525z" */}
              {/*           ></path> */}
              {/*           <rect */}
              {/*             x="14.227" */}
              {/*             y="10.718" */}
              {/*             width="19.544" */}
              {/*             height="4.04" */}
              {/*           ></rect> */}
              {/*           <rect */}
              {/*             x="14.227" */}
              {/*             y="33.243" */}
              {/*             width="19.544" */}
              {/*             height="4.039" */}
              {/*           ></rect> */}
              {/*           <rect */}
              {/*             x="22.002" */}
              {/*             y="12.943" */}
              {/*             width="3.995" */}
              {/*             height="22.196" */}
              {/*           ></rect> */}
              {/*         </svg> */}
              {/*         <div className="feature-label text-center">AWD</div> */}
              {/*       </li> */}
              {/*       <li className="flex flex-col items-center justify-center border border-gray-300 p-4"> */}
              {/*         <svg */}
              {/*           className="di-svg mb-2" */}
              {/*           fill="#000000" */}
              {/*           height="48" */}
              {/*           viewBox="0 0 48 48" */}
              {/*           width="48" */}
              {/*           xmlns="http://www.w3.org/2000/svg" */}
              {/*         > */}
              {/*           <path */}
              {/*             fill-rule="evenodd" */}
              {/*             clip-rule="evenodd" */}
              {/*             d="M14.005,19.251c-0.039,5.856,0.165,11.714,0.54,17.569 */}
              {/*         c0.125,1.964,1.353,3.267,2.961,3.583c4.346,0.848,8.693,0.742,13.038,0c1.612-0.277,2.84-1.617,2.961-3.583 */}
              {/*         c0.642-10.267,0.678-20.613,0-31.042c-0.126-1.963-1.395-3.041-2.961-3.581c-4.082-1.404-8.362-1.781-13.038,0 */}
              {/*         c-1.552,0.59-2.812,1.62-2.961,3.581c-0.217,2.854-0.364,5.71-0.451,8.564L14.005,19.251z M17.465,13.054 */}
              {/*         c3.103-2.302,10.203-2.302,13.303,0c-0.784,1.54-1.567,3.079-2.353,4.619c-2.71-0.503-5.887-0.503-8.596,0 */}
              {/*         C19.034,16.133,18.25,14.594,17.465,13.054L17.465,13.054z M17.741,34.191c0.762-0.745,1.522-1.49,2.283-2.234 */}
              {/*         c2.627,0.242,5.708,0.242,8.335,0c0.761,0.744,1.523,1.489,2.284,2.234C27.635,35.309,20.749,35.309,17.741,34.191L17.741,34.191z */}
              {/*         M31.256,16.359c0.455,4.793,0.287,9.875-0.09,15.044c-0.74-0.483-1.48-0.969-2.222-1.452c0-3.423,0-6.847,0-10.267 */}
              {/*         C29.714,18.577,30.484,17.466,31.256,16.359L31.256,16.359z M16.939,16.359c0.77,1.107,1.54,2.218,2.312,3.326 */}
              {/*         c0,3.42,0,6.844,0,10.267c-0.741,0.483-1.482,0.969-2.224,1.452C16.651,26.233,16.485,21.152,16.939,16.359z" */}
              {/*           ></path> */}
              {/*         </svg> */}
              {/*         <div className="feature-label text-center"> */}
              {/*           Backup Camera */}
              {/*         </div> */}
              {/*       </li> */}
              {/*       <li className="flex flex-col items-center justify-center  border border-gray-300 p-4"> */}
              {/*         <svg */}
              {/*           className="di-svg mb-2" */}
              {/*           fill="#000000" */}
              {/*           height="48" */}
              {/*           viewBox="0 0 48 48" */}
              {/*           width="48" */}
              {/*           xmlns="http://www.w3.org/2000/svg" */}
              {/*         > */}
              {/*           <path */}
              {/*             d="M25.668,20.612c-0.004,0.198-0.088,0.36-0.236,0.482c-0.293,0.228-0.782,0.267-1.001,0.256 */}
              {/*         c-1.394-0.078-2.65-0.75-3.353-1.802c-0.375-0.559-0.572-1.195-0.572-1.842c0-0.068,0.002-0.135,0.005-0.203 */}
              {/*         c0.014-0.208,0.152-0.595,0.419-0.806c0.159-0.125,0.335-0.175,0.546-0.154c0.115,0.012,0.206,0.058,0.281,0.142 */}
              {/*         c0.17,0.189,0.185,0.479,0.185,0.563c0,0.047-0.004,0.091-0.011,0.132c-0.017,0.111-0.025,0.22-0.025,0.328 */}
              {/*         c0,0.435,0.127,0.844,0.381,1.222c0.544,0.809,1.589,1.279,2.661,1.196c0.148-0.011,0.389,0.083,0.549,0.21 */}
              {/*         c0.108,0.088,0.172,0.188,0.172,0.272V20.612z" */}
              {/*           ></path> */}
              {/*           <path */}
              {/*             d="M25.625,23.71c0,0.019-0.006,0.035-0.007,0.055l-0.002,0.031c-0.017,0.174-0.118,0.354-0.282,0.481 */}
              {/*         c-0.146,0.115-0.323,0.187-0.504,0.191h-0.007h-0.044c-0.064-0.004-0.202-0.011-0.474-0.031c-2.599-0.187-4.932-1.466-6.24-3.417 */}
              {/*         c-0.712-1.067-1.091-2.28-1.091-3.509c0-0.112,0.004-0.225,0.008-0.337l0.023-0.398v-0.009c0.023-0.098,0.119-0.229,0.238-0.32 */}
              {/*         c0.168-0.136,0.388-0.21,0.604-0.204h0.045c0.192,0.007,0.357,0.07,0.453,0.181c0.06,0.062,0.086,0.139,0.086,0.224 */}
              {/*         c0,0.027-0.003,0.054-0.008,0.08l-0.034,0.415c-0.011,0.122-0.015,0.247-0.015,0.371c0,1.011,0.311,2.009,0.898,2.886 */}
              {/*         c1.123,1.677,3.123,2.733,5.352,2.833l0.425,0.017c0.188-0.012,0.316,0.021,0.422,0.107C25.568,23.442,25.625,23.568,25.625,23.71z" */}
              {/*           ></path> */}
              {/*         </svg> */}
              {/*         <div className="feature-label text-center"> */}
              {/*           Blind Spot Monitor */}
              {/*         </div> */}
              {/*       </li> */}
              {/*     </ul> */}
              {/*   </div> */}
              {/* </div> */}
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
                      {vehiclePrice}
                      <span
                        className={`text-lg font-bold ${montserrat.className}`}
                      ></span>
                    </div>
                    {/* <div className="flex items-center justify-between text-green-600"> */}
                    {/*   <span className="font-medium"> */}
                    {/*     In House Financing Savings */}
                    {/*   </span> */}
                    {/*   <span className="text-lg font-bold">$1,500</span> */}
                    {/* </div> */}
                    {/* <div className="flex items-center justify-between"> */}
                    {/*   <span className="font-medium">Blasius Price</span> */}
                    {/*   <span className="text-lg font-bold">$31,850</span> */}
                    {/* </div> */}
                    {/* <p className="mt-4 text-sm text-gray-600"> */}
                    {/*   Price excludes tax, title, registration, and dealer */}
                    {/*   conveyance fee. Dealer conveyance fee is $796.00. Dealer not */}
                    {/*   responsible for typographical errors. See dealer for */}
                    {/*   details. */}
                    {/* </p> */}
                    {/* <p className="mt-2 text-sm text-gray-600"> */}
                    {/*   *Posted internet prices include dealer finance savings of */}
                    {/*   $1,500. Savings not available for cash or outside finance */}
                    {/*   transactions. */}
                    {/* </p> */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    return <div>Failed to load vehicle data</div>;
  }
};

export default InventoryItemPage;
