const defineEnum = <T extends string>(...values: [T, ...T[]]) => values;

export const CAR_BODY_TYPES = defineEnum(
  'hatchback_3',
  'hatchback_5',
  'sedan',
  'wagon',
  'coupe',
  'convertible',
  'liftback',
  'fastback',
  'shooting_brake',
  'targa',
  'microcar',
  'keicar',
  'limousine',
  'suv',
  'crossover',
  'pickup',
  'van',
  'minivan',
  'roadster'
);

export const CAR_CLASSES = defineEnum('a', 'b', 'c', 'd', 'e', 'f', 's', 'm', 'j');

export const CAR_LAYOUTS = defineEnum('ff', 'fr', 'mr', 'rr', 'rf', 'f4', 'm4', 'r4');

export const ENGINE_FUEL_TYPES = defineEnum(
  'gasoline',
  'diesel',
  'lpg',
  'cng',
  'ethanol',
  'flex_fuel',
  'hybrid',
  'plug_in_hybrid',
  'electric',
  'hydrogen',
  'other'
);

export const ENGINE_ASPIRATION_TYPES = defineEnum(
  'naturally_aspirated',
  'turbocharged',
  'twin_turbocharged',
  'supercharged',
  'twincharged',
  'electric_drive',
  'other'
);

export const TRANSMISSION_TYPES = defineEnum(
  'manual',
  'automated_manual',
  'automatic',
  'dual_clutch',
  'cvt',
  'single_speed',
  'semi_automatic',
  'other'
);

export const DRIVE_TYPES = defineEnum('fwd', 'rwd', 'awd', '4wd', 'other');

export const IMAGE_TYPES = defineEnum(
  'exterior',
  'interior',
  'engine',
  'detail',
  'color',
  'brochure',
  'press',
  'review',
  'other'
);

export const IMAGE_VIEWS = defineEnum(
  'front',
  'front_three_quarter',
  'side_profile',
  'rear',
  'rear_three_quarter',
  'dashboard',
  'cabin',
  'seats',
  'cargo',
  'engine_bay',
  'wheel',
  'infotainment',
  'detail_macro',
  'other'
);

export type CarBodyType = (typeof CAR_BODY_TYPES)[number];
export type CarClass = (typeof CAR_CLASSES)[number];
export type CarLayout = (typeof CAR_LAYOUTS)[number];
export type EngineFuelType = (typeof ENGINE_FUEL_TYPES)[number];
export type EngineAspirationType = (typeof ENGINE_ASPIRATION_TYPES)[number];
export type TransmissionType = (typeof TRANSMISSION_TYPES)[number];
export type DriveType = (typeof DRIVE_TYPES)[number];
export type ImageType = (typeof IMAGE_TYPES)[number];
export type ImageView = (typeof IMAGE_VIEWS)[number];