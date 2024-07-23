import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";

interface InventoryItemProps {
  Stock: string;
  Year: string;
  Make: string;
  Model: string;
  Color: string;
  Mileage: string;
  Price: string;
  ImageURLs: string[];
}

const BASE_URL = process.env.BASE_URL;

const getInventoryData = (): InventoryItemProps[] => {
  const filePath = path.join(process.cwd(), "public", "inventorycars.csv");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const records: InventoryItemProps[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // Parse the ImageURLs field as JSON
  records.forEach((record) => {
    if (typeof record.ImageURLs === "string") {
      record.ImageURLs = JSON.parse(record.ImageURLs);
    }
  });

  return records;
};

const getStaticPages = (): SitemapEntry[] => {
  return [
    //TODO: Right down and fix up last modified date
    // TODO: Include sitemap page 2
    { url: `${BASE_URL}/`, lastModified: new Date().toISOString() },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date().toISOString(),
    },
    { url: `${BASE_URL}/terms-of-use`, lastModified: new Date().toISOString() },
    { url: `${BASE_URL}/inventory`, lastModified: new Date().toISOString() }, // Base inventory page
  ];
};

interface SitemapEntry {
  url: string;
  lastModified: string;
}

export default async function sitemap(): Promise<SitemapEntry[]> {
  const items = getInventoryData();

  const inventoryEntries = items.map((item) => ({
    url: `${BASE_URL}/inventory/${encodeURIComponent(
      `${item.Make}-${item.Model.replace(/\s+/g, "-")}-${item.Stock}`,
    )}`,
    lastModified: new Date().toISOString(), // Update this to actual last modified date if available
  }));

  const staticEntries = getStaticPages();

  return [...staticEntries, ...inventoryEntries];
}
