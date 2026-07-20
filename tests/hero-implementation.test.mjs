import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const appSource = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
const stylesSource = readFileSync(new URL("../src/styles.css", import.meta.url), "utf8");

function balancedBlock(source, marker) {
  const markerIndex = source.indexOf(marker);
  const openIndex = source.indexOf("{", markerIndex);
  let depth = 0;

  for (let index = openIndex; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
    if (depth === 0) return source.slice(openIndex, index + 1);
  }

  return "";
}

test("uses the generated desktop and mobile hero assets", () => {
  assert.match(appSource, /glitch-hero-web\.png/);
  assert.match(appSource, /glitch-hero-mobile\.png/);
});

test("uses the generated desktop and mobile section assets in order", () => {
  for (const asset of [
    "03-brand-web.png",
    "03-brand-mobile.png",
    "04-product-web.png",
    "04-product-mobile.png",
    "05-ingredients-web.png",
    "05-ingredients-mobile.png",
    "06-ritual-web.png",
    "06-ritual-mobile.png",
    "07-results-web.png",
    "07-results-mobile.png",
    "08-newsletter-web.png",
    "08-newsletter-mobile.png",
  ]) {
    assert.ok(appSource.includes(asset), `Missing ${asset}`);
  }

  assert.ok(appSource.indexOf("<BrandSection />") < appSource.indexOf("<ProductSection />"));
  assert.ok(appSource.indexOf("<ProductSection />") < appSource.indexOf("<IngredientsSection />"));
  assert.ok(appSource.indexOf("<IngredientsSection />") < appSource.indexOf("<RitualSection />"));
  assert.ok(appSource.indexOf("<RitualSection />") < appSource.indexOf("<ResultsSection />"));
  assert.ok(appSource.indexOf("<ResultsSection />") < appSource.indexOf("<NewsletterSection />"));
});

test("uses the 1080p expression video only as a desktop hero layer", () => {
  assert.match(appSource, /glitch-expression-preview\.mp4/);
  assert.match(appSource, /hero-video absolute inset-0 hidden h-full w-full object-cover object-center md:block/);
  assert.match(stylesSource, /prefers-reduced-motion:\s*reduce/);
});

test("implements the requested desktop sizing contract", () => {
  assert.match(appSource, /max-w-\[1440px\]/);
  assert.match(appSource, /w-\[calc\(100%-32px\)\]/);
  assert.doesNotMatch(appSource, /w-\[calc\(100%-480px\)\]/);
});

test("avoids desktop overlap at narrower browser widths", () => {
  assert.match(appSource, /2xl:block/);
  assert.match(appSource, /md:flex md:flex-col 2xl:hidden/);
  assert.match(appSource, /hidden max-w-\[590px\][\s\S]*2xl:flex/s);
  assert.match(appSource, /clamp\(72px,7vw,132px\)/);
});

test("keeps the primary navigation visible in narrow desktop app windows", () => {
  assert.match(appSource, /nav-mobile-links order-3 flex w-full flex-none/);
  assert.match(stylesSource, /\.nav-mobile-links\s*\{/);
  assert.doesNotMatch(appSource, /hidden min-w-0 flex-1 items-center justify-center px-2 (?:lg|2xl):flex/);
});

test("recreates the visible hero UI copy from the source image", () => {
  for (const text of ["GLITCH", "SHOP", "BESTIES", "ABOUT", "GLITCH CLUB", "REWARDS", "MY FIRST", "TOY", "SKINCARE", "START GAME", "SHOP STICKERS"]) {
    assert.ok(appSource.includes(text), `Missing ${text}`);
  }
});

test("recreates the section UI copy from the source images", () => {
  for (const text of [
    "BRAND PHILOSOPHY",
    "READ THE STORY",
    "PRODUCT COLLECTION",
    "PICK",
    "YOUR",
    "PLAYER",
    "STICKER CREAM",
    "ADD TO BAG",
    "INGREDIENTS EDITORIAL",
    "ITEM",
    "ABILITY",
    "INDEX",
    "CHECK THE FORMULA",
    "PLAY MANUAL",
    "WATCH THE RITUAL",
    "STICKER",
    "WALL",
    "JOIN THE",
    "GET FREE SECRET",
    "CLAIM PACK",
  ]) {
    assert.ok(appSource.includes(text), `Missing ${text}`);
  }
});

test("uses section-name labels without numeric progress counters", () => {
  assert.match(appSource, /function SectionBadge\(\{ label \}\)/);
  assert.doesNotMatch(appSource, /number=|\{number\}|0[3-8] \/ 09/);
});

test("defines responsive mobile image treatment", () => {
  assert.match(appSource, /media="\(max-width: 767px\)"/);
  assert.match(appSource, /srcSet=\{assetUrl\(mobile\)\}/);
  assert.match(stylesSource, /@media\s*\(max-width:\s*767px\)/);
});

test("locks the last two desktop scenes to their asset coordinate system", () => {
  assert.equal((appSource.match(/scene-stage/g) ?? []).length, 2);
  for (const id of ["results-sticker-wall", "newsletter"]) {
    assert.ok(appSource.includes(`id="${id}"`), `Missing scene ${id}`);
  }
  assert.match(stylesSource, /\.scene-stage\s*\{[\s\S]*aspect-ratio:\s*16\s*\/\s*9/);
});

test("connects primary navigation and section calls to their intended in-page destinations", () => {
  for (const destination of ["#product-collection", "#results-sticker-wall", "#brand-philosophy", "#newsletter", "#ingredients-editorial"]) {
    assert.ok(appSource.includes(destination), `Missing destination ${destination}`);
  }

  assert.match(appSource, /function HeroSection|function App[\s\S]*scrollToSection/);
});

test("adds restrained scroll reveals and desktop hero hover motion with a reduced-motion fallback", () => {
  assert.match(appSource, /useInView/);
  assert.match(appSource, /onMouseMove=\{handleHeroPointerMove\}/);
  assert.match(stylesSource, /\.section-reveal/);
  assert.match(stylesSource, /\.hero-stage:hover\s+\.hero-visual/);
  assert.match(stylesSource, /prefers-reduced-motion:\s*reduce[\s\S]*\.section-reveal/);
  assert.match(stylesSource, /@keyframes\s+reduced-pop/);
});

test("keeps the repaired 07 and 08 controls inside their artwork safe zones", () => {
  assert.match(appSource, /function ResultsSection[\s\S]*right-\[4%\][\s\S]*JOIN THE[\s\S]*WALL/s);
  assert.match(appSource, /function NewsletterSection[\s\S]*<div className="sr-only">[\s\S]*Early members unlock/s);
});

test("replays scene motion after sections leave and re-enter the viewport", () => {
  const sceneSettleKeyframes = balancedBlock(stylesSource, "@keyframes scene-settle");

  assert.match(appSource, /node\.classList\.toggle\("is-visible", entry\.isIntersecting\)/);
  assert.match(stylesSource, /\.scene-asset/);
  assert.match(sceneSettleKeyframes, /0%/);
  assert.match(sceneSettleKeyframes, /72%/);
  assert.match(sceneSettleKeyframes, /100%/);
});

test("scales the affected desktop scenes without clipping their controls", () => {
  assert.match(appSource, /function ProductSection[\s\S]*art-scene--16x9[\s\S]*art-canvas/s);
  assert.match(appSource, /function RitualSection[\s\S]*art-scene--16x9[\s\S]*art-canvas/s);
  assert.match(stylesSource, /\.art-scene--16x9\s*\{[\s\S]*aspect-ratio:\s*16\s*\/\s*9/);
  assert.match(stylesSource, /\.art-canvas\s*\{[\s\S]*width:\s*75%/);
});

test("keeps the product controls in one arcade-screen panel", () => {
  assert.match(appSource, /function ProductSection[\s\S]*product-arcade-ui[\s\S]*CURRENT PLAYER[\s\S]*ADD TO BAG/s);
  assert.doesNotMatch(appSource, /function ProductSection[\s\S]*bottom-12 right-0 w-\[420px\]/s);
});

test("keeps ritual controls available through intermediate desktop widths", () => {
  assert.match(appSource, /function RitualSection[\s\S]*ritual-copy[\s\S]*ritual-label[\s\S]*ritual-progress[\s\S]*ritual-steps/s);
  assert.doesNotMatch(appSource, /function RitualSection[\s\S]*hidden[^\n]*xl:flex[\s\S]*01 DECORATE THE JAR/s);
});

test("removes the footer section and its asset references", () => {
  assert.doesNotMatch(appSource, /function FooterSection|<FooterSection\s*\/>|footerLinks|09-footer-/);
  assert.doesNotMatch(stylesSource, /\.art-scene--footer|\.footer-/);
});

test("adds visible toy-like scroll and control motion", () => {
  assert.match(stylesSource, /@keyframes\s+toy-pop-in/);
  assert.match(stylesSource, /\.toy-control:hover/);
  assert.match(stylesSource, /\.toy-control:active/);
  assert.match(appSource, /toy-control/);
});

test("uses the proportional desktop canvas across the complete landing page", () => {
  for (const component of ["App", "BrandSection", "ProductSection", "IngredientsSection", "RitualSection", "ResultsSection", "NewsletterSection"]) {
    assert.match(appSource, new RegExp(`function ${component}[\\s\\S]*art-scene`, "s"), `Missing art scene in ${component}`);
  }
  assert.match(appSource, /function NewsletterSection[\s\S]*art-scene--newsletter/s);
  assert.match(stylesSource, /\.art-scene--newsletter\s*\{[\s\S]*aspect-ratio:\s*1717\s*\/\s*916/);
});

test("keeps dense section copy clear at small desktop widths", () => {
  assert.match(appSource, /function ProductSection[\s\S]*clamp\(20px,2\.5vw,52px\)/s);
  assert.match(appSource, /ritual-label[\s\S]*top-\[40%\]/s);
  assert.match(appSource, /function IngredientsSection[\s\S]*h-\[76%\][\s\S]*grid-rows-2/s);
  assert.match(appSource, /ingredient-card/);
  assert.match(stylesSource, /@media\s*\(min-width:\s*768px\)\s*and\s*\(max-width:\s*1199px\)[\s\S]*\.ingredient-card/);
});
