// Konten Fase 1 — modul data lokal untuk presentasi prospek BPF Equity Tower.
// Semua item bertanda `placeholder: true` WAJIB diganti dengan materi terverifikasi.

const img = (f: string) => `${import.meta.env.BASE_URL}images/${f}`;

export const brand = {
  name: "Best Profit",
  office: "BPF Equity Tower",
  legalName: "PT Bestprofit Futures",
  logo: img("bpf-logo.png"),
  logoNote: "Logo sumber dari situs resmi — menunggu file logo resmi resolusi tinggi",
  headquarters: "Equity Tower",
  // Nomor WhatsApp resmi BELUM dikonfirmasi. Isi hanya dengan nomor resmi yang disetujui,
  // format internasional tanpa tanda plus, contoh struktur: "62xxxxxxxxxx".
  whatsappNumber: null as string | null,
};

export const consultMessage =
  "Halo tim BPF Equity Tower, saya telah membaca presentasi digital dan ingin menjadwalkan sesi konsultasi untuk memahami produk serta risikonya.";

export const chapters = [
  { id: "selamat-datang", no: "01", title: "Selamat Datang" },
  { id: "tentang-equity-tower", no: "02", title: "Tentang Equity Tower" },
  { id: "produk", no: "03", title: "Produk Kami" },
  { id: "cara-kerja", no: "04", title: "Cara Kerja" },
  { id: "kepercayaan", no: "05", title: "Kepercayaan & Kredibilitas" },
  { id: "tim-kami", no: "06", title: "Tim Kami" },
  { id: "edukasi-risiko", no: "07", title: "Edukasi & Kesadaran Risiko" },
  { id: "mari-bicara", no: "08", title: "Mari Bicara" },
] as const;

export const images = {
  hero: { src: img("hero-tower.jpg"), alt: "Ilustrasi gedung perkantoran saat senja" },
  lounge: { src: img("lounge.jpg"), alt: "Ilustrasi ruang pertemuan kantor" },
  consultation: { src: img("consultation.jpg"), alt: "Ilustrasi sesi konsultasi di kantor" },
  corridor: { src: img("corridor.jpg"), alt: "Ilustrasi koridor kantor" },
  learn: { src: img("learn.jpg"), alt: "Ilustrasi buku catatan belajar di meja" },
};

export const hero = {
  eyebrow: "Presentasi Prospek",
  intro:
    "Perkenalan singkat dari tim BPF Equity Tower: siapa kami, produk berjangka yang kami perkenalkan, cara kerjanya, risikonya, dan bagaimana memulai percakapan yang terinformasi.",
};

export const about = {
  lead: "Equity Tower adalah kantor pusat PT Bestprofit Futures.",
  body:
    "Presentasi ini membantu calon nasabah mengenal BPF Equity Tower, memahami pengantar perdagangan berjangka, dan menyiapkan pertanyaan sebelum berkonsultasi dengan tim marketing. Profil resmi perusahaan — sejarah, legalitas, dan kredensial — akan ditampilkan setelah dokumen resmi diterima dan ditinjau.",
  facts: [
    { label: "Nama perusahaan", value: "PT Bestprofit Futures" },
    { label: "Kantor pusat", value: "Equity Tower" },
    { label: "Alamat lengkap", value: "Menunggu data resmi" },
    { label: "Tahun berdiri", value: "Menunggu data resmi" },
  ],
};

export const products = {
  intro:
    "Perdagangan berjangka mencakup beberapa kategori instrumen. Kategori di bawah ini adalah contoh edukatif umum untuk membantu Anda memahami istilahnya — bukan daftar produk resmi kami. Daftar produk, spesifikasi, biaya, dan ketentuan akan ditampilkan setelah dikonfirmasi.",
  categories: [
    { name: "Komoditas", d: "Kontrak yang nilainya mengacu pada harga barang, misalnya logam atau energi. Harga dipengaruhi pasokan, permintaan, dan kondisi global." },
    { name: "Indeks", d: "Kontrak yang mengacu pada pergerakan sekelompok saham dalam satu indeks. Mencerminkan sentimen pasar secara luas." },
    { name: "Mata uang", d: "Kontrak yang mengacu pada nilai tukar antarmata uang. Peka terhadap kebijakan suku bunga dan data ekonomi." },
  ],
};

export const howItWorks = {
  intro: "Gambaran umum alur dari perkenalan hingga transaksi. Ketentuan resmi yang berlaku akan dijelaskan oleh perwakilan beserta dokumennya.",
  steps: [
    { t: "Konsultasi awal", d: "Berbicara dengan perwakilan untuk memahami produk, risiko, dan kesesuaian dengan kondisi Anda." },
    { t: "Pemahaman dokumen", d: "Membaca dokumen pemberitahuan risiko dan perjanjian sebelum memutuskan apa pun." },
    { t: "Pembukaan akun", d: "Proses administrasi sesuai ketentuan resmi yang berlaku." },
    { t: "Transaksi & pemantauan", d: "Setiap posisi dapat menghasilkan untung maupun rugi. Pemantauan risiko berlangsung terus-menerus." },
  ],
  mechanics: [
    { k: "Membuka posisi", d: "Anda memilih arah: beli bila memperkirakan harga naik, jual bila memperkirakan harga turun." },
    { k: "Margin", d: "Transaksi memerlukan dana jaminan. Karena ada daya ungkit, perubahan harga kecil dapat berdampak besar pada dana Anda — ke dua arah." },
    { k: "Menutup posisi", d: "Selisih harga saat membuka dan menutup posisi menentukan hasil, setelah dikurangi biaya yang berlaku." },
  ],
};

export const trust = {
  intro:
    "Kepercayaan sebaiknya dibangun melalui verifikasi, bukan janji. Bagian ini menjelaskan apa yang akan kami tampilkan dan apa yang sebaiknya Anda periksa sendiri.",
  credentials: [
    { label: "Izin usaha pialang berjangka", value: "Menunggu dokumen resmi" },
    { label: "Keanggotaan bursa berjangka", value: "Menunggu dokumen resmi" },
    { label: "Keanggotaan lembaga kliring", value: "Menunggu dokumen resmi" },
  ],
  checklist: [
    { t: "Periksa legalitas secara mandiri", d: "Cocokkan nama perusahaan dan nomor izin melalui situs resmi regulator perdagangan berjangka." },
    { t: "Minta dokumen tertulis", d: "Pemberitahuan risiko, perjanjian, dan rincian biaya harus diberikan secara tertulis sebelum Anda memutuskan." },
    { t: "Waspadai janji hasil", d: "Pihak yang menjanjikan keuntungan pasti atau tetap tidak sedang memberi informasi yang benar." },
    { t: "Pastikan identitas perwakilan", d: "Tanyakan nama dan identitas resmi perwakilan, dan konfirmasikan melalui kanal resmi kantor." },
  ],
  faq: [
    { q: "Apakah keuntungan dijamin?", a: "Tidak. Transaksi berjangka mengandung risiko tinggi, termasuk kemungkinan kehilangan dana. Tidak ada pihak yang dapat menjamin hasil." },
    { q: "Produk apa saja yang tersedia?", a: "Daftar produk resmi sedang disiapkan dan akan ditampilkan setelah dikonfirmasi. Kategori di bab Produk Kami hanya bersifat edukatif." },
    { q: "Berapa biaya transaksinya?", a: "Informasi biaya akan dicantumkan sesuai dokumen resmi. Tanyakan langsung kepada perwakilan dan minta dokumennya." },
    { q: "Bagaimana memastikan legalitas perusahaan?", a: "Minta nomor izin dan cocokkan sendiri melalui situs resmi regulator. Jangan hanya mengandalkan tangkapan layar." },
  ],
};

export const people = {
  intro:
    "Perwakilan Anda bukan sekadar nama di layar. Profil tim BPF Equity Tower akan diperkenalkan di sini setelah nama, peran, dan foto resmi dikonfirmasi.",
  roles: [
    { id: 1, role: "Perwakilan pemasaran", placeholder: true },
    { id: 2, role: "Konsultan edukasi", placeholder: true },
    { id: 3, role: "Layanan nasabah", placeholder: true },
    { id: 4, role: "Kepatuhan", placeholder: true },
  ],
};

export const lessons = [
  { t: "Pengantar trading", d: "Trading adalah membeli dan menjual instrumen untuk mengambil manfaat dari pergerakan harga. Harga bisa bergerak ke arah mana saja." },
  { t: "Istilah dasar", d: "Posisi beli (long), posisi jual (short), margin, lot, dan spread. Pahami setiap istilah sebelum bertransaksi." },
  { t: "Pergerakan pasar", d: "Harga dipengaruhi data ekonomi, kebijakan, peristiwa global, dan sentimen. Tidak ada yang dapat memprediksi dengan pasti." },
  { t: "Manajemen risiko", d: "Gunakan dana yang siap Anda tanggung risikonya, tentukan batas kerugian, dan hindari keputusan karena emosi." },
  { t: "Sebelum memulai", d: "Baca dokumen risiko, ajukan pertanyaan, dan jangan pernah merasa terburu-buru oleh siapa pun." },
];

export const riskNote =
  "Perdagangan berjangka mengandung risiko tinggi dan dapat mengakibatkan kerugian sebagian atau seluruh dana. Materi ini bersifat edukatif dan bukan ajakan atau jaminan hasil.";

export const shareMessage = (url: string) =>
  `Halo, saya ingin berbagi presentasi singkat dari BPF Equity Tower tentang perdagangan berjangka, cara kerjanya, dan risikonya. Silakan dibuka di sini:\n${url}`;
