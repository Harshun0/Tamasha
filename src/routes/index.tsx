import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroCliffs from "@/assets/hero-cliffs.jpg";
import { Reveal } from "@/components/Reveal";
import { useTypewriter } from "@/hooks/use-typewriter";
import { CurlyArrow, MapPin, Squiggle, Star } from "@/components/doodles";

const DISTRICT_APP_LINK = "#"; // [DISTRICT_APP_LINK]

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TAMASHA — Be The Don. Be Mona Darling." },
      {
        name: "description",
        content:
          "Main Mona. Mona Darling. Aur main… The Don. One night, one alias, zero real names. A strangers' meetup inspired by the Corsica scene in Tamasha.",
      },
      { property: "og:title", content: "TAMASHA — Be The Don. Be Mona Darling." },
      {
        property: "og:description",
        content:
          "Drop your real name at the door. Pick an alias. Meet strangers who'll never know who you actually are. One night only.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Tamasha,
});

type StepKind = "pairs" | "alias" | "swap" | "chat" | "mic";

const steps: { kind: StepKind; scene: string; title: string; body: string }[] = [
  {
    kind: "pairs",
    scene: "SCENE 01",
    title: "Come in pairs",
    body: "One guy + one girl. Friends, classmates, chaos partners — tonight's companion, not a couple. The rule is simple: you arrived together. That's where it ends.",
  },
  {
    kind: "alias",
    scene: "SCENE 02",
    title: "Pick your alias",
    body: "At the door, you leave your real name behind. Pick something ridiculous, something filmi, something that feels like a different you. Tonight, you are The Don. Tonight, you are Mona Darling.",
  },
  {
    kind: "swap",
    scene: "SCENE 03",
    title: "Get swapped",
    body: "Pairs get reshuffled at the door. Your companion goes one way, you go another. You are now surrounded by strangers who only know your alias. That's the whole point.",
  },
  {
    kind: "chat",
    scene: "SCENE 04",
    title: "Prompt card conversations",
    body: "Every table has cards with questions nobody asks in real life. You answer as your alias. Judgment stays at the door because nobody here knows who you actually are.",
  },
  {
    kind: "mic",
    scene: "SCENE 05",
    title: "Games night",
    body: "Tambola, dance on paper, the kiss game, and more chaos we're not fully disclosing. You'll find out when you're there.",
  },
];

function StepIcon({ kind }: { kind: StepKind }) {
  const common = "h-7 w-7";
  switch (kind) {
    case "pairs":
      return (
        <svg viewBox="0 0 48 48" className={common} fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="3" />
          <circle cx="32" cy="16" r="7" stroke="currentColor" strokeWidth="3" />
          <path d="M6 40c1-8 7-13 10-13M42 40c-1-8-7-13-10-13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "alias":
      return (
        <svg viewBox="0 0 48 48" className={common} fill="none" aria-hidden="true">
          <path d="M6 20c6-6 30-6 36 0-2 10-10 16-18 16S8 30 6 20Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="17" cy="21" r="2.4" fill="currentColor" />
          <circle cx="31" cy="21" r="2.4" fill="currentColor" />
        </svg>
      );
    case "swap":
      return (
        <svg viewBox="0 0 48 48" className={common} fill="none" aria-hidden="true">
          <path d="M8 16h26M28 9l8 7-8 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 32H14M20 25l-8 7 8 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "chat":
      return (
        <svg viewBox="0 0 48 48" className={common} fill="none" aria-hidden="true">
          <path d="M6 10h36v22H20l-8 8v-8H6Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M14 19h20M14 25h13" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      );
    case "mic":
      return (
        <svg viewBox="0 0 48 48" className={common} fill="none" aria-hidden="true">
          <rect x="18" y="6" width="12" height="22" rx="6" stroke="currentColor" strokeWidth="3" />
          <path d="M10 22a14 14 0 0 0 28 0M24 36v6M17 42h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
  }
}

function GameIcon({ kind }: { kind: "tambola" | "paper" | "kiss" | "toss" | "truth" | "more" }) {
  const common = "h-12 w-12";
  if (kind === "tambola")
    return (
      <svg viewBox="0 0 48 48" className={common} fill="none" aria-hidden="true">
        <rect x="5" y="11" width="38" height="26" rx="4" stroke="currentColor" strokeWidth="3" />
        <path d="M5 20h38M5 29h38M18 11v26M31 11v26" stroke="currentColor" strokeWidth="2.4" />
      </svg>
    );
  if (kind === "paper")
    return (
      <svg viewBox="0 0 48 48" className={common} fill="none" aria-hidden="true">
        <rect x="10" y="26" width="28" height="16" rx="2" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M15 26v-7a3 3 0 0 1 6 0v7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27 26v-7a3 3 0 0 1 6 0v7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 42h10M26 42h10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  if (kind === "kiss")
    return (
      <svg viewBox="0 0 48 48" className={common} fill="none" aria-hidden="true">
        {/* two lips */}
        <path d="M10 20c0-4 4-7 8-5 2 1 4 3 6 3s4-2 6-3c4-2 8 1 8 5 0 6-6 12-14 14C16 32 10 26 10 20Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        {/* cupid's bow dip */}
        <path d="M18 18c2-2 4-2 6 0 2-2 4-2 6 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  if (kind === "toss")
    return (
      <svg viewBox="0 0 48 48" className={common} fill="none" aria-hidden="true">
        <path d="M4 22 44 6 30 42l-8-12-18-8z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="m22 30 22-24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  if (kind === "truth")
    return (
      <svg viewBox="0 0 48 48" className={common} fill="none" aria-hidden="true">
        {/* bottle body */}
        <path d="M20 8h8v6l4 6v16a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V20l4-6V8Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        {/* bottle cap */}
        <path d="M19 8h10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* spin arrow */}
        <path d="M8 28c0-6 4-10 8-10M10 22l-3 6 6-1" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  // "more" — sparkle/surprise
  return (
    <svg viewBox="0 0 48 48" className={common} fill="none" aria-hidden="true">
      <path d="M24 6v6M24 36v6M6 24h6M36 24h6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M11 11l4 4M33 33l4 4M11 37l4-4M33 15l4-4" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

const games = [
  { kind: "tambola" as const, name: "Tambola", note: "Full house, empty identities." },
  { kind: "paper" as const, name: "Dance on paper", note: "Smaller sheet, closer strangers." },
  { kind: "kiss" as const, name: "Kiss game", note: "Alias only. No real names attached." },
  { kind: "toss" as const, name: "Paper toss", note: "Aim badly. Laugh loudly." },
  { kind: "truth" as const, name: "Spin the bottle", note: "Truth or dare, alias edition." },
  { kind: "more" as const, name: "+ more surprises", note: "We are not fully disclosing." },
];

function Tamasha() {
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Typewriter cycles through alias combos
  const { displayed, isTyping } = useTypewriter({
    words: [
      "Main Mona. Mona Darling.",
      "Aur main… The Don.",
      "Kaun ho tum? Koi nahi jaanta.",
      "Ek raat. Ek alias. Zero baggage.",
    ],
    typeSpeed: 70,
    deleteSpeed: 38,
    pauseAfterType: 2000,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 520);
      // Parallax: video moves up at 30% of scroll speed
      setParallaxY(window.scrollY * 0.30);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stagger hero content entrance
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="overflow-x-hidden bg-cream text-ink">
      {/* Sticky nav */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "translate-y-0 bg-cream/95 shadow-scrap backdrop-blur"
            : "-translate-y-full bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/drvug594q/image/upload/v1789412928/Tamasha_landing_page_build_2K_20260915003456-removebg-preview_1_yh1k7v.png"
              alt="Tamasha logo"
              className="h-24 w-auto object-contain"
            />
          </a>
          <span className="absolute left-1/2 -translate-x-1/2 font-display text-4xl leading-none text-teal">
            Tamasha
          </span>
          <div className="relative">
            <button
              disabled
              className="cursor-not-allowed rounded-full bg-coral/60 px-5 py-2.5 text-sm font-semibold text-cream/70"
            >
              Get Tickets →
            </button>
            {/* Coming soon annotation */}
            <div className="pointer-events-none absolute -bottom-8 right-0 flex items-center gap-1" aria-hidden="true">
              <span className="font-display text-base text-coral -rotate-2 inline-block">coming soon!</span>
              {/* little arrow pointing up-right to button */}
              <svg viewBox="0 0 30 24" className="h-5 w-5 -scale-x-100 -rotate-12 text-coral" fill="none">
                <path d="M2 22 C6 10, 18 4, 26 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <path d="M22 2 L26 4 L23 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </nav>
      </header>

      {/* 1. Hero */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-24 text-center">
        {/* Video with parallax transform */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://res.cloudinary.com/drvug594q/image/upload/q_auto,f_auto,w_1280/v1789412928/Tamasha_landing_page_build_2K_20260915003456-removebg-preview_1_yh1k7v.png"
          src={
            typeof window !== "undefined" && window.innerWidth < 768
              ? "https://res.cloudinary.com/drvug594q/video/upload/q_auto,vc_auto,w_720/v1789409923/Deepika_Padukone_Ranbir_Kapoor_s_WEIRD_Flirting_in_Tamasha_-_Netflix_India_Shorts_1080p_h264_izfo1y.mp4"
              : "https://res.cloudinary.com/drvug594q/video/upload/q_auto,vc_auto,w_1280/v1789410546/videoplayback_t1ygnj.mp4"
          }
          className="absolute inset-0 h-[115%] w-full object-cover"
          style={{ transform: `translateY(${parallaxY}px)`, top: "-7.5%" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-ink/55" />

        {/* Hero content — staggered entrance */}
        <div className="relative z-10 mx-auto max-w-3xl">
          {/* Label */}
          <p
            className="label-caps text-cream/85 transition-all duration-700"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "0ms",
            }}
          >
            One night · one rule · no real names
          </p>

          {/* Title */}
          <h1
            className="mt-4 -rotate-2 font-display text-[clamp(4.5rem,18vw,11rem)] leading-[0.85] text-mustard drop-shadow-[0_8px_0_oklch(0.271_0.032_250/0.35)] transition-all duration-700"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "rotate(-2deg) translateY(0)" : "rotate(-2deg) translateY(30px)",
              transitionDelay: "150ms",
            }}
          >
            Tamasha
          </h1>

          <div
            className="transition-all duration-700"
            style={{
              opacity: heroVisible ? 1 : 0,
              transitionDelay: "280ms",
            }}
          >
            <Squiggle className="mx-auto mt-2 h-4 w-56 text-coral" />
          </div>

          {/* Typewriter line */}
          <div
            className="mt-6 transition-all duration-700"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "420ms",
            }}
          >
            <p className="font-display text-[clamp(1.9rem,6vw,3.2rem)] leading-tight text-cream">
              {displayed}
              {/* blinking cursor */}
              <span
                className="ml-0.5 inline-block w-[3px] align-middle font-display text-coral"
                style={{
                  height: "0.85em",
                  background: "currentColor",
                  animation: "blink 1s step-end infinite",
                }}
                aria-hidden="true"
              />
            </p>
          </div>

          {/* CTA buttons */}
          <div
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row transition-all duration-700"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "600ms",
            }}
          >
            <div className="relative w-full sm:w-auto">
              <button
                disabled
                className="w-full cursor-not-allowed rounded-full bg-coral/60 px-8 py-4 font-semibold text-cream/70 sm:w-auto"
              >
                Buy Your Tickets →
              </button>
              {/* Coming soon annotation */}
              <div className="pointer-events-none absolute -right-2 -top-9 flex items-center gap-1" aria-hidden="true">
                <span className="inline-block -rotate-3 font-display text-lg text-mustard">coming soon!</span>
                <svg viewBox="0 0 24 28" className="h-6 w-5 rotate-12 text-mustard" fill="none">
                  <path d="M4 2 C8 10, 14 18, 18 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M14 22 L18 26 L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <a
              href="#how-it-works"
              className="w-full rounded-full border-2 border-cream/80 px-8 py-4 font-semibold text-cream transition-all duration-300 hover:scale-105 hover:bg-cream hover:text-ink sm:w-auto"
            >
              How it works
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700"
          style={{ opacity: heroVisible ? 1 : 0, transitionDelay: "900ms" }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="label-caps text-cream/50 text-[0.6rem]">scroll</span>
            <div
              className="h-8 w-px bg-cream/40"
              style={{ animation: "scrollPulse 2s ease-in-out infinite" }}
            />
          </div>
        </div>
      </section>

      {/* 2. Inspiration */}
      <section className="relative bg-cream px-5 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Reveal direction="left">
            <p className="label-caps text-coral">Where it all began</p>
            <h2 className="mt-3 -rotate-1 font-display text-[clamp(2.6rem,8vw,4.5rem)] leading-[0.95] text-teal">
              Two strangers. Corsica. One rule.
            </h2>
            <div className="mt-6 space-y-4 text-[0.98rem] leading-relaxed text-ink/85">
              <p>
                In Imtiaz Ali's <em>Tamasha</em>, two people bump into each other on the sun-soaked
                streets of Corsica. They make a single, absurd, beautiful deal on the spot — no real
                names, no real lives, no past, no future. Just right now.
              </p>
              <p>
                She becomes <strong className="text-coral">Mona Darling</strong>. He becomes{" "}
                <strong className="text-teal">The Don</strong>. Seven days. Zero baggage.
                And somehow, freed from who they actually are, they become the most honest
                versions of themselves they've ever been.
              </p>
              <p>
                We're not giving you seven days. We're giving you one night — same deal. Walk in
                as an alias. Leave your branch, batch, reputation, and LinkedIn at the door.
                For a few hours, you are whoever you say you are.
              </p>
            </div>
            <blockquote className="mt-8 rounded-2xl border-l-4 border-coral bg-mustard/20 px-5 py-4">
              <p className="font-display text-2xl leading-snug text-ink">
                "Main Mona. Mona Darling."
              </p>
              <p className="mt-1 font-display text-2xl leading-snug text-ink">
                "Aur main… The Don."
              </p>
              <footer className="mt-2 text-xs text-ink/60">— Corsica, <em>Tamasha</em> (2015)</footer>
            </blockquote>
          </Reveal>
          <Reveal direction="right" delay={120} className="relative">
            <CurlyArrow className="absolute -left-4 -top-10 h-16 w-16 rotate-12 text-mustard" />
            <figure className="rotate-2 rounded-3xl border-8 border-card bg-card p-2 shadow-scrap transition-transform duration-500 hover:rotate-0">
              <img
                src="https://res.cloudinary.com/drvug594q/image/upload/v1789411462/Screenshot_2026-09-15_at_12.14.05_AM_zz8ruc.png"
                alt="Mona Darling and The Don — two strangers in Corsica"
                width={1024}
                height={1024}
                loading="lazy"
                className="w-full rounded-2xl"
              />
              <figcaption className="px-3 py-3 text-center font-display text-2xl text-teal">
                Mona Darling met The Don here.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* 3. How it works — Film Reel / Scene Slate */}
      <section id="how-it-works" className="relative overflow-hidden bg-ink px-5 py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(#FCF3DD 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative mx-auto max-w-5xl">
          <Reveal className="text-center" direction="up">
            <p className="label-caps text-coral">Your Corsica. One night.</p>
            <h2 className="mt-3 rotate-1 font-display text-[clamp(2.8rem,9vw,5rem)] leading-[0.95] text-mustard">
              How the night goes
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-cream/60">
              Same deal as the movie — no real names, no real pasts. Roll the reel.
            </p>
          </Reveal>

          <div className="relative mt-16">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, oklch(0.85 0.15 95 / 0.35) 0, oklch(0.85 0.15 95 / 0.35) 10px, transparent 10px, transparent 20px)",
              }}
            />

            <ol className="space-y-10 md:space-y-14">
              {steps.map((step, i) => {
                const isEven = i % 2 === 0;
                const accent = ["text-mustard", "text-coral", "text-teal", "text-mustard", "text-coral"][i];
                const accentBg = ["bg-mustard", "bg-coral", "bg-teal", "bg-mustard", "bg-coral"][i];
                const accentBorder = ["border-mustard", "border-coral", "border-teal", "border-mustard", "border-coral"][i];

                return (
                  <li key={step.title} className="relative">
                    <Reveal delay={i * 100} direction={isEven ? "left" : "right"}>
                      <div
                        className={`relative mx-auto flex flex-col gap-0 md:w-[calc(50%-2.5rem)] ${
                          isEven ? "md:ml-0 md:mr-auto md:text-left" : "md:ml-auto md:mr-0 md:text-left"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute top-8 hidden h-4 w-4 -translate-y-1/2 rounded-full border-2 border-ink ${accentBg} md:block`}
                          style={isEven ? { right: "-2.6rem" } : { left: "-2.6rem" }}
                        />
                        <div
                          className={`group overflow-hidden rounded-2xl border ${accentBorder}/30 bg-card shadow-scrap transition-all duration-500 hover:-translate-y-1 hover:shadow-lift`}
                          style={{ transform: `rotate(${isEven ? -1 : 1}deg)` }}
                        >
                          <div
                            className="relative flex items-center justify-between px-5 py-3"
                            style={{
                              backgroundImage: `repeating-linear-gradient(-45deg, oklch(0.18 0.02 250) 0 14px, ${
                                i === 0 || i === 3
                                  ? "oklch(0.85 0.15 95)"
                                  : i === 1 || i === 4
                                  ? "oklch(0.687 0.146 43)"
                                  : "oklch(0.42 0.06 200)"
                              } 14px 28px)`,
                            }}
                          >
                            <span className="rounded-sm bg-ink/80 px-2 py-1 font-display text-xs tracking-widest text-cream">
                              {step.scene}
                            </span>
                            <span className="rounded-sm bg-ink/80 px-2 py-1 font-display text-xs tracking-widest text-cream">
                              TAKE 01
                            </span>
                          </div>
                          <div className="flex items-start gap-4 p-6">
                            <div
                              className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 ${accentBorder}/50 ${accent} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                            >
                              <StepIcon kind={step.kind} />
                            </div>
                            <div>
                              <h3 className={`font-display text-[clamp(1.6rem,4.5vw,2.2rem)] leading-tight ${accent}`}>
                                {step.title}
                              </h3>
                              <p className="mt-2 text-sm leading-relaxed text-ink/80">{step.body}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* 4. Games */}
      <section className="px-5 py-20 sm:py-28" style={{ background: "oklch(0.15 0.025 250)" }}>
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center" direction="up">
            <p className="label-caps text-mustard">Chaos, organised</p>
            <h2 className="mt-3 -rotate-1 font-display text-[clamp(2.6rem,8vw,4.6rem)] leading-[0.95] text-cream">
              Games &amp; ice-breakers
            </h2>
            <Squiggle className="mx-auto mt-3 h-4 w-48 text-coral" />
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
            {games.map((game, i) => {
              const ticketColors = [
                { bg: "bg-mustard", text: "text-ink",  icon: "text-teal",    note: "text-ink/70"   },
                { bg: "bg-coral",   text: "text-cream", icon: "text-cream",   note: "text-cream/75" },
                { bg: "bg-teal",    text: "text-cream", icon: "text-mustard", note: "text-cream/75" },
                { bg: "bg-ink",     text: "text-cream", icon: "text-coral",   note: "text-cream/60" },
                { bg: "bg-mustard", text: "text-ink",  icon: "text-teal",    note: "text-ink/70"   },
                { bg: "bg-coral",   text: "text-cream", icon: "text-cream",   note: "text-cream/75" },
              ];
              const c = ticketColors[i];
              return (
                <Reveal key={game.name} delay={i * 100} direction="up">
                  <div
                    className={`group relative h-full overflow-hidden ${c.bg} shadow-lift transition-all duration-500 hover:-translate-y-3`}
                    style={{
                      transform: `rotate(${[-1.2, 1, -0.8, 1.4, -1, 0.8][i]}deg)`,
                      clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                    }}
                  >
                    <div className={`absolute -right-5 -top-5 h-16 w-16 rounded-full border-4 ${c.icon.replace("text-", "border-")} opacity-20`} />
                    <div className={`border-b-2 border-dashed ${c.icon.replace("text-", "border-")} opacity-30`} style={{ marginTop: "3.5rem" }} />
                    <div className="p-6 pt-5">
                      <div className={`${c.icon} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                        <GameIcon kind={game.kind} />
                      </div>
                      <p className={`absolute right-4 top-3 font-display text-5xl leading-none opacity-20 ${c.text}`}>
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className={`mt-4 font-display text-[1.85rem] leading-tight ${c.text}`}>
                        {game.name}
                      </h3>
                      <p className={`mt-1.5 text-xs leading-relaxed ${c.note}`}>{game.note}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={140} direction="up">
            <div className="mx-auto mt-12 max-w-xl">
              <div
                className="relative overflow-hidden p-px"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                  background: "oklch(0.687 0.146 43 / 0.5)",
                }}
              >
                <p
                  className="px-6 py-4 text-center text-sm text-cream/80"
                  style={{ background: "oklch(0.15 0.025 250)" }}
                >
                  Before every game, we check in with you first.{" "}
                  <span className="text-mustard">Not feeling it? Totally okay to sit one out.</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Venue & details */}
      <section className="bg-teal px-5 py-20 text-cream sm:py-28">
        <div className="mx-auto max-w-5xl">
          {/* First time in Nagpur banner */}
          <Reveal direction="up" className="mb-12 text-center">
            <div className="inline-flex flex-col items-center gap-2">
              <span className="inline-block -rotate-1 rounded-full bg-mustard px-8 py-3 font-display text-3xl text-ink shadow-lift sm:text-4xl">
                ✦ For the first time in Nagpur ✦
              </span>
              <div className="flex items-center gap-2 rounded-full bg-ink/10 px-5 py-2">
                <MapPin className="h-4 w-4 text-coral" />
                <span className="text-sm font-semibold text-ink">Nagpur, Maharashtra</span>
                <span className="text-ink/40">·</span>
                <span className="text-sm text-ink/70">Date reveal soon</span>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <Reveal direction="left">
              <p className="label-caps text-mustard">Where &amp; when</p>
              <h2 className="mt-3 font-display text-[clamp(2.8rem,9vw,5rem)] leading-[0.9]">
                Nagpur gets its<br />
                <span className="text-mustard">Corsica night.</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/85">
                Venue and date will be revealed soon. All updates drop on Instagram first — follow
                us so you don't miss the announce.
              </p>

              {/* Info pills */}
              <div className="mt-8 flex flex-col gap-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-mustard/20 text-mustard">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="text-cream/85">Nagpur — exact venue <span className="text-mustard font-semibold">reveal soon</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-mustard/20 text-mustard">
                    <Star className="h-4 w-4" />
                  </span>
                  <span className="text-cream/85">Date — <span className="text-mustard font-semibold">reveal soon</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-mustard/20 text-mustard">
                    {/* ticket icon */}
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                      <path d="M2 9a1 1 0 0 1 0-2V5h20v2a1 1 0 0 1 0 2v2a1 1 0 0 1 0 2v2h-20v-2a1 1 0 0 1 0-2V9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-cream/85">Tickets on <span className="text-mustard font-semibold">District App</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-mustard/20 text-mustard">
                    {/* envelope icon */}
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                      <path d="m2 7 10 7 10-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <a href="mailto:tamashabuzzlive@gmail.com" className="text-cream/85 transition-colors hover:text-mustard">
                    tamashabuzzlive@gmail.com
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Right — date reveal circle + insta CTA */}
            <Reveal delay={140} direction="right" className="flex flex-col items-center gap-8">
              <div className="relative flex h-52 w-52 -rotate-6 flex-col items-center justify-center rounded-full bg-coral text-center shadow-lift transition-transform duration-500 hover:rotate-0">
                <Star className="absolute -right-2 -top-2 h-8 w-8 text-mustard" />
                <span className="label-caps text-cream/85">Date &amp; Venue</span>
                <span className="mt-1 font-display text-5xl leading-none text-cream">Reveal</span>
                <span className="font-display text-5xl leading-none text-cream">Soon</span>
              </div>

              {/* Instagram follow card */}
              <a
                href="https://www.instagram.com/tamasha.buzz"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full max-w-xs items-center gap-4 rounded-2xl border-2 border-cream/20 bg-ink/30 px-5 py-4 backdrop-blur transition-all duration-300 hover:border-mustard/60 hover:bg-ink/50"
              >
                {/* Instagram icon */}
                <svg viewBox="0 0 24 24" className="h-8 w-8 flex-shrink-0 text-mustard transition-transform duration-300 group-hover:scale-110" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
                <div className="text-left">
                  <p className="text-xs font-semibold uppercase tracking-widest text-mustard">Follow us</p>
                  <p className="font-display text-xl leading-tight text-cream">@tamasha.buzz</p>
                  <p className="mt-0.5 text-xs text-cream/60">All updates drop here first</p>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. Tickets CTA */}
      <footer className="bg-mustard px-5 py-20 text-center sm:py-28">
        <Reveal direction="up">
          <p className="label-caps text-teal">For the first time in Nagpur</p>
          <h2 className="mx-auto mt-4 max-w-3xl -rotate-1 font-display text-[clamp(2.8rem,9vw,5.2rem)] leading-[0.95] text-ink">
            Who will you be tonight?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm text-ink/75">
            Pick an alias. Drop the baggage. Walk in as a stranger, leave as a story.
            Tickets on the District App — date dropping soon.
          </p>
          <div className="relative inline-block">
            <button
              disabled
              className="mt-10 cursor-not-allowed rounded-full bg-teal/50 px-10 py-5 text-base font-semibold text-cream/60"
            >
              Get Tickets on District App →
            </button>
            {/* Coming soon annotation — arrow pointing up to button */}
            <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5" aria-hidden="true">
              <svg viewBox="0 0 24 20" className="h-6 w-6 text-teal rotate-180" fill="none">
                <path d="M12 2 C12 10, 12 14, 12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 6 L12 2 L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-display text-xl -rotate-2 inline-block text-teal">coming soon!</span>
            </div>
          </div>

          {/* Social + contact row */}
          <div className="mx-auto mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <a
              href="https://www.instagram.com/tamasha.buzz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-teal transition-colors hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
              </svg>
              @tamasha.buzz
            </a>
            <span className="hidden text-ink/30 sm:inline">·</span>
            <a
              href="mailto:tamashabuzzlive@gmail.com"
              className="text-sm text-ink/65 transition-colors hover:text-teal"
            >
              tamashabuzzlive@gmail.com
            </a>
          </div>

          <p className="mt-8 font-display text-3xl text-teal">
            No real names. No real pasts. Just one real night.
          </p>
        </Reveal>
      </footer>
      {/* Sticky Instagram FAB */}
      <a
        href="https://www.instagram.com/tamasha.buzz"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Tamasha on Instagram"
        className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 overflow-hidden rounded-full bg-ink px-4 py-3 shadow-lift transition-all duration-500 hover:bg-coral sm:bottom-8 sm:right-8"
      >
        {/* Instagram icon */}
        <svg viewBox="0 0 24 24" className="h-6 w-6 flex-shrink-0 text-mustard" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
        </svg>
        {/* Label — slides in on hover */}
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-semibold text-cream transition-all duration-500 group-hover:max-w-[10rem] text-sm">
          @tamasha.buzz
        </span>
      </a>

    </main>
  );
}
