import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, Menu, X, MessageCircle, Share2, Plus, Minus, ImageIcon, UserRound, Video } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  brand, chapters, images, hero, about, products, testimonials, marketers, professionals, lessons, riskNote, shareMessage,
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
      <h2 className={`font-display mt-5 text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl font-light tracking-tight ${dark ? "text-[#f6f1e7]" : "text-[#13203d]"}`}>{title}</h2>
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

export default function Presentation() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [menu, setMenu] = useState(false);
  const [contact, setContact] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    if (!menu) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [menu]);

  const go = (id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  const share = () => {
    const url = window.location.origin + import.meta.env.BASE_URL;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage(url))}`, "_blank", "noopener,noreferrer");
  };
  const scrolled = progress > 0.02;
  const cur = chapters[active];

  return (
    <div className="grain min-h-[100dvh] bg-[#f6f1e7] text-[#13203d]">
      <a href="#selamat-datang" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-[#f6f1e7] focus:px-4 focus:py-2">Lewati ke konten</a>

      {/* Header */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? "bg-[#0f1a33]/92 backdrop-blur-md" : "bg-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <button onClick={() => go("selamat-datang")} className="flex items-center gap-3 min-h-11" data-testid="link-home" aria-label="Kembali ke awal">
            <span className="flex h-9 items-center rounded-sm bg-[#f6f1e7] px-2"><img src={brand.logo} alt="Logo Best Profit (sumber)" className="h-6 w-auto" /></span>
            <span className="hidden sm:block text-[11px] uppercase tracking-[0.22em] text-[#f6f1e7]/70">Presentasi Digital</span>
          </button>
          <div className="flex items-center gap-1 text-[#f6f1e7]">
            <span className="mr-3 hidden md:flex items-baseline gap-2 text-xs tracking-wide" aria-live="polite">
              <span className="font-display text-[#c9a45c]">{cur.no}</span><span className="text-[#f6f1e7]/80">{cur.title}</span>
            </span>
            <button onClick={share} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10" aria-label="Bagikan via WhatsApp" data-testid="button-share-header"><Share2 className="h-5 w-5" /></button>
            <button onClick={() => setMenu(true)} className="flex h-11 items-center gap-2 rounded-full px-3 hover:bg-white/10" aria-label="Buka daftar bab" aria-expanded={menu} data-testid="button-menu">
              <span className="hidden sm:inline text-xs uppercase tracking-[0.2em]">Bab</span><Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="h-[2px] bg-white/10" role="progressbar" aria-label="Kemajuan presentasi" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full origin-left bg-[#c9a45c]" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </header>

      {/* Desktop chapter rail */}
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

      {/* Mobile/overlay menu */}
      {menu && (
        <div role="dialog" aria-modal="true" aria-label="Daftar bab" className="fixed inset-0 z-[70] overflow-y-auto bg-[#0f1a33] text-[#f6f1e7] animate-in fade-in duration-300">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#c9a45c]">Daftar Bab</span>
            <button autoFocus onClick={() => setMenu(false)} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10" aria-label="Tutup daftar bab" data-testid="button-menu-close"><X className="h-6 w-6" /></button>
          </div>
          <ol className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
            {chapters.map((c, i) => (
              <li key={c.id} className="border-b border-white/10">
                <button onClick={() => go(c.id)} className="flex w-full items-baseline gap-5 py-4 text-left min-h-14" data-testid={`link-chapter-${c.id}`}>
                  <span className={`font-display text-sm ${i === active ? "text-[#c9a45c]" : "text-white/40"}`}>{c.no}</span>
                  <span className={`font-display text-3xl sm:text-5xl font-light ${i === active ? "text-[#f6f1e7]" : "text-white/70"}`}>{c.title}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-5 pb-12 sm:px-8">
            <button onClick={() => { setMenu(false); setContact(true); }} className="flex min-h-12 items-center gap-2 rounded-full bg-[#c9a45c] px-6 font-semibold text-[#0f1a33]" data-testid="button-menu-contact"><MessageCircle className="h-5 w-5" />Hubungi via WhatsApp</button>
            <button onClick={share} className="flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-6" data-testid="button-menu-share"><Share2 className="h-5 w-5" />Bagikan presentasi</button>
          </div>
        </div>
      )}

      <main>
        {/* 01 Hero */}
        <section id="selamat-datang" className="relative flex min-h-[100dvh] items-end overflow-hidden bg-[#0f1a33] text-[#f6f1e7]">
          <img src={images.hero.src} alt={images.hero.alt} className="kenburns absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,26,51,.55)_0%,rgba(15,26,51,.2)_35%,rgba(15,26,51,.92)_85%)]" />
          <div className="absolute right-5 top-24 sm:right-8"><Tag dark>Foto ilustrasi</Tag></div>
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-32 sm:px-8 sm:pb-20">
            <Reveal><p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9a45c]">Bab 01 · {hero.eyebrow}</p></Reveal>
            <Reveal delay={120}><h1 className="font-display mt-5 text-[3.6rem] leading-[0.95] sm:text-8xl lg:text-[9rem] font-light tracking-tight">Kenali<br /><em className="text-[#e4c98f]">Best Profit</em></h1></Reveal>
            <Reveal delay={240}><p className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-[#f6f1e7]/85">{hero.intro}</p></Reveal>
            <Reveal delay={360}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => go("mengenal-kami")} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f6f1e7] px-7 font-semibold text-[#0f1a33] transition-transform hover:-translate-y-0.5" data-testid="button-explore">Mulai presentasi<ArrowDown className="h-4 w-4" /></button>
                <button onClick={() => setContact(true)} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#c9a45c]/70 px-7 text-[#f6f1e7] hover:bg-white/5" data-testid="button-hero-whatsapp"><MessageCircle className="h-4 w-4" />Hubungi via WhatsApp</button>
              </div>
            </Reveal>
            <div className="mt-14 flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-white/55"><span>8 bab</span><span className="h-px w-10 bg-white/30" /><span>± 6 menit membaca</span></div>
          </div>
        </section>

        {/* 02 About */}
        <section id="mengenal-kami" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
          <ChapterHead no="02" kicker="Profil" title={<>Mengenal kami,<br /><em className="text-[#9a7633]">tanpa basa-basi.</em></>} />
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
          <div className="mt-20 grid gap-10 sm:grid-cols-2 sm:gap-16">
            {[["Visi", about.vision], ["Misi", about.mission]].map(([k, v], i) => (
              <Reveal key={k} delay={i * 120}>
                <p className="font-display text-sm text-[#9a7633]">{k}</p>
                <p className="mt-3 font-display text-2xl font-light italic text-[#13203d]/55">{v}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-20"><Photo src={images.corridor.src} alt={images.corridor.alt} className="aspect-[16/10] sm:aspect-[21/8]" label="Foto ilustrasi — lingkungan & aktivitas kantor" /></Reveal>
        </section>

        {/* 03 Products */}
        <section id="produk" className="bg-[#0f1a33] text-[#f6f1e7]">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
            <ChapterHead dark no="03" kicker="Produk & layanan" title={<>Pahami dulu,<br /><em className="text-[#e4c98f]">baru putuskan.</em></>} />
            <Reveal><p className="mt-8 max-w-2xl leading-relaxed text-white/75">{products.intro}</p></Reveal>
            <Reveal className="mt-6"><Tag dark>Contoh edukatif — bukan spesifikasi resmi</Tag></Reveal>

            <ol className="mt-16 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
              {products.steps.map((s, i) => (
                <Reveal key={s.t} delay={i * 90}>
                  <li className="list-none border-t border-[#c9a45c]/40 py-7 sm:pr-8">
                    <span className="font-display text-5xl font-light text-[#c9a45c]">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{s.d}</p>
                  </li>
                </Reveal>
              ))}
            </ol>

            <div className="mt-20 divide-y divide-white/10 border-y border-white/10">
              {products.examples.map((p) => (
                <Reveal key={p.name}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3 py-6">
                    <span className="font-display text-3xl sm:text-4xl font-light">{p.name}</span>
                    <span className="text-xs uppercase tracking-[0.18em] text-white/50">{p.kind}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-24 grid gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-4"><h3 className="font-display text-3xl font-light">Pertanyaan yang sering diajukan</h3></Reveal>
              <div className="lg:col-span-8">
                {products.faq.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <div key={f.q} className="border-b border-white/15">
                      <button onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} aria-controls={`faq-${i}`} className="flex w-full items-center justify-between gap-4 py-5 text-left min-h-14" data-testid={`button-faq-${i}`}>
                        <span className="text-lg">{f.q}</span>{open ? <Minus className="h-5 w-5 shrink-0 text-[#c9a45c]" /> : <Plus className="h-5 w-5 shrink-0 text-[#c9a45c]" />}
                      </button>
                      <div id={`faq-${i}`} hidden={!open} className="pb-6 pr-8 leading-relaxed text-white/70">{f.a}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 04 Testimonials */}
        <section id="pengalaman-klien" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
          <ChapterHead no="04" kicker="Suara klien" title={<>Cerita nyata,<br /><em className="text-[#9a7633]">dengan izin.</em></>} />
          <Reveal>
            <blockquote className="mt-16 border-l-2 border-[#c9a45c] pl-6 sm:pl-10">
              <p className="font-display text-3xl sm:text-5xl font-light leading-tight text-[#13203d]/35">“Ruang ini disediakan untuk kutipan klien yang asli, telah disetujui, dan telah ditinjau.”</p>
              <footer className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#6b7285]"><Tag>Placeholder testimoni</Tag>Belum ada testimoni terverifikasi yang diterbitkan.</footer>
            </blockquote>
          </Reveal>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {testimonials.slots.map((t, i) => (
              <Reveal key={t.id} delay={i * 100}>
                <div className="flex aspect-[3/4] flex-col justify-between border border-dashed border-[#13203d]/25 bg-[#efe7d6] p-5" data-testid={`placeholder-testimonial-${t.id}`}>
                  <div className="flex justify-between text-[#13203d]/40">{i === 1 ? <Video className="h-6 w-6" /> : <UserRound className="h-6 w-6" />}<span className="font-display text-sm">0{t.id}</span></div>
                  <div><p className="font-display text-xl">{i === 1 ? "Slot video testimoni" : "Slot potret & kisah klien"}</p><p className="mt-2 text-sm text-[#6b7285]">Nama tampilan, periode, konteks, dan persetujuan tertulis diperlukan sebelum terbit.</p></div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><p className="mt-10 max-w-3xl text-sm leading-relaxed text-[#6b7285]"><strong className="text-[#13203d]">Pengungkapan: </strong>{testimonials.disclosure}</p></Reveal>
        </section>

        {/* 05 Marketing */}
        <section id="pencapaian-marketing" className="bg-[#ebe2cf]">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
            <ChapterHead no="05" kicker="Tim marketing" title={<>Orang-orang di balik<br /><em className="text-[#9a7633]">setiap percakapan.</em></>} />
            <div className="mt-16 grid gap-12 lg:grid-cols-12">
              <Reveal className="lg:col-span-6"><Photo src={images.consultation.src} alt={images.consultation.alt} className="aspect-[4/5]" /></Reveal>
              <div className="lg:col-span-6 lg:pt-16">
                <Reveal><p className="font-display text-2xl sm:text-3xl leading-snug">Perwakilan Anda bukan sekadar nama di layar. Di sini, profil, perjalanan karier, dan pencapaian yang telah diverifikasi akan diperkenalkan satu per satu.</p></Reveal>
                <ul className="mt-12 divide-y divide-[#13203d]/15 border-y border-[#13203d]/15">
                  {marketers.map((m, i) => (
                    <Reveal key={m.id} delay={i * 90}>
                      <li className="flex items-center gap-5 py-5" data-testid={`placeholder-marketer-${m.id}`}>
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#13203d] font-display text-[#c9a45c]">M{m.id}</span>
                        <div className="flex-1"><p className="font-semibold">Profil marketing {m.id}</p><p className="text-sm text-[#6b7285]">Foto, kisah karier & pencapaian terverifikasi menyusul</p></div>
                        <Tag>Placeholder</Tag>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 06 Professionals */}
        <section id="profesional" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
          <ChapterHead no="06" kicker="Tim pendukung" title={<>Para profesional<br /><em className="text-[#9a7633]">yang mendampingi.</em></>} />
          <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
            {professionals.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <div data-testid={`placeholder-professional-${p.id}`}>
                  <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-[#13203d]">
                    <ImageIcon className="h-8 w-8 text-[#c9a45c]/50" aria-hidden />
                    <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.18em] text-white/50">Foto resmi menyusul</span>
                  </div>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#9a7633]">{p.role}</p>
                  <p className="mt-1 font-display text-xl">Nama menyusul</p>
                  <p className="mt-1 text-sm text-[#6b7285]">Keahlian & latar belakang akan dicantumkan setelah diverifikasi.</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 07 Learn */}
        <section id="belajar" className="bg-[#0f1a33] text-[#f6f1e7]">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[50vh] lg:min-h-full"><Photo src={images.learn.src} alt={images.learn.alt} className="absolute inset-0" /></div>
            <div className="px-5 py-24 sm:px-12 sm:py-32">
              <ChapterHead dark no="07" kicker="Edukasi" title={<>Belajar sebelum<br /><em className="text-[#e4c98f]">melangkah.</em></>} />
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
              <Reveal><p className="mt-6 border border-[#c9a45c]/40 p-5 text-sm leading-relaxed text-[#e4c98f]"><strong>Peringatan risiko. </strong>{riskNote}</p></Reveal>
            </div>
          </div>
        </section>

        {/* 08 Connect */}
        <section id="terhubung" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-40">
          <ChapterHead no="08" kicker="Langkah berikutnya" title={<>Percakapan Anda<br /><em className="text-[#9a7633]">dimulai di sini.</em></>} />
          <div className="mt-16 grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal><p className="text-lg leading-relaxed text-[#4a5368]">Tidak ada keputusan yang perlu diambil hari ini. Ajukan pertanyaan, minta dokumen resmi, dan pahami risikonya bersama perwakilan kami.</p></Reveal>
              <ol className="mt-10 space-y-5">
                {["Hubungi perwakilan melalui WhatsApp.", "Jadwalkan sesi konsultasi dan edukasi.", "Pelajari dokumen resmi sebelum memutuskan."].map((s, i) => (
                  <Reveal key={s} delay={i * 90}><li className="flex gap-5"><span className="font-display text-2xl text-[#9a7633]">{i + 1}.</span><span className="pt-1 text-lg">{s}</span></li></Reveal>
                ))}
              </ol>
              <Reveal>
                <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                  <button onClick={() => setContact(true)} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#13203d] px-7 font-semibold text-[#f6f1e7] hover:bg-[#1c2c52]" data-testid="button-connect-whatsapp"><MessageCircle className="h-5 w-5" />Hubungi via WhatsApp</button>
                  <button onClick={share} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#13203d]/30 px-7 hover:bg-[#13203d]/5" data-testid="button-connect-share"><Share2 className="h-5 w-5" />Bagikan presentasi ini</button>
                </div>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-5">
              <dl className="border-t-2 border-[#c9a45c] bg-[#ebe2cf] p-7 text-sm">
                {[["Perusahaan", brand.legalName], ["Kantor pusat", brand.headquarters], ["Perwakilan Anda", "Menunggu data resmi"], ["WhatsApp resmi", "Menunggu konfirmasi"], ["Email & telepon", "Menunggu konfirmasi"]].map(([k, v]) => (
                  <div key={k} className="border-b border-[#13203d]/10 py-3 last:border-0"><dt className="text-[11px] uppercase tracking-[0.18em] text-[#6b7285]">{k}</dt><dd className="mt-1 font-medium">{v}</dd></div>
                ))}
                <p className="mt-4"><Tag>Data kontak perlu verifikasi</Tag></p>
              </dl>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-[#0b1427] px-5 py-12 text-xs leading-relaxed text-white/55 sm:px-8">
        <div className="mx-auto max-w-7xl space-y-4">
          <p className="max-w-3xl">{riskNote}</p>
          <p>Seluruh foto pada presentasi ini adalah ilustrasi dan akan diganti dengan foto resmi. {brand.logoNote}.</p>
          <p className="text-white/35">© {brand.name} · Presentasi Digital · Fase 1</p>
        </div>
      </footer>

      {/* Floating controls */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pb-[env(safe-area-inset-bottom)]">
        <button onClick={() => go("selamat-datang")} aria-label="Kembali ke atas" className={`flex h-11 w-11 items-center justify-center rounded-full border border-[#13203d]/15 bg-[#f6f1e7] text-[#13203d] shadow-md transition-opacity duration-300 ${progress > 0.08 ? "opacity-100" : "pointer-events-none opacity-0"}`} tabIndex={progress > 0.08 ? 0 : -1} data-testid="button-back-to-top"><ArrowUp className="h-5 w-5" /></button>
        <button onClick={() => setContact(true)} aria-label="Hubungi via WhatsApp" className="flex h-14 items-center gap-2 rounded-full bg-[#c9a45c] px-5 font-semibold text-[#0f1a33] shadow-[0_10px_30px_-10px_rgba(15,26,51,.6)]" data-testid="button-floating-whatsapp"><MessageCircle className="h-5 w-5" /><span className="hidden sm:inline">WhatsApp</span></button>
      </div>

      <Dialog open={contact} onOpenChange={setContact}>
        <DialogContent className="border-0 bg-[#f6f1e7] p-8 sm:rounded-none border-t-4 border-t-[#c9a45c]">
          <DialogTitle className="font-display text-3xl font-light text-[#13203d]">WhatsApp resmi sedang dikonfirmasi</DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-[#4a5368]">
            Nomor WhatsApp resmi Best Profit belum ditetapkan untuk presentasi ini, sehingga kami tidak akan membuka percakapan ke nomor yang belum terverifikasi. Silakan hubungi perwakilan yang membagikan tautan ini kepada Anda melalui percakapan yang sama.
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
