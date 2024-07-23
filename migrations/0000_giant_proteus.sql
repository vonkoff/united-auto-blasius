CREATE TABLE IF NOT EXISTS "braking" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer,
	"front_brake_type" text NOT NULL,
	"rear_brake_type" text NOT NULL,
	"anti_brake_system" text NOT NULL,
	"abs_brakes" text NOT NULL,
	"electronic_brake_assistance" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comfort" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer,
	"air_conditioning" text NOT NULL,
	"individual_climate_controls" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dimensions" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer,
	"track_front" text,
	"width" text,
	"height_overall" text,
	"wheelbase" text,
	"length" text,
	"track_rear" text,
	"cargo_length" text,
	"depth" text,
	"width_at_wall" text,
	"width_at_wheelwell" text,
	"front_headroom" text,
	"rear_headroom" text,
	"front_legroom" text,
	"rear_legroom" text,
	"front_shoulder_room" text,
	"rear_shoulder_room" text,
	"front_hip_room" text,
	"rear_hip_room" text,
	"ground_clearance" text,
	"turning_diameter" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drivetrain" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer,
	"transmission" text,
	"driveline" text NOT NULL,
	"limited_slip_differential" boolean NOT NULL,
	"vehicle_stability_control_system" boolean,
	"traction_control" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "entertainment" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer,
	"subwoofer" text,
	"telematics_system" text NOT NULL,
	"navigation_aid" text,
	"voice_activated_telephone" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feature" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer,
	"adjustable_foot_pedals" text NOT NULL,
	"steering_wheel_mounted_controls" text NOT NULL,
	"leather_steering_wheel" text NOT NULL,
	"tilt_steering_column" text NOT NULL,
	"tilt_steering" text NOT NULL,
	"tachometer" text NOT NULL,
	"cruise_control" text NOT NULL,
	"cargo_area_cover" text,
	"cargo_area_tiedowns" text NOT NULL,
	"cargo_net" text,
	"load_bearing_exterior_rack" text,
	"pickup_truck_bed_liner" text,
	"power_sunroof" text,
	"manual_sunroof" text,
	"tow_hitch_receiver" text,
	"sliding_rear_pickup_truck_window" text,
	"power_windows" text NOT NULL,
	"power_adjustable_exterior_mirror" text NOT NULL,
	"running_boards" text,
	"front_air_dam" text NOT NULL,
	"splash_guards" text,
	"interval_wipers" text NOT NULL,
	"heated_steering_wheel" text,
	"genuine_wood_trim" text,
	"rain_sensing_wipers" text,
	"trip_computer" text NOT NULL,
	"electrochromic_exterior_rearview_mirror" text,
	"rear_spoiler" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fuel" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer,
	"fuel_tank" text NOT NULL,
	"mpg_city" text NOT NULL,
	"mpg_highway" text NOT NULL,
	"fuel_system" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lighting" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer,
	"automatic_headlights" text NOT NULL,
	"fog_lights" text NOT NULL,
	"pickup_truck_cargo_box_light" text NOT NULL,
	"daytime_running_lights" text NOT NULL,
	"high_intensity_discharge_headlights" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pricing" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer,
	"msrp" text NOT NULL,
	"dealer_invoice" text NOT NULL,
	"destination_charge" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "safety" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer,
	"driver_airbag" text NOT NULL,
	"vehicle_anti_theft" text NOT NULL,
	"keyless_entry" text NOT NULL,
	"remote_ignition" text,
	"power_door_locks" text NOT NULL,
	"passenger_airbag" text NOT NULL,
	"trunk_anti_trap_device" text,
	"child_safety_door_locks" text,
	"electronic_parking_aid" text,
	"side_head_curtain_airbag" text,
	"front_side_airbag" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "seating" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer,
	"front_split_bench_seat" text NOT NULL,
	"leather_seat" text NOT NULL,
	"second_row_folding_seat" text NOT NULL,
	"front_heated_seat" text,
	"driver_multi_adjustable_power_seat" text NOT NULL,
	"standard_seating" integer NOT NULL,
	"optional_seating" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "suspension" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer,
	"steering_type" text NOT NULL,
	"front_suspension" text NOT NULL,
	"rear_suspension" text NOT NULL,
	"front_spring_type" text NOT NULL,
	"rear_spring_type" text NOT NULL,
	"rack_and_pinon" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicles" (
	"id" serial PRIMARY KEY NOT NULL,
	"vin" text NOT NULL,
	"model_year" integer NOT NULL,
	"make" text NOT NULL,
	"series" text NOT NULL,
	"trim_level" text NOT NULL,
	"origin" text NOT NULL,
	"body_type" text NOT NULL,
	"engine_type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "warranty" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer,
	"basic_distance" text NOT NULL,
	"basic_duration" text NOT NULL,
	"powertrain_distance" text NOT NULL,
	"powertrain_duration" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "weight" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer,
	"curb_weight" integer NOT NULL,
	"standard_gvwr" integer NOT NULL,
	"maximum_payload" integer NOT NULL,
	"curb_weight_rear" integer,
	"curb_weight_front" integer,
	"standard_towing" integer NOT NULL,
	"gross_combined_wt_rating" integer,
	"maximum_gvwr" integer,
	"maximum_towing" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wheels_and_tires" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer,
	"tires" text NOT NULL,
	"tire_pressure_monitor" text NOT NULL,
	"alloy_wheels" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "braking" ADD CONSTRAINT "braking_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comfort" ADD CONSTRAINT "comfort_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dimensions" ADD CONSTRAINT "dimensions_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drivetrain" ADD CONSTRAINT "drivetrain_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "entertainment" ADD CONSTRAINT "entertainment_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feature" ADD CONSTRAINT "feature_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fuel" ADD CONSTRAINT "fuel_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lighting" ADD CONSTRAINT "lighting_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pricing" ADD CONSTRAINT "pricing_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "safety" ADD CONSTRAINT "safety_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "seating" ADD CONSTRAINT "seating_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "suspension" ADD CONSTRAINT "suspension_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "warranty" ADD CONSTRAINT "warranty_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weight" ADD CONSTRAINT "weight_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wheels_and_tires" ADD CONSTRAINT "wheels_and_tires_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
