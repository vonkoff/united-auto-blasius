import { relations } from "drizzle-orm/relations";
import { bodies, vehicles, colors, classes, drivetrain_types, exterior_base_colors, interiors, interior_materials, makes, transmissions, vehicle_equipments, equipments } from "./schema";

export const vehiclesRelations = relations(vehicles, ({one, many}) => ({
	body: one(bodies, {
		fields: [vehicles.body_id],
		references: [bodies.id]
	}),
	color: one(colors, {
		fields: [vehicles.color_id],
		references: [colors.id]
	}),
	class: one(classes, {
		fields: [vehicles.class_id],
		references: [classes.id]
	}),
	drivetrain_type: one(drivetrain_types, {
		fields: [vehicles.drivetrain_type_id],
		references: [drivetrain_types.id]
	}),
	exterior_base_color: one(exterior_base_colors, {
		fields: [vehicles.exterior_base_color_id],
		references: [exterior_base_colors.id]
	}),
	interior: one(interiors, {
		fields: [vehicles.interior_id],
		references: [interiors.id]
	}),
	interior_material: one(interior_materials, {
		fields: [vehicles.interior_material_id],
		references: [interior_materials.id]
	}),
	make: one(makes, {
		fields: [vehicles.make_id],
		references: [makes.id]
	}),
	transmission: one(transmissions, {
		fields: [vehicles.transmission_id],
		references: [transmissions.id]
	}),
	vehicle_equipments: many(vehicle_equipments),
}));

export const bodiesRelations = relations(bodies, ({many}) => ({
	vehicles: many(vehicles),
}));

export const colorsRelations = relations(colors, ({many}) => ({
	vehicles: many(vehicles),
}));

export const classesRelations = relations(classes, ({many}) => ({
	vehicles: many(vehicles),
}));

export const drivetrain_typesRelations = relations(drivetrain_types, ({many}) => ({
	vehicles: many(vehicles),
}));

export const exterior_base_colorsRelations = relations(exterior_base_colors, ({many}) => ({
	vehicles: many(vehicles),
}));

export const interiorsRelations = relations(interiors, ({many}) => ({
	vehicles: many(vehicles),
}));

export const interior_materialsRelations = relations(interior_materials, ({many}) => ({
	vehicles: many(vehicles),
}));

export const makesRelations = relations(makes, ({many}) => ({
	vehicles: many(vehicles),
}));

export const transmissionsRelations = relations(transmissions, ({many}) => ({
	vehicles: many(vehicles),
}));

export const vehicle_equipmentsRelations = relations(vehicle_equipments, ({one}) => ({
	vehicle: one(vehicles, {
		fields: [vehicle_equipments.vehicle_vin],
		references: [vehicles.vin]
	}),
	equipment: one(equipments, {
		fields: [vehicle_equipments.equipment_id],
		references: [equipments.id]
	}),
}));

export const equipmentsRelations = relations(equipments, ({many}) => ({
	vehicle_equipments: many(vehicle_equipments),
}));