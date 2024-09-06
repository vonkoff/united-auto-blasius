import type {
  WithContext,
  AutoRepair,
  AutoBodyShop,
  AutoDealer,
  Product,
  Car,
} from "schema-dts";

interface VehicleSchemaProps {
  vehicleId: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  model: string;
  year: string;
  vin: string;
  mpn: string;
  color: string;
  mileage: number;
  ratingValue: string;
  reviewCount: string;
  url: string;
  price: string;
  priceValidUntil: string;
}

const createVehicleSchema = (
  props: VehicleSchemaProps,
): WithContext<Product & Car> => ({
  "@context": "https://schema.org",
  //@ts-ignore this was allowed on one other website
  "@type": ["Product", "Car"],
  "@id": props.vehicleId,
  name: props.name,
  image: props.image,
  description: props.description,
  sku: props.vehicleId,
  brand: {
    "@type": "Brand",
    name: props.brand,
  },
  model: props.model,
  vehicleModelDate: props.year,
  itemCondition: "https://schema.org/UsedCondition",
  vehicleIdentificationNumber: props.vin,
  mpn: props.mpn,
  color: props.color,
  manufacturer: {
    "@type": "Organization",
    name: props.brand,
  },
  mileageFromOdometer: {
    "@type": "QuantitativeValue",
    value: props.mileage.toString(),
    unitCode: "SMI",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: props.ratingValue,
    reviewCount: props.reviewCount,
  },
  review: {
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: props.ratingValue,
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Organization",
      name: "Cars.com",
    },
  },
  offers: {
    "@type": "Offer",
    url: props.url,
    priceCurrency: "USD",
    price: props.price,
    priceValidUntil: props.priceValidUntil,
    itemCondition: "https://schema.org/UsedCondition",
    availability: "https://schema.org/InStock",
  },
});

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
      latitude: "40.7127281",
      longitude: "-74.0060152",
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

export { autoBusinessJsonLd };
