# AutoDex — Kapsamlı Proje Kılavuzu

> Otomobiller hakkında kolayca bilgi edinebileceğin, karşılaştırma yapabileceğin ve keşfedebileceğin kapsamlı bir veritabanı web sitesi.

---

## Mimari Felsefe

AutoDex, kullanılan framework/teknoloji sayısını minimumda tutarak her birinin tüm özelliklerini verimli şekilde kullanmaya odaklanır. Proje boyunca temel ilkeler:

- **Astro-native**: React, Vue, Svelte vb. UI framework'ler kullanılmaz. Tüm etkileşim Astro bileşenleri, vanilla JS, Web Components ve `<script>` etiketleri ile sağlanır.
- **Astro DB**: Veritabanı olarak Astro DB (libSQL tabanlı) kullanılır. Harici ORM yoktur; Astro DB'nin `db` modülü ve Drizzle-benzeri sorgu API'si doğrudan kullanılır.
- **Minimum bağımlılık**: Stil için Tailwind CSS, geri kalan her şey Astro ekosistemi ve native web standartları ile çözülür.
- **Maksimum performans**: Varsayılan sıfır JS, Islands Architecture yerine tamamen sunucu tarafında render, View Transitions API ile akıcı sayfa geçişleri.

---

## 1. İçerik & Yaratıcı Özellikler

### Temel İçerik (Zorunlu)

- Marka / Model / Jenerasyon / Yıl kataloğu (teknik veriler, donanım seviyeleri)
- Yüksek çözünürlüklü galeri (iç / dış / motor / detay)
- Trim seviyesi karşılaştırma tabloları
- Editöryal incelemeler (uzun format, fotoğraflı)
- Kullanıcı yorumları ve puanlama sistemi

### Yaratıcı Özellikler

| Özellik                                       | Açıklama                                                                                                                                                                                                     |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Jenerasyon Zaman Çizelgesi**                | Efsanevi modellerin (VW Golf Mk1→Mk8, Porsche 911 serisi) yıllar içindeki tasarım evrimini gösteren görsel ve etkileşimli timeline. CSS animasyonları ve `scroll-driven animations` ile sıfır JS'te çalışır. |
| **Karşılaştırma Motoru (Diff Modu)**          | 2–4 aracı yan yana tablo halinde karşılaştır. Farklı değerler renkle vurgulanır, aynı değerler grileşir. "Performans Kazananı", "Yakıt Kazananı" gibi kategorilerde otomatik üstünlük rozeti.                |
| **0–100 Yarıştırma Simülatörü**               | Hızlanma verisini CSS animasyonlarıyla görselleştir. İki aracı aynı anda sanal bir düzlükte yarıştır — saf CSS/JS ile animasyonlu simülasyon.                                                                |
| **Gerçek Sahip Maliyeti Hesaplayıcı**         | Yakıt, sigorta tahmini, yıllık vergi, bakım masrafı ve değer kaybını hesaba katan kapsamlı maliyet projeksiyonu.                                                                                             |
| **EV Menzil Simülatörü**                      | Elektrikli araçlar için sıcaklık, hız ve klima etkisini hesaba katarak gerçekçi menzil tahmini sunan hesaplayıcı.                                                                                            |
| **Güvenilirlik Isı Haritası**                 | Yıla ve modele göre arıza istatistikleri — motor, şanzıman, elektrik, süspansiyon bazlı zayıf noktaları renk kodlu bir ısı haritasıyla görselleştir.                                                         |
| **Kronik Sorunlar & Geri Çağırma Veritabanı** | Modellerin bilinen kronik sorunları ve üretici geri çağırma bültenlerini listele. İkinci el araç alıcıları için kritik bir kaynak.                                                                           |
| **Tarihsel Fiyat Takibi**                     | İkinci el piyasa verisiyle modelin değer kaybını yıllara göre grafik olarak göster. CSS/SVG bazlı minimalist grafikler.                                                                                      |
| **"Benim İçin Hangisi?" Sihirbazı**           | 5–7 soruluk (bütçe, kullanım senaryosu, öncelikler) akıllı eşleştirme anketi → en uygun modelleri listele. Tamamen sunucu tarafında çalışır, Astro form action'ları ile.                                     |
| **Renk & Trim Gezgini**                       | Aracın mevcut renklerini küçük daire butonlarla sun. Tıklandığında fotoğraf seti değişir — CSS transition ile.                                                                                               |
| **Spec DNA Radar Grafiği**                    | Güç, tork, ağırlık, yakıt tüketimi gibi değerleri SVG tabanlı radar/spider chart ile görselleştir. Karşılaştırma modunda iki araç aynı grafikte iki renkle çakışır.                                          |
| **Ses Veritabanı**                            | Motor/egzoz sesi kayıtları (farklı RPM'lerde). Native `<audio>` elementi ile tarayıcıda dinlenebilir.                                                                                                        |
| **VIN Okuyucu**                               | VIN numarasını yapıştır, aracın donanım ve üretim detaylarını sunucu tarafında çöz.                                                                                                                          |
| **OBD-II Arıza Kodu Sözlüğü**                 | Hata kodları veritabanı. Araç modeline göre filtrelenebilir, sorun açıklaması ve çözüm önerileri ile.                                                                                                        |
| **Sahip Anketleri**                           | "1 yıl sonra ne düşünüyorsunuz?" şeklinde yapılandırılmış geri bildirimler. Uzun vadeli kullanıcı deneyimlerini topla.                                                                                       |
| **Emisyon & Eko Skoru**                       | CO₂ emisyonu, Euro norm sınıfı, şehir/otoban tüketimi farkı — görsel skorlama kartı.                                                                                                                         |
| **Bakım Takvim Aracı**                        | Model bazlı önerilen bakım aralıkları (yağ, fren, kayış vb.) HTML tablosu ve indirilebilir takvim dosyası.                                                                                                   |
| **Kullanıcı Garajı**                          | Kullanıcıların kendi araçlarını kaydettiği, bakım notları tuttuğu ve toplulukla paylaştığı kişisel profil alanı.                                                                                             |
| **Okunabilir Kılavuzlar**                     | Üretici PDF kılavuzlarındaki sık aranan bilgileri (sigorta kutusu şeması, lastik basınç tablosu vb.) HTML formatında hızlı okunabilir sayfalar haline getir.                                                 |

### Gelecek Aşama Özellikleri

- **3D / 360° Görüntüleyici**: `<model-viewer>` web component'i ile (Google'ın açık kaynak web component'i — React gerektirmez).
- **Yakın Servis Noktası Bulucu**: Konum tabanlı yetkili servis/yedek parça arama.

---

## 2. Teknoloji Yığını

### Temel Yığın

```
Astro 6            → Framework (SSG + SSR hibrit, sıfır JS varsayılan)
Astro DB           → Veritabanı (libSQL tabanlı, herhangi libSQL bulut sağlayıcıya deploy)
Tailwind CSS 4     → Stil (utility-first, tema sistemi, dark mode)
Astro Sitemap      → SEO (otomatik sitemap üretimi)
Vanilla JS         → Etkileşim (Web Components, <script> etiketleri)
```

### Mimari Karar: Hibrit Astro

```
Kullanıcı → CDN (Cloudflare / Vercel Edge) → Astro Hibrit Mod
                                                  ↓
                                      Statik sayfalar (araç detayları, marka sayfaları)
                                      SSR sayfalar (arama, karşılaştırma, kullanıcı garajı)
                                      API Routes (yorum, oy, quiz)
                                                  ↓
                                      Astro DB (libSQL — Turso / başka libSQL sağlayıcı)
                                      Cloudflare R2 / S3 (medya depolama)
```

### Neden Bu Seçimler?

**Astro 6**

- Varsayılan sıfır JS gönderir — performans kralı
- View Transitions API ile sayfa geçişleri SPA gibi akıcı, MPA kalır
- Server Islands ile dinamik bölümleri izole et (yorumlar, kullanıcı durumu)
- Content Collections ile tip-güvenli statik içerik
- Yerleşik `i18n` yönlendirme
- Yerleşik `<Image />` komponenti (otomatik WebP, lazy load, boyut optimizasyonu)
- Yerleşik `Fonts` API (otomatik font optimizasyonu, fallback, preload)

**Astro DB**

- libSQL (SQLite fork) tabanlı — inanılmaz hızlı okuma performansı
- Astro ile sıfır konfigürasyon entegrasyonu
- Drizzle-benzeri tip-güvenli sorgu API'si (ayrı ORM gerektirmez)
- Geliştirmede yerel SQLite, üretimde herhangi libSQL destekleyen bulut sağlayıcı (Turso, Fly.io vb.)
- Schema tanımı TypeScript'te, migration'lar otomatik

**Tailwind CSS 4**

- Utility-first: hızlı prototipleme, tutarlı tasarım sistemi
- CSS Variables ile tema — dark/light mode ve dinamik marka renkleri zahmetsiz
- Küçük bundle: sadece kullanılan sınıflar gönderilir
- `@theme` direktifi ile özel tasarım tokenları

**React Yok — Neden?**

- Astro bileşenleri sunucuda render edilir → sıfır JS hydration maliyeti
- Etkileşim gereken yerlerde vanilla JS `<script>` etiketleri kullanılır
- Karmaşık etkileşimler için Web Components (framework-agnostic, native browser API)
- Toplam sayfa boyutu dramatik şekilde küçülür, TTI (Time to Interactive) neredeyse sıfır

### Arama Çözümü

Veritabanı büyüdükçe gelişmiş arama için iki aşamalı strateji:

**Aşama 1 — Astro DB Full-Text Search:**
libSQL'in yerleşik FTS5 desteğini kullan. İlk 500–1.000 araca kadar yeterli performans.

**Aşama 2 — Meilisearch (opsiyonel, ölçek büyüdüğünde):**

- Typo-tolerant (yazım hatası affeder: "folksvagen" → Volkswagen)
- Faceted search (filtre paneli), Türkçe dahil 50+ dil
- ~10ms yanıt süresi, self-host ücretsiz
- Astro DB'den webhook/cron ile senkronizasyon

### State Yönetimi

Framework bağımsız, hafif çözüm:

- **Nano Stores**: Astro'nun resmi olarak önerdiği, framework-agnostic, ~1KB durum yönetimi. Birim tercihi, tema, filtre durumu gibi site geneli state'ler için.
- **localStorage**: Kalıcı kullanıcı tercihleri (birim sistemi, dil, tema).
- **URL Search Params**: Arama filtreleri ve karşılaştırma durumu (paylaşılabilir URL'ler).

### Altyapı

```
Hosting:         Cloudflare Pages veya Vercel (Astro SSR adapter ile)
Veritabanı:      Turso veya herhangi libSQL sağlayıcı (üretim)
                 Yerel SQLite (geliştirme — Astro DB otomatik)
Medya:           Cloudflare R2 (çıkış ücreti yok) + Astro <Image /> optimizasyonu
CI/CD:           GitHub Actions → Hosting provider
Arama (ileri):   Meilisearch Cloud veya self-host (gerektiğinde)
```

---

## 3. Proje Yapısı

```
autodex/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── db/
│   ├── config.ts              # Astro DB tablo tanımları (schema)
│   └── seed.ts                # Geliştirme seed verileri
├── public/
│   ├── robots.txt
│   ├── audio/                 # Motor sesleri (mp3/ogg)
│   └── og/                    # Dinamik Open Graph görselleri
├── src/
│   ├── pages/
│   │   ├── index.astro                        # Ana sayfa
│   │   ├── cars/
│   │   │   ├── index.astro                    # Katalog + arama
│   │   │   ├── [brand]/
│   │   │   │   ├── index.astro                # Marka sayfası
│   │   │   │   └── [model]/
│   │   │   │       ├── index.astro            # Model sayfası (tüm nesiller)
│   │   │   │       └── [generation]/
│   │   │   │           ├── index.astro        # Nesil sayfası
│   │   │   │           └── [year].astro       # Yıl + trim detay sayfası
│   │   ├── compare.astro                      # Karşılaştırma aracı
│   │   ├── reviews/
│   │   │   ├── index.astro                    # Tüm incelemeler
│   │   │   └── [slug].astro                   # Tekil inceleme
│   │   ├── tools/
│   │   │   ├── cost-calculator.astro          # Sahip olma maliyeti
│   │   │   ├── ev-range.astro                 # EV menzil simülatörü
│   │   │   ├── quiz.astro                     # "Bana araç öner" sihirbazı
│   │   │   └── obd-codes.astro                # Arıza kodu sözlüğü
│   │   └── api/
│   │       ├── search.ts                      # Arama API endpoint
│   │       ├── reviews/[id].ts                # Yorum CRUD
│   │       └── compare.ts                     # Karşılaştırma verisi
│   ├── components/
│   │   ├── ui/                # Temel bileşenler (Button, Card, Badge, Modal, Toast)
│   │   ├── car/               # SpecTable, PhotoGallery, Timeline, SpecDNA
│   │   ├── search/            # SearchBar, FilterPanel, ResultGrid
│   │   ├── compare/           # CompareTable, DiffToggle, WinnerBadge
│   │   ├── tools/             # Calculator, Quiz, RangeSlider
│   │   └── layout/            # Header, Footer, Sidebar, BrandNav
│   ├── layouts/
│   │   ├── BaseLayout.astro   # Genel layout (head, nav, footer)
│   │   ├── CarLayout.astro    # Araç sayfa layout (breadcrumb, side-nav)
│   │   └── ToolLayout.astro   # Araç sayfası layout
│   ├── lib/
│   │   ├── units.ts           # Birim dönüşüm sistemi
│   │   ├── search.ts          # Arama yardımcıları (FTS5 sorguları)
│   │   ├── brand-colors.ts    # Marka renk haritası
│   │   └── seo.ts             # Meta tag, Open Graph yardımcıları
│   ├── i18n/
│   │   ├── ui.ts              # Arayüz çevirileri
│   │   ├── utils.ts           # Çeviri yardımcı fonksiyonları
│   │   └── locales/
│   │       ├── tr.json
│   │       └── en.json
│   └── styles/
│       └── global.css         # Tailwind direktifleri + tema CSS değişkenleri
└── docs/
    ├── drafts/                # LLM taslakları (referans)
    └── plans/                 # Bu kılavuz
```

---

## 4. Veritabanı Şeması (Astro DB)

Astro DB'nin `defineTable` API'si ile tip-güvenli şema tanımı:

```typescript
// db/config.ts
import { defineDb, defineTable, column, NOW } from "astro:db";

// ─── Markalar ─────────────────────────────────────────────
const Brand = defineTable({
	columns: {
		id: column.text({ primaryKey: true }), // cuid / nanoid
		slug: column.text({ unique: true }), // 'volkswagen'
		name: column.text(), // 'Volkswagen'
		country: column.text({ optional: true }), // 'DE'
		founded: column.number({ optional: true }), // 1937
		logoUrl: column.text({ optional: true }),
		accentColor: column.text({ optional: true }), // '#1a3d6f' (marka vurgu rengi)
		description: column.json({ optional: true }), // { tr: "...", en: "..." }
		createdAt: column.date({ default: NOW }),
	},
});

// ─── Modeller ─────────────────────────────────────────────
const Model = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		brandId: column.text({ references: () => Brand.columns.id }),
		slug: column.text({ unique: true }), // 'volkswagen-golf'
		name: column.text(), // 'Golf'
		bodyType: column.text(), // 'hatchback_5', 'sedan', 'suv'...
		segment: column.text({ optional: true }), // 'C', 'D', 'SUV-B'
		description: column.json({ optional: true }), // { tr: "...", en: "..." }
		createdAt: column.date({ default: NOW }),
	},
});

// ─── Jenerasyonlar ────────────────────────────────────────
const Generation = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		modelId: column.text({ references: () => Model.columns.id }),
		name: column.text(), // 'Mk7', 'E46', 'F30'
		code: column.text({ optional: true }), // Dahili üretim kodu
		yearStart: column.number(), // 2012
		yearEnd: column.number({ optional: true }), // null = hâlâ üretimde
		imageUrl: column.text({ optional: true }),
		description: column.json({ optional: true }),
		createdAt: column.date({ default: NOW }),
	},
});

// ─── Donanımlar (Trim) ───────────────────────────────────
// Her satır bir üretim yılındaki belirli bir donanım/motor kombinasyonu
const Trim = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		generationId: column.text({ references: () => Generation.columns.id }),
		name: column.text(), // '1.5 TSI Style'
		year: column.number(),
		specs: column.json(), // Tüm teknik veriler (aşağıda detaylı)
		pricing: column.json({ optional: true }), // { tr: 1250000, de: 32000, ... } (TRY, EUR)
		createdAt: column.date({ default: NOW }),
	},
});

// ─── Görseller ────────────────────────────────────────────
const Image = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		url: column.text(),
		alt: column.json({ optional: true }), // { tr: "...", en: "..." }
		type: column.text(), // 'exterior', 'interior', 'engine', 'detail', 'color'
		isPrimary: column.boolean({ default: false }),
		sortOrder: column.number({ default: 0 }),
		// Polimorfik ilişki — biri dolu olur
		generationId: column.text({
			optional: true,
			references: () => Generation.columns.id,
		}),
		trimId: column.text({ optional: true, references: () => Trim.columns.id }),
		reviewId: column.text({
			optional: true,
			references: () => Review.columns.id,
		}),
		createdAt: column.date({ default: NOW }),
	},
});

// ─── İncelemeler ──────────────────────────────────────────
const Review = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		trimId: column.text({ references: () => Trim.columns.id }),
		authorId: column.text({
			optional: true,
			references: () => User.columns.id,
		}),
		type: column.text(), // 'editorial' | 'user'
		lang: column.text({ default: "tr" }),
		title: column.text(),
		content: column.text(), // HTML veya Markdown
		rating: column.number(), // 1–10, ondalık
		pros: column.json({ optional: true }), // string[]
		cons: column.json({ optional: true }), // string[]
		publishedAt: column.date({ default: NOW }),
	},
});

// ─── Kullanıcılar ─────────────────────────────────────────
const User = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		email: column.text({ unique: true }),
		name: column.text({ optional: true }),
		avatarUrl: column.text({ optional: true }),
		role: column.text({ default: "user" }), // 'user' | 'editor' | 'admin'
		createdAt: column.date({ default: NOW }),
	},
});

// ─── Kullanıcı Garajı ────────────────────────────────────
const GarageCar = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		userId: column.text({ references: () => User.columns.id }),
		trimId: column.text({ references: () => Trim.columns.id }),
		nickname: column.text({ optional: true }), // 'Günlük arabam'
		color: column.text({ optional: true }),
		mileageKm: column.number({ optional: true }),
		notes: column.text({ optional: true }),
		addedAt: column.date({ default: NOW }),
	},
});

// ─── Geri Çağırma Bültenleri ──────────────────────────────
const Recall = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		generationId: column.text({ references: () => Generation.columns.id }),
		title: column.json(), // { tr: "...", en: "..." }
		description: column.json(),
		severity: column.text(), // 'low' | 'medium' | 'high' | 'critical'
		recallDate: column.date(),
		source: column.text({ optional: true }), // NHTSA, üretici, vb.
		sourceUrl: column.text({ optional: true }),
	},
});

// ─── Kronik Sorunlar ──────────────────────────────────────
const KnownIssue = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		generationId: column.text({ references: () => Generation.columns.id }),
		category: column.text(), // 'engine', 'transmission', 'electrical', 'suspension', 'body'
		title: column.json(), // { tr: "...", en: "..." }
		description: column.json(),
		severity: column.text(), // 'minor' | 'moderate' | 'severe'
		affectedYears: column.json({ optional: true }), // [2018, 2019, 2020]
		frequency: column.text({ optional: true }), // 'rare' | 'occasional' | 'common' | 'widespread'
	},
});

// ─── Ses Kayıtları ────────────────────────────────────────
const SoundClip = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		trimId: column.text({ references: () => Trim.columns.id }),
		type: column.text(), // 'idle', 'revving', 'exhaust', 'flyby'
		rpm: column.number({ optional: true }),
		url: column.text(), // ses dosyası URL
		durationSec: column.number({ optional: true }),
	},
});

// ─── OBD-II Arıza Kodları ─────────────────────────────────
const ObdCode = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		code: column.text(), // 'P0300'
		category: column.text(), // 'powertrain', 'body', 'chassis', 'network'
		title: column.json(), // { tr: "...", en: "..." }
		description: column.json(),
		possibleCauses: column.json({ optional: true }), // string[]
		brandSpecific: column.text({
			optional: true,
			references: () => Brand.columns.id,
		}),
	},
});

export default defineDb({
	tables: {
		Brand,
		Model,
		Generation,
		Trim,
		Image,
		Review,
		User,
		GarageCar,
		Recall,
		KnownIssue,
		SoundClip,
		ObdCode,
	},
});
```

### Specs JSON Yapısı

Trim tablosundaki `specs` alanı şu yapıda saklanır — tüm değerler **SI / metrik birimde**:

```typescript
// Tip tanımı — src/lib/types.ts
interface TrimSpecs {
	engine: {
		displacementCc: number; // 1498
		cylinders: number; // 4
		configuration: string; // 'inline', 'v', 'flat', 'rotary'
		fuelType: string; // 'petrol', 'diesel', 'electric', 'hybrid_mild', 'hybrid_phev', 'hydrogen'
		inductionType?: string; // 'turbo', 'supercharged', 'twinturbo', 'natural'
		powerKw: number; // 110
		powerRpm?: number; // 5000
		torqueNm: number; // 250
		torqueRpm?: number; // 1500
	};
	ev?: {
		batteryKwh: number; // 77
		rangeKm: number; // 510
		chargingDcKw?: number; // 135
		chargingAcKw?: number; // 11
		chargeTime10to80Min?: number; // 28
	};
	performance: {
		zeroToHundred: number; // 8.9 (saniye)
		topSpeedKmh: number; // 215
		quarterMileSec?: number; // 16.2
	};
	dimensions: {
		lengthMm: number; // 4284
		widthMm: number; // 1789
		heightMm: number; // 1491
		wheelbaseMm: number; // 2636
		weightKg: number; // 1355
		trunkLiters: number; // 380
		fuelTankLiters?: number; // 50
	};
	consumption: {
		cityL100km?: number; // 6.8
		highwayL100km?: number; // 4.9
		mixedL100km: number; // 5.6
		co2Gkm?: number; // 128
		euroNorm?: string; // 'Euro 6d'
	};
	transmission: {
		type: string; // 'manual', 'automatic', 'dct', 'cvt', 'ev_single', 'ev_dual'
		gears: number; // 7
	};
	drivetrain: string; // 'fwd', 'rwd', 'awd'
	safety?: {
		ncapStars?: number; // 5
		ncapYear?: number; // 2023
		airbags?: number; // 7
	};
}
```

> **Altın Kural:** Veritabanında her zaman SI (metrik) birimde sakla. Imperial/US gösterim sadece arayüzde dönüştürülerek yapılır. Bu veri tutarsızlığını kesin olarak önler.

---

## 5. Çoklu Dil Sistemi (i18n)

Astro'nun yerleşik i18n yönlendirmesi kullanılır — ek kütüphane gerektirmez:

```javascript
// astro.config.mjs
export default defineConfig({
	i18n: {
		defaultLocale: "tr",
		locales: ["tr", "en"], // İlk sürüm TR + EN, schema n-dil hazır
		routing: {
			prefixDefaultLocale: false, // /cars (TR), /en/cars (EN)
		},
	},
});
```

### Arayüz Çevirileri

```typescript
// src/i18n/ui.ts
export const ui = {
	tr: {
		"nav.catalog": "Katalog",
		"nav.reviews": "İncelemeler",
		"nav.compare": "Karşılaştır",
		"nav.tools": "Araçlar",
		"spec.power": "Güç",
		"spec.torque": "Tork",
		"spec.weight": "Ağırlık",
		"spec.displacement": "Motor Hacmi",
		"spec.topSpeed": "Azami Hız",
		"spec.acceleration": "0-100 km/s",
		"unit.toggle": "Birim Değiştir",
		"compare.winner": "Kazanan",
		"compare.diff": "Sadece Farklar",
		"search.placeholder": "Marka, model veya özellik ara...",
		"search.filters": "Filtreler",
		"review.pros": "Artılar",
		"review.cons": "Eksiler",
		// ...
	},
	en: {
		"nav.catalog": "Catalog",
		"nav.reviews": "Reviews",
		"nav.compare": "Compare",
		"nav.tools": "Tools",
		"spec.power": "Power",
		"spec.torque": "Torque",
		"spec.weight": "Weight",
		"spec.displacement": "Displacement",
		"spec.topSpeed": "Top Speed",
		"spec.acceleration": "0-100 km/h",
		"unit.toggle": "Toggle Units",
		"compare.winner": "Winner",
		"compare.diff": "Differences Only",
		"search.placeholder": "Search brand, model or specs...",
		"search.filters": "Filters",
		"review.pros": "Pros",
		"review.cons": "Cons",
		// ...
	},
} as const;

export type UILang = keyof typeof ui;

export function useTranslations(lang: UILang) {
	return function t(key: keyof (typeof ui)["tr"]): string {
		return ui[lang]?.[key] ?? ui["tr"][key];
	};
}
```

### Veritabanı İçerikleri İçin Çeviri

```typescript
// src/i18n/utils.ts
type LocalizedField = Record<string, string>;

export function getLocalized(field: unknown, lang: string): string {
	const obj = field as LocalizedField | null;
	if (!obj) return "";
	return obj[lang] ?? obj["en"] ?? obj["tr"] ?? "";
}
```

Marka açıklamaları, inceleme başlıkları, geri çağırma açıklamaları gibi içerikler veritabanında `column.json()` olarak `{ tr: "...", en: "..." }` formatında saklanır. Arayüz metinleri ise `ui.ts` dosyasından gelir. Böylece editöryal içerik ile arayüz metinleri ayrı kanallardan yönetilir.

**Öneri:** İlk sürüm için TR + EN ile başla. Şema zaten n-dil destekli olduğundan ileride `de`, `fr`, `ar`, `zh` eklemek sadece çeviri eklemektir.

---

## 6. Birim Dönüşüm Sistemi

```typescript
// src/lib/units.ts
export type UnitSystem = "metric" | "imperial";

interface ConvertedValue {
	value: number;
	unit: string;
	formatted: string;
}

type Converter = (input: number) => ConvertedValue;
type ConverterSet = Record<UnitSystem, Converter>;

function fmt(value: number, unit: string, decimals = 0): ConvertedValue {
	const rounded = +value.toFixed(decimals);
	return {
		value: rounded,
		unit,
		formatted: `${rounded.toLocaleString()} ${unit}`,
	};
}

export const converters = {
	// Temel birim: kW
	power: {
		metric: (kw: number) => fmt(kw, "kW"),
		imperial: (kw: number) => fmt(kw * 1.34102, "hp", 0),
	},
	// Temel birim: Nm
	torque: {
		metric: (nm: number) => fmt(nm, "Nm"),
		imperial: (nm: number) => fmt(nm * 0.7376, "lb·ft", 1),
	},
	// Temel birim: cc
	displacement: {
		metric: (cc: number) => fmt(cc / 1000, "L", 1),
		imperial: (cc: number) => fmt(cc * 0.0610237, "in³", 1),
	},
	// Temel birim: mm
	length: {
		metric: (mm: number) => fmt(mm, "mm"),
		imperial: (mm: number) => fmt(mm * 0.0393701, "in", 1),
	},
	// Temel birim: kg
	weight: {
		metric: (kg: number) => fmt(kg, "kg"),
		imperial: (kg: number) => fmt(kg * 2.20462, "lbs", 0),
	},
	// Temel birim: L/100km
	consumption: {
		metric: (l100: number) => fmt(l100, "L/100km", 1),
		imperial: (l100: number) => fmt(235.215 / l100, "mpg", 1),
	},
	// Temel birim: km/h
	speed: {
		metric: (kmh: number) => fmt(kmh, "km/h"),
		imperial: (kmh: number) => fmt(kmh * 0.621371, "mph", 0),
	},
	// Temel birim: litre
	volume: {
		metric: (l: number) => fmt(l, "L"),
		imperial: (l: number) => fmt(l * 0.264172, "gal", 1),
	},
} satisfies Record<string, ConverterSet>;

export type SpecCategory = keyof typeof converters;
```

### Kullanıcı Tercihini Yönetme

Kullanıcı tercihi `localStorage` üzerinden saklanır. Sayfa üstünde global bir toggle butonu ile kontrol edilir:

```html
<!-- Birim toggle — BaseLayout.astro içinde -->
<button id="unit-toggle" aria-label="Birim sistemi değiştir">
	<span class="metric-label">Metrik</span>
	<span class="imperial-label">Imperial</span>
</button>

<script>
	const STORAGE_KEY = "autodex-units";
	const toggle = document.getElementById("unit-toggle");

	function getUnitSystem() {
		return localStorage.getItem(STORAGE_KEY) ?? "metric";
	}

	function setUnitSystem(system) {
		localStorage.setItem(STORAGE_KEY, system);
		document.documentElement.dataset.units = system;
		// Tüm [data-unit] elementlerini güncelle
		document.querySelectorAll("[data-unit]").forEach((el) => {
			const category = el.dataset.unit;
			const rawValue = parseFloat(el.dataset.rawValue);
			// Dönüşüm uygula ve göster
		});
	}

	// Sayfa yüklendiğinde
	document.documentElement.dataset.units = getUnitSystem();

	toggle?.addEventListener("click", () => {
		const current = getUnitSystem();
		setUnitSystem(current === "metric" ? "imperial" : "metric");
	});
</script>
```

Spec değerleri sunucuda render edilirken, her değer `data-unit` ve `data-raw-value` attribute'ları ile işaretlenir. Client-side JS sayfa yüklendiğinde kullanıcının tercihine göre değerleri dönüştürür — sayfa yenilenmeden tüm veriler anında değişir.

---

## 7. Tasarım Sistemi & Görsel Kimlik

### Konsept: "Asphalt Editorial"

Otomobil dünyasının hız ve hassasiyet ikilemini yansıtan, veriyi merkezine alan, aracın estetiğini gölgelemeyen bir tasarım.

### Renk Paleti

```css
/* src/styles/global.css */
:root {
	/* Zemin — koyu tema varsayılan (araç fotoğrafları dark'ta çok daha güçlü) */
	--color-base: #0a0a0b;
	--color-surface-1: #111113;
	--color-surface-2: #1a1a1e;
	--color-surface-3: #242428;

	/* Kenarlıklar */
	--color-border: rgba(255 255 255 / 0.08);
	--color-border-muted: rgba(255 255 255 / 0.04);

	/* Vurgu — varsayılan, marka sayfalarında dinamik olarak değişir */
	--color-accent: #e63c2f; /* Yarış kırmızısı */
	--color-accent-dim: rgba(230 60 47 / 0.15);

	/* Metin */
	--color-text-primary: #f0efed;
	--color-text-secondary: #8a8a90;
	--color-text-muted: #4a4a52;

	/* Durum */
	--color-success: #2ecc71;
	--color-warning: #f39c12;
	--color-danger: #e74c3c;

	/* Tipografi */
	--font-display: var(--font-roboto), Georgia, serif;
	--font-mono: var(--font-roboto-mono), "JetBrains Mono", monospace;
	--font-body: var(--font-geist), system-ui, sans-serif;
}

/* Açık tema desteği */
@media (prefers-color-scheme: light) {
	:root.auto-theme {
		--color-base: #fafaf9;
		--color-surface-1: #f4f4f3;
		--color-surface-2: #eaeae8;
		--color-surface-3: #ddddd9;
		--color-border: rgba(0 0 0 / 0.08);
		--color-border-muted: rgba(0 0 0 / 0.04);
		--color-text-primary: #1a1a1b;
		--color-text-secondary: #6a6a70;
		--color-text-muted: #9a9aa0;
	}
}
```

### Tipografi

Projede zaten yapılandırılmış Astro Fonts API kullanılır:

| Katman             | Font                     | Kullanım                                |
| ------------------ | ------------------------ | --------------------------------------- |
| **Başlıklar**      | Roboto (display)         | h1, h2, marka isimleri                  |
| **Teknik veriler** | Roboto Mono / Geist Mono | Spec değerleri, tablolar — tabular-nums |
| **Gövde metin**    | Geist                    | Paragraflar, açıklamalar, UI metinleri  |

```css
h1,
h2 {
	font-family: var(--font-display);
}
.spec-value {
	font-family: var(--font-mono);
	font-variant-numeric: tabular-nums;
}
body {
	font-family: var(--font-body);
}
```

### Dinamik Marka Temaları

Kullanıcı bir marka sayfasına girdiğinde vurgu rengi o markanın kurumsal rengine dönüşür:

```typescript
// src/lib/brand-colors.ts
export const brandAccents: Record<string, string> = {
	ferrari: "#dc0000",
	bmw: "#1c69d4",
	mercedes: "#00adef",
	audi: "#bb0a30",
	porsche: "#c9002e",
	volkswagen: "#001e50",
	toyota: "#eb0a1e",
	honda: "#e40521",
	ford: "#003478",
	// ...
};
```

```astro
---
const brandColor = brandAccents[brand.slug] ?? "#e63c2f";
---

<!-- CarLayout.astro'da -->
<div style={`--color-accent: ${brandColor};`}>
	<slot />
</div>
```

### Ayırt Edici Tasarım Detayları

**1. Spec Kartları — Gösterge Paneli Estetiği**

```
┌─────────────────────────────────┐
│ GÜÇ                    110 kW  │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │  ← ince vurgu rengi çizgi (gauge bar)
│ 150 hp                          │
└─────────────────────────────────┘
```

Güç değeri 0'dan gerçek değere CSS `@keyframes` counter animation ile "sarar".

**2. Racing Stripe Navigasyon**
Sayfa üstünde 2px yüksekliğinde vurgu rengi gradient çizgi. Kaydırma ilerlemesi (scroll progress) olarak çift işlev görür — saf CSS `scroll-timeline` ile.

**3. Fotoğraf Galerisi — Karanlık Mod**
Galeriye tıklandığında tam ekran açılır, arka plan tamamen siyahlaşır, navigasyon kaybolur — sadece araç kalır. Klavye ve swipe destekli. Native `<dialog>` elementi ile.

**4. Asimetrik Fotoğraf Grid**
Ana fotoğraf tam genişlik. Yanına 2–3 detay karesi dikey dizilir. `hover:scale` + CSS reveal efekti.

**5. Snap-to-Spec Yan Navigasyonu**
Uzun spesifikasyon sayfalarında sağ kenarda floating mini-nav (Motor / Boyutlar / Performans / Güvenlik). CSS `scroll-snap` + `IntersectionObserver` ile aktif bölüm vurgulanır.

**6. Karşılaştırma Diff Modu**
Sadece farklı değerleri göster toggle'ı. Aynı değerler opacity ile soluk gösterilir, farklar belirgin kalır. CSS ile saf uygulama.

---

## 8. URL Mimarisi & Sayfa Yapısı

```
/                                      → Ana sayfa (öne çıkanlar, son incelemeler)
/cars                                  → Katalog + arama + filtreler
/cars/[brand]                          → Marka sayfası (tüm modeller)
/cars/[brand]/[model]                  → Model genel bakış (jenerasyon timeline)
/cars/[brand]/[model]/[generation]     → Nesil sayfası (trim listesi)
/cars/[brand]/[model]/[generation]/[year] → Yıl + trim detay (spec table, galeri)

/compare?a=trim_id&b=trim_id           → Karşılaştırma (URL ile paylaşılabilir)

/reviews                                → Tüm incelemeler
/reviews/[slug]                         → Tekil inceleme (editöryal veya kullanıcı)

/tools/cost-calculator                  → Sahip olma maliyeti hesaplayıcı
/tools/ev-range                         → EV menzil simülatörü
/tools/quiz                             → "Bana araç öner" sihirbazı
/tools/obd-codes                        → OBD-II arıza kodu sözlüğü

/en/...                                 → İngilizce (prefix ile)

/api/search                             → Arama API
/api/reviews/[id]                       → Yorum CRUD
```

**SSG vs SSR stratejisi:**

- **Statik (SSG):** Araç detay sayfaları, marka sayfaları, inceleme sayfaları → CDN'den anında
- **SSR:** Arama, karşılaştırma, kullanıcı garajı, API route'ları → sunucuda dinamik

---

## 9. Arama & Filtreleme Sistemi

### Aşama 1: Astro DB FTS5

libSQL'in yerleşik Full-Text Search 5 desteği ile başla:

```typescript
// src/lib/search.ts
import { db, Trim, Generation, Model, Brand } from "astro:db";

export async function searchCars(query: string, filters: SearchFilters) {
	let results = db
		.select()
		.from(Trim)
		.innerJoin(Generation, eq(Trim.generationId, Generation.id))
		.innerJoin(Model, eq(Generation.modelId, Model.id))
		.innerJoin(Brand, eq(Model.brandId, Brand.id));

	// Filtreler uygula
	if (filters.brandId) results = results.where(eq(Brand.id, filters.brandId));
	if (filters.bodyType)
		results = results.where(eq(Model.bodyType, filters.bodyType));
	if (filters.yearMin) results = results.where(gte(Trim.year, filters.yearMin));
	if (filters.yearMax) results = results.where(lte(Trim.year, filters.yearMax));
	// ... diğer filtreler

	return results
		.orderBy(desc(Trim.year))
		.limit(24)
		.offset(filters.page * 24);
}
```

### Aşama 2: Meilisearch (Ölçek Büyüdüğünde)

```typescript
// src/lib/meilisearch.ts — ileride eklenecek
import { MeiliSearch } from "meilisearch";

const client = new MeiliSearch({
	host: import.meta.env.MEILISEARCH_URL,
	apiKey: import.meta.env.MEILISEARCH_SEARCH_KEY,
});

// Filterable: brand, bodyType, fuelType, year, powerKw, priceRange
// Sortable: year, powerKw, zeroToHundred, consumptionMixed
// Typo-tolerant + Türkçe tokenizer dahil
```

### Filtre Paneli

```
┌─────────────────────────┐
│ 🔍 Arama...             │
├─────────────────────────┤
│ Marka         [▼ Seç]   │
│ Kasa Tipi     [▼ Seç]   │
│ Motor Tipi    [▼ Seç]   │  (benzin, dizel, elektrik, hibrit)
│ Yıl         [2015]-[2025]│
│ Güç (kW)   [50]--[400]  │  ← range slider
│ Fiyat       [0]--[∞]    │
│ Segment      [▼ Seç]    │
├─────────────────────────┤
│ Sıralama: Yıl ▾ | Güç  │
│            A-Z | Tüketim│
└─────────────────────────┘
```

Filtre durumu URL search params'da saklanır → paylaşılabilir ve bookmark'lanabilir.

---

## 10. Performans & Core Web Vitals

### Hedef Skorlar

| Metrik   | Hedef   | Strateji                                                   |
| -------- | ------- | ---------------------------------------------------------- |
| **LCP**  | < 1.5s  | Araç fotoğrafı eager load, Astro `<Image />` ile WebP/AVIF |
| **CLS**  | = 0     | Tüm görsellere width/height belirtilir                     |
| **INP**  | < 100ms | Sıfır hydration — vanilla JS event listener'lar            |
| **FCP**  | < 0.8s  | Kritik CSS inline (Astro otomatik), font preload           |
| **TTFB** | < 200ms | Statik sayfalar CDN'den, SSR sayfalar edge'de              |

### Astro Yapılandırma

```javascript
// astro.config.mjs
export default defineConfig({
	output: "hybrid", // Statik varsayılan + SSR isteğe bağlı
	adapter: cloudflare(), // veya vercel()

	image: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.r2.cloudflarestorage.com", // Medya CDN
			},
		],
	},

	integrations: [
		sitemap({
			i18n: { defaultLocale: "tr", locales: { tr: "tr-TR", en: "en-US" } },
		}),
		db(),
		tailwind(),
	],

	i18n: {
		defaultLocale: "tr",
		locales: ["tr", "en"],
		routing: { prefixDefaultLocale: false },
	},

	fonts: [
		{
			name: "Roboto",
			cssVariable: "--font-roboto",
			provider: fontProviders.fontsource(),
		},
		{
			name: "Roboto Mono",
			cssVariable: "--font-roboto-mono",
			provider: fontProviders.fontsource(),
		},
		{
			name: "Geist",
			cssVariable: "--font-geist",
			provider: fontProviders.fontsource(),
		},
		{
			name: "Geist Mono",
			cssVariable: "--font-geist-mono",
			provider: fontProviders.fontsource(),
		},
	],

	vite: {
		build: {
			rollupOptions: {
				output: {
					manualChunks: {
						search: ["meilisearch"], // İleride, ayrı chunk'ta
					},
				},
			},
		},
	},
});
```

### Görsel Optimizasyon

```astro
---
import { Image } from "astro:assets";
---

<!-- LCP görseli — eager load -->
<Image
	src={car.primaryImageUrl}
	alt={car.name}
	width={800}
	height={450}
	loading="eager"
	format="webp"
	quality={85}
/>

<!-- Galeri görselleri — lazy load -->
{
	images.map((img) => (
		<Image
			src={img.url}
			alt={getLocalized(img.alt, lang)}
			width={400}
			height={300}
			loading="lazy"
			format="webp"
			quality={80}
		/>
	))
}
```

### SEO

- Her sayfa için dinamik `<title>`, `<meta description>`, Open Graph etiketleri
- Astro `sitemap` entegrasyonu ile otomatik sitemap.xml
- Yapılandırılmış veri (JSON-LD) — `Vehicle`, `Review`, `BreadcrumbList` şemaları
- Statik sayfalar → mükemmel crawlability, sıfır JS bağımlılığı

---

## 11. Etkileşim Stratejisi (React Olmadan)

### Vanilla JS + Astro `<script>`

Astro bileşenlerinde `<script>` etiketi modüler ve tree-shaken JavaScript sağlar:

```astro
<!-- components/search/SearchBar.astro -->
<div class="search-bar">
	<input
		type="search"
		id="car-search"
		placeholder="Marka, model veya özellik ara..."
	/>
	<div id="search-results" class="hidden"></div>
</div>

<script>
	const input = document.getElementById("car-search") as HTMLInputElement;
	const results = document.getElementById("search-results")!;
	let debounceTimer: ReturnType<typeof setTimeout>;

	input.addEventListener("input", () => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(async () => {
			const query = input.value.trim();
			if (query.length < 2) {
				results.classList.add("hidden");
				return;
			}

			const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
			const data = await res.json();
			renderResults(data.hits);
		}, 300);
	});

	function renderResults(hits: any[]) {
		if (hits.length === 0) {
			results.classList.add("hidden");
			return;
		}
		results.innerHTML = hits
			.map(
				(hit) => `
      <a href="/cars/${hit.brandSlug}/${hit.modelSlug}" class="search-result-item">
        <img src="${hit.imageUrl}" alt="${hit.name}" width="80" height="45" loading="lazy" />
        <div>
          <strong>${hit.brandName} ${hit.modelName}</strong>
          <span>${hit.year} · ${hit.trimName}</span>
        </div>
      </a>
    `,
			)
			.join("");
		results.classList.remove("hidden");
	}
</script>
```

### Web Components (Karmaşık Etkileşimler İçin)

Framework-agnostic, native browser API — Astro ile mükemmel uyumlu:

```typescript
// src/components/tools/CostCalculator.ts — Web Component örneği
class CostCalculator extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
      <form id="cost-form">
        <label>Yıllık km <input type="number" name="annualKm" value="15000" /></label>
        <label>Yakıt fiyatı (₺/L) <input type="number" name="fuelPrice" step="0.01" value="45" /></label>
        <output id="cost-result"></output>
      </form>
    `;
		this.querySelector("form")!.addEventListener("input", () =>
			this.calculate(),
		);
	}

	calculate() {
		const form = this.querySelector("form") as HTMLFormElement;
		const data = new FormData(form);
		const annualKm = Number(data.get("annualKm"));
		const fuelPrice = Number(data.get("fuelPrice"));
		const consumption = Number(this.dataset.consumption); // L/100km
		const annualFuel = (annualKm / 100) * consumption * fuelPrice;
		this.querySelector("#cost-result")!.textContent =
			`Yıllık yakıt maliyeti: ₺${annualFuel.toLocaleString("tr-TR", { maximumFractionDigits: 0 })}`;
	}
}
customElements.define("cost-calculator", CostCalculator);
```

### Hazır Web Bileşenleri (Harici)

Gerektiğinde internetten framework-agnostic, hazır web component'ler eklenir:

| İhtiyaç                   | Bileşen                                    | Açıklama                                    |
| ------------------------- | ------------------------------------------ | ------------------------------------------- |
| **Fotoğraf galerisi**     | `<img-comparison-slider>` veya `GLightbox` | Hafif lightbox, framework bağımsız          |
| **Grafikler**             | `<svg>` elle çizim veya `Chart.css`        | Saf CSS/SVG tabanlı grafik — JS gerektirmez |
| **3D araç görüntüleyici** | `<model-viewer>`                           | Google'ın resmi web component'i             |
| **Tarih seçici**          | Native `<input type="date">`               | Tarayıcı native                             |
| **Range slider**          | Native `<input type="range">` + CSS        | Tailwind ile stillendirilmiş                |
| **İkonlar**               | SVG inline veya `astro-icon`               | Tree-shakeable, sıfır JS                    |
| **Toast bildirimleri**    | Toastify-js veya custom `<dialog>`         | Hafif, framework agnostic                   |

---

## 12. İçerik Veri Kaynakları

| Kaynak                 | İçerik                                      | Lisans          |
| ---------------------- | ------------------------------------------- | --------------- |
| **NHTSA API**          | ABD güvenlik verileri, geri çağırmalar      | Açık / Ücretsiz |
| **fueleconomy.gov**    | ABD yakıt tüketim verileri                  | Kamu malı       |
| **Wikimedia Commons**  | Araç görselleri                             | CC lisanslı     |
| **Open Vehicle Data**  | Temel araç bilgileri                        | Çeşitli         |
| **El ile veri girişi** | Editöryal inceleme, detaylı teknik veri     | Kendi içeriğin  |
| **Kullanıcı katkısı**  | Yorumlar, sahip deneyimleri, garaj verileri | UGC             |

> **İpucu:** Uzun vadede özgün editöryal içerik (profesyonel inceleme + fotoğraf) siteyi rakiplerden ayırır. Veri kalitesi, veri miktarından daha değerlidir.

---

## 13. Başlangıç Adımları (Yol Haritası)

### Aşama 1 — Altyapı & Veri Modeli

```
✦ Astro DB şemasını tamamla (Brand → Model → Generation → Trim + ilişkili tablolar)
✦ Tailwind CSS 4 entegrasyonu + tasarım tokenları (renk paleti, tipografi, spacing)
✦ i18n yapılandırması (TR + EN) — Astro native i18n routing
✦ Birim dönüşüm kütüphanesini yaz ve test et (units.ts)
✦ Seed verisi: 5 marka, 15–20 model, 50+ trim ile test veritabanı
✦ Hosting deploy pipeline'ı kur (GitHub Actions → Cloudflare Pages / Vercel)
```

### Aşama 2 — Temel Sayfalar

```
✦ Ana sayfa (öne çıkan markalar, popüler modeller, arama çubuğu)
✦ Marka listesi (/cars) — grid görünümü
✦ Marka detay (/cars/[brand]) — modeller listesi
✦ Model detay (/cars/[brand]/[model]) — jenerasyon timeline
✦ Trim detay (spec table + fotoğraf galerisi + birim toggle)
✦ BaseLayout + CarLayout + responsive tasarım
```

### Aşama 3 — Arama & Filtreleme

```
✦ Arama API endpoint'i (Astro DB FTS5)
✦ Arama arayüzü (SearchBar + FilterPanel + ResultGrid)
✦ Faceted filtreler (marka, kasa tipi, motor tipi, yıl, güç aralığı)
✦ URL-tabanlı filtre state yönetimi
✦ Sıralama seçenekleri (yıl, güç, tüketim, A-Z)
```

### Aşama 4 — Zengin Özellikler

```
✦ Karşılaştırma motoru (2–4 araç, diff modu, kazanan rozetleri)
✦ Kullanıcı auth sistemi (basit email/şifre, Astro middleware ile)
✦ Kullanıcı yorumları + puanlama
✦ Editöryal inceleme sayfaları
✦ Dark/Light tema toggle
✦ Spec DNA radar grafiği (SVG)
```

### Aşama 5 — Araçlar & Topluluk

```
✦ Sahip olma maliyeti hesaplayıcı
✦ EV menzil simülatörü
✦ "Bana araç öner" sihirbazı
✦ OBD-II kod sözlüğü
✦ Kullanıcı garajı
✦ Geri çağırma & kronik sorun veritabanı
✦ Ses veritabanı
```

### Aşama 6 — Optimizasyon & Ölçekleme

```
✦ Core Web Vitals optimizasyonu (LCP, CLS, INP hedefleri)
✦ JSON-LD yapılandırılmış veri (SEO)
✦ Meilisearch entegrasyonu (veri büyüdüğünde)
✦ Ek diller (de, fr, ar, zh)
✦ 3D / 360° görüntüleyici (<model-viewer>)
✦ PWA desteği (offline erişim)
```

---

## 14. Kritik Mimari Kararlar Özeti

| Karar             | Tercih                                           | Gerekçe                                                              |
| ----------------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| **Framework**     | Astro 6 (hibrit)                                 | Sıfır JS varsayılan, en hızlı statik + SSR esnekliği                 |
| **Veritabanı**    | Astro DB (libSQL)                                | Sıfır konfigürasyon, tip-güvenli, herhangi libSQL sağlayıcıya deploy |
| **ORM**           | Yok — Astro DB native API                        | Drizzle-benzeri sorgu API'si yeterli, ek bağımlılık gereksiz         |
| **UI Framework**  | Yok — Astro native + vanilla JS + Web Components | Sıfır hydration, en küçük bundle, en hızlı TTI                       |
| **Stil**          | Tailwind CSS 4 + CSS Custom Properties           | Utility-first + dinamik tema (marka renkleri, dark/light)            |
| **Arama**         | Astro DB FTS5 → Meilisearch (ölçek büyüdüğünde)  | Kademeli karmaşıklık, başlangıçta sıfır ek servis                    |
| **i18n**          | Astro native i18n + JSON alanları (DB)           | Sıfır ek kütüphane, yerleşik routing                                 |
| **Birim sistemi** | SI'da sakla, client-side dönüştür                | Veri tutarlılığı, sıfır sunucu maliyeti                              |
| **Hosting**       | Cloudflare Pages / Vercel Edge                   | CDN + Edge SSR, düşük gecikme                                        |
| **Medya**         | Cloudflare R2 + Astro `<Image />`                | Çıkış ücreti yok + otomatik optimizasyon                             |
| **State**         | Nano Stores + localStorage + URL params          | Hafif, framework bağımsız, paylaşılabilir                            |
| **Auth**          | Astro middleware + session cookies               | Minimal, harici auth servisi gerektirmez                             |
| **Animasyon**     | CSS Animations + View Transitions API            | Sıfır JS kütüphanesi, native performans                              |
| **Grafikler**     | SVG + CSS (Chart.css)                            | Sıfır JS, erişilebilir, hızlı render                                 |

---

## Özet Teknoloji Listesi

```
Zorunlu        Astro 6, Astro DB, Tailwind CSS 4
Entegrasyon    @astrojs/sitemap, @astrojs/db
Hosting        Cloudflare Pages veya Vercel
Veritabanı     Turso veya herhangi libSQL sağlayıcı (üretim)
Medya          Cloudflare R2 + Astro <Image />
State          Nano Stores (~1KB)
Arama (ileri)  Meilisearch (gerektiğinde)
İkonlar        astro-icon veya inline SVG
3D (opsiyonel) <model-viewer> web component
```

Bu yığınla elde edilen sonuç: **minimum bağımlılık, maksimum performans, sıfır JS varsayılan, edge'de çalışan, çok dilli, arama motorlarında güçlü, düşük işletme maliyetli** bir otomobil ansiklopedisi platformu. Trafik arttıkça Astro DB'nin libSQL sağlayıcısını ölçeklendirmek ve Meilisearch eklemek dışında mimarisel değişiklik gerekmez.

---

_AutoDex Kılavuzu — v1.0_
