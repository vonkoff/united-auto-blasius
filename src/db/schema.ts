import {
  pgTable,
  serial,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const vehicles = pgTable("vehicles", {
  vin: text("vin").primaryKey(),
  imageUrls: text("image_urls"),
  mainUrl: text("main_url"),
  mainImage: text("main_image"),
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

// Relations
export const vehiclesRelations = relations(vehicles, ({ one, many }) => ({
  body: one(bodies, { fields: [vehicles.bodyId], references: [bodies.id] }),
  color: one(colors, { fields: [vehicles.colorId], references: [colors.id] }),
  class: one(classes, { fields: [vehicles.classId], references: [classes.id] }),
  drivetrainType: one(drivetrainTypes, {
    fields: [vehicles.drivetrainTypeId],
    references: [drivetrainTypes.id],
  }),
  exteriorBaseColor: one(exteriorBaseColors, {
    fields: [vehicles.exteriorBaseColorId],
    references: [exteriorBaseColors.id],
  }),
  interior: one(interiors, {
    fields: [vehicles.interiorId],
    references: [interiors.id],
  }),
  interiorMaterial: one(interiorMaterials, {
    fields: [vehicles.interiorMaterialId],
    references: [interiorMaterials.id],
  }),
  make: one(makes, { fields: [vehicles.makeId], references: [makes.id] }),
  transmission: one(transmissions, {
    fields: [vehicles.transmissionId],
    references: [transmissions.id],
  }),
  vehicleEquipments: many(vehicleEquipments),
}));

export const bodiesRelations = relations(bodies, ({ many }) => ({
  vehicles: many(vehicles),
}));

export const colorsRelations = relations(colors, ({ many }) => ({
  vehicles: many(vehicles),
}));

export const classesRelations = relations(classes, ({ many }) => ({
  vehicles: many(vehicles),
}));

export const drivetrainTypesRelations = relations(
  drivetrainTypes,
  ({ many }) => ({
    vehicles: many(vehicles),
  }),
);

export const exteriorBaseColorsRelations = relations(
  exteriorBaseColors,
  ({ many }) => ({
    vehicles: many(vehicles),
  }),
);

export const interiorsRelations = relations(interiors, ({ many }) => ({
  vehicles: many(vehicles),
}));

export const interiorMaterialsRelations = relations(
  interiorMaterials,
  ({ many }) => ({
    vehicles: many(vehicles),
  }),
);

export const makesRelations = relations(makes, ({ many }) => ({
  vehicles: many(vehicles),
}));

export const transmissionsRelations = relations(transmissions, ({ many }) => ({
  vehicles: many(vehicles),
}));

export const equipmentsRelations = relations(equipments, ({ many }) => ({
  vehicleEquipments: many(vehicleEquipments),
}));

export const vehicleEquipmentsRelations = relations(
  vehicleEquipments,
  ({ one }) => ({
    vehicle: one(vehicles, {
      fields: [vehicleEquipments.vehicleVin],
      references: [vehicles.vin],
    }),
    equipment: one(equipments, {
      fields: [vehicleEquipments.equipmentId],
      references: [equipments.id],
    }),
  }),
);
