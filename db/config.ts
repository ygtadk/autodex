import { defineDb, defineTable, column, NOW } from 'astro:db';
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
} from './enums';

export const CarBrands = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    slug: column.text({ unique: true }),
    name: column.text(),
    country: column.text(),
    foundedDate: column.date(),
    logoUrl: column.text(),
    description: column.json({ optional: true}),
    accentColor: column.text({ optional: true, default: '#ffffff' }),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  },
});

export const CarModels = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    brandId: column.number({ references: () => CarBrands.columns.id }),
    slug: column.text({ unique: true }),
    name: column.text(),
    startYear: column.number(),
    endYear: column.number({ optional: true }),
    description: column.json({ optional: true }),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  },
});

export const CarGenerations = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    modelId: column.number({ references: () => CarModels.columns.id }),
    slug: column.text({ unique: true }),
    name: column.text(),
    generationCode: column.text({ optional: true }),
    startYear: column.number(),
    endYear: column.number({ optional: true }),
    description: column.json({ optional: true }),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  },
});

export const CarTrims = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    generationId: column.number({ references: () => CarGenerations.columns.id }),
    engineId: column.number({ references: () => CarEngines.columns.id }),
    transmissionId: column.number({ references: () => CarTransmissions.columns.id }),
    slug: column.text({ unique: true }),
    name: column.text(),
    trimCode: column.text({ optional: true }),
    startYear: column.number(),
    endYear: column.number({ optional: true }),
    bodyType: column.text({ enum: CAR_BODY_TYPES }),
    class: column.text({ enum: CAR_CLASSES }),
    layout: column.text({ enum: CAR_LAYOUTS }),
    doors: column.number(),
    seats: column.text(),
    fuelConsumption: column.json({ optional: true }),
    emissions: column.json({ optional: true }),
    performance: column.json({ optional: true }),
    wheelbase: column.number({ optional: true }),
    length: column.number({ optional: true }),
    width: column.number({ optional: true }),
    height: column.number({ optional: true }),
    curbWeight: column.number({ optional: true }),
    description: column.json({ optional: true }),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  },
});

export const CarEngines = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    slug: column.text({ unique: true }),
    manufacturer: column.text(),
    name: column.text(),
    startYear: column.number(),
    endYear: column.number({ optional: true }),
    engineCode: column.text({ optional: true }),
    revision: column.text({ optional: true }),
    configuration: column.text(),
    valvetrain: column.text(),
    valvetrainDrive: column.text(),
    valvesPerCylinder: column.number(),
    displacement: column.number({ optional: true }),
    cylinders: column.number({ optional: true }),
    pistonStroke: column.number({ optional: true }),
    cylinderBore: column.number({ optional: true }),
    compressionRatio: column.number({ optional: true }),
    peakHp: column.number({ optional: true }),
    peakTq: column.number({ optional: true }),
    peakHpRpm: column.number({ optional: true }),
    peakTqRpm: column.number({ optional: true }),
    redline: column.number({ optional: true }),
    fuelType: column.text({ enum: ENGINE_FUEL_TYPES }),
    weight: column.number({ optional: true }),
    engineAspiration: column.text({ optional: true, enum: ENGINE_ASPIRATION_TYPES }),
    isHybridEngine: column.boolean({ default: false }),
    isElectricEngine: column.boolean({ default: false }),
    otherDetails: column.json({ optional: true }),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  },
});

export const CarTransmissions = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    slug: column.text({ unique: true }),
    manufacturer: column.text(),
    name: column.text(),
    startYear: column.number(),
    endYear: column.number({ optional: true }),
    transmissionCode: column.text({ optional: true }),
    revision: column.text({ optional: true }),
    type: column.text({ enum: TRANSMISSION_TYPES }),
    gears: column.number({ optional: true }),
    driveType: column.text({ enum: DRIVE_TYPES }),
    weight: column.number({ optional: true }),
    otherDetails: column.json({ optional: true }),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  },
});

export const CarImages = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    brandId: column.number({ optional: true, references: () => CarBrands.columns.id }),
    modelId: column.number({ optional: true, references: () => CarModels.columns.id }),
    generationId: column.number({ optional: true, references: () => CarGenerations.columns.id }),
    trimId: column.number({ optional: true, references: () => CarTrims.columns.id }),
    url: column.text(),
    storageKey: column.text({ optional: true }),
    altText: column.json({ optional: true }),
    caption: column.json({ optional: true }),
    type: column.text({ default: 'exterior', enum: IMAGE_TYPES }),
    view: column.text({ optional: true, enum: IMAGE_VIEWS }),
    colorLabel: column.text({ optional: true }),
    isPrimary: column.boolean({ default: false }),
    sortOrder: column.number({ default: 0 }),
    width: column.number({ optional: true }),
    height: column.number({ optional: true }),
    dominantColor: column.text({ optional: true }),
    sourceName: column.text({ optional: true }),
    sourceUrl: column.text({ optional: true }),
    photographer: column.text({ optional: true }),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  },
});

export default defineDb({
  tables: { CarBrands, CarModels, CarGenerations, CarTrims, CarEngines, CarTransmissions, CarImages }
});
