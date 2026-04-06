import type {
  CarBodyType,
  CarClass,
  CarLayout,
  DriveType,
  EngineAspirationType,
  EngineFuelType,
  ImageType,
  ImageView,
  TransmissionType,
} from '../../db/enums';
import {
  CAR_BODY_TYPES,
  CAR_CLASSES,
  CAR_LAYOUTS,
  DRIVE_TYPES,
  ENGINE_ASPIRATION_TYPES,
  ENGINE_FUEL_TYPES,
  IMAGE_TYPES,
  IMAGE_VIEWS,
  TRANSMISSION_TYPES,
} from '../../db/enums';

type EnumValue<T extends readonly string[]> = T[number];

type CarImageRelationInput = {
  brandId?: number | null;
  modelId?: number | null;
  generationId?: number | null;
  trimId?: number | null;
};

const getAllowedEnumValues = (values: readonly string[]) => values.join(', ');

export const isEnumValue = <T extends readonly string[]>(
  value: string,
  values: T
): value is EnumValue<T> => values.includes(value as EnumValue<T>);

export const assertEnumValue = <T extends readonly string[]>(
  fieldName: string,
  value: string,
  values: T
): EnumValue<T> => {
  if (!isEnumValue(value, values)) {
    throw new Error(`${fieldName} must be one of: ${getAllowedEnumValues(values)}`);
  }

  return value;
};

export const assertOptionalEnumValue = <T extends readonly string[]>(
  fieldName: string,
  value: string | null | undefined,
  values: T
): EnumValue<T> | undefined => {
  if (value == null) {
    return undefined;
  }

  return assertEnumValue(fieldName, value, values);
};

export const assertImageOwnership = (input: CarImageRelationInput) => {
  const relationCount = [input.brandId, input.modelId, input.generationId, input.trimId].filter(
    (value) => typeof value === 'number'
  ).length;

  if (relationCount === 0) {
    throw new Error('Car image must reference at least one owner entity.');
  }
};

export const validateCarTrimInput = <
  T extends {
    bodyType: string;
    class: string;
    layout: string;
  },
>(
  input: T
): Omit<T, 'bodyType' | 'class' | 'layout'> & {
  bodyType: CarBodyType;
  class: CarClass;
  layout: CarLayout;
} => ({
  ...input,
  bodyType: assertEnumValue('bodyType', input.bodyType, CAR_BODY_TYPES),
  class: assertEnumValue('class', input.class, CAR_CLASSES),
  layout: assertEnumValue('layout', input.layout, CAR_LAYOUTS),
});

export const validateCarEngineInput = <
  T extends {
    fuelType: string;
    engineAspiration?: string | null;
  },
>(
  input: T
): Omit<T, 'fuelType' | 'engineAspiration'> & {
  fuelType: EngineFuelType;
  engineAspiration?: EngineAspirationType;
} => ({
  ...input,
  fuelType: assertEnumValue('fuelType', input.fuelType, ENGINE_FUEL_TYPES),
  engineAspiration: assertOptionalEnumValue(
    'engineAspiration',
    input.engineAspiration,
    ENGINE_ASPIRATION_TYPES
  ),
});

export const validateCarTransmissionInput = <
  T extends {
    type: string;
    driveType: string;
  },
>(
  input: T
): Omit<T, 'type' | 'driveType'> & {
  type: TransmissionType;
  driveType: DriveType;
} => ({
  ...input,
  type: assertEnumValue('type', input.type, TRANSMISSION_TYPES),
  driveType: assertEnumValue('driveType', input.driveType, DRIVE_TYPES),
});

export const validateCarImageInput = <
  T extends CarImageRelationInput & {
    type: string;
    view?: string | null;
  },
>(
  input: T
): Omit<T, 'type' | 'view'> & {
  type: ImageType;
  view?: ImageView;
} => {
  assertImageOwnership(input);

  return {
    ...input,
    type: assertEnumValue('type', input.type, IMAGE_TYPES),
    view: assertOptionalEnumValue('view', input.view, IMAGE_VIEWS),
  };
};