# Dokumen Teknis Modul 2 — HTML Semantik, Tailwind CSS, dan Aksesibilitas

**Nama/NIM:** M. Rizki Ruswan / 105224018  
**Repositori:** https://github.com/mrizkiruswan-lab/105224018-Praktikum-Pemweb-Modul2.git

## 1. Struktur Semantik

Pada Modul 2, halaman utama produk dibuat menggunakan struktur HTML semantik
agar setiap bagian halaman memiliki fungsi dan landmark yang jelas. Struktur
utama yang digunakan adalah `header`, `nav`, `main`, `section`, `aside`, dan
`footer`.

Struktur halaman utama yang digunakan adalah sebagai berikut:

- `<header>` digunakan sebagai bagian kepala halaman.
- `<nav>` digunakan untuk navigasi utama yang berisi tautan Fitur dan Kontak.
- `<main>` digunakan sebagai wadah seluruh konten utama halaman.
- `<section>` digunakan untuk membagi konten menjadi beberapa bagian.
- `<aside>` digunakan untuk menampilkan informasi tambahan mengenai produk.
- `<footer>` digunakan sebagai bagian penutup halaman.

Hierarki judul halaman menggunakan satu `<h1>` sebagai judul utama, kemudian
`<h2>` untuk setiap bagian utama dan `<h3>` untuk judul pada kartu fitur.

### Struktur Halaman

Struktur sederhana halaman adalah:

```text
<header>
└── <nav>
    ├── Nama Produk
    ├── Fitur
    └── Kontak

<main>
├── <section>
│   ├── <h1> Kalimat nilai utama produk
│   └── <p> Penjelasan produk
│
├── <section>
│   ├── <h2> Fitur Utama
│   └── <article>
│       ├── <h3> Fitur pertama
│       ├── <h3> Fitur kedua
│       └── <h3> Fitur ketiga
│
├── <section>
│   └── <h2> Cara Kerja
│
├── <aside>
│   └── Informasi tambahan
│
└── <section>
    ├── <h2> Hubungi Kami
    └── <form>

<footer>
└── Informasi hak cipta
```

Penggunaan elemen semantik dipilih agar struktur halaman dapat dikenali oleh
browser dan teknologi bantu. Setiap `section` diberikan nama melalui
`aria-labelledby` sehingga dapat dikenali sebagai landmark region pada
Accessibility Tree.

Halaman juga memiliki tautan "Lewati ke konten utama" untuk membantu pengguna
keyboard melewati bagian navigasi dan langsung menuju konten utama.

### Bukti Accessibility Tree

Hasil pemeriksaan pada DevTools menunjukkan struktur landmark seperti:

- banner
- navigation
- main
- region
- contentinfo

Struktur tersebut menunjukkan bahwa elemen semantik pada halaman telah
dipetakan ke landmark yang sesuai.

## 2. Tata Letak Responsif

Tampilan halaman dibuat menggunakan pendekatan **mobile-first** dengan
Tailwind CSS. Kelas tanpa breakpoint digunakan sebagai tampilan dasar untuk
perangkat kecil, kemudian breakpoint digunakan untuk menyesuaikan layout pada
layar yang lebih besar.

### Pengujian 360 px

Pada ukuran layar 360 px, navigasi berubah menjadi susunan vertikal. Kartu
fitur juga ditampilkan dalam satu kolom agar konten tidak terlalu sempit.

Hasil pengujian menunjukkan bahwa elemen halaman tetap berada di dalam area
layar dan tidak menghasilkan gulir horizontal.

### Pengujian 768 px

Pada ukuran layar 768 px, layout mulai menggunakan ruang yang lebih besar.
Kartu fitur dapat ditampilkan dalam dua kolom sehingga penggunaan ruang
menjadi lebih efektif.

### Pengujian 1280 px

Pada ukuran layar 1280 px, halaman menggunakan layout desktop. Kartu fitur
ditampilkan dalam tiga kolom dan bagian konten dengan informasi tambahan
ditampilkan berdampingan.

### Kelas Tailwind yang Digunakan

| Kelas | Fungsi | Alasan Penggunaan |
|---|---|---|
| `flex` | Mengaktifkan Flexbox | Mengatur susunan elemen navigasi |
| `flex-col` | Menyusun elemen secara vertikal | Digunakan pada tampilan mobile |
| `sm:flex-row` | Mengubah susunan menjadi horizontal | Digunakan pada layar yang lebih besar |
| `justify-between` | Memberikan jarak antar elemen | Memisahkan nama produk dan menu |
| `gap-*` | Memberikan jarak antar elemen | Menjaga jarak antar komponen |
| `grid` | Mengaktifkan CSS Grid | Mengatur kumpulan kartu fitur |
| `grid-cols-1` | Satu kolom | Tampilan dasar perangkat kecil |
| `sm:grid-cols-2` | Dua kolom mulai breakpoint `sm` | Tampilan tablet |
| `lg:grid-cols-3` | Tiga kolom mulai breakpoint `lg` | Tampilan desktop |
| `max-w-6xl` | Membatasi lebar konten | Menjaga konten tidak terlalu melebar |
| `mx-auto` | Memusatkan elemen | Menempatkan konten di tengah |
| `w-full` | Menggunakan lebar penuh | Membantu tampilan responsif |
| `focus-visible:outline-*` | Menampilkan indikator fokus | Membantu navigasi keyboard |

Flexbox digunakan pada navigasi karena navigasi merupakan susunan satu
dimensi. Grid digunakan pada kartu fitur karena kartu merupakan kumpulan
elemen yang dapat disusun dalam beberapa kolom.

Breakpoint yang digunakan adalah:

```text
Mobile
grid-cols-1

Tablet
sm:grid-cols-2

Desktop
lg:grid-cols-3
```

Dengan pendekatan tersebut, halaman dapat menyesuaikan diri dengan ukuran
layar 360 px, 768 px, dan 1280 px.

## 3. Audit Aksesibilitas

Audit aksesibilitas dilakukan menggunakan Lighthouse pada halaman utama
produk. Hasil audit menunjukkan skor **96** untuk kategori Accessibility.

Skor 96 telah memenuhi target minimal 85 yang ditetapkan pada Modul 2.

### Temuan Audit

Pada proses audit ditemukan masalah pada rasio kontras warna teks. Lighthouse
menunjukkan bahwa terdapat teks yang memiliki kontras kurang memadai terhadap
background.

Masalah tersebut terjadi karena beberapa teks menggunakan warna abu-abu yang
terlalu gelap terhadap latar belakang.

Perbaikan dilakukan dengan menggunakan warna teks yang memiliki kontras lebih
tinggi terhadap background sehingga teks lebih mudah dibaca.

### Elemen Formulir

Formulir kontak menggunakan `<label>` yang terhubung dengan input melalui
atribut `htmlFor` dan `id`.

Contohnya:

```tsx
<label htmlFor="nama">
  Nama lengkap
</label>

<input
  id="nama"
  name="nama"
  type="text"
/>
```

Untuk input email digunakan `aria-describedby` agar pengguna mendapatkan
petunjuk tambahan ketika fokus berada pada kolom tersebut.

```tsx
<input
  id="email"
  name="email"
  type="email"
  aria-describedby="email-bantuan"
/>

<p id="email-bantuan">
  Gunakan alamat surel yang aktif.
</p>
```

Pilihan radio dikelompokkan menggunakan `<fieldset>` dan `<legend>` agar
hubungan antar pilihan dapat dikenali oleh teknologi bantu.

### Pemeriksaan Keyboard

Selain Lighthouse, halaman diuji secara manual menggunakan keyboard.

Pengujian dilakukan menggunakan:

- `Tab` untuk berpindah ke elemen interaktif berikutnya.
- `Shift + Tab` untuk kembali ke elemen sebelumnya.
- `Space` untuk memilih pilihan radio.
- `Enter` untuk menjalankan atau mengirim aksi.

Hasil pengujian menunjukkan bahwa elemen navigasi dan formulir dapat
dijangkau menggunakan keyboard.

Indikator fokus dibuat terlihat menggunakan kelas:

```tsx
focus-visible:outline-2
focus-visible:outline-offset-2
```

Urutan fokus mengikuti urutan elemen pada halaman sehingga pengguna keyboard
dapat memahami perpindahan fokus.

## 4. Kendala dan Penyelesaian

### 4.1 Layout terlalu sempit pada perangkat mobile

Pada awal implementasi, kartu fitur menggunakan tiga kolom secara langsung.
Kondisi tersebut membuat kartu menjadi terlalu sempit ketika halaman dibuka
pada ukuran 360 px.

Perbaikannya adalah menerapkan pendekatan mobile-first:

```tsx
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
```

Dengan konfigurasi tersebut, kartu tampil satu kolom pada mobile, dua kolom
pada tablet, dan tiga kolom pada desktop.

### 4.2 Layout dua kolom pada layar kecil

Layout konten dan informasi tambahan menggunakan breakpoint agar tidak
memaksakan dua kolom pada perangkat kecil.

Contohnya:

```tsx
grid gap-8 lg:grid-cols-[2fr_1fr]
```

Pada perangkat kecil, konten tersusun secara vertikal. Pada desktop, konten
utama dan informasi tambahan dapat ditampilkan berdampingan.

### 4.3 Kontras teks kurang baik

Pada pemeriksaan Lighthouse ditemukan masalah terkait kontras warna teks.

Perbaikannya dilakukan dengan memilih warna teks yang lebih kontras terhadap
latar belakang.

Masalah ini penting karena teks dengan kontras rendah dapat menyulitkan
pengguna membaca isi halaman.

### 4.4 Struktur halaman menggunakan elemen semantik

Struktur halaman diperbaiki dengan menggunakan elemen semantik seperti:

```html
<header>
<nav>
<main>
<section>
<aside>
<footer>
```

Section juga diberi nama melalui `aria-labelledby` agar dapat dikenali dengan
baik pada Accessibility Tree.

## 5. Catatan Pemanfaatan AI

AI digunakan sebagai alat bantu dalam pengerjaan Dokumen Teknis Modul 2.

### Alat yang Digunakan

- ChatGPT

### Bagian yang Dibantu

AI digunakan untuk:

1. membantu memahami struktur Dokumen Teknis Modul 2;
2. membantu menyusun dokumentasi mengenai HTML semantik;
3. membantu menjelaskan fungsi kelas Tailwind CSS;
4. membantu menyusun penjelasan hasil pengujian responsif;
5. membantu menyusun penjelasan mengenai hasil audit aksesibilitas;
6. membantu merapikan bahasa dokumentasi.

### Verifikasi

Hasil yang diberikan AI tidak langsung digunakan tanpa pemeriksaan.
Implementasi tetap diperiksa melalui kode pada proyek dan pengujian langsung
menggunakan Chrome DevTools.

Verifikasi dilakukan dengan:

- memeriksa Accessibility Tree pada DevTools;
- menguji halaman pada lebar 360 px, 768 px, dan 1280 px;
- menjalankan Lighthouse Accessibility;
- melakukan navigasi halaman menggunakan tombol `Tab`;
- memastikan indikator fokus terlihat;
- memastikan halaman tidak menghasilkan gulir horizontal pada ukuran layar
  yang diuji.

Dengan demikian, AI digunakan sebagai alat bantu penulisan dan pemahaman,
sedangkan hasil akhir diverifikasi berdasarkan implementasi dan pengujian
pada aplikasi.
