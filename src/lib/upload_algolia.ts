import algoliasearch from "algoliasearch";
import dotenv from "dotenv";
import { db } from "../db";
import {
  vehicles,
  colors,
  interiors,
  equipments,
  vehicleEquipments,
} from "../db/schema";
import { sql } from "drizzle-orm";

dotenv.config();

const algoliaDB = process.env.NEXT_PUBLIC_ALGOLIA_DB as string;
const algoliaID = process.env.NEXT_PUBLIC_ALGOLIA_ID as string;
const algoliaAPI = process.env.ALGOLIA_API as string;

const algoClient = algoliasearch(algoliaID, algoliaAPI);
const index = algoClient.initIndex(algoliaDB);

type Vehicle = typeof vehicles.$inferSelect;
type Color = typeof colors.$inferSelect;
type Interior = typeof interiors.$inferSelect;
type Equipment = typeof equipments.$inferSelect;

async function fetchVehicles() {
  return await db.select().from(vehicles).execute();
}

async function fetchColorById(id: number): Promise<Color | null> {
  const result = await db
    .select()
    .from(colors)
    .where(sql`${colors.id} = ${id}`)
    .execute();
  return result[0] ?? null;
}

async function fetchInteriorById(id: number): Promise<Interior | null> {
  const result = await db
    .select()
    .from(interiors)
    .where(sql`${interiors.id} = ${id}`)
    .execute();
  return result[0] ?? null;
}

async function fetchEquipmentsByVehicleVin(vin: string): Promise<string[]> {
  const result = await db
    .select({
      equipmentName: equipments.name,
    })
    .from(vehicleEquipments)
    .innerJoin(
      equipments,
      sql`${vehicleEquipments.equipmentId} = ${equipments.id}`,
    )
    .where(sql`${vehicleEquipments.vehicleVin} = ${vin}`)
    .execute();
  return result.map((row) => row.equipmentName);
}

const uploadToAlgolia = async () => {
  try {
    const vehicleData: Vehicle[] = await fetchVehicles();

    for (const vehicle of vehicleData) {
      console.log(`Uploading to Algolia: ${vehicle.vin} - ${vehicle.vehicle}`);

      const exteriorColor = vehicle.colorId
        ? await fetchColorById(vehicle.colorId)
        : null;
      const equipmentTags = await fetchEquipmentsByVehicleVin(vehicle.vin);

      // TODO: fix this
      console.log(vehicle.interiorColor);
      const json: Readonly<Record<string, unknown>> = {
        objectID: vehicle.vin,
        "Used or New": vehicle.newOrUsed,
        Vehicle: vehicle.vehicle,
        "Stock #": vehicle.stockNumber,
        VIN: vehicle.vin,
        Price: vehicle.price,
        MainUrl: vehicle.mainUrl,
        "AutoWrite Description": vehicle.autoWriterDescription,
        Mileage: vehicle.odometer,
        "Exterior Color": exteriorColor ? exteriorColor.name : null,
        "Interior Color": vehicle.interiorColor ? vehicle.interiorColor : null,
        "Selected Vehicle Equip": equipmentTags,
      };

      await index.saveObject(json);
    }

    console.log("Data successfully uploaded to Algolia");
  } catch (error) {
    console.error("Error uploading data to Algolia:", error);
  }
};

uploadToAlgolia().catch((e) => {
  console.error("Unexpected error:", e);
  process.exit(1);
});
