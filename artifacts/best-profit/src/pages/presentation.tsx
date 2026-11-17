import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, Menu, X, MessageCircle, Share2, Plus, Minus, ImageIcon, ShieldCheck } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  brand, chapters, images, hero, about, products, howItWorks, trust, people, lessons, riskNote, shareMessage, consultMessage,
} from "@/content/presentation";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Tag({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${dark ? "border-[#c9a45c]/50 text-[#e4c98f] bg-[#0f1a33]/60 backdrop-blur" : "border-[#b08a3e]/40 text-[#8a6a2a] bg-[#f6efe1]"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />{children}
    </span>
  );
}

function ChapterHead({ no, title, kicker, dark = false }: { no: string; title: ReactNode; kicker: string; dark?: boolean }) {
  return (
    <Reveal>
      <div className={`flex items-baseline gap-4 text-xs font-semibold uppercase tracking-[0.25em] ${dark ? "text-[#c9a45c]" : "text-[#9a7633]"}`}>
        <span className="font-display text-base normal-case tracking-normal">Bab {no}</span>
        <span className="h-px flex-1 max-w-24 bg-current opacity-50" />
        <span>{kicker}</span>
      </div>
      <h2 className={`font-display mt-5 text-[2.5rem] leading-[1.02] sm:text-6xl lg:text-7xl font-light tracking-tight ${dark ? "text-[#f6f1e7]" : "text-[#13203d]"}`}>{title}</h2>
    </Reveal>
  );
}

function Photo({ src, alt, className = "", label = "Foto ilustrasi — ganti dengan foto resmi" }: { src: string; alt: string; className?: string; label?: string }) {
  return (
    <figure className={`relative overflow-hidden bg-[#13203d] ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      <figcaption className="absolute left-3 top-3"><Tag dark>{label}</Tag></figcaption>
    </figure>
  );
}

function NextChapter({ id, label, onGo, dark = false }: { id: string; label: string; onGo: (id: string) => void; dark?: boolean }) {
  return (
    <button onClick={() => onGo(id)} className={`mt-16 inline-flex min-h-11 items-center gap-2 text-sm font-semibold ${dark ? "text-[#e4c98f]" : "text-[#9a7633]"} hover:underline underline-offset-4`} data-testid={`button-next-${id}`}>
      Lanjut: {label}<ArrowDown className="h-4 w-4" />
    </button>
  );
}

/** Format nomor resmi yang dikonfirmasi ke bentuk wa.me (digit saja, awalan 62). */
function formatWa(n: string | null): string | null {
  if (!n || !/^[+\d\s().-]+$/.test(n)) return null;
  let d = n.replace(/\D/g, "");
  if (d.startsWith("0")) d = "62" + d.slice(1);
  return /^62[1-9]\d{7,12}$/.test(d) ? d : null;
}

export default function Presentation() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [menu, setMenu] = useState(false);
  const [contact, setContact] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const pendingScroll = useRef<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
      let idx = 0;
      chapters.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) idx = i;
      });
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });

  const go = (id: string) => {
    if (menu) { pendingScroll.current = id; setMenu(false); return; }
    scrollTo(id);
  };
  const share = () => {
    const url = window.location.origin + import.meta.env.BASE_URL;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage(url))}`, "_blank", "noopener,noreferrer");
  };
  // Satu-satunya aksi kontak: semua CTA memanggil fungsi ini.
  const consult = () => {
    const wa = formatWa(brand.whatsappNumber);
    if (wa) { window.open(`https://wa.me/${wa}?text=${encodeURIComponent(consultMessage)}`, "_blank", "noopener,noreferrer"); return; }
    if (menu) { setMenu(false); setTimeout(() => setContact(true), 0); return; }
    setContact(true);
  };
  const ctaLabel = "Jadwalkan konsultasi";
  const scrolled = progress > 0.02;
  const cur = chapters[active];
  const next = (i: number) => chapters[i + 1];

  return (
    <div className="grain min-h-[100dvh] bg-[#f6f1e7] text-[#13203d]">
      <a href="#selamat-datang" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-[#f6f1e7] focus:px-4 focus:py-2">Lewati ke konten</a>

      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? "bg-[#0f1a33]/92 backdrop-blur-md" : "bg-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <button onClick={() => go("selamat-datang")} className="flex items-center gap-3 min-h-11" data-testid="link-home" aria-label="Kembali ke awal">
            <span className="flex h-9 items-center rounded-sm bg-[#f6f1e7] px-2"><img src={brand.logo} alt="Logo Best Profit (sumber)" className="h-6 w-auto" /></span>
            <span className="hidden sm:block text-[11px] uppercase tracking-[0.22em] text-[#f6f1e7]/70">{brand.office}</span>
          </button>
          <div className="flex items-center gap-1 text-[#f6f1e7]">
            <span className="mr-3 hidden md:flex items-baseline gap-2 text-xs tracking-wide" aria-live="polite">
              <span className="font-display text-[#c9a45c]">{cur.no}</span><span className="text-[#f6f1e7]/80">{cur.title}</span>
            </span>
            <button onClick={share} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10" aria-label="Bagikan presentasi via WhatsApp" data-testid="button-share-header"><Share2 className="h-5 w-5" /></button>
            <button ref={menuButton} onClick={() => setMenu(true)} className="flex h-11 items-center gap-2 rounded-full px-3 hover:bg-white/10" aria-label="Buka daftar bab" aria-expanded={menu} aria-haspopup="dialog" data-testid="button-menu">
              <span className="hidden sm:inline text-xs uppercase tracking-[0.2em]">Bab</span><Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="h-[2px] bg-white/10" role="progressbar" aria-label="Kemajuan presentasi" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full origin-left bg-[#c9a45c]" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </header>

      <nav aria-label="Navigasi bab" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <ul className="flex flex-col gap-1">
          {chapters.map((c, i) => (
            <li key={c.id}>
              <button onClick={() => go(c.id)} className="group flex h-8 items-center justify-end gap-3" aria-label={`Bab ${c.no}: ${c.title}`} aria-current={i === active ? "step" : undefined} data-testid={`button-rail-${c.id}`}>
                <span className="rounded bg-[#0f1a33] px-2 py-1 text-[11px] text-[#f6f1e7] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{c.title}</span>
                <span className={`block h-px transition-all duration-500 ${i === active ? "w-8 bg-[#c9a45c]" : "w-4 bg-[#8b93a7]"}`} />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Menu bab: Radix Dialog untuk focus trap, Escape, dan pengembalian fokus */}
      <DialogPrimitive.Root open={menu} onOpenChange={setMenu}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Content
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              menuButton.current?.focus({ preventScroll: true });
              const id = pendingScroll.current;
              if (id) { pendingScroll.current = null; scrollTo(id); }
            }}
            className="fixed inset-0 z-[70] overflow-y-auto bg-[#0f1a33] text-[#f6f1e7] data-[state=open]:animate-in data-[state=open]:fade-in-0 duration-300 focus:outline-none"
          >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
              <DialogPrimitive.Title className="text-[11px] uppercase tracking-[0.25em] text-[#c9a45c]">Daftar Bab</DialogPrimitive.Title>
              <DialogPrimitive.Description className="sr-only">Pilih bab untuk langsung menuju bagian tersebut.</DialogPrimitive.Description>
              <DialogPrimitive.Close className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10" aria-label="Tutup daftar bab" data-testid="button-menu-close"><X className="h-6 w-6" /></DialogPrimitive.Close>
            </div>
            <ol className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
              {chapters.map((c, i) => (
                <li key={c.id} className="border-b border-white/10">
                  <button onClick={() => go(c.id)} aria-current={i === active ? "step" : undefined} className="flex w-full items-baseline gap-5 py-4 text-left min-h-14" data-testid={`link-chapter-${c.id}`}>
                    <span className={`font-display text-sm ${i === active ? "text-[#c9a45c]" : "text-white/40"}`}>{c.no}</span>
                    <span className={`font-display text-[1.75rem] leading-tight sm:text-5xl font-light ${i === active ? "text-[#f6f1e7]" : "text-white/70"}`}>{c.title}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-5 pb-12 sm:px-8">
              <button onClick={consult} className="flex min-h-12 items-center gap-2 rounded-full bg-[#c9a45c] px-6 font-semibold text-[#0f1a33]" data-testid="button-menu-contact"><MessageCircle className="h-5 w-5" />{ctaLabel}</button>
              <button onClick={share} className="flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-6" data-testid="button-menu-share"><Share2 className="h-5 w-5" />Bagikan presentasi</button>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

      <main>
        {/* 01 Selamat Datang */}
        <section id="selamat-datang" className="relative flex min-h-[100dvh] items-end overflow-hidden bg-[#0f1a33] text-[#f6f1e7]">
          <img src={images.hero.src} alt={images.hero.alt} className="kenburns absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,26,51,.55)_0%,rgba(15,26,51,.2)_35%,rgba(15,26,51,.92)_85%)]" />
          <div className="absolute right-5 top-24 sm:right-8"><Tag dark>Foto ilustrasi</Tag></div>
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-32 sm:px-8 sm:pb-20">
            <Reveal><p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9a45c]">Bab 01 · {hero.eyebrow}</p></Reveal>
            <Reveal delay={120}><h1 className="font-display mt-5 text-[3.2rem] leading-[0.95] sm:text-8xl lg:text-[8.5rem] font-light tracking-tight">Kenali BPF<br /><em className="text-[#e4c98f]">Equity Tower</em></h1></Reveal>
            <Reveal delay={240}><p className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-[#f6f1e7]/85">{hero.intro}</p></Reveal>
            <Reveal delay={360}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => go("tentang-equity-tower")} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f6f1e7] px-7 font-semibold text-[#0f1a33] transition-transform hover:-translate-y-0.5" data-testid="button-explore">Mulai presentasi<ArrowDown className="h-4 w-4" /></button>
                <button onClick={consult} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#c9a45c]/70 px-7 text-[#f6f1e7] hover:bg-white/5" data-testid="button-hero-whatsapp"><MessageCircle className="h-4 w-4" />{ctaLabel}</button>
              </div>
            </Reveal>
            <div className="mt-14 flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-white/55"><span>8 bab</span><span className="h-px w-10 bg-white/30" /><span>± 7 menit membaca</span></div>
          </div>
        </section>

        {/* 02 Tentang Equity Tower */}
        <section id="tentang-equity-tower" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
          <ChapterHead no="02" kicker="Kantor pusat" title={<>Tentang<br /><em className="text-[#9a7633]">Equity Tower.</em></>} />
          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7"><Photo src={images.lounge.src} alt={images.lounge.alt} className="aspect-[4/5] sm:aspect-[16/11]" /></Reveal>
            <div className="lg:col-span-5 lg:pt-10">
              <Reveal><p className="font-display text-2xl sm:text-3xl leading-snug">{about.lead}</p></Reveal>
              <Reveal delay={100}><p className="mt-5 leading-relaxed text-[#4a5368]">{about.body}</p></Reveal>
              <Reveal delay={200}>
                <dl className="mt-10 border-t border-[#13203d]/15">
                  {about.facts.map((f) => (
                    <div key={f.label} className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-b border-[#13203d]/15 py-4">
                      <dt className="text-[11px] uppercase tracking-[0.18em] text-[#6b7285]">{f.label}</dt>
                      <dd className="row-start-2 font-medium">{f.value}</dd>
                      <span className="row-span-2 self-center"><Tag>Perlu verifikasi</Tag></span>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
          <Reveal className="mt-20"><Photo src={images.corridor.src} alt={images.corridor.alt} className="aspect-[16/10] sm:aspect-[21/8]" label="Foto ilustrasi — ganti dengan foto kantor resmi" /></Reveal>
          <NextChapter id={next(1).id} label={next(1).title} onGo={go} />
        </section>

        {/* 03 Produk Kami */}
        <section id="produk" className="bg-[#0f1a33] text-[#f6f1e7]">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
            <ChapterHead dark no="03" kicker="Perdagangan berjangka" title={<>Kenali kategorinya,<br /><em className="text-[#e4c98f]">sebelum produknya.</em></>} />
            <Reveal><p className="mt-8 max-w-2xl leading-relaxed text-white/75">{products.intro}</p></Reveal>
            <Reveal className="mt-6"><Tag dark>Contoh edukatif — menunggu konfirmasi produk resmi</Tag></Reveal>
            <div className="mt-16 divide-y divide-white/10 border-y border-white/10">
              {products.categories.map((p, i) => (
                <Reveal key={p.name} delay={i * 80}>
                  <div className="grid gap-3 py-8 md:grid-cols-12 md:items-baseline" data-testid={`text-category-${i}`}>
                    <span className="font-display text-sm text-[#c9a45c] md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-3xl sm:text-4xl font-light md:col-span-4">{p.name}</span>
                    <p className="text-sm leading-relaxed text-white/65 md:col-span-7">{p.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <NextChapter dark id={next(2).id} label={next(2).title} onGo={go} />
          </div>
        </section>

        {/* 04 Cara Kerja */}
        <section id="cara-kerja" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
          <ChapterHead no="04" kicker="Mekanisme" title={<>Bagaimana<br /><em className="text-[#9a7633]">transaksi bekerja.</em></>} />
          <Reveal><p className="mt-8 max-w-2xl leading-relaxed text-[#4a5368]">{howItWorks.intro}</p></Reveal>
          <ol className="mt-16 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 90}>
                <li className="list-none border-t border-[#9a7633]/50 py-7 sm:pr-8">
                  <span className="font-display text-5xl font-light text-[#9a7633]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4a5368]">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5"><Photo src={images.consultation.src} alt={images.consultation.alt} className="aspect-[4/5]" /></Reveal>
            <div className="lg:col-span-7 lg:pt-8">
              <Reveal><p className="font-display text-2xl sm:text-3xl leading-snug">Tiga hal yang perlu dipahami dari setiap transaksi.</p></Reveal>
              <dl className="mt-8 border-t border-[#13203d]/15">
                {howItWorks.mechanics.map((m, i) => (
                  <Reveal key={m.k} delay={i * 80}>
                    <div className="border-b border-[#13203d]/15 py-5"><dt className="font-semibold">{m.k}</dt><dd className="mt-1 text-sm leading-relaxed text-[#4a5368]">{m.d}</dd></div>
                  </Reveal>
                ))}
              </dl>
              <Reveal><p className="mt-6 text-sm text-[#6b7285]">Ilustrasi umum, bukan ketentuan resmi. Nilai margin, ukuran kontrak, dan biaya mengikuti dokumen resmi.</p></Reveal>
            </div>
          </div>
          <NextChapter id={next(3).id} label={next(3).title} onGo={go} />
        </section>

        {/* 05 Kepercayaan */}
        <section id="kepercayaan" className="bg-[#ebe2cf]">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
            <ChapterHead no="05" kicker="Transparansi" title={<>Percaya setelah<br /><em className="text-[#9a7633]">memverifikasi.</em></>} />
            <Reveal><p className="mt-8 max-w-2xl leading-relaxed text-[#4a5368]">{trust.intro}</p></Reveal>
            <div className="mt-14 grid gap-12 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <dl className="border-t-2 border-[#c9a45c] bg-[#f6f1e7] p-6 sm:p-7">
                  <p className="font-display text-xl">Legalitas perusahaan</p>
                  {trust.credentials.map((c) => (
                    <div key={c.label} className="border-b border-[#13203d]/10 py-4 last:border-0">
                      <dt className="text-[11px] uppercase tracking-[0.18em] text-[#6b7285]">{c.label}</dt>
                      <dd className="mt-1 font-medium">{c.value}</dd>
                    </div>
                  ))}
                  <p className="mt-3"><Tag>Placeholder — dokumen resmi diperlukan</Tag></p>
                </dl>
              </Reveal>
              <ul className="lg:col-span-7 grid gap-x-8 sm:grid-cols-2">
                {trust.checklist.map((c, i) => (
                  <Reveal key={c.t} delay={i * 80}>
                    <li className="list-none border-t border-[#13203d]/20 py-6">
                      <ShieldCheck className="h-5 w-5 text-[#9a7633]" aria-hidden />
                      <h3 className="mt-3 text-lg font-semibold">{c.t}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#4a5368]">{c.d}</p>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
            <div className="mt-24 grid gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-4"><h3 className="font-display text-3xl font-light">Pertanyaan yang sering diajukan</h3></Reveal>
              <div className="lg:col-span-8">
                {trust.faq.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <div key={f.q} className="border-b border-[#13203d]/20">
                      <button onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} aria-controls={`faq-${i}`} id={`faq-btn-${i}`} className="flex w-full items-center justify-between gap-4 py-5 text-left min-h-14" data-testid={`button-faq-${i}`}>
                        <span className="text-lg">{f.q}</span>{open ? <Minus className="h-5 w-5 shrink-0 text-[#9a7633]" /> : <Plus className="h-5 w-5 shrink-0 text-[#9a7633]" />}
                      </button>
                      <div id={`faq-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} hidden={!open} className="pb-6 pr-8 leading-relaxed text-[#4a5368]">{f.a}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <NextChapter id={next(4).id} label={next(4).title} onGo={go} />
          </div>
        </section>

        {/* 06 Tim Kami */}
        <section id="tim-kami" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
          <ChapterHead no="06" kicker="Tim Equity Tower" title={<>Orang-orang di balik<br /><em className="text-[#9a7633]">setiap percakapan.</em></>} />
          <Reveal><p className="mt-8 max-w-2xl leading-relaxed text-[#4a5368]">{people.intro}</p></Reveal>
          <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
            {people.roles.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <div data-testid={`placeholder-person-${p.id}`}>
                  <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-[#13203d]">
                    <ImageIcon className="h-8 w-8 text-[#c9a45c]/50" aria-hidden />
                    <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.18em] text-white/50">Foto resmi menyusul</span>
                  </div>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#9a7633]">{p.role}</p>
                  <p className="mt-1 font-display text-xl">Nama menyusul</p>
                  <p className="mt-1 text-sm text-[#6b7285]">Profil ditampilkan setelah dikonfirmasi.</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><p className="mt-10 text-sm text-[#6b7285]"><Tag>Placeholder</Tag> <span className="ml-2">Peran di atas adalah kerangka tampilan, bukan susunan tim resmi.</span></p></Reveal>
          <NextChapter id={next(5).id} label={next(5).title} onGo={go} />
        </section>

        {/* 07 Edukasi & Risiko */}
        <section id="edukasi-risiko" className="bg-[#0f1a33] text-[#f6f1e7]">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[45vh] lg:min-h-full"><Photo src={images.learn.src} alt={images.learn.alt} className="absolute inset-0" /></div>
            <div className="px-5 py-24 sm:px-12 sm:py-32">
              <ChapterHead dark no="07" kicker="Edukasi" title={<>Pahami risikonya<br /><em className="text-[#e4c98f]">lebih dulu.</em></>} />
              <ol className="mt-12">
                {lessons.map((l, i) => (
                  <Reveal key={l.t} delay={i * 60}>
                    <li className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-white/10 py-6">
                      <span className="font-display text-[#c9a45c]">{String(i + 1).padStart(2, "0")}</span>
                      <div><h3 className="text-lg font-semibold">{l.t}</h3><p className="mt-2 text-sm leading-relaxed text-white/70">{l.d}</p></div>
                    </li>
                  </Reveal>
                ))}
              </ol>
              <Reveal><p className="mt-6 border border-[#c9a45c]/40 p-5 text-sm leading-relaxed text-[#e4c98f]" role="note"><strong>Peringatan risiko. </strong>{riskNote}</p></Reveal>
              <NextChapter dark id={next(6).id} label={next(6).title} onGo={go} />
            </div>
          </div>
        </section>

        {/* 08 Mari Bicara */}
        <section id="mari-bicara" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-40">
          <ChapterHead no="08" kicker="Konsultasi" title={<>Mari bicara,<br /><em className="text-[#9a7633]">tanpa terburu-buru.</em></>} />
          <div className="mt-16 grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal><p className="text-lg leading-relaxed text-[#4a5368]">Tidak ada keputusan yang perlu diambil hari ini. Ajukan pertanyaan, minta dokumen resmi, dan pahami risikonya bersama tim BPF Equity Tower.</p></Reveal>
              <ol className="mt-10 space-y-5">
                {["Hubungi perwakilan yang membagikan presentasi ini.", "Jadwalkan sesi konsultasi dan edukasi.", "Pelajari dokumen resmi sebelum memutuskan."].map((s, i) => (
                  <Reveal key={s} delay={i * 90}><li className="flex gap-5"><span className="font-display text-2xl text-[#9a7633]">{i + 1}.</span><span className="pt-1 text-lg">{s}</span></li></Reveal>
                ))}
              </ol>
              <Reveal>
                <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                  <button onClick={consult} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#13203d] px-7 font-semibold text-[#f6f1e7] hover:bg-[#1c2c52]" data-testid="button-connect-whatsapp"><MessageCircle className="h-5 w-5" />{ctaLabel}</button>
                  <button onClick={share} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#13203d]/30 px-7 hover:bg-[#13203d]/5" data-testid="button-connect-share"><Share2 className="h-5 w-5" />Bagikan presentasi ini</button>
                </div>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-5">
              <dl className="border-t-2 border-[#c9a45c] bg-[#ebe2cf] p-7 text-sm">
                {[["Perusahaan", brand.legalName], ["Kantor pusat", brand.headquarters], ["Perwakilan Anda", "Menunggu data resmi"], ["WhatsApp resmi", brand.whatsappNumber ? "Tersedia" : "Menunggu konfirmasi"], ["Email & telepon", "Menunggu konfirmasi"]].map(([k, v]) => (
                  <div key={k} className="border-b border-[#13203d]/10 py-3 last:border-0"><dt className="text-[11px] uppercase tracking-[0.18em] text-[#6b7285]">{k}</dt><dd className="mt-1 font-medium">{v}</dd></div>
                ))}
                <p className="mt-4"><Tag>Data kontak perlu verifikasi</Tag></p>
              </dl>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-[#0b1427] px-5 pb-28 pt-12 text-xs leading-relaxed text-white/55 sm:px-8 sm:pb-12">
        <div className="mx-auto max-w-7xl space-y-4">
          <p className="max-w-3xl">{riskNote}</p>
          <p>Seluruh foto pada presentasi ini adalah ilustrasi dan akan diganti dengan foto resmi. {brand.logoNote}.</p>
          <p className="text-white/35">© {brand.legalName} · {brand.office} · Presentasi Prospek</p>
        </div>
      </footer>

      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pb-[env(safe-area-inset-bottom)]">
        <button onClick={() => go("selamat-datang")} aria-label="Kembali ke atas" className={`flex h-11 w-11 items-center justify-center rounded-full border border-[#13203d]/15 bg-[#f6f1e7] text-[#13203d] shadow-md transition-opacity duration-300 ${progress > 0.08 ? "opacity-100" : "pointer-events-none opacity-0"}`} tabIndex={progress > 0.08 ? 0 : -1} aria-hidden={progress > 0.08 ? undefined : true} data-testid="button-back-to-top"><ArrowUp className="h-5 w-5" /></button>
        <button onClick={consult} aria-label={ctaLabel} className="flex h-14 items-center gap-2 rounded-full bg-[#c9a45c] px-5 font-semibold text-[#0f1a33] shadow-[0_10px_30px_-10px_rgba(15,26,51,.6)]" data-testid="button-floating-whatsapp"><MessageCircle className="h-5 w-5" /><span className="hidden sm:inline">Konsultasi</span></button>
      </div>

      <Dialog open={contact} onOpenChange={setContact}>
        <DialogContent className="w-[calc(100%-2rem)] border-0 bg-[#f6f1e7] p-7 sm:p-8 sm:rounded-none border-t-4 border-t-[#c9a45c]">
          <DialogTitle className="font-display pr-6 text-2xl sm:text-3xl font-light text-[#13203d]">Nomor WhatsApp resmi sedang dikonfirmasi</DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-[#4a5368]">
            Kami tidak membuka percakapan ke nomor yang belum terverifikasi. Untuk menjadwalkan konsultasi, silakan balas langsung kepada perwakilan BPF Equity Tower yang mengirimkan tautan ini kepada Anda, melalui percakapan yang sama.
          </DialogDescription>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => setContact(false)} className="min-h-12 rounded-full bg-[#13203d] px-6 font-semibold text-[#f6f1e7]" data-testid="button-dialog-close">Mengerti</button>
            <button onClick={share} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#13203d]/30 px-6" data-testid="button-dialog-share"><Share2 className="h-4 w-4" />Bagikan presentasi</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
