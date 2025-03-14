import React from "react";
import { Racing_Sans_One } from "next/font/google";
import { Button } from "~/components/ui/button";
import { type Metadata } from "next";
import Script from "next/script";

const racingSansOne = Racing_Sans_One({
  subsets: ["latin"],
  weight: ["400"],
});

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Automotive Repair and Maintenance Services",
  provider: {
    "@type": "AutoRepair",
    name: "United Auto Sales and Service",
    telephone: "203-756-8851",
    url: "https://www.unitedautowaterbury.com/service",
    address: {
      "@type": "PostalAddress",
      streetAddress: "219 Congress Ave",
      addressLocality: "Waterbury",
      addressRegion: "CT",
      postalCode: "06708",
      addressCountry: "US",
    },
  },
  serviceType: [
    "General Automotive Repair",
    "Preventative Car Maintenance",
    "Air Conditioning and Heater Service",
    "Cooling System and Radiator Repair",
    "Synthetic Motor Oil Replacement",
    "Oil Filter Replacement",
    "Brake Repair",
    "Engine Diagnostic",
    "Tune-Up",
    "Belts, Hoses, Fluids",
    "Air Filters",
    "Alternators",
    "Batteries",
    "Headlights",
    "Starters",
    "Transmission Services",
    "Struts",
    "All Fluid Level Checks & Corrections",
  ],
  areaServed: {
    "@type": "City",
    name: "Waterbury",
    addressRegion: "CT",
    addressCountry: "US",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Automotive Services",
    itemListElement: [
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
};

// TODO: Finixh. Do breadcrumb?
// const webPageSchema = {
//   "@context": "https://schema.org",
//   "@type": "WebPage",
//   name: "Service Center - United Auto Sales and Service",
//   description:
//     "United Auto's Service Center offers comprehensive automotive repair and maintenance services in Waterbury, CT.",
//   url: "https://www.unitedautowaterbury.com/service",
//   breadcrumb: {
//     "@type": "BreadcrumbList",
//     itemListElement: [
//       {
//         "@type": "ListItem",
//         position: 1,
//         name: "Home",
//         item: "https://www.unitedautowaterbury.com/",
//       },
//       {
//         "@type": "ListItem",
//         position: 2,
//         name: "Service Center",
//         item: "https://www.unitedautowaterbury.com/service",
//       },
//     ],
//   },
//   isPartOf: {
//     "@type": "WebSite",
//     name: "United Auto Sales and Service",
//     url: "https://www.unitedautowaterbury.com",
//   },
// };

export const metadata: Metadata = {
  title: "United Auto - Trust for over 70 years in Waterbury, Connecticut",
  description:
    "United Auto's Service Center in Waterbury, CT offers comprehensive automotive repair and maintenance by highly trained technicians. Call 203-756-8851 to schedule your service today.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const ServiceCenter = () => {
  return (
    <>
      <Script
        type="application/ld+json"
        id="service-schema"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* <Script */}
      {/*   type="application/ld+json" */}
      {/*   id="webpage-schema" */}
      {/*   strategy="afterInteractive" */}
      {/*   dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} */}
      {/* /> */}

      <div className="relative">
        <div className="h-64 overflow-hidden sm:h-80 md:h-96">
          <img
            className="w-full object-cover"
            src="https://images.pexels.com/photos/3807811/pexels-photo-3807811.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Blasius United Auto Service Center"
            width="1260"
            height="750"
          />
          {/* <Image */}
          {/*   className="w-full object-cover " */}
          {/*   src="https://images.pexels.com/photos/3807811/pexels-photo-3807811.jpeg?auto=compress&cs=tinysrgb&w=800" */}
          {/*   alt="Blasius United Auto Service Center" */}
          {/*   width={1260} */}
          {/*   height={750} */}
          {/*   priority */}
          {/* /> */}
        </div>
        <div className="container mx-auto p-6">
          <div className="relative -mt-16 flex justify-center">
            <div className="w-full max-w-4xl space-y-6 rounded-lg bg-slate-50 px-8 py-10 shadow-lg sm:px-20">
              <h1
                className={`${racingSansOne.className} text-center text-3xl sm:text-4xl md:text-5xl`}
              >
                Service Center
              </h1>
              <h2 className="text-center text-xl font-semibold sm:text-2xl">
                Schedule Service – 203-756-8851
              </h2>
              <p className="text-sm sm:text-base">
                By bringing your vehicle to United Auto for all your service and
                repair needs, from regularly scheduled appointments to major
                repairs, you can count on a continued driving experience unlike
                any other – for every single mile of your ownership. United Auto
                technicians are highly trained to perform whatever work you may
                need on your vehicle including:
              </p>
              <ul className="grid list-disc grid-cols-1 gap-2 pl-5 text-sm sm:grid-cols-2 sm:text-base">
                <li>General Automotive Repair</li>
                <li>Preventative Car Maintenance</li>
                <li>Air Conditioning and Heater Service</li>
                <li>Cooling System and Radiator Repair</li>
                <li>Synthetic Motor Oil Replacement</li>
                <li>Oil Filter Replacement</li>
                <li>Brake Repair</li>
                <li>Engine Diagnostic</li>
                <li>Tune-Up</li>
                <li>Belts, Hoses, Fluids</li>
                <li>Air Filters</li>
                <li>Alternators</li>
                <li>Batteries</li>
                <li>Headlights</li>
                <li>Starters</li>
                <li>Transmission Services</li>
                <li>Struts</li>
                <li>All Fluid Level Checks & Corrections</li>
              </ul>
              <div className="mt-6 flex justify-center">
                <Button asChild>
                  <a href="tel:203-756-8851">Call 203-756-8851</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCenter;
