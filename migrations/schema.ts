import {
  pgTable,
  foreignKey,
  text,
  integer,
  unique,
  serial,
  bigint,
  doublePrecision,
  date,
  boolean,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const vehicles = pgTable("vehicles", {
  vin: text("vin").primaryKey().notNull(),
  image_urls: text("image_urls"),
  main_url: text("main_url"),
  body_id: integer("body_id").references(() => bodies.id),
  color_id: integer("color_id").references(() => colors.id),
  vehicle: text("vehicle"),
  stock_number: text("stock_number"),
  price: integer("price"),
  class_id: integer("class_id").references(() => classes.id),
  drivetrain_type_id: integer("drivetrain_type_id").references(
    () => drivetrain_types.id,
  ),
  engine: text("engine"),
  exterior_base_color_id: integer("exterior_base_color_id").references(
    () => exterior_base_colors.id,
  ),
  interior_id: integer("interior_id").references(() => interiors.id),
  interior_color: text("interior_color"),
  interior_material_id: integer("interior_material_id").references(
    () => interior_materials.id,
  ),
  make_id: integer("make_id").references(() => makes.id),
  model: text("model"),
  new_or_used: text("new_or_used"),
  odometer: text("odometer"),
  series: text("series"),
  series_detail: text("series_detail"),
  starred_equip: text("starred_equip"),
  transmission_id: integer("transmission_id").references(
    () => transmissions.id,
  ),
  year: integer("year"),
  auto_writer_description: text("auto_writer_description"),
  main_image: text("main_image"),
});

export const equipments = pgTable(
  "equipments",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
  },
  (table) => {
    return {
      equipments_name_unique: unique("equipments_name_unique").on(table.name),
    };
  },
);

export const bodies = pgTable(
  "bodies",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
  },
  (table) => {
    return {
      bodies_name_unique: unique("bodies_name_unique").on(table.name),
    };
  },
);

export const colors = pgTable(
  "colors",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
  },
  (table) => {
    return {
      colors_name_unique: unique("colors_name_unique").on(table.name),
    };
  },
);

export const classes = pgTable(
  "classes",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
  },
  (table) => {
    return {
      classes_name_unique: unique("classes_name_unique").on(table.name),
    };
  },
);

export const drivetrain_types = pgTable(
  "drivetrain_types",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
  },
  (table) => {
    return {
      drivetrain_types_name_unique: unique("drivetrain_types_name_unique").on(
        table.name,
      ),
    };
  },
);

export const exterior_base_colors = pgTable(
  "exterior_base_colors",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
  },
  (table) => {
    return {
      exterior_base_colors_name_unique: unique(
        "exterior_base_colors_name_unique",
      ).on(table.name),
    };
  },
);

export const interiors = pgTable(
  "interiors",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
  },
  (table) => {
    return {
      interiors_name_unique: unique("interiors_name_unique").on(table.name),
    };
  },
);

export const interior_materials = pgTable(
  "interior_materials",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
  },
  (table) => {
    return {
      interior_materials_name_unique: unique(
        "interior_materials_name_unique",
      ).on(table.name),
    };
  },
);

export const makes = pgTable(
  "makes",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
  },
  (table) => {
    return {
      makes_name_unique: unique("makes_name_unique").on(table.name),
    };
  },
);

export const transmissions = pgTable(
  "transmissions",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
  },
  (table) => {
    return {
      transmissions_name_unique: unique("transmissions_name_unique").on(
        table.name,
      ),
    };
  },
);

export const inventory = pgTable("inventory", {
  DealerId: text("DealerId"),
  DealerName: text("Dealer Name"),
  VIN: text("VIN"),
  Stock: text("Stock #"),
  NewUsed: text("New/Used"),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  Year: bigint("Year", { mode: "number" }),
  Make: text("Make"),
  Model: text("Model"),
  ModelNumber: text("Model Number"),
  Body: text("Body"),
  Transmission: text("Transmission"),
  Series: text("Series"),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  BodyDoorCt: bigint("Body Door Ct", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  Odometer: bigint("Odometer", { mode: "number" }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  EngineCylinderCt: bigint("Engine Cylinder Ct", { mode: "number" }),
  EngineDisplacement: doublePrecision("Engine Displacement"),
  DrivetrainDesc: text("Drivetrain Desc"),
  Colour: text("Colour"),
  InteriorColor: text("Interior Color"),
  MSRP: doublePrecision("MSRP"),
  Price: doublePrecision("Price"),
  InventoryDate: date("Inventory Date"),
  Certified: boolean("Certified"),
  Description: text("Description"),
  Features: text("Features"),
  PhotoUrlList: text("Photo Url List"),
  CityMPG: text("City MPG"),
  HighwayMPG: text("Highway MPG"),
  PhotosLastModifiedDate: timestamp("Photos Last Modified Date", {
    mode: "string",
  }),
  SeriesDetail: text("Series Detail"),
  Engine: text("Engine"),
  Fuel: text("Fuel"),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  Age: bigint("Age", { mode: "number" }),
  Disposition: text("Disposition"),
});

export const vehicle_equipments = pgTable(
  "vehicle_equipments",
  {
    vehicle_vin: text("vehicle_vin")
      .notNull()
      .references(() => vehicles.vin),
    equipment_id: integer("equipment_id")
      .notNull()
      .references(() => equipments.id),
  },
  (table) => {
    return {
      vehicle_equipments_vehicle_vin_equipment_id_pk: primaryKey({
        columns: [table.vehicle_vin, table.equipment_id],
        name: "vehicle_equipments_vehicle_vin_equipment_id_pk",
      }),
    };
  },
);

