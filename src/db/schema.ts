import {
  pgTable,
  serial,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

export const vehicles = pgTable("vehicles", {
  vin: text("vin").primaryKey(),
  imageUrls: text("image_urls"),
  mainUrl: text("main_url"),
  bodyId: integer("body_id").references(() => bodies.id),
  colorId: integer("color_id").references(() => colors.id),
  vehicle: text("vehicle"),
  stockNumber: text("stock_number"),
  price: integer("price"),
  classId: integer("class_id").references(() => classes.id),
  drivetrainTypeId: integer("drivetrain_type_id").references(
    () => drivetrainTypes.id,
  ),
  engine: text("engine"),
  exteriorBaseColorId: integer("exterior_base_color_id").references(
    () => exteriorBaseColors.id,
  ),
  interiorId: integer("interior_id").references(() => interiors.id),
  interiorColor: text("interior_color"),
  interiorMaterialId: integer("interior_material_id").references(
    () => interiorMaterials.id,
  ),
  makeId: integer("make_id").references(() => makes.id),
  model: text("model"),
  newOrUsed: text("new_or_used"),
  odometer: text("odometer"),
  series: text("series"),
  seriesDetail: text("series_detail"),
  starredEquip: text("starred_equip"),
  transmissionId: integer("transmission_id").references(() => transmissions.id),
  year: integer("year"),
  autoWriterDescription: text("auto_writer_description"),
});

export const bodies = pgTable("bodies", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const colors = pgTable("colors", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const drivetrainTypes = pgTable("drivetrain_types", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const exteriorBaseColors = pgTable("exterior_base_colors", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const interiors = pgTable("interiors", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const interiorMaterials = pgTable("interior_materials", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const makes = pgTable("makes", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const transmissions = pgTable("transmissions", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const equipments = pgTable("equipments", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const vehicleEquipments = pgTable(
  "vehicle_equipments",
  {
    vehicleVin: text("vehicle_vin").references(() => vehicles.vin),
    equipmentId: integer("equipment_id").references(() => equipments.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.vehicleVin, table.equipmentId] }),
    };
  },
);
