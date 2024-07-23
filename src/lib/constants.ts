import type { WithContext, Place, LocalBusiness } from "schema-dts";

const placeJsonLd: WithContext<Place> = {
  "@context": "https://schema.org",
  "@type": "Place",
  name: "United Auto Sales & Service",
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
  telephone: "203-756-8851",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
};

const localBusinessJsonLd: WithContext<LocalBusiness> = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "United Auto Sales & Service",
  address: {
    "@type": "PostalAddress",
    streetAddress: "219 Congress Ave",
    addressLocality: "Waterbury",
    addressRegion: "CT",
    postalCode: "06708",
    addressCountry: "US",
  },
  telephone: "203-756-8851",
  priceRange: "$-$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
};

export { placeJsonLd, localBusinessJsonLd };
