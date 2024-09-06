import { db } from "~/db";
import { vehicles } from "~/db/schema";

const BASE_URL = process.env.BASE_URL;

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
  ];
};

const getInventoryEntries = async (): Promise<SitemapEntry[]> => {
  const vehicleData = await db
    .select({
      vehicle: vehicles.vehicle,
      stockNumber: vehicles.stockNumber,
    })
    .from(vehicles);

  return vehicleData.map((item) => ({
    url: `${BASE_URL}/inventory/${encodeURIComponent(item.vehicle)}-${item.stockNumber}`,
    lastModified: new Date().toISOString(), // Update this if you have a lastModified field in your schema
  }));
};

export default async function sitemap(): Promise<SitemapEntry[]> {
  const staticEntries = getStaticPages();
  const inventoryEntries = await getInventoryEntries();

  return [...staticEntries, ...inventoryEntries];
}
