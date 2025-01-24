import { inventory } from "~/db/schema";
import { db } from "~/db";
import { like } from "drizzle-orm";

const BASE_URL = process.env.BASE_URL;

// Revalidate every hour
export const revalidate = 3600;

interface SitemapEntry {
  url: string;
  lastModified: string;
}

const getStaticPages = (): SitemapEntry[] => {
  return [
    { url: `${BASE_URL}/`, lastModified: new Date().toISOString() },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date().toISOString(),
    },
    { url: `${BASE_URL}/terms-of-use`, lastModified: new Date().toISOString() },
    { url: `${BASE_URL}/inventory`, lastModified: new Date().toISOString() },
    { url: `${BASE_URL}/emissions`, lastModified: new Date().toISOString() },
    { url: `${BASE_URL}/service`, lastModified: new Date().toISOString() },
  ];
};

const getInventoryEntries = async (): Promise<SitemapEntry[]> => {
  const inventoryData = await db.query.inventory.findMany({
    where: like(inventory.Stock, "G%"),
    columns: {
      Year: true,
      Make: true,
      Model: true,
      Body: true,
      VIN: true,
    },
  });

  return inventoryData.map((item) => ({
    url: `${BASE_URL}/inventory/${encodeURIComponent(`${item.Year}-${item.Make}-${item.Model}-${item.Body}-${item.VIN}`)}`,
    lastModified: new Date().toISOString(),
  }));
};

export default async function sitemap(): Promise<SitemapEntry[]> {
  const staticEntries = getStaticPages();
  const inventoryEntries = await getInventoryEntries();

  return [...staticEntries, ...inventoryEntries];
}
