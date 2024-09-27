import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ExternalLink } from "lucide-react";

const BASE_URL = process.env.BASE_URL;

const sitemapData = [
  {
    title: "Main Pages",
    links: [
      { name: "Home", url: "/" },
      { name: "Inventory", url: "/inventory" },
      { name: "Service", url: "/service" },
      { name: "Emissions", url: "/emissions" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", url: "/privacy-policy" },
      { name: "Terms of Use", url: "/terms-of-use" },
    ],
  },
  {
    title: "Inventory",
    links: [
      { name: "View All Inventory", url: "/inventory" },
      // You might want to dynamically generate these based on your actual inventory
      // TODO: Maybe
      // { name: "Used Cars", url: "/inventory?condition=used" },
      // { name: "New Cars", url: "/inventory?condition=new" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Sitemap</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sitemapData.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={`${BASE_URL}${link.url}`}
                      className="flex items-center text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
