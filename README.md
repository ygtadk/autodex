# AutoDex

Otomobiller hakkında kapsamlı teknik detaylar, incelemeler ve karşılaştırmalar sunan modern bir veritabanı platformu.

## Teknoloji Yığını

- **Framework:** Astro 6 (hibrit SSG + SSR)
- **Veritabanı:** Astro DB (libSQL)
- **Stil:** Tailwind CSS 4 + CSS Custom Properties
- **Etkileşim:** Vanilla JS + Web Components (React/Vue yok)
- **Hosting:** Cloudflare Pages / Vercel

## Geliştirme

```bash
pnpm install         # Bağımlılıkları kur
pnpm dev             # Geliştirme sunucusu (localhost:4321)
pnpm build           # Üretim derlemesi (./dist/)
pnpm preview         # Yerel önizleme
```

## Proje Yapısı

```
src/
├── pages/           # Sayfa rotaları
├── components/      # Astro bileşenleri (ui, car, search, compare, tools, layout)
├── layouts/         # Sayfa düzenleri
├── lib/             # Yardımcı fonksiyonlar (units, search, seo)
├── i18n/            # Çoklu dil (Astro native i18n)
└── styles/          # Global stiller + Tailwind
db/
├── config.ts        # Astro DB tablo tanımları
└── seed.ts          # Geliştirme seed verileri
```

## Temel Özellikler

- Marka / Model / Jenerasyon / Trim kataloğu
- Gelişmiş arama ve filtreleme
- Araç karşılaştırma motoru (diff modu)
- Birim dönüşüm sistemi (Metrik / Imperial)
- Çoklu dil desteği
- Aydınlık / Karanlık mod

## Dokümantasyon

- **Proje kılavuzu:** [docs/plans/autodex-current.md](docs/plans/autodex-current.md)
