import { db } from "../db";
import {
  vehicles,
  bodies,
  colors,
  classes,
  drivetrainTypes,
  exteriorBaseColors,
  interiors,
  interiorMaterials,
  makes,
  transmissions,
  equipments,
  vehicleEquipments,
} from "../db/schema";
import Papa from "papaparse";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sql } from "drizzle-orm";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvFilePath = path.join(__dirname, "../../united-custom.csv");

interface VehicleData {
  VIN: string;
  ImageURLs: string;
  MainUrl: string;
  MainImage: string;
  Body: string;
  Color: string;
  Vehicle: string;
  "Stock #": string;
  Price: string;
  Class: string;
  "Drivetrain\nType": string;
  Engine: string;
  "Exterior\nBase Color": string;
  Interior: string;
  "Interior\nColor": string;
  "Interior\nMaterial": string;
  Make: string;
  Model: string;
  "New/Used": string;
  Odometer: string;
  "Selected\nVehicle Equip": string;
  Series: string;
  "Series Detail": string;
  "Starred Equip": string;
  Transmission: string;
  Year: string;
  "Autowriter\nDescription": string;
}

const parseCSV = (csvFilePath: string): Promise<VehicleData[]> => {
  return new Promise((resolve, reject) => {
    const fileContent = fs.readFileSync(csvFilePath, "utf8");

    Papa.parse<VehicleData>(fileContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        if (results.errors.length) {
          console.error("Errors while parsing CSV:", results.errors);
          reject(results.errors);
        } else {
          resolve(results.data);
        }
      },
    });
  });
};

const insertData = async () => {
  try {
    const data = await parseCSV(csvFilePath);

    for (const row of data) {
      console.log("Parsed row:", row);

      const bodyInsertResult = row.Body
        ? await db
            .insert(bodies)
            .values({ name: row.Body })
            .onConflictDoUpdate({
              target: bodies.name,
              set: { name: sql`excluded.name` },
            })
            .returning()
            .execute()
        : [null];
      const colorInsertResult = row.Color
        ? await db
            .insert(colors)
            .values({ name: row.Color })
            .onConflictDoUpdate({
              target: colors.name,
              set: { name: sql`excluded.name` },
            })
            .returning()
            .execute()
        : [null];
      const vehicleClassInsertResult = row.Class
        ? await db
            .insert(classes)
            .values({ name: row.Class })
            .onConflictDoUpdate({
              target: classes.name,
              set: { name: sql`excluded.name` },
            })
            .returning()
            .execute()
        : [null];
      const drivetrainTypeInsertResult = row["Drivetrain\nType"]
        ? await db
            .insert(drivetrainTypes)
            .values({ name: row["Drivetrain\nType"] })
            .onConflictDoUpdate({
              target: drivetrainTypes.name,
              set: { name: sql`excluded.name` },
            })
            .returning()
            .execute()
        : [null];
      const exteriorBaseColorInsertResult = row["Exterior\nBase Color"]
        ? await db
            .insert(exteriorBaseColors)
            .values({ name: row["Exterior\nBase Color"] })
            .onConflictDoUpdate({
              target: exteriorBaseColors.name,
              set: { name: sql`excluded.name` },
            })
            .returning()
            .execute()
        : [null];
      const interiorInsertResult = row.Interior
        ? await db
            .insert(interiors)
            .values({ name: row.Interior })
            .onConflictDoUpdate({
              target: interiors.name,
              set: { name: sql`excluded.name` },
            })
            .returning()
            .execute()
        : [null];
      const interiorMaterialInsertResult = row["Interior\nMaterial"]
        ? await db
            .insert(interiorMaterials)
            .values({ name: row["Interior\nMaterial"] })
            .onConflictDoUpdate({
              target: interiorMaterials.name,
              set: { name: sql`excluded.name` },
            })
            .returning()
            .execute()
        : [null];
      const makeInsertResult = row.Make
        ? await db
            .insert(makes)
            .values({ name: row.Make })
            .onConflictDoUpdate({
              target: makes.name,
              set: { name: sql`excluded.name` },
            })
            .returning()
            .execute()
        : [null];
      const transmissionInsertResult = row.Transmission
        ? await db
            .insert(transmissions)
            .values({ name: row.Transmission })
            .onConflictDoUpdate({
              target: transmissions.name,
              set: { name: sql`excluded.name` },
            })
            .returning()
            .execute()
        : [null];

      const body = bodyInsertResult[0] ?? null;
      const color = colorInsertResult[0] ?? null;
      const vehicleClass = vehicleClassInsertResult[0] ?? null;
      const drivetrainType = drivetrainTypeInsertResult[0] ?? null;
      const exteriorBaseColor = exteriorBaseColorInsertResult[0] ?? null;
      const interior = interiorInsertResult[0] ?? null;
      const interiorMaterial = interiorMaterialInsertResult[0] ?? null;
      const make = makeInsertResult[0] ?? null;
      const transmission = transmissionInsertResult[0] ?? null;

      console.log({
        body,
        color,
        vehicleClass,
        drivetrainType,
        exteriorBaseColor,
        interior,
        interiorMaterial,
        make,
        transmission,
      });

      await db
        .insert(vehicles)
        .values({
          vin: row.VIN,
          imageUrls: row.ImageURLs,
          mainUrl: row.MainUrl,
          mainImage: row.MainImage,
          bodyId: body ? body.id : null,
          colorId: color ? color.id : null,
          vehicle: row.Vehicle,
          stockNumber: row["Stock #"],
          price: parseInt(row.Price, 10),
          classId: vehicleClass ? vehicleClass.id : null,
          drivetrainTypeId: drivetrainType ? drivetrainType.id : null,
          engine: row.Engine,
          exteriorBaseColorId: exteriorBaseColor ? exteriorBaseColor.id : null,
          interiorId: interior ? interior.id : null,
          interiorColor: row["Interior\nMaterial"],
          interiorMaterialId: interiorMaterial ? interiorMaterial.id : null,
          makeId: make ? make.id : null,
          model: row.Model,
          newOrUsed: row["New/Used"],
          odometer: row.Odometer,
          series: row.Series,
          seriesDetail: row["Series Detail"],
          starredEquip: row["Starred Equip"],
          transmissionId: transmission ? transmission.id : null,
          year: parseInt(row.Year, 10),
          autoWriterDescription: row["Autowriter\nDescription"],
        })
        .onConflictDoUpdate({
          target: vehicles.vin,
          set: {
            imageUrls: sql`excluded.image_urls`,
            mainUrl: sql`excluded.main_url`,
            mainImage: row.MainImage,
            bodyId: sql`excluded.body_id`,
            colorId: sql`excluded.color_id`,
            vehicle: sql`excluded.vehicle`,
            stockNumber: sql`excluded.stock_number`,
            price: sql`excluded.price`,
            classId: sql`excluded.class_id`,
            drivetrainTypeId: sql`excluded.drivetrain_type_id`,
            engine: sql`excluded.engine`,
            exteriorBaseColorId: sql`excluded.exterior_base_color_id`,
            interiorId: sql`excluded.interior_id`,
            interiorColor: sql`excluded.interior_color`,
            interiorMaterialId: sql`excluded.interior_material_id`,
            makeId: sql`excluded.make_id`,
            model: sql`excluded.model`,
            newOrUsed: sql`excluded.new_or_used`,
            odometer: sql`excluded.odometer`,
            series: sql`excluded.series`,
            seriesDetail: sql`excluded.series_detail`,
            starredEquip: sql`excluded.starred_equip`,
            transmissionId: sql`excluded.transmission_id`,
            year: sql`excluded.year`,
            autoWriterDescription: sql`excluded.auto_writer_description`,
          },
        })
        .execute();

      const equipmentTags = row["Selected\nVehicle Equip"]
        .split(",")
        .map((tag) => tag.trim());

      for (const tag of equipmentTags) {
        const equipmentInsertResult = await db
          .insert(equipments)
          .values({ name: tag })
          .onConflictDoUpdate({
            target: equipments.name,
            set: { name: sql`excluded.name` },
          })
          .returning()
          .execute();
        const equipment = equipmentInsertResult[0] ?? null;

        if (!equipment) {
          console.error("Error: Inserted equipment value is undefined", {
            tag,
          });
          continue;
        }

        await db
          .insert(vehicleEquipments)
          .values({
            vehicleVin: row.VIN,
            equipmentId: equipment.id,
          })
          .onConflictDoUpdate({
            target: [
              vehicleEquipments.vehicleVin,
              vehicleEquipments.equipmentId,
            ],
            set: {
              vehicleVin: sql`excluded.vehicle_vin`,
              equipmentId: sql`excluded.equipment_id`,
            },
          })
          .execute();
      }
    }

    console.log("Data successfully inserted into the database");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

insertData().catch((e) => {
  console.error("Unexpected error:", e);
  process.exit(1);
});
