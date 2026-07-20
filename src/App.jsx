import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Gift,
  Gamepad2,
  Heart,
  Mail,
  Menu,
  Play,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Volume2,
} from "lucide-react";

const navItems = [
  { label: "SHOP", href: "#product-collection" },
  { label: "BESTIES", href: "#results-sticker-wall" },
  { label: "ABOUT", href: "#brand-philosophy" },
  { label: "GLITCH CLUB", href: "#newsletter" },
  { label: "REWARDS", href: "#newsletter" },
];

const statRows = [
  ["MOISTURE", "+90"],
  ["CUTENESS", "+100"],
  ["BOOP TO SWAP", "♡"],
];

const ingredients = [
  {
    title: "CENTELLA = HP POTION",
    text: "Heals, soothes, and brings calm to stressed skin.",
    color: "green",
    score: ["SOOTHE", "RECOVERY", "COMFORT"],
  },
  {
    title: "HYALURONIC = MOISTURE SHIELD",
    text: "Draws in moisture and locks it deep inside.",
    color: "blue",
    score: ["HYDRATION", "PLUMP", "BOUNCE"],
  },
  {
    title: "PANTHENOL = BARRIER BUFF",
    text: "Strengthens your barrier and keeps irritation out.",
    color: "pink",
    score: ["STRENGTH", "BARRIER", "RESILIENCE"],
  },
  {
    title: "NIACINAMIDE = GLOW COIN",
    text: "Boosts radiance and evens out your skintone.",
    color: "gold",
    score: ["RADIANCE", "EVEN TONE", "GLOW"],
  },
];

const ritualSteps = ["UNBOX GLITCH", "OPEN THE JAR", "SCOOP THE GLOW", "DECORATE THE JAR", "PATCH YOUR MOOD", "PLAY AGAIN"];

const wallStats = ["REAL FACES", "REAL PATCHES", "REAL CUTE"];

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

function scrollToSection(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useInView() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        node.classList.toggle("is-visible", entry.isIntersecting);
      },
      { threshold: 0.28 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function PixelButton({ children, tone = "pink", className = "", onClick, disabled = false, type = "button" }) {
  const tones = {
    pink: "border-[#7e1251] bg-bubblegum text-white shadow-[inset_0_5px_0_rgba(255,255,255,0.48),inset_0_-6px_0_rgba(159,19,91,0.45),0_7px_0_#891456,0_14px_22px_rgba(88,26,56,0.28)]",
    blue: "border-[#0c4da5] bg-soda text-white shadow-[inset_0_5px_0_rgba(255,255,255,0.44),inset_0_-6px_0_rgba(0,65,157,0.5),0_7px_0_#094b99,0_14px_22px_rgba(12,61,127,0.28)]",
  };

  return (
    <button
      className={`toy-control group inline-flex min-h-16 items-center justify-center gap-3 rounded-[22px] border-[5px] px-10 font-pixel text-[20px] leading-none tracking-normal focus:outline-none focus:ring-4 focus:ring-white/80 ${tones[tone]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

function SpeakerDots() {
  return (
    <div aria-hidden="true" className="grid grid-cols-4 gap-2">
      {Array.from({ length: 16 }).map((_, index) => (
        <span className="size-2 rounded-full bg-ink/80" key={index} />
      ))}
    </div>
  );
}

function FloatingPixel({ className = "", color = "text-arcade" }) {
  return <Plus aria-hidden="true" className={`absolute size-7 stroke-[4] ${color} drop-shadow-[0_2px_0_rgba(255,255,255,0.7)] ${className}`} />;
}

function ResponsiveAsset({ desktop, mobile, alt = "", objectPosition = "object-center", className = "scene-asset" }) {
  return (
    <picture aria-hidden={alt ? undefined : "true"} className={`absolute inset-0 ${className}`}>
      <source media="(max-width: 767px)" srcSet={assetUrl(mobile)} />
      <img alt={alt} className={`h-full w-full object-cover ${objectPosition}`} src={assetUrl(desktop)} />
    </picture>
  );
}

function SectionBadge({ label }) {
  return (
    <span className="inline-flex whitespace-nowrap rounded-[18px] border-[3px] border-[#d7a026] bg-[#fff0a8]/90 px-5 py-3 font-pixel text-[14px] text-bubblegum shadow-[0_5px_0_rgba(194,135,21,0.22)]">
      {label}
    </span>
  );
}

function PixelHeadline({ children, className = "" }) {
  return (
    <h2 className={`section-headline select-none font-pixel text-[clamp(44px,4.5vw,78px)] leading-[0.98] tracking-normal ${className}`}>
      {children}
    </h2>
  );
}

function TextPanel({ children, className = "" }) {
  return (
    <div className={`rounded-[20px] border-[4px] border-ink bg-[#fff9d8]/92 px-7 py-5 font-pixel text-[15px] leading-relaxed shadow-[0_7px_0_rgba(0,0,0,0.16)] ${className}`}>
      {children}
    </div>
  );
}

function ProgressControl({ tone = "blue", className = "" }) {
  const toneClass = tone === "pink" ? "border-bubblegum bg-[#ffd5eb] text-bubblegum" : "border-soda bg-[#d8f0ff] text-soda";

  return (
    <div className={`flex items-center gap-4 rounded-[18px] border-[4px] px-5 py-4 shadow-sticker ${toneClass} ${className}`}>
      <button aria-label="Play preview" className="toy-control flex size-11 shrink-0 items-center justify-center rounded-[12px] border-[3px] border-ink bg-arcade text-ink shadow-[0_4px_0_rgba(0,0,0,0.24)]" type="button">
        <Play className="size-5 fill-ink" />
      </button>
      <div className="h-3 flex-1 rounded-full border-2 border-current bg-white/70">
        <div className={`h-full w-2/3 rounded-full ${tone === "pink" ? "bg-bubblegum" : "bg-soda"}`} />
      </div>
      <Volume2 className="size-6" />
    </div>
  );
}

function ArcadePanel({ className = "", compact = false, onStart, onShop }) {
  return (
    <div className={`rounded-[28px] border-[6px] border-[#d19c20] bg-[#ffe47b]/95 shadow-pixel ${compact ? "p-3" : "p-6"} ${className}`}>
      <div className="flex items-center justify-between gap-5">
        <PixelButton className={`flex-1 ${compact ? "min-h-12 px-5 text-[13px]" : ""}`} onClick={onStart} tone="pink">
          START GAME
          <Play className={`${compact ? "size-4" : "size-6"} fill-white`} />
        </PixelButton>
        <PixelButton className={`flex-1 ${compact ? "min-h-12 px-5 text-[13px]" : ""}`} onClick={onShop} tone="blue">
          SHOP STICKERS
          <Star className={`${compact ? "size-4" : "size-6"} fill-[#ffe35f] text-[#ffe35f]`} />
        </PixelButton>
      </div>
      {!compact && <div className="mt-7 flex items-end justify-between">
        <div className={compact ? "flex gap-5" : "flex gap-7"}>
          <span className={`${compact ? "size-9" : "size-12"} rounded-full border-[5px] border-ink bg-bubblegum shadow-[inset_0_4px_0_rgba(255,255,255,0.48),0_5px_0_rgba(0,0,0,0.22)]`} />
          <span className={`${compact ? "size-8" : "size-10"} rounded-full border-[4px] border-[#b93571] bg-bubblegum shadow-[inset_0_4px_0_rgba(255,255,255,0.5)]`} />
          <span className={`${compact ? "size-8" : "size-10"} rounded-full border-[4px] border-[#b93571] bg-bubblegum shadow-[inset_0_4px_0_rgba(255,255,255,0.5)]`} />
        </div>
        <div className="flex gap-4">
          <span className={`${compact ? "h-9" : "h-12"} w-3 rounded-full border-2 border-[#2b8e2f] bg-arcade`} />
          <span className={`${compact ? "h-9" : "h-12"} w-3 rounded-full border-2 border-[#2b8e2f] bg-arcade`} />
          <span className={`${compact ? "h-9" : "h-12"} w-3 rounded-full border-2 border-[#2b8e2f] bg-arcade`} />
        </div>
        <SpeakerDots />
      </div>}
    </div>
  );
}

function BrandSection() {
  const sectionRef = useInView();

  return (
    <section className="art-scene art-scene--16x9 scroll-scene relative mx-auto w-full max-w-[1920px] overflow-hidden bg-butter max-md:min-h-[1180px]" id="brand-philosophy" ref={sectionRef}>
      <ResponsiveAsset desktop="/assets/03-brand-web.png" mobile="/assets/03-brand-mobile.png" objectPosition="object-center max-md:object-top" />
      <div className="hero-texture absolute inset-0 opacity-60" />
      <div className="art-canvas relative z-10 mx-auto flex h-full max-w-[1440px] items-center max-md:min-h-[1180px] max-md:w-[calc(100%-32px)] max-md:items-start max-md:py-10">
        <div className="section-reveal w-[40%] max-w-full max-md:w-full">
          <SectionBadge label="BRAND PHILOSOPHY" />
          <PixelHeadline className="mt-7 text-[clamp(34px,3.8vw,72px)] max-md:mt-4 max-md:max-w-[300px] max-md:text-[30px]">
            <span className="headline-pink block">MY FIRST</span>
            <span className="headline-yellow block">TOY</span>
            <span className="headline-blue block">SKINCARE</span>
          </PixelHeadline>
          <TextPanel className="mt-6 max-w-[560px] text-[clamp(9px,0.7vw,14px)] max-md:mt-[54vh] max-md:px-5 max-md:text-[12px]">
            Skincare is not grown-up homework.
            <br />
            It is a tiny game of decorating,
            <br />
            caring, and pressing replay.
          </TextPanel>
          <div className="mt-7 hidden rounded-[16px] border-[4px] border-[#72610f] bg-[#aee05a] px-8 py-4 font-pixel text-[20px] text-ink shadow-sticker md:inline-flex">
            INSERT JOY
            <Heart className="ml-4 size-6 fill-bubblegum text-bubblegum" />
          </div>
          <PixelButton className="mt-6 min-h-14 w-full px-4 text-[clamp(10px,0.75vw,14px)] max-md:text-[13px]" onClick={() => scrollToSection("#ingredients-editorial")} tone="pink">
            READ THE STORY
            <Sparkles className="size-5" />
          </PixelButton>
        </div>
      </div>
    </section>
  );
}

function ProductSection() {
  const sectionRef = useInView();
  const [selectedProduct, setSelectedProduct] = useState("CREAM");
  const [bagStatus, setBagStatus] = useState(false);

  return (
    <section className="art-scene art-scene--16x9 scroll-scene relative mx-auto w-full max-w-[1920px] overflow-hidden bg-butter max-md:min-h-[1180px]" id="product-collection" ref={sectionRef}>
      <ResponsiveAsset desktop="/assets/04-product-web.png" mobile="/assets/04-product-mobile.png" objectPosition="object-center" />
      <div className="hero-texture absolute inset-0 opacity-50" />
      <div className="art-canvas relative z-10 mx-auto h-full max-w-[1440px] max-md:min-h-[1180px] max-md:w-[calc(100%-32px)] max-md:py-8">
        <div className="section-reveal absolute left-0 top-[7%] w-[28%] max-md:static max-md:w-full max-md:max-w-[330px]">
          <SectionBadge label="PRODUCT COLLECTION" />
          <PixelHeadline className="mt-6 text-[clamp(20px,2.5vw,52px)] max-md:mt-5 max-md:text-[40px]">
            <span className="headline-pink block">PICK</span>
            <span className="headline-blue block">YOUR</span>
            <span className="headline-green block">PLAYER</span>
          </PixelHeadline>
          <p className="mt-6 font-pixel text-[clamp(9px,0.72vw,14px)] leading-loose text-ink max-md:hidden">
            Choose your GLITCH sidekick.
            <br />
            Each one's got main character
            <br />
            energy and serious cute stats.
          </p>
        </div>

        <div className="product-arcade-ui section-reveal reveal-delay-1 absolute left-[31%] top-[24%] flex h-[50%] w-[52%] flex-col rounded-[24px] border-[4px] border-soda bg-[#071823]/76 p-[2%] shadow-[inset_0_0_24px_rgba(35,138,255,0.38)] backdrop-blur-[1px] max-md:left-5 max-md:right-5 max-md:top-[42%] max-md:h-auto max-md:w-auto max-md:p-4">
          <div className="mx-auto mb-[3%] flex w-fit items-center gap-3 rounded-[14px] border-[3px] border-soda bg-[#0d314b]/92 px-5 py-3 font-pixel text-[clamp(11px,1vw,18px)] text-[#75caff] max-md:text-[12px]">
            <Heart className="size-5 fill-bubblegum text-bubblegum" />
            STICKER CREAM
            <Heart className="size-5 fill-bubblegum text-bubblegum" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["CREAM", "HEART PATCH", "STAR PATCH"].map((item) => (
              <button
                aria-pressed={selectedProduct === item}
                className={`toy-control rounded-[12px] border-[3px] px-3 py-3 font-pixel text-[clamp(8px,0.68vw,13px)] leading-relaxed text-white focus:outline-none focus:ring-4 focus:ring-white/70 ${selectedProduct === item ? "border-bubblegum bg-bubblegum/88" : "border-soda bg-[#08243c]/84"}`}
                key={item}
                onClick={() => {
                  setSelectedProduct(item);
                  setBagStatus(false);
                }}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-[3%] grid grid-cols-3 rounded-[12px] border-[3px] border-[#12436a] bg-black/45 max-md:hidden">
            {statRows.map(([label, value]) => (
              <div className="border-r border-soda/40 p-[6%] last:border-r-0" key={label}>
                <div className="font-pixel text-[clamp(7px,0.52vw,10px)] leading-relaxed text-white">{label}</div>
                <div className="mt-2 font-pixel text-[clamp(12px,1.05vw,20px)] text-bubblegum">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between gap-4 rounded-[12px] border-[3px] border-bubblegum/80 bg-[#fffbe4]/94 px-4 py-3 max-md:mt-4 max-md:flex-col">
            <div className="min-w-0">
              <div className="font-pixel text-[clamp(7px,0.5vw,10px)] text-soda">CURRENT PLAYER</div>
              <h3 className="mt-2 truncate font-pixel text-[clamp(12px,1vw,19px)] tracking-normal text-ink">{selectedProduct}</h3>
            </div>
            <PixelButton className="min-h-12 shrink-0 rounded-[16px] px-5 text-[clamp(9px,0.72vw,13px)] max-md:w-full" onClick={() => setBagStatus(true)} tone="blue">
              {bagStatus ? "ADDED TO BAG" : "ADD TO BAG"}
              <ShoppingBag className="size-4" />
            </PixelButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function IngredientCard({ ingredient }) {
  const colors = {
    green: "border-arcade text-[#217e24]",
    blue: "border-soda text-[#0a5fae]",
    pink: "border-bubblegum text-bubblegum",
    gold: "border-[#dfa719] text-[#9a6d03]",
  };

  return (
    <article className={`ingredient-card ability-card-solid rounded-[20px] border-[4px] p-5 shadow-sticker backdrop-blur-[1px] ${colors[ingredient.color]}`}>
      <div className="flex items-start justify-between gap-4">
        <h3 className="ingredient-title font-pixel text-[14px] leading-relaxed">{ingredient.title}</h3>
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, index) => (
            <Heart className="size-4 fill-bubblegum text-bubblegum" key={index} />
          ))}
        </div>
      </div>
      <p className="ingredient-description mt-4 font-pixel text-[11px] leading-loose text-ink">{ingredient.text}</p>
      <div className="ingredient-scores mt-5 space-y-2">
        {ingredient.score.map((item, index) => (
          <div className="ingredient-score-row grid grid-cols-[92px_1fr] items-center gap-3 font-pixel text-[10px] text-ink" key={item}>
            <span>{item}</span>
            <div className="flex gap-1">
              {Array.from({ length: 6 }).map((_, dotIndex) => (
                <span className={`h-3 flex-1 rounded-[3px] border border-current ${dotIndex <= 4 - index ? "bg-current" : "bg-white/70"}`} key={dotIndex} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function IngredientsSection() {
  const sectionRef = useInView();

  return (
    <section className="art-scene art-scene--16x9 scroll-scene relative mx-auto w-full max-w-[1920px] overflow-hidden bg-butter max-md:min-h-[1500px]" id="ingredients-editorial" ref={sectionRef}>
      <ResponsiveAsset desktop="/assets/05-ingredients-web.png" mobile="/assets/05-ingredients-mobile.png" objectPosition="object-center" />
      <div className="hero-texture absolute inset-0 opacity-45" />
      <div className="art-canvas relative z-10 mx-auto h-full max-w-[1440px] max-md:min-h-[1500px] max-md:w-[calc(100%-32px)] max-md:py-8">
        <div className="section-reveal absolute left-0 top-[7%] w-[34%] max-md:static max-md:w-full">
          <SectionBadge label="INGREDIENTS EDITORIAL" />
          <PixelHeadline className="mt-7 text-[clamp(32px,3.7vw,70px)] max-md:text-[36px]">
            <span className="headline-black block">ITEM</span>
            <span className="headline-pink block">ABILITY</span>
            <span className="headline-black block">INDEX</span>
          </PixelHeadline>
          <TextPanel className="mt-6 max-w-[470px] text-[clamp(8px,0.65vw,13px)] max-md:text-[12px]">
            Tiny ingredients with
            <br />
            big main-character energy.
          </TextPanel>
        </div>

        <div className="section-reveal reveal-delay-1 absolute right-0 top-[7%] grid h-[76%] w-[54%] grid-cols-2 grid-rows-2 gap-[2%] max-md:static max-md:mt-[48vh] max-md:h-auto max-md:w-full max-md:grid-cols-1 max-md:grid-rows-none max-md:gap-5">
          {ingredients.map((ingredient) => (
            <IngredientCard ingredient={ingredient} key={ingredient.title} />
          ))}
        </div>

        <PixelButton className="section-reveal reveal-delay-2 absolute bottom-[5%] left-[36%] min-h-14 w-[30%] px-4 text-[clamp(9px,0.72vw,13px)] max-md:bottom-6 max-md:left-0 max-md:right-0 max-md:w-full max-md:text-[12px]" onClick={() => scrollToSection("#ritual-guide")} tone="pink">
          CHECK THE FORMULA
          <Play className="size-5 fill-white" />
        </PixelButton>
      </div>
    </section>
  );
}

function RitualSection() {
  const sectionRef = useInView();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="art-scene art-scene--16x9 scroll-scene relative mx-auto w-full max-w-[1920px] overflow-hidden bg-butter max-md:min-h-[1520px]" id="ritual-guide" ref={sectionRef}>
      <ResponsiveAsset desktop="/assets/06-ritual-web.png" mobile="/assets/06-ritual-mobile.png" objectPosition="object-center max-md:object-top" />
      <div className="hero-texture absolute inset-0 opacity-45" />
      <div className="art-canvas relative z-10 mx-auto h-full max-w-[1440px] max-md:min-h-[1520px] max-md:w-[calc(100%-32px)] max-md:py-8">
        <div className="ritual-copy section-reveal absolute left-0 top-[5%] w-[50%] max-md:static max-md:w-full">
          <SectionBadge label="PLAY MANUAL" />
          <PixelHeadline className="mt-4 whitespace-nowrap text-[clamp(28px,2.7vw,48px)] max-md:text-[34px]">
            <span className="headline-pink block">PLAY MANUAL</span>
          </PixelHeadline>
          <p className="sr-only">
            Stick it. Pat it. Patch it.
            <br />
            Replay tomorrow.
          </p>
        </div>

        <div className="ritual-label section-reveal reveal-delay-1 absolute left-[12%] top-[40%] hidden w-[36%] items-center justify-center rounded-[14px] border-[4px] border-soda bg-soda px-4 py-3 text-center font-pixel text-[clamp(9px,0.8vw,15px)] text-white shadow-sticker md:flex">
          01 DECORATE THE JAR
        </div>
        <div className="ritual-label section-reveal reveal-delay-1 absolute left-[56%] top-[40%] hidden w-[36%] items-center justify-center rounded-[14px] border-[4px] border-bubblegum bg-bubblegum px-4 py-3 text-center font-pixel text-[clamp(9px,0.8vw,15px)] text-white shadow-sticker md:flex">
          02 PATCH YOUR MOOD
        </div>
        <ProgressControl className="ritual-progress absolute left-[11%] top-[63%] hidden w-[38%] md:flex" />
        <ProgressControl className="ritual-progress absolute left-[55%] top-[63%] hidden w-[38%] md:flex" tone="pink" />

        <div className="ritual-steps absolute left-0 right-0 top-[84%] hidden h-[11%] items-stretch justify-between gap-[1%] md:flex">
          {ritualSteps.map((step, index) => (
            <button className="toy-control flex-1 rounded-[14px] border-[3px] border-ink bg-[#fff9d8]/88 px-2 font-pixel text-[clamp(6px,0.5vw,10px)] leading-relaxed shadow-[0_5px_0_rgba(0,0,0,0.14)] focus:outline-none focus:ring-4 focus:ring-white/80" key={step} type="button">
              <span className={index % 2 ? "text-soda" : "text-bubblegum"}>{String(index + 1).padStart(2, "0")}</span>
              <br />
              {step}
            </button>
          ))}
        </div>

        <div className="absolute left-4 right-4 top-[610px] md:hidden">
          <ProgressControl className="w-full" />
        </div>
        <div className="absolute left-4 right-4 top-[1095px] md:hidden">
          <ProgressControl className="w-full" tone="pink" />
          <PixelButton className="mt-5 min-h-14 w-full text-[12px]" onClick={() => setIsPlaying((value) => !value)} tone="pink">
            {isPlaying ? "RITUAL PLAYING" : "WATCH THE RITUAL"}
            <Play className="size-4 fill-white" />
          </PixelButton>
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  const sectionRef = useInView();

  return (
    <section className="scene-stage art-scene art-scene--16x9 scroll-scene relative mx-auto w-full max-w-[1920px] overflow-hidden bg-butter max-md:min-h-[1500px]" id="results-sticker-wall" ref={sectionRef}>
      <ResponsiveAsset desktop="/assets/07-results-web.png" mobile="/assets/07-results-mobile.png" objectPosition="object-center max-md:object-top" />
      <div className="hero-texture absolute inset-0 opacity-50" />
      <div className="art-canvas relative z-10 mx-auto h-full max-w-[1440px] max-md:min-h-[1500px] max-md:w-[calc(100%-32px)] max-md:py-8">
        <div className="section-reveal absolute left-0 top-[8%] max-w-[560px] max-md:static max-md:max-w-[330px]">
          <SectionBadge label="RESULTS" />
          <PixelHeadline className="mt-5 text-[clamp(44px,4.6vw,78px)] max-md:text-[32px]">
            <span className="headline-pink inline-block">STICKER</span>
            <span className="headline-blue ml-3 inline-block max-md:ml-0">WALL</span>
          </PixelHeadline>
          <p className="sr-only">
            Real faces, real patches,
            <br />
            real cute evidence.
          </p>
        </div>

        <div className="section-reveal reveal-delay-1 absolute left-[53%] top-[10%] hidden rotate-[-2deg] rounded-[14px] border-[4px] border-ink bg-[#9ee65c] px-8 py-4 font-pixel text-[20px] text-[#1f6f2b] shadow-sticker lg:block">
          LEVEL 5 GLOW
        </div>

        <div className="section-reveal reveal-delay-2 absolute bottom-[6%] left-0 hidden items-center gap-3 lg:flex">
          {wallStats.map((stat) => (
            <span className="rounded-[18px] border-[3px] border-bubblegum bg-[#ffe6f2]/92 px-5 py-3 font-pixel text-[12px] text-bubblegum shadow-sticker" key={stat}>
              {stat}
            </span>
          ))}
        </div>

        <PixelButton className="section-reveal reveal-delay-2 absolute bottom-[7%] right-[4%] min-h-[104px] w-[260px] flex-col gap-2 px-5 text-[14px] max-md:bottom-8 max-md:right-4 max-md:min-h-14 max-md:w-[calc(100%-32px)] max-md:flex-row max-md:text-[12px]" onClick={() => scrollToSection("#newsletter")} tone="blue">
          <span>JOIN THE</span>
          <span className="inline-flex items-center gap-2">
            WALL
            <ArrowRight className="size-4" />
          </span>
        </PixelButton>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const sectionRef = useInView();
  const [claimStatus, setClaimStatus] = useState("idle");

  return (
    <section className="scene-stage art-scene art-scene--newsletter scroll-scene relative mx-auto w-full max-w-[1920px] overflow-hidden bg-butter max-md:min-h-[1280px]" id="newsletter" ref={sectionRef}>
      <ResponsiveAsset desktop="/assets/08-newsletter-web.png" mobile="/assets/08-newsletter-mobile.png" objectPosition="object-center max-md:object-top" />
      <div className="hero-texture absolute inset-0 opacity-55" />
      <div className="art-canvas relative z-10 mx-auto h-full max-w-[1440px] max-md:min-h-[1280px] max-md:w-[calc(100%-32px)] max-md:py-8">
        <div className="section-reveal absolute left-1/2 top-[5%] w-full max-w-[1180px] -translate-x-1/2 text-center max-md:static max-md:translate-x-0 max-md:text-left">
          <SectionBadge label="GLITCH CLUB" />
          <PixelHeadline className="mt-5 text-[clamp(38px,4vw,66px)] max-md:text-left max-md:text-[34px]">
            <span className="headline-pink block">GET FREE SECRET</span>
            <span className="headline-pink block">STICKERS</span>
          </PixelHeadline>
          <div className="sr-only">
            <Heart className="size-5 fill-bubblegum text-bubblegum" />
            Early members unlock the first pack.
            <Heart className="size-5 fill-bubblegum text-bubblegum" />
          </div>
        </div>

        <form className="section-reveal reveal-delay-2 absolute left-1/2 top-[58%] flex w-[650px] -translate-x-1/2 items-center gap-4 rounded-[20px] border-[5px] border-soda bg-soda p-3 shadow-pixel max-md:left-4 max-md:right-4 max-md:top-auto max-md:bottom-[282px] max-md:w-auto max-md:translate-x-0 max-md:flex-col" onSubmit={(event) => {
          event.preventDefault();
          setClaimStatus("claimed");
        }}>
          <label className="sr-only" htmlFor="glitch-email">Email</label>
          <div className="flex min-h-16 min-w-0 flex-1 items-center gap-3 rounded-[14px] border-[4px] border-ink bg-[#070c14] px-5 font-pixel text-[15px] text-white max-md:w-full max-md:text-[12px]">
            <Mail className="size-5 text-bubblegum" />
            <input className="min-w-0 w-full bg-transparent outline-none placeholder:text-white/70" id="glitch-email" placeholder="your@email.com" type="email" />
          </div>
          <PixelButton className="min-h-16 px-7 text-[16px] max-md:w-full max-md:text-[13px]" tone="pink" type="submit">
            {claimStatus === "claimed" ? "PACK CLAIMED" : "CLAIM PACK"}
            <Gift className="size-5" />
          </PixelButton>
        </form>
      </div>
    </section>
  );
}

export function App() {
  const handleHeroPointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left - bounds.width / 2) / bounds.width;
    const offsetY = (event.clientY - bounds.top - bounds.height / 2) / bounds.height;

    event.currentTarget.style.setProperty("--hero-x", `${offsetX * -8}px`);
    event.currentTarget.style.setProperty("--hero-y", `${offsetY * -6}px`);
  };

  const resetHeroPointer = (event) => {
    event.currentTarget.style.setProperty("--hero-x", "0px");
    event.currentTarget.style.setProperty("--hero-y", "0px");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-butter font-rounded text-ink" id="top">
      <section className="hero-stage art-scene art-scene--16x9 scroll-scene is-visible relative mx-auto w-full max-w-[1920px] bg-butter max-md:min-h-screen" id="hero" onMouseLeave={resetHeroPointer} onMouseMove={handleHeroPointerMove}>
        <ResponsiveAsset className="hero-visual" desktop="/assets/glitch-hero-web.png" mobile="/assets/glitch-hero-mobile.png" />
        <video
          aria-hidden="true"
          autoPlay
          className="hero-video absolute inset-0 hidden h-full w-full object-cover object-center md:block hero-visual"
          loop
          muted
          playsInline
          poster={assetUrl("/assets/glitch-hero-web.png")}
        >
          <source src={assetUrl("/assets/glitch-expression-preview.mp4")} type="video/mp4" />
        </video>

        <div className="hero-texture absolute inset-0" />
        <FloatingPixel className="left-[3%] top-[27%] hidden md:block" color="text-bubblegum" />
        <FloatingPixel className="left-[18%] top-[24%] hidden md:block" />
        <FloatingPixel className="right-[14%] top-[54%] hidden md:block" />
        <FloatingPixel className="right-[4%] top-[50%] hidden lg:block" color="text-arcade" />

        <div className="art-canvas relative z-10 mx-auto flex h-full max-w-[1440px] flex-col py-4 md:py-8 max-md:min-h-screen max-md:w-[calc(100%-32px)]">
          <nav
            aria-label="Primary"
            className="game-shell mx-auto flex min-h-[84px] w-full flex-wrap items-center justify-between gap-2 overflow-visible rounded-[42px] border-[5px] border-[#d6a326] bg-[#ffe273]/95 px-3 shadow-pixel backdrop-blur-[2px] max-lg:pb-3 xl:gap-3 xl:px-4 2xl:min-h-[108px] 2xl:gap-4 2xl:px-6 max-md:min-h-20 max-md:rounded-[30px] max-md:px-4"
          >
            <div className="flex shrink-0 items-center gap-2 xl:gap-3 2xl:gap-4">
              <button
                aria-label="Menu"
                className="toy-control flex size-12 items-center justify-center rounded-2xl border-[4px] border-[#d9a62b] bg-butterSoft text-[#bf8a12] shadow-[inset_0_4px_0_rgba(255,255,255,0.55),0_5px_0_rgba(181,123,10,0.35)] focus:outline-none focus:ring-4 focus:ring-white/80 md:size-14 2xl:size-16"
                type="button"
              >
                <Menu className="size-7 stroke-[3] 2xl:size-8" />
              </button>
              <a className="logo-pop hidden rounded-[20px] bg-[#fff1a4]/80 px-4 py-4 font-pixel text-[28px] tracking-normal text-bubblegum sm:block xl:px-5 xl:text-[32px] 2xl:rounded-[24px] 2xl:px-7 2xl:py-5 2xl:text-[40px]" href="#top">
                GLITCH
              </a>
            </div>

            <div className="nav-mobile-links order-3 flex w-full flex-none items-center justify-center px-1 lg:order-none lg:min-w-0 lg:flex-1 lg:px-2">
              <div className="grid w-full grid-cols-6 rounded-[20px] border-[4px] border-[#d3a32d] bg-[#fff4b0]/88 p-1 shadow-[inset_0_4px_0_rgba(255,255,255,0.5)] lg:flex lg:w-auto 2xl:rounded-[24px] 2xl:p-2">
                {navItems.map((item) => (
                  <a
                    className="toy-control rounded-[12px] px-1 py-2 text-center font-pixel text-[8px] leading-relaxed tracking-normal text-ink hover:bg-bubblegum hover:text-white focus:outline-none focus:ring-4 focus:ring-white/80 lg:rounded-[14px] lg:px-2 lg:py-3 lg:text-[9px] xl:px-3 xl:text-[10px] 2xl:rounded-[18px] 2xl:px-6 2xl:py-4 2xl:text-[14px]"
                    href={item.href}
                    key={item.label}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 2xl:gap-3">
              <div className="hidden items-center gap-1 rounded-[18px] border-[4px] border-[#d3a32d] bg-[#fff4b0]/90 px-2 py-3 font-pixel text-[9px] shadow-[inset_0_4px_0_rgba(255,255,255,0.5)] xl:flex 2xl:gap-2 2xl:rounded-[22px] 2xl:px-4 2xl:py-4 2xl:text-[14px]">
                <Heart className="size-5 fill-bubblegum text-bubblegum 2xl:size-6" />
                <span>00</span>
                <span className="mx-1 h-6 w-0.5 bg-[#c99a23] 2xl:mx-2 2xl:h-7" />
                <Star className="size-6 fill-soda text-soda 2xl:size-7" />
                <span>100</span>
              </div>
              <button
                aria-label="Search"
                className="toy-control hidden size-12 items-center justify-center rounded-full border-[4px] border-[#90b664] bg-[#bbda87] text-[#254d21] shadow-[inset_0_4px_0_rgba(255,255,255,0.48),0_5px_0_rgba(73,120,42,0.28)] focus:outline-none focus:ring-4 focus:ring-white/80 sm:flex 2xl:size-14"
                type="button"
              >
                <Search className="size-6 stroke-[3] 2xl:size-7" />
              </button>
              <button
                aria-label="Cart"
                className="toy-control flex size-12 items-center justify-center rounded-2xl border-[4px] border-[#d3a32d] bg-[#fff4b0]/90 text-ink shadow-[inset_0_4px_0_rgba(255,255,255,0.5),0_5px_0_rgba(181,123,10,0.28)] focus:outline-none focus:ring-4 focus:ring-white/80 2xl:size-14"
                type="button"
              >
                <ShoppingBag className="size-6 stroke-[3] 2xl:size-7" />
              </button>
            </div>
          </nav>

          <div className="flex flex-1 items-center pb-14 pt-8 max-md:items-end max-md:pb-8 max-md:pt-4">
            <div className="max-w-[690px] max-md:mb-28 max-md:max-w-[330px]">
              <div className="mb-4 inline-flex rotate-[-5deg] items-center gap-3 rounded-[24px] border-[4px] border-white bg-soda px-5 py-4 font-pixel text-[13px] leading-tight text-white shadow-sticker max-md:hidden">
                <Gamepad2 className="size-6" />
                GAME FACE ON
              </div>

              <h1 className="select-none text-left font-rounded text-[clamp(72px,7vw,132px)] font-black leading-[0.82] tracking-normal text-white max-md:text-[76px]">
                <span className="headline-pink block">MY FIRST</span>
                <span className="headline-blue block text-[1.4em] leading-[0.75]">TOY</span>
                <span className="headline-green block text-[0.9em] leading-[0.9]">SKINCARE</span>
              </h1>

              <div className="mt-8 hidden max-w-[590px] items-center gap-4 rounded-[18px] border-[5px] border-ink bg-[#fff9d8]/95 px-7 py-5 font-pixel text-[17px] leading-relaxed shadow-[0_7px_0_rgba(0,0,0,0.16)] 2xl:flex">
                <Heart className="size-8 shrink-0 fill-bubblegum text-bubblegum" />
                <p>
                  Cute patches. Serious moisture.
                  <br />
                  Press start for <span className="text-bubblegum">glow.</span>
                </p>
              </div>

              <ArcadePanel compact className="absolute bottom-[5%] left-0 hidden w-[60%] max-w-[560px] md:flex md:flex-col 2xl:hidden" onShop={() => scrollToSection("#product-collection")} onStart={() => scrollToSection("#product-collection")} />
            </div>
          </div>

          <ArcadePanel className="absolute bottom-9 right-0 hidden w-[610px] 2xl:block" onShop={() => scrollToSection("#product-collection")} onStart={() => scrollToSection("#product-collection")} />

          <div className="absolute bottom-5 left-4 right-4 z-20 flex gap-3 md:hidden">
            <PixelButton className="min-h-14 flex-1 rounded-[18px] px-4 text-[12px]" onClick={() => scrollToSection("#product-collection")} tone="pink">
              START
              <Play className="size-4 fill-white" />
            </PixelButton>
            <PixelButton className="min-h-14 flex-1 rounded-[18px] px-4 text-[12px]" onClick={() => scrollToSection("#product-collection")} tone="blue">
              STICKERS
              <Sparkles className="size-4" />
            </PixelButton>
          </div>
        </div>
      </section>
      <BrandSection />
      <ProductSection />
      <IngredientsSection />
      <RitualSection />
      <ResultsSection />
      <NewsletterSection />
    </main>
  );
}
