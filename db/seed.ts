import {
	db,
	CarBrands,
	CarModels,
	CarGenerations,
	CarEngines,
	CarTransmissions,
	CarTrims,
	CarImages,
} from 'astro:db';
import {
  validateCarEngineInput,
  validateCarImageInput,
  validateCarTransmissionInput,
  validateCarTrimInput,
} from '@lib/car-validation';

// https://astro.build/db/seed
export default async function seed() {
	const brands = [
		{
			id: 1,
			slug: 'volkswagen',
			name: 'Volkswagen',
			country: 'DE',
			foundedDate: new Date('1937-05-28'),
			logoUrl: 'https://images.autodex.dev/brands/volkswagen/logo.svg',
			description: {
				tr: 'Volkswagen, kompakt sınıftan performans modellerine uzanan geniş ürün gamıyla öne çıkar.',
				en: 'Volkswagen is known for a broad lineup spanning compact daily drivers to performance models.',
			},
			accentColor: '#0a3b91',
		},
	];

	const models = [
		{
			id: 1,
			brandId: 1,
			slug: 'golf',
			name: 'Golf',
			startYear: 1974,
			description: {
				tr: 'Golf, modern hatchback sınıfının referans modellerinden biridir.',
				en: 'Golf remains one of the benchmark nameplates in the modern hatchback segment.',
			},
		},
	];

	const generations = [
		{
			id: 1,
			modelId: 1,
			slug: 'golf-mk7',
			name: 'Golf Mk7',
			generationCode: 'Typ 5G',
			startYear: 2012,
			endYear: 2020,
			description: {
				tr: 'MQB platformuna geçen yedinci nesil Golf, hafifleme ve dijital kokpit geçişiyle dikkat çekti.',
				en: 'The seventh-generation Golf moved to the MQB platform and introduced a lighter, more digital package.',
			},
		},
	];

	const engines = [
		validateCarEngineInput({
			id: 1,
			slug: 'ea211-1-5-tsi-evo',
			manufacturer: 'Volkswagen Group',
			name: '1.5 TSI EVO',
			startYear: 2016,
			endYear: 2020,
			engineCode: 'DADA',
			revision: 'EVO',
			configuration: 'inline_4',
			valvetrain: 'dohc',
			valvetrainDrive: 'belt',
			valvesPerCylinder: 4,
			displacement: 1498,
			cylinders: 4,
			pistonStroke: 85.9,
			cylinderBore: 74.5,
			compressionRatio: 10.5,
			peakHp: 150,
			peakTq: 250,
			peakHpRpm: 5000,
			peakTqRpm: 1500,
			redline: 6500,
			fuelType: 'gasoline',
			weight: 106,
			engineAspiration: 'turbocharged',
			isHybridEngine: false,
			isElectricEngine: false,
			otherDetails: {
				emissionsStandard: 'Euro 6',
				cylinderDeactivation: true,
			},
		}),
	];

	const transmissions = [
		validateCarTransmissionInput({
			id: 1,
			slug: 'dq200-7-dsg',
			manufacturer: 'Volkswagen Group',
			name: '7-Speed DSG',
			startYear: 2013,
			endYear: 2020,
			transmissionCode: 'DQ200',
			revision: 'Gen 2',
			type: 'dual_clutch',
			gears: 7,
			driveType: 'fwd',
			weight: 70,
			otherDetails: {
				clutchType: 'dry',
			},
		}),
	];

	const trims = [
		validateCarTrimInput({
			id: 1,
			generationId: 1,
			engineId: 1,
			transmissionId: 1,
			slug: 'golf-mk7-1-5-tsi-act-highline-dsg',
			name: '1.5 TSI ACT Highline DSG',
			trimCode: 'highline-dsg',
			startYear: 2017,
			endYear: 2020,
			bodyType: 'hatchback_5',
			class: 'c',
			layout: 'ff',
			doors: 5,
			seats: '5',
			fuelConsumption: {
				city: 6.1,
				highway: 4.4,
				combined: 5.1,
				unit: 'l_100km',
			},
			emissions: {
				co2: 116,
				standard: 'euro_6',
			},
			performance: {
				zeroToHundred: 8.3,
				topSpeed: 216,
			},
			wheelbase: 2637,
			length: 4258,
			width: 1799,
			height: 1492,
			curbWeight: 1285,
			description: {
				tr: 'Makyaj öncesi Golf Mk7 için dengeli konfor ve performans kombinasyonu sunan üst donanım paketi.',
				en: 'An upper trim package combining everyday comfort with a balanced performance setup for the pre-facelift Mk7.',
			},
		}),
	];

	const images = [
		validateCarImageInput({
			id: 1,
			generationId: 1,
			url: 'https://images.autodex.dev/cars/volkswagen/golf-mk7/front-three-quarter.jpg',
			storageKey: 'cars/volkswagen/golf-mk7/front-three-quarter.jpg',
			altText: {
				tr: 'Volkswagen Golf Mk7 önden üç çeyrek görünüm',
				en: 'Volkswagen Golf Mk7 front three-quarter view',
			},
			caption: {
				tr: 'Golf Mk7, MQB platformuyla daha rafine bir hatchback karakteri sundu.',
				en: 'The MQB-based Golf Mk7 delivered a more refined hatchback package.',
			},
			type: 'exterior',
			view: 'front_three_quarter',
			isPrimary: true,
			sortOrder: 0,
			width: 1600,
			height: 900,
			dominantColor: '#6d737a',
			sourceName: 'Volkswagen Press',
			sourceUrl: 'https://www.volkswagen-newsroom.com/',
			photographer: 'Volkswagen',
		}),
		validateCarImageInput({
			id: 2,
			trimId: 1,
			url: 'https://images.autodex.dev/cars/volkswagen/golf-mk7/highline-dashboard.jpg',
			storageKey: 'cars/volkswagen/golf-mk7/highline-dashboard.jpg',
			altText: {
				tr: 'Golf Mk7 Highline kokpit görünümü',
				en: 'Golf Mk7 Highline dashboard view',
			},
			caption: {
				tr: 'Highline donanımında dijitalleşme seviyesi ve ergonomi belirgin biçimde güçleniyor.',
				en: 'The Highline trim noticeably upgrades perceived ergonomics and digital equipment.',
			},
			type: 'interior',
			view: 'dashboard',
			isPrimary: false,
			sortOrder: 1,
			width: 1600,
			height: 900,
			dominantColor: '#2d2f33',
			sourceName: 'Volkswagen Press',
			sourceUrl: 'https://www.volkswagen-newsroom.com/',
			photographer: 'Volkswagen',
		}),
		validateCarImageInput({
			id: 3,
			trimId: 1,
			url: 'https://images.autodex.dev/cars/volkswagen/golf-mk7/ea211-engine-bay.jpg',
			storageKey: 'cars/volkswagen/golf-mk7/ea211-engine-bay.jpg',
			altText: {
				tr: '1.5 TSI EVO motor bölmesi',
				en: '1.5 TSI EVO engine bay',
			},
			caption: {
				tr: 'EA211 EVO, ACT silindir kapatma ve düşük tüketim dengesiyle öne çıkıyor.',
				en: 'The EA211 EVO stands out with ACT cylinder deactivation and efficient real-world consumption.',
			},
			type: 'engine',
			view: 'engine_bay',
			isPrimary: false,
			sortOrder: 2,
			width: 1600,
			height: 900,
			dominantColor: '#44484d',
			sourceName: 'Volkswagen Press',
			sourceUrl: 'https://www.volkswagen-newsroom.com/',
			photographer: 'Volkswagen',
		}),
	];

	await db.insert(CarBrands).values(brands);
	await db.insert(CarModels).values(models);
	await db.insert(CarGenerations).values(generations);
	await db.insert(CarEngines).values(engines);
	await db.insert(CarTransmissions).values(transmissions);
	await db.insert(CarTrims).values(trims);
	await db.insert(CarImages).values(images);
}
