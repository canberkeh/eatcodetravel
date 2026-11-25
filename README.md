# Eat Code Travel Blog

Yemek, seyahat ve çok nadiren de kodlama. [Astro](https://astro.build) ve [Fuwari](https://github.com/saicaca/fuwari) template'i ile hazırlanmıştır; GitHub Pages üzerinde yayınlanır.

## Geliştirme

```sh
pnpm install
pnpm dev        # http://localhost:4321/eatcodetravel/
pnpm build      # dist/ klasörüne derler
```

## Yeni yazı

`src/content/posts/<slug>.md` dosyası oluşturun:

```yaml
---
title: "Başlık"
published: 2026-01-01
description: "Kısa açıklama"
image: "/images/2026/klasor/kapak.jpg"   # public/images altında
tags: ["Tayland"]
category: "Seyahat"
author: "Berke"
draft: false
---
```

Görseller `public/images/` altına konur ve yazıda `/images/...` şeklinde kullanılır; site alt yolu (`/eatcodetravel/`) derleme sırasında otomatik eklenir.

## Yayınlama

`main` dalına yapılan her push, `.github/workflows/deploy.yml` ile GitHub Pages'e otomatik yayınlanır. Site adresi ve alt yolu `astro.config.mjs` içindeki `SITE` ve `BASE` sabitleriyle ayarlanır.
