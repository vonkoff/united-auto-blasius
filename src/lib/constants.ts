import type {
  WithContext,
  AutoRepair,
  AutoBodyShop,
  AutoDealer,
  Product,
  Car,
} from "schema-dts";

const BASE_URL = process.env.BASE_URL;

export interface VehicleSchemaProps {
  vin: string;
  make: string;
  colour: string;
  mainImage: string;
  autoWriterDescription: string;
  vehicle: string;
  model: string;
  year: number;
  stockNumber: string;
  color: string;
  odometer: number;
  price: number;
  newOrUsed: "U" | "N";
}

const createVehicleSchema = (
  props: VehicleSchemaProps,
): WithContext<Product & Car> => {
  const currentDate = new Date();
  const priceValidUntil = new Date(
    currentDate.setDate(currentDate.getDate() + 30),
  )
    .toISOString()
    .split("T")[0];

  const vehicleUrl = `${BASE_URL}/inventory/${encodeURIComponent(`${props.vehicle.replace(/ /g, "-")}-${props.vin}`)}`;

  return {
    "@context": "https://schema.org",
    //@ts-ignore
    "@type": ["Product", "Car"],
    "@id": props.vin,
    name: props.vehicle,
    image: vehicleUrl + props.mainImage,
    description: props.autoWriterDescription,
    sku: props.stockNumber,
    brand: {
      "@type": "Brand",
      name: props.make,
    },
    model: props.model,
    vehicleModelDate: props.year.toString(),
    itemCondition:
      props.newOrUsed === "N"
        ? "https://schema.org/NewCondition"
        : "https://schema.org/UsedCondition",
    vehicleIdentificationNumber: props.vin,
    mpn: props.stockNumber,
    color: props.colour,
    manufacturer: {
      "@type": "Organization",
      name: props.make,
    },
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: props.odometer,
      unitCode: "SMI",
    },
    offers: {
      "@type": "Offer",
      url: vehicleUrl,
      priceCurrency: "USD",
      price: props.price.toString(),
      priceValidUntil: priceValidUntil,
      itemCondition:
        props.newOrUsed === "N"
          ? "https://schema.org/NewCondition"
          : "https://schema.org/UsedCondition",
      availability: "https://schema.org/InStock",
    },
  };
};

const autoBusinessJsonLd: WithContext<AutoRepair | AutoBodyShop | AutoDealer> =
  {
    "@context": "https://schema.org",
    "@type": "AutoRepair", // Primary type
    additionalType: [
      "https://schema.org/AutoBodyShop",
      "https://schema.org/AutoDealer",
    ],
    name: "United Auto Sales and Service",
    url: "https://unitedautowaterbury.com",
    telephone: "203-756-8851",
    image: "https://www.unitedautowaterbury.com/images/united-auto-logo.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "219 Congress Ave",
      addressLocality: "Waterbury",
      addressRegion: "CT",
      postalCode: "06708",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "41.5583",
      longitude: "-73.0365",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "07:30",
        closes: "14:00",
      },
    ],
    priceRange: "$-$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "248",
      bestRating: "5",
      worstRating: "1",
    },
    //TODO: Get google business API to work and post reviews
    // review: [
    //   {
    //     "@type": "Review",
    //     author: {
    //       "@type": "Person",
    //       name: "John Doe",
    //     },
    //     datePublished: "2023-08-15",
    //     reviewRating: {
    //       "@type": "Rating",
    //       ratingValue: "5",
    //       bestRating: "5",
    //       worstRating: "1",
    //     },
    //     reviewBody:
    //       "Excellent service! They fixed my car quickly and at a reasonable price.",
    //   },
    // ],
    hasOfferCatalog: [
      {
        "@type": "OfferCatalog",
        name: "Auto Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Emissions Testing",
              url: "https://www.unitedautowaterbury.com/emissions",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "General Automotive Repair",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Preventative Car Maintenance",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Air Conditioning and Heater Service",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Cooling System and Radiator Repair",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Synthetic Motor Oil Replacement",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Oil Filter Replacement",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Brake Repair",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Engine Diagnostic",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Tune-Up",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Belts, Hoses, Fluids",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Air Filters",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Alternators",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Batteries",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Headlights",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Starters",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Transmission Services",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Struts",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "All Fluid Level Checks & Corrections",
              url: "https://www.unitedautowaterbury.com/service",
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Vehicle Inventory",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Car",
              name: "United Auto Vehicles",
              url: "https://www.unitedautowaterbury.com/inventory",
            },
          },
        ],
      },
    ],
  };

export { autoBusinessJsonLd, createVehicleSchema };
