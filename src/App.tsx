
import { useEffect, useState } from "react";
import {
  ShieldCheck, Leaf, Clock, CalendarDays, Repeat, BookOpen, Check, X, Star,
  ChevronDown, Flame, Gift, Lock, Zap, Heart, ShoppingBag,
} from "lucide-react";
const cover = {url: "/assets/cover.jpg"};
const page13 = {url: "/assets/page13.jpg"};
const page55 = {url: "/assets/page55.jpg"};

const CHECKOUT = "https://pay.hotmart.com/B108221222R?checkoutMode=10";
const PRICE = "5.90";
const FROM = "25.00";



function Cta({ className = "" }: { className?: string }) {
  return (
    <a
      href={CHECKOUT}
      className={`pulse-cta inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-bold uppercase tracking-wide text-primary-foreground transition hover:scale-[1.03] py-3 md:min-h-14 md:w-auto md:px-5 lg:px-8 lg:text-base ${className}`}
    >
      <ShoppingBag className="h-5 w-5" />
      <span className="md:hidden">Get My Cookbook</span>
      <span className="hidden md:inline">Get My Cookbook for ${PRICE}</span>
    </a>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Timer() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const key = "ihc-deadline";
    let end = Number(localStorage.getItem(key));
    if (!end || end < Date.now()) { end = Date.now() + 15 * 60 * 1000; localStorage.setItem(key, String(end)); }
    const t = setInterval(() => setLeft(Math.max(0, end - Date.now())), 1000);
    setLeft(end - Date.now());
    return () => clearInterval(t);
  }, []);
  const s = Math.floor((left ?? 900000) / 1000);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return (
    <div className="sticky top-0 z-40 bg-secondary px-4 py-2 text-center text-xs font-semibold text-secondary-foreground md:text-sm">
      <Flame className="mr-1 inline h-4 w-4" /> 76% OFF — offer ends in <span className="font-display text-base tabular-nums">{mm}:{ss}</span>
    </div>
  );
}

const buyers = ["Emma from Austin, Texas", "James from London, UK", "Olivia from Toronto, Canada", "William from Sydney, Australia", "Charlotte from Seattle, Washington", "Henry from Manchester, UK", "Amelia from Vancouver, Canada", "Noah from Melbourne, Australia"];
function SalesToast() {
  const [i, setI] = useState<number | null>(null);
  useEffect(() => {
    let n = 0;
    let hide: ReturnType<typeof setTimeout>;
    const show = () => { setI(n++ % buyers.length); hide = setTimeout(() => setI(null), 4500); };
    const first = setTimeout(show, 4000);
    const interval = setInterval(show, 11000);
    return () => { clearTimeout(first); clearTimeout(hide); clearInterval(interval); };
  }, []);
  return <div role="status" className={`fixed bottom-4 left-4 z-50 flex max-w-[280px] items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-2xl transition-all duration-500 ${i === null ? "pointer-events-none translate-y-6 opacity-0" : "opacity-100"}`}>
    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-primary"><Check className="h-5 w-5" /></div><p className="text-xs leading-snug"><b>{buyers[i ?? 0]}</b><br />just purchased the Immune Health Cookbook</p>
  </div>;
}

function ExitPopup() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (e.clientY <= 0 && !sessionStorage.getItem("ihc-exit")) { sessionStorage.setItem("ihc-exit", "1"); setOpen(true); } };
    document.addEventListener("mouseout", h);
    return () => document.removeEventListener("mouseout", h);
  }, []);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-background/80 p-4 backdrop-blur" onClick={() => setOpen(false)}>
      <div className="relative w-full max-w-md rounded-3xl border border-primary/40 bg-card p-6 text-center glow-primary md:p-8" onClick={(e) => e.stopPropagation()}>
        <button aria-label="Close" onClick={() => setOpen(false)} className="absolute right-4 top-4 text-muted-foreground"><X className="h-5 w-5" /></button>
        <Gift className="mx-auto h-12 w-12 text-secondary" />
        <h3 className="font-display mt-3 text-2xl font-extrabold">Before you go…</h3>
        <p className="mt-2 text-sm text-muted-foreground">Get the complete cookbook plus all 3 bonuses for just <b className="text-primary">${PRICE}</b>. One payment. Yours to keep.</p>
        <Cta className="mt-6 md:w-full" />
        <button onClick={() => setOpen(false)} className="mt-3 text-xs text-muted-foreground underline">No thanks, I’ll keep browsing</button>
      </div>
    </div>
  );
}

const Section = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`px-4 py-14 md:px-6 md:py-20 lg:px-8 lg:py-24 ${className}`}><div className="reveal mx-auto max-w-6xl">{children}</div></section>
);
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary md:text-sm">{children}</p>
);
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-2xl font-extrabold leading-tight md:text-4xl lg:text-5xl">{children}</h2>
);

const benefits = [
  { icon: BookOpen, t: "35 complete recipes", d: "Breakfasts, lunches, dinners, soups, and snacks made with everyday grocery store ingredients." },
  { icon: CalendarDays, t: "7-day meal plan", d: "A ready-to-follow plan that takes the guesswork out of your week." },
  { icon: Repeat, t: "Easy ingredient swaps", d: "Missing an ingredient? Find simple, practical substitutions for each recipe." },
  { icon: Leaf, t: "Nutrition notes", d: "Learn about the nutrients in each dish, from vitamin C and zinc to fiber and protein." },
  { icon: Clock, t: "Quick, everyday meals", d: "Recipes designed for busy days, with many ready in under 30 minutes." },
  { icon: ShieldCheck, t: "Evidence-informed", d: "A food-first approach with cited sources and practical nutrition guidance." },
];

const testimonials = [
  { n: "Margaret W., 52", t: "I used to catch colds all winter. Since following the 7-day meal plan, eating better has become so much easier. The lentil soup is now a family favorite." },
  { n: "James R., 38", t: "For less than the price of a snack, I got 35 recipes my whole family enjoys. The turkey chili is fantastic." },
  { n: "Emily T., 29", t: "I love the ingredient swaps! I’m vegetarian and was able to adapt almost everything. Beautifully put together and easy to follow." },
  { n: "Robert H., 61", t: "My doctor recommended improving my diet. This cookbook made it simple and delicious. I highly recommend it." },
];

const faqs = [
  { q: "How will I receive my cookbook?", a: "Once your payment is confirmed, you’ll receive an email with access to download your PDF." },
  { q: "What language is the cookbook in?", a: "The entire cookbook is in English, with clear instructions and illustrations for each dish." },
  { q: "Will I need expensive or hard-to-find ingredients?", a: "No. The recipes use familiar ingredients such as beans, lentils, oats, fruit, vegetables, eggs, and chicken." },
  { q: "Is it suitable for vegetarians?", a: "Yes. Many recipes are already vegetarian, and the others include practical substitutions." },
  { q: "Can I read it on my phone?", a: "Absolutely. Open the PDF on your phone, tablet, or computer, or print a copy for your kitchen." },
  { q: "Why is the price so low?", a: "This is a limited-time introductory offer. The regular price is $25.00 USD." },
  { q: "What if it’s not right for me?", a: "You’re covered by a 7-day money-back guarantee. Request a refund within 7 days for a full refund." },
];

export default function Index() {
  useReveal();
  const [faq, setFaq] = useState<number | null>(0);
  return (
    <main className="overflow-x-hidden">
      <Timer />
      <SalesToast />
      <ExitPopup />

      {/* HERO */}
      <section className="bg-hero px-4 pb-16 pt-10 md:px-6 md:pb-24 md:pt-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary/50 bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary"><Zap className="h-3.5 w-3.5" /> INTRODUCTORY OFFER — 76% OFF</span>
            <h1 className="font-display mt-5 text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Support your immune health <span className="text-primary text-glow">with everyday meals</span>, one delicious recipe at a time.
            </h1>
            <p className="mt-5 text-sm text-muted-foreground md:text-lg">
              Make healthy eating easier with 35 delicious recipes, a 7-day meal plan, and helpful nutrition notes. Simple ingredients. Real food. Everyday habits.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 lg:flex-row md:items-start lg:items-center md:gap-5">
              <Cta />
              <div className="text-sm">
                <span className="text-muted-foreground line-through">${FROM}</span>{" "}
                <span className="font-display text-2xl font-extrabold text-primary">${PRICE}</span>
              </div>
            </div>
            <p className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground md:justify-start">
              <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> Secure checkout</span>
              <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> 7-day money-back guarantee</span>
            </p>
          </div>
          <div className="relative mx-auto w-64 md:w-80 lg:w-96">
            <div className="absolute -inset-6 rounded-[2rem] bg-primary/20 blur-3xl" />
            <img src={cover.url} alt="Immune Health Cookbook cover — 35 Everyday Recipes to Support Immune Health" className="float relative rounded-2xl shadow-2xl ring-1 ring-border" />
            <div className="absolute -right-3 -top-3 grid h-20 w-20 rotate-12 place-items-center rounded-full bg-secondary text-center text-secondary-foreground glow-secondary md:h-24 md:w-24">
              <span className="font-display text-xs font-extrabold leading-tight md:text-sm">-76%<br />TODAY</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Sound familiar?</Eyebrow>
          <H2>Want to eat better, but don’t know where to start?</H2>
          <div className="mt-8 grid gap-3 text-left md:grid-cols-2">
            {["You want to make more nourishing food choices", "Your meals feel repetitive and uninspiring", "You’re never sure what healthy meal to cook", "Healthy food sounds bland or boring", "Busy days mean more takeout and packaged meals", "Conflicting nutrition advice leaves you confused"].map((p) => (
              <div key={p} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm md:text-base">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-secondary" /> {p}
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground md:text-lg">Eating well can feel like one more thing on your to-do list. <b className="text-foreground">What if your next healthy meal were already planned?</b></p>
        </div>
      </Section>

      {/* SOLUÇÃO */}
      <Section className="bg-card/50">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <img src={page13.url} alt="Recipe preview: Berry Yogurt Overnight Oats" loading="lazy" className="rounded-xl shadow-xl ring-1 ring-border" />
            <img src={page55.url} alt="Recipe preview: Lemon Herb Salmon" loading="lazy" className="mt-8 rounded-xl shadow-xl ring-1 ring-border" />
          </div>
          <div>
            <Eyebrow>Meet your new kitchen companion</Eyebrow>
            <H2>Immune Health Cookbook</H2>
            <p className="mt-4 text-sm text-muted-foreground md:text-lg">An evidence-informed cookbook built around a <b className="text-foreground">"food-first" approach</b>. Enjoy satisfying, nutritious recipes that make balanced eating part of your everyday routine.</p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-4"><p className="mb-2 font-bold text-secondary">Before</p><p className="text-muted-foreground">Last-minute decisions and another takeout order</p></div>
              <div className="rounded-xl border border-primary/40 bg-accent p-4"><p className="mb-2 font-bold text-primary">After</p><p className="text-muted-foreground">A clear meal plan and nourishing food you enjoy</p></div>
            </div>
          </div>
        </div>
      </Section>

      {/* BENEFÍCIOS */}
      <Section>
        <div className="text-center"><Eyebrow>What’s inside</Eyebrow><H2>91 pages of everyday inspiration</H2></div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: I, t, d }) => (
            <div key={t} className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/50">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-primary transition group-hover:rotate-6 group-hover:scale-110"><I className="h-6 w-6" /></div>
              <h3 className="font-display mt-4 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-card p-6 md:p-8">
          <h3 className="font-display text-lg font-bold md:text-xl">A taste of what’s inside:</h3>
          <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
            {["Berry overnight oats", "Lemon salmon with broccoli and potatoes", "Lentil, carrot, and ginger soup", "Turkey and bean chili", "Sweet potato and black bean stew", "Chickpea and sweet potato bowl", "Kiwi chia pudding", "Cocoa, oat, and peanut butter bites", "Roasted red pepper hummus"].map((r) => (
              <p key={r} className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-primary" /> {r}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* PROVA SOCIAL */}
      <Section className="bg-card/50">
        <div className="text-center"><Eyebrow>Reader reviews</Eyebrow><H2>Join 2,300+ readers making better meals</H2></div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.n} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex gap-1 text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-3 text-sm md:text-base">"{t.t}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-accent font-bold text-primary">{t.n[0]}</div>
                <p className="text-sm font-semibold">{t.n}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3 text-center">
          {([["2,300+", "readers"], ["4.9/5", "rating"], ["35", "recipes"]] as [string, string][]).map(([a, b]) => (
            <div key={b} className="rounded-xl border border-border bg-card p-4"><p className="font-display text-2xl font-extrabold text-primary md:text-3xl">{a}</p><p className="text-xs text-muted-foreground md:text-sm">{b}</p></div>
          ))}
        </div>
      </Section>

      {/* OFERTA */}
      <Section id="offer">
        <div className="mx-auto max-w-2xl rounded-3xl border-2 border-primary/60 bg-card p-6 text-center glow-primary md:p-10">
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">LIMITED-TIME INTRODUCTORY OFFER</span>
          <h2 className="font-display mt-4 text-2xl font-extrabold md:text-4xl">The Complete Cookbook Bundle</h2>
          <ul className="mt-6 space-y-3 text-left text-sm md:text-base">
            {([["Immune Health Cookbook (35 recipes)", "$25"], ["Bonus 1: 7-day meal plan", "$9"], ["Bonus 2: Ingredient substitution guide", "$7"], ["Bonus 3: Ready-to-use shopping list", "$5"]] as [string, string][]).map(([a, b]) => (
              <li key={a} className="flex items-center justify-between gap-3 border-b border-border pb-3">
                <span className="flex items-center gap-2">{a.startsWith("Bonus") ? <Gift className="h-4 w-4 shrink-0 text-secondary" /> : <BookOpen className="h-4 w-4 shrink-0 text-primary" />}{a}</span>
                <span className="text-muted-foreground line-through">{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">Total value: <span className="line-through">$46</span> • Regular price: <span className="line-through">${FROM}</span></p>
          <p className="mt-2 text-sm font-semibold">Get the complete bundle for</p>
          <p className="font-display text-5xl font-extrabold text-primary text-glow md:text-7xl">${PRICE}</p>
          <p className="mt-1 text-xs text-muted-foreground">Prices in USD • One-time payment • Instant PDF download</p>
          <Cta className="mt-6 md:w-full" />
          <div className="mt-6 flex items-center gap-4 rounded-2xl bg-muted p-4 text-left">
            <ShieldCheck className="h-12 w-12 shrink-0 text-primary" />
            <p className="text-xs md:text-sm"><b>7-day money-back guarantee.</b> If it’s not right for you, request a full refund within 7 days. No questions asked.</p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-card/50">
        <div className="mx-auto max-w-3xl">
          <div className="text-center"><Eyebrow>Your questions, answered</Eyebrow><H2>Frequently asked questions</H2></div>
          <div className="mt-8 space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="rounded-xl border border-border bg-card">
                <button aria-expanded={faq === i} onClick={() => setFaq(faq === i ? null : i)} className="flex w-full items-center justify-between gap-3 p-4 text-left text-sm font-semibold md:text-base">
                  {f.q}<ChevronDown className={`h-5 w-5 shrink-0 text-primary transition ${faq === i ? "rotate-180" : ""}`} />
                </button>
                {faq === i && <p className="px-4 pb-4 text-sm text-muted-foreground">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section className="bg-hero">
        <div className="mx-auto max-w-3xl text-center">
          <Heart className="mx-auto h-10 w-10 text-secondary" />
          <H2>Your next healthy habit starts with a meal</H2>
          <p className="mt-4 text-sm text-muted-foreground md:text-lg">35 recipes, a 7-day meal plan, and 3 bonuses to make everyday cooking easier. Normally <span className="line-through">${FROM}</span> — now <b className="text-primary">${PRICE}</b> — all in one easy-to-use PDF.</p>
          <Cta className="mt-8" />
          <p className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> Secure payment</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> 7-day money-back guarantee</span>
            <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5" /> Instant access</span>
          </p>
        </div>
      </Section>
      <footer className="border-t border-border px-4 py-8 text-center text-xs text-muted-foreground">© 2026 Immune Health Cookbook. For educational purposes only. This cookbook is not a substitute for professional medical advice.</footer>
    </main>
  );
}






