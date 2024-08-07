import type {
  WithContext,
  Place,
  LocalBusiness,
  AutoRepair,
  Service,
} from "schema-dts";

const autoRepairJsonLd: WithContext<AutoRepair> = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Blasius Cadillac Auto Repair",
  url: "https://www.blasiuscadillac.com/service",
  telephone: "203-753-9261",
  image: "https://www.unitedautowaterbury.com/images/united-auto-logo.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "219 Congress Ave",
    addressLocality: "Waterbury",
    addressRegion: "CT",
    postalCode: "06708",
    addressCountry: "US",
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
  department: [
    {
      "@type": "Service",
      name: "Emissions Testing",
      url: "https://www.blasiuscadillac.com/service/emissions-testing",
      serviceType: "http://schema.org/VehicleEmissionsService",
      provider: {
        "@type": "AutoRepair",
        name: "Blasius Cadillac Auto Repair",
      },
    },
    {
      "@type": "Service",
      name: "Oil Change",
      url: "https://www.blasiuscadillac.com/service/oil-change",
      serviceType: "http://schema.org/VehicleService",
      provider: {
        "@type": "AutoRepair",
        name: "Blasius Cadillac Auto Repair",
      },
    },
  ],
};

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
