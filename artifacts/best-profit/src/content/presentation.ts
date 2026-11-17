// Konten Fase 1 — modul data lokal, disiapkan untuk dipindah ke CMS (Fase 2/3).
// Semua item bertanda `placeholder: true` WAJIB diganti dengan materi terverifikasi.

const img = (f: string) => `${import.meta.env.BASE_URL}images/${f}`;

export const brand = {
  name: "Best Profit",
  legalName: "PT Bestprofit Futures",
  logo: img("bpf-logo.png"),
  logoNote: "Logo sumber dari situs resmi — menunggu file logo resmi resolusi tinggi",
  headquarters: "Equity Tower",
  // Nomor WhatsApp resmi BELUM dikonfirmasi. Jangan isi tanpa persetujuan.
  whatsappNumber: null as string | null,
};

export const chapters = [
  { id: "selamat-datang", no: "01", title: "Selamat Datang" },
  { id: "mengenal-kami", no: "02", title: "Mengenal Kami" },
  { id: "produk", no: "03", title: "Memahami Produk" },
  { id: "pengalaman-klien", no: "04", title: "Pengalaman Klien" },
  { id: "pencapaian-marketing", no: "05", title: "Pencapaian Marketing" },
  { id: "profesional", no: "06", title: "Para Profesional" },
  { id: "belajar", no: "07", title: "Belajar & Memahami" },
  { id: "terhubung", no: "08", title: "Mari Terhubung" },
] as const;

export const images = {
  hero: { src: img("hero-tower.jpg"), alt: "Ilustrasi gedung perkantoran saat senja" },
  lounge: { src: img("lounge.jpg"), alt: "Ilustrasi ruang pertemuan kantor" },
  consultation: { src: img("consultation.jpg"), alt: "Ilustrasi sesi konsultasi di kantor" },
  corridor: { src: img("corridor.jpg"), alt: "Ilustrasi koridor kantor" },
  learn: { src: img("learn.jpg"), alt: "Ilustrasi buku catatan belajar di meja" },
};

export const hero = {
  eyebrow: "Presentasi Digital",
  headline: "Kenali Best Profit",
  intro:
    "Kenali perusahaan kami, pahami layanan kami, simak pengalaman klien yang nyata, dan bertemu para profesional yang siap mendampingi Anda.",
};

export const about = {
  lead: "Sebuah perkenalan, bukan brosur.",
  body:
    "Bagian ini akan berisi profil resmi perusahaan: latar belakang, perjalanan, serta kredensial yang telah diverifikasi. Kami sengaja tidak menuliskan klaim apa pun sebelum materi resmi diterima dan ditinjau.",
  facts: [
    { label: "Nama perusahaan", value: "PT Bestprofit Futures", verified: false },
    { label: "Kantor pusat", value: "Equity Tower", verified: false },
    { label: "Tahun berdiri", value: "Menunggu data resmi", verified: false },
    { label: "Izin & keanggotaan", value: "Menunggu dokumen resmi", verified: false },
  ],
  vision: "Visi perusahaan akan ditampilkan setelah diverifikasi.",
  mission: "Misi perusahaan akan ditampilkan setelah diverifikasi.",
};

export const products = {
  intro:
    "Contoh edukatif berikut menjelaskan cara kerja transaksi secara umum. Spesifikasi produk resmi, biaya, dan ketentuan akan ditampilkan setelah diverifikasi.",
  steps: [
    { t: "Konsultasi awal", d: "Berbicara dengan perwakilan untuk memahami produk, risiko, dan kesesuaian dengan kondisi Anda." },
    { t: "Pemahaman dokumen", d: "Membaca dan memahami dokumen pemberitahuan risiko serta perjanjian sebelum memutuskan apa pun." },
    { t: "Pembukaan akun", d: "Proses administrasi sesuai ketentuan resmi yang berlaku." },
    { t: "Transaksi & pemantauan", d: "Setiap posisi dapat menghasilkan untung maupun rugi. Pemantauan dan pengelolaan risiko adalah tanggung jawab bersama." },
  ],
  examples: [
    { name: "Contoh Produk A", kind: "Kategori komoditas (contoh)" },
    { name: "Contoh Produk B", kind: "Kategori indeks (contoh)" },
    { name: "Contoh Produk C", kind: "Kategori mata uang (contoh)" },
  ],
  faq: [
    { q: "Apakah keuntungan dijamin?", a: "Tidak. Transaksi berjangka mengandung risiko tinggi, termasuk kemungkinan kehilangan dana. Tidak ada pihak yang dapat menjamin hasil." },
    { q: "Produk apa saja yang tersedia?", a: "Daftar produk resmi sedang disiapkan dan akan ditampilkan setelah diverifikasi. Contoh di atas hanya bersifat edukatif." },
    { q: "Berapa biaya transaksinya?", a: "Informasi biaya akan dicantumkan sesuai dokumen resmi. Tanyakan langsung kepada perwakilan resmi dan minta dokumennya." },
    { q: "Bagaimana memulai?", a: "Mulailah dengan percakapan. Pahami risikonya terlebih dahulu sebelum mengambil keputusan apa pun." },
  ],
};

export const testimonials = {
  slots: [1, 2, 3].map((n) => ({ id: n, placeholder: true })),
  disclosure:
    "Pengalaman satu klien tidak mewakili hasil klien lain. Kinerja masa lalu tidak menjamin hasil di masa depan. Setiap hasil yang ditampilkan akan disertai periode, konteks, dan pengungkapan risiko.",
};

export const marketers = [1, 2, 3].map((n) => ({ id: n, placeholder: true }));
export const professionals = [
  { id: 1, role: "Konsultan Edukasi", placeholder: true },
  { id: 2, role: "Layanan Nasabah", placeholder: true },
  { id: 3, role: "Kepatuhan", placeholder: true },
  { id: 4, role: "Administrasi Akun", placeholder: true },
];

export const lessons = [
  { t: "Pengantar trading", d: "Trading adalah aktivitas membeli dan menjual instrumen untuk mengambil manfaat dari pergerakan harga. Harga bisa bergerak ke arah mana saja." },
  { t: "Istilah dasar", d: "Posisi beli (long), posisi jual (short), margin, lot, dan spread. Pahami setiap istilah sebelum bertransaksi." },
  { t: "Cara transaksi bekerja", d: "Anda membuka posisi, harga bergerak, lalu posisi ditutup. Selisihnya bisa berupa keuntungan atau kerugian." },
  { t: "Pergerakan pasar", d: "Harga dipengaruhi data ekonomi, kebijakan, peristiwa global, dan sentimen. Tidak ada yang dapat memprediksi dengan pasti." },
  { t: "Manajemen risiko", d: "Gunakan dana yang siap Anda tanggung risikonya, tentukan batas kerugian, dan hindari keputusan karena emosi." },
  { t: "Sebelum memulai", d: "Baca dokumen risiko, ajukan pertanyaan, dan jangan pernah merasa terburu-buru oleh siapa pun." },
];

export const riskNote =
  "Perdagangan berjangka mengandung risiko tinggi dan dapat mengakibatkan kerugian sebagian atau seluruh dana. Materi ini bersifat edukatif dan bukan ajakan atau jaminan hasil.";

export const shareMessage = (url: string) =>
  `Halo, saya ingin berbagi presentasi singkat tentang Best Profit — perusahaan, layanan, dan tim profesionalnya. Silakan dibuka di sini:\n${url}`;
