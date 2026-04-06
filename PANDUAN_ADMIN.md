# Panduan Admin — Friendly Learning Buddy
> Urutan kerja: **Categories → Chapters → Posts**

---

## Daftar Isi

1. [Gambaran Umum Sistem](#1-gambaran-umum-sistem)
2. [Akses Admin Panel](#2-akses-admin-panel)
3. [Langkah 1 — Buat Category](#3-langkah-1--buat-category)
4. [Langkah 2 — Buat Chapter](#4-langkah-2--buat-chapter)
5. [Langkah 3 — Buat Post (Essay)](#5-langkah-3--buat-post-essay)
6. [Blok Konten Khusus](#6-blok-konten-khusus)
7. [Publish & Draft](#7-publish--draft)
8. [SEO & Meta](#8-seo--meta)
9. [Upload Media](#9-upload-media)
10. [Alur Lengkap — Contoh Nyata](#10-alur-lengkap--contoh-nyata)
11. [Tips & Hal yang Harus Dihindari](#11-tips--hal-yang-harus-dihindari)

---

## 1. Gambaran Umum Sistem

Sistem konten Friendly Learning Buddy menggunakan **3 lapisan hierarki**:

```
CATEGORY  (label topik, opsional pada post)
    │
CHAPTER   (kelompok essay dalam satu subtopik)
    │
POST      (satu essay / artikel)
```

**Chapter** adalah kunci utama. Setiap chapter terikat ke satu **subcategory** yang menentukan halaman mana essay akan muncul di website.

| Subcategory Value | Muncul di Halaman |
|---|---|
| `fundamentals` | /finance/fundamentals |
| `strategic-finance` | /finance/strategic-finance |
| `planning-and-forecasting` | /finance/planning-and-forecasting |
| `financial-analytics` | /finance/financial-analytics |
| `capital-allocation` | /finance/capital-allocation |
| `finance-in-action` | /finance/finance-in-action |
| `flsi` | /accounting/FLSI |
| `where-we-are` | /green-transition/where-we-are |
| `challenges` | /green-transition/challenges |
| `pathways` | /green-transition/pathways |
| `climate-finance` | /green-transition/climate-finance |

---

## 2. Akses Admin Panel

1. Buka browser, masuk ke:
   ```
   https://testflb.centri.id/admin
   ```
2. Login dengan akun admin yang sudah dibuat.
3. Sidebar kiri menampilkan semua koleksi: **Posts**, **Categories**, **Chapters**, **Media**, **Users**.

---

## 3. Langkah 1 — Buat Category

> Category adalah **label topik** yang melekat pada post. Sifatnya opsional tapi berguna untuk filter dan SEO.

### Kapan membuat Category?
Buat category jika kamu ingin mengelompokkan post berdasarkan tema besar, misalnya: `Financial Statement`, `Valuation`, `Macroeconomics`.

### Cara Membuat

1. Klik **Categories** di sidebar kiri.
2. Klik tombol **Create New** (pojok kanan atas).
3. Isi field berikut:

| Field | Keterangan | Contoh |
|---|---|---|
| **Title** *(wajib)* | Nama category | `Financial Statement` |
| **Slug** | Otomatis terisi dari Title. Bisa diedit. | `financial-statement` |

4. Klik **Save** (atau **Save and Stay** untuk lanjut edit).

> **Catatan:** Slug otomatis di-generate dari Title. Jika Title adalah `Financial Statement`, slug menjadi `financial-statement`. Jangan ubah slug setelah post sudah menggunakannya.

---

## 4. Langkah 2 — Buat Chapter

> Chapter adalah **kelompok essay** dalam satu subtopik. Satu chapter bisa berisi banyak post. Chapter menentukan di halaman mana konten akan muncul.

### Cara Membuat

1. Klik **Chapters** di sidebar kiri.
2. Klik tombol **Create New**.
3. Isi semua field berikut:

| Field | Keterangan | Contoh |
|---|---|---|
| **Title** *(wajib)* | Nama chapter yang tampil di website | `The Purpose of Financial Management` |
| **Description** | Deskripsi singkat chapter (opsional) | `Mengapa manajemen keuangan penting` |
| **Order** *(wajib)* | Urutan tampil di halaman (angka: 1, 2, 3...) | `1` |
| **Subcategory** *(wajib)* | Menentukan halaman mana chapter ini muncul | `Fundamentals` |
| **Slug** | Otomatis terisi dari Title | `the-purpose-of-financial-management` |

### Aturan Order

- Order `1` tampil paling atas dengan label `01`
- Order `2` tampil di bawahnya dengan label `02`
- Jika dua chapter punya order sama, urutan tidak terdefinisi
- **Order tidak harus berurutan** — kamu bisa pakai 10, 20, 30 agar mudah menyisipkan chapter baru di antaranya

### Contoh Pengisian

```
Title       : The Business, Tax, and Financial Environment
Description : Lingkungan bisnis yang membentuk keputusan keuangan
Order       : 2
Subcategory : Fundamentals
Slug        : (otomatis) the-business-tax-and-financial-environment
```

4. Klik **Save**.

---

## 5. Langkah 3 — Buat Post (Essay)

> Post adalah **satu artikel essay**. Setiap post harus dihubungkan ke sebuah Chapter agar muncul di website.

### Cara Membuat

1. Klik **Posts** di sidebar kiri.
2. Klik tombol **Create New**.

### Field Utama (bagian atas)

| Field | Keterangan | Contoh |
|---|---|---|
| **Title** *(wajib)* | Judul essay | `The Objective Function of the Firm` |

---

### Tab: Content

Tab **Content** adalah tempat menulis isi essay.

#### Hero Image
- Klik **Choose from existing** untuk pilih gambar yang sudah diupload, atau
- Klik **Upload new file** untuk upload gambar baru
- Gambar ini tampil sebagai banner besar di bagian atas halaman post

#### Rich Text Editor (Konten Utama)

Editor menggunakan **Lexical** — mirip Google Docs. Toolbar tersedia di atas area tulis.

**Format teks:**
| Tombol | Fungsi |
|---|---|
| **B** | Bold |
| *I* | Italic |
| H1 / H2 / H3 / H4 | Heading (otomatis jadi anchor link di TOC) |
| `</>` | Inline code |
| `---` | Horizontal rule (garis pemisah) |

**Heading otomatis jadi TOC:**
Setiap H2 dan H3 yang kamu tulis akan otomatis muncul di panel **Table of Contents** di sisi kanan halaman post (jika ada minimal 2 heading).

**Menambah Blok Khusus:**
Klik tombol **+** di baris baru untuk menyisipkan blok konten khusus (lihat bagian 6).

---

### Tab: Meta

| Field | Keterangan |
|---|---|
| **Related Posts** | Pilih post lain yang relevan — tampil di bawah artikel |
| **Categories** | Pilih category yang sesuai (bisa lebih dari satu) |

---

### Tab: SEO

| Field | Keterangan |
|---|---|
| **Meta Title** | Judul yang muncul di Google (klik Generate untuk otomatis) |
| **Meta Image** | Gambar thumbnail untuk share sosmed |
| **Meta Description** | Deskripsi singkat untuk Google (maks. 160 karakter) |

---

### Sidebar Kanan

> Sidebar muncul di sisi kanan layar saat membuat/edit post.

| Field | Keterangan | Penting |
|---|---|---|
| **Subtitle** | Deskripsi singkat yang tampil di daftar chapter | Isi selalu! |
| **Chapter** *(kritis)* | Hubungkan post ke chapter yang sudah dibuat | Wajib diisi |
| **Published At** | Tanggal publish (otomatis terisi saat dipublish) | |
| **Authors** | Pilih penulis dari daftar user | |
| **Slug** | URL post — otomatis dari Title | Jangan ubah setelah publish |

> **PENTING:** Jika field **Chapter** tidak diisi, post **tidak akan muncul** di halaman subcategory manapun!

---

### Alur Menulis Konten

```
1. Isi Title
2. Tulis konten di tab Content (mulai dengan Hero Image jika ada)
3. Tulis isi essay menggunakan Rich Text Editor
4. Isi Subtitle di sidebar kanan
5. Pilih Chapter di sidebar kanan
6. Pilih Categories di tab Meta (opsional)
7. Isi SEO di tab SEO (opsional tapi dianjurkan)
8. PUBLISH atau simpan sebagai Draft
```

---

## 6. Blok Konten Khusus

Saat menulis di Rich Text Editor, klik **+** di baris baru untuk menyisipkan blok berikut:

### Banner
Kotak pesan berwarna untuk highlight informasi penting.

| Field | Keterangan |
|---|---|
| **Type** | `info` (biru), `warning` (kuning), `error` (merah) |
| **Content** | Isi pesan |

**Contoh tampilan:**
```
ℹ️  Catatan: Formula ini hanya berlaku untuk perusahaan terbuka.
```

---

### Code Block
Untuk menampilkan kode program atau formula teknis.

| Field | Keterangan |
|---|---|
| **Language** | Pilih bahasa: `javascript`, `python`, `sql`, dll |
| **Code** | Isi kode |

---

### Media Block
Menyisipkan gambar di dalam konten (berbeda dengan Hero Image).

| Field | Keterangan |
|---|---|
| **Media** | Pilih atau upload gambar |
| **Caption** | Keterangan gambar (opsional) |

---

### Google Sheets Embed
Menyematkan spreadsheet dari Google Sheets atau OneDrive langsung di dalam artikel.

| Field | Keterangan | Contoh |
|---|---|---|
| **URL** | URL embed dari Google Sheets / OneDrive | `https://docs.google.com/...` |

**Cara mendapat URL embed dari Google Sheets:**
1. Buka Google Sheets
2. Klik **File → Share → Publish to web**
3. Pilih **Embed**
4. Copy URL yang diberikan
5. Paste ke field URL

---

### Key Points
Daftar poin-poin penting yang ditampilkan sebagai card ringkasan.

| Field | Keterangan |
|---|---|
| **Title** | Judul box key points |
| **Points** | Tambah poin satu per satu |

---

## 7. Publish & Draft

### Status Post

| Status | Keterangan |
|---|---|
| **Draft** | Tersimpan tapi tidak tampil di website untuk pengunjung umum |
| **Published** | Tampil di website, bisa diakses publik |

### Cara Publish

- **Publish langsung:** Klik tombol **Publish** (bukan Save) di pojok kanan bawah
- **Simpan draft:** Klik tombol **Save Draft**
- **Schedule publish:** Aktifkan **Schedule Publish**, lalu pilih tanggal & waktu

### Autosave

Editor secara otomatis menyimpan draft setiap **100ms** selama kamu mengetik. Kamu tidak akan kehilangan konten jika browser tiba-tiba tertutup.

### Riwayat Versi

Setiap post menyimpan hingga **50 versi**. Untuk melihat atau memulihkan versi lama:
1. Buka post yang ingin dilihat riwayatnya
2. Klik **Versions** di sidebar kanan atas
3. Pilih versi yang ingin dipulihkan

---

## 8. SEO & Meta

Mengisi SEO membuat artikel lebih mudah ditemukan di Google.

### Tips Meta Title
- Sertakan kata kunci utama di awal
- Maksimal 60 karakter
- Contoh: `Objective Function of the Firm | Finance FLB`

### Tips Meta Description
- Jelaskan isi artikel dalam 1-2 kalimat
- Maksimal 160 karakter
- Mengandung kata kunci yang dicari pembaca

### Generate Otomatis
Klik tombol **Generate** di samping Meta Title dan Meta Description untuk mengisi otomatis dari judul dan konten post.

---

## 9. Upload Media

### Cara Upload Gambar

1. Klik **Media** di sidebar kiri
2. Klik **Create New**
3. Drag & drop file atau klik **Upload**
4. Format yang didukung: `JPG`, `PNG`, `WEBP`, `GIF`, `SVG`

### Tips Gambar

| Jenis | Rekomendasi Ukuran | Format |
|---|---|---|
| Hero Image (banner post) | 1200 × 630 px | JPG atau WEBP |
| Gambar dalam konten | Maks. 800px lebar | JPG atau WEBP |
| Logo / ikon | Bebas | SVG atau PNG |

> **WEBP** sangat direkomendasikan — ukuran file lebih kecil, kualitas sama.

### Alt Text
Selalu isi **Alt Text** saat upload gambar. Alt text membantu aksesibilitas dan SEO.

---

## 10. Alur Lengkap — Contoh Nyata

### Skenario: Menambahkan essay baru di Finance > Fundamentals

**Tujuan:** Menambahkan essay berjudul *"Time Value of Money"* ke chapter *"Core Valuation Concepts"* di subcategory Fundamentals.

---

**Step 1 — Cek apakah Category sudah ada**
1. Buka **Categories**
2. Cari `Valuation` atau label yang sesuai
3. Jika belum ada → buat baru dengan Title `Valuation`

---

**Step 2 — Cek apakah Chapter sudah ada**
1. Buka **Chapters**
2. Cari chapter `Core Valuation Concepts` dengan subcategory `Fundamentals`
3. Jika belum ada → buat baru:
   ```
   Title       : Core Valuation Concepts
   Order       : 3
   Subcategory : Fundamentals
   ```

---

**Step 3 — Buat Post**
1. Buka **Posts** → **Create New**
2. Isi **Title**: `Time Value of Money`
3. Upload **Hero Image** (gambar relevan)
4. Tulis konten di **Rich Text Editor**
5. Di sidebar kanan:
   - **Subtitle**: `Mengapa uang hari ini lebih berharga dari uang di masa depan`
   - **Chapter**: pilih `Core Valuation Concepts`
   - **Authors**: pilih nama kamu
6. Di tab **Meta**:
   - **Categories**: pilih `Valuation`
7. Di tab **SEO**:
   - Klik **Generate** untuk auto-fill Meta Title & Description
8. Klik **Publish**

---

**Hasil:** Essay akan langsung muncul di:
```
https://testflb.centri.id/finance/fundamentals
```
Di bawah chapter `03 — Core Valuation Concepts`.

---

## 11. Tips & Hal yang Harus Dihindari

### ✅ Lakukan

- Selalu isi **Subtitle** — tampil di daftar chapter sebagai deskripsi essay
- Selalu pilih **Chapter** sebelum publish — tanpa ini post tidak muncul di mana pun
- Gunakan **H2** untuk bagian utama dan **H3** untuk sub-bagian — otomatis masuk TOC
- Upload gambar format **WEBP** untuk performa lebih baik
- Gunakan **Draft** dulu sebelum publish jika konten belum selesai
- Isi **Meta Description** sebelum publish

### ❌ Hindari

- Jangan ubah **Slug** setelah post dipublish — URL lama akan broken
- Jangan buat dua Chapter dengan **Order sama** di subcategory yang sama
- Jangan publish tanpa mengisi **Chapter** — post tidak akan muncul di website
- Jangan copy-paste langsung dari Word/PDF — format bisa berantakan, ketik ulang atau paste as plain text
- Jangan upload gambar berukuran lebih dari **5MB** tanpa dikompres dulu

---

## Ringkasan Cepat

```
BUAT CATEGORY  →  Collections > Categories > Create New
                  Isi: Title, (Slug otomatis)

BUAT CHAPTER   →  Collections > Chapters > Create New
                  Isi: Title, Order (angka), Subcategory ← WAJIB

BUAT POST      →  Collections > Posts > Create New
                  Isi: Title, Hero Image, Konten
                  Sidebar: Subtitle, Chapter ← WAJIB
                  Publish!
```

---

*Panduan ini dibuat untuk sistem Friendly Learning Buddy menggunakan Payload CMS 3.x.*
*URL Admin: https://testflb.centri.id/admin*
