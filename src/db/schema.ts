import { pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core";

export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  vin: text("vin").notNull(),
  modelYear: integer("model_year").notNull(),
  make: text("make").notNull(),
  series: text("series").notNull(),
  trimLevel: text("trim_level").notNull(),
  origin: text("origin").notNull(),
  bodyType: text("body_type").notNull(),
  engineType: text("engine_type").notNull(),
});

export const dimensions = pgTable("dimensions", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  trackFront: text("track_front"),
  width: text("width"),
  heightOverall: text("height_overall"),
  wheelbase: text("wheelbase"),
  length: text("length"),
  trackRear: text("track_rear"),
  cargoLength: text("cargo_length"),
  depth: text("depth"),
  widthAtWall: text("width_at_wall"),
  widthAtWheelwell: text("width_at_wheelwell"),
  frontHeadroom: text("front_headroom"),
  rearHeadroom: text("rear_headroom"),
  frontLegroom: text("front_legroom"),
  rearLegroom: text("rear_legroom"),
  frontShoulderRoom: text("front_shoulder_room"),
  rearShoulderRoom: text("rear_shoulder_room"),
  frontHipRoom: text("front_hip_room"),
  rearHipRoom: text("rear_hip_room"),
  groundClearance: text("ground_clearance"),
  turningDiameter: text("turning_diameter"),
});

export const drivetrain = pgTable("drivetrain", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  transmission: text("transmission"),
  driveline: text("driveline").notNull(),
  limitedSlipDifferential: boolean("limited_slip_differential").notNull(),
  vehicleStabilityControlSystem: boolean("vehicle_stability_control_system"),
  tractionControl: boolean("traction_control"),
});

export const braking = pgTable("braking", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  frontBrakeType: text("front_brake_type").notNull(),
  rearBrakeType: text("rear_brake_type").notNull(),
  antiBrakeSystem: text("anti_brake_system").notNull(),
  absBrakes: text("abs_brakes").notNull(),
  electronicBrakeAssistance: text("electronic_brake_assistance"),
});

export const suspension = pgTable("suspension", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  steeringType: text("steering_type").notNull(),
  frontSuspension: text("front_suspension").notNull(),
  rearSuspension: text("rear_suspension").notNull(),
  frontSpringType: text("front_spring_type").notNull(),
  rearSpringType: text("rear_spring_type").notNull(),
  rackAndPinion: boolean("rack_and_pinon"),
});

export const seating = pgTable("seating", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  frontSplitBenchSeat: text("front_split_bench_seat").notNull(),
  leatherSeat: text("leather_seat").notNull(),
  secondRowFoldingSeat: text("second_row_folding_seat").notNull(),
  frontHeatedSeat: text("front_heated_seat"),
  driverMultiAdjustablePowerSeat: text(
    "driver_multi_adjustable_power_seat",
  ).notNull(),
  standardSeating: integer("standard_seating").notNull(),
  optionalSeating: integer("optional_seating"),
});

export const weight = pgTable("weight", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  curbWeight: integer("curb_weight").notNull(),
  standardGvwr: integer("standard_gvwr").notNull(),
  maximumPayload: integer("maximum_payload").notNull(),
  curbWeightRear: integer("curb_weight_rear"),
  curbWeightFront: integer("curb_weight_front"),
  standardTowing: integer("standard_towing").notNull(),
  grossCombinedWtRating: integer("gross_combined_wt_rating"),
  maximumGvwr: integer("maximum_gvwr"),
  maximumTowing: integer("maximum_towing"),
});

export const safety = pgTable("safety", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  driverAirbag: text("driver_airbag").notNull(),
  vehicleAntiTheft: text("vehicle_anti_theft").notNull(),
  keylessEntry: text("keyless_entry").notNull(),
  remoteIgnition: text("remote_ignition"),
  powerDoorLocks: text("power_door_locks").notNull(),
  passengerAirbag: text("passenger_airbag").notNull(),
  trunkAntiTrapDevice: text("trunk_anti_trap_device"),
  childSafetyDoorLocks: text("child_safety_door_locks"),
  electronicParkingAid: text("electronic_parking_aid"),
  sideHeadCurtainAirbag: text("side_head_curtain_airbag"),
  frontSideAirbag: text("front_side_airbag"),
});

export const warranty = pgTable("warranty", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  basicDistance: text("basic_distance").notNull(),
  basicDuration: text("basic_duration").notNull(),
  powertrainDistance: text("powertrain_distance").notNull(),
  powertrainDuration: text("powertrain_duration").notNull(),
});

export const feature = pgTable("feature", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  adjustableFootPedals: text("adjustable_foot_pedals").notNull(),
  steeringWheelMountedControls: text(
    "steering_wheel_mounted_controls",
  ).notNull(),
  leatherSteeringWheel: text("leather_steering_wheel").notNull(),
  tiltSteeringColumn: text("tilt_steering_column").notNull(),
  tiltSteering: text("tilt_steering").notNull(),
  tachometer: text("tachometer").notNull(),
  cruiseControl: text("cruise_control").notNull(),
  cargoAreaCover: text("cargo_area_cover"),
  cargoAreaTiedowns: text("cargo_area_tiedowns").notNull(),
  cargoNet: text("cargo_net"),
  loadBearingExteriorRack: text("load_bearing_exterior_rack"),
  pickupTruckBedLiner: text("pickup_truck_bed_liner"),
  powerSunroof: text("power_sunroof"),
  manualSunroof: text("manual_sunroof"),
  towHitchReceiver: text("tow_hitch_receiver"),
  slidingRearPickupTruckWindow: text("sliding_rear_pickup_truck_window"),
  powerWindows: text("power_windows").notNull(),
  powerAdjustableExteriorMirror: text(
    "power_adjustable_exterior_mirror",
  ).notNull(),
  runningBoards: text("running_boards"),
  frontAirDam: text("front_air_dam").notNull(),
  splashGuards: text("splash_guards"),
  intervalWipers: text("interval_wipers").notNull(),
  heatedSteeringWheel: text("heated_steering_wheel"),
  genuineWoodTrim: text("genuine_wood_trim"),
  rainSensingWipers: text("rain_sensing_wipers"),
  tripComputer: text("trip_computer").notNull(),
  electrochromicExteriorRearviewMirror: text(
    "electrochromic_exterior_rearview_mirror",
  ),
  rearSpoiler: text("rear_spoiler"),
});

export const comfort = pgTable("comfort", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  airConditioning: text("air_conditioning").notNull(),
  individualClimateControls: text("individual_climate_controls"),
});

export const entertainment = pgTable("entertainment", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  subwoofer: text("subwoofer"),
  telematicsSystem: text("telematics_system").notNull(),
  navigationAid: text("navigation_aid"),
  voiceActivatedTelephone: text("voice_activated_telephone").notNull(),
});

export const wheelsAndTires = pgTable("wheels_and_tires", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  tires: text("tires").notNull(),
  tirePressureMonitor: text("tire_pressure_monitor").notNull(),
  alloyWheels: text("alloy_wheels").notNull(),
});

export const pricing = pgTable("pricing", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  msrp: text("msrp").notNull(),
  dealerInvoice: text("dealer_invoice").notNull(),
  destinationCharge: text("destination_charge"),
});

export const fuel = pgTable("fuel", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  fuelTank: text("fuel_tank").notNull(),
  mpgCity: text("mpg_city").notNull(),
  mpgHighway: text("mpg_highway").notNull(),
  fuelSystem: text("fuel_system"),
});

export const lighting = pgTable("lighting", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  automaticHeadlights: text("automatic_headlights").notNull(),
  fogLights: text("fog_lights").notNull(),
  pickupTruckCargoBoxLight: text("pickup_truck_cargo_box_light").notNull(),
  daytimeRunningLights: text("daytime_running_lights").notNull(),
  highIntensityDischargeHeadlights: text("high_intensity_discharge_headlights"),
});
