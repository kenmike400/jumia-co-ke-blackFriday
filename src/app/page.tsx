"use client";

import { useEffect, useMemo, useState } from "react";
import p1 from "../products-1.json";
import p2 from "../products-2.json";
import p3 from "../products-3.json";
import p4 from "../products-4.json";
import p5 from "../products-5.json";
import p6 from "../products-6.json";
import p7 from "../products-7.json";
import p8 from "../products-8.json";
import p9 from "../products-9.json";
import p10 from "../products-10.json";
import p11 from "../products-11.json";
import p12 from "../products-12.json";

type Product = {
  sku: string;
  name: string;
  brand?: string;
  price: string;
  priceLabel: string;
  oldPrice: string;
  discount: string;
  image: string;
  imageBlack: string;
  url: string;
  rating?: number | null;
};

const ALL: Product[] = [
  ...(p1 as Product[]),
  ...(p2 as Product[]),
  ...(p3 as Product[]),
  ...(p4 as Product[]),
  ...(p5 as Product[]),
  ...(p6 as Product[]),
  ...(p7 as Product[]),
  ...(p8 as Product[]),
  ...(p9 as Product[]),
  ...(p10 as Product[]),
  ...(p11 as Product[]),
  ...(p12 as Product[]),
];

const BANNERS = [
  "https://ke.jumia.is/cms/2026/BlackFriday/Teasing/V1/Generics/KE_ONS_BF26_Teasing_Generic_1026_MSB.png",
  "https://ke.jumia.is/cms/2026/BlackFriday/Teasing/V1/Initiatives/KE_ONS_BF26_Teasing_Initiatives_1026_TB1.jpg",
  "https://ke.jumia.is/cms/2026/BlackFriday/Teasing/V1/Initiatives/KE_ONS_BF26_Teasing_Initiatives_1026_TB2.jpg",
  "https://ke.jumia.is/cms/2026/BlackFriday/Teasing/V1/Initiatives/KE_ONS_BF26_Teasing_Initiatives_1026_TB3.jpg",
  "https://ke.jumia.is/cms/2026/BlackFriday/Teasing/V1/Brands/nivea-desktop.png",
  "https://ke.jumia.is/cms/2026/BlackFriday/Teasing/V1/Brands/xiaomi-desktop.png",
];

const CATS = [
  { id: "phones", name: "Phones", img: "https://ke.jumia.is/cms/_FL_2026/Smartphones.png" },
  { id: "tvs", name: "TVs", img: "https://ke.jumia.is/cms/_FL_2026/TVs.png" },
  { id: "appliances", name: "Appliances", img: "https://ke.jumia.is/cms/_FL_2026/LargeAppliances.png" },
  { id: "fashion", name: "Fashion", img: "https://ke.jumia.is/cms/_FL_2026/Fashion.png" },
  { id: "beauty", name: "Beauty", img: "https://ke.jumia.is/cms/_FL_2026/Vault/Beauty/SunCare.png" },
  { id: "audio", name: "Audio", img: "https://ke.jumia.is/cms/_FL_2026/HomeAudio.png" },
  { id: "gaming", name: "Gaming", img: "https://ke.jumia.is/cms/_FL_2026/Gaming.png" },
  { id: "home", name: "Home", img: "https://ke.jumia.is/cms/_FL_2026/Home.png" },
];

const FILTERS: Record<string, (p: Product) => boolean> = {
  phones: (p) =>
    /phone|mobile|samsung|xiaomi|infinix|tecno|iphone|charger|earpod|headset|usb.?c|power.?bank|tablet/i.test(
      `${p.name} ${p.brand || ""}`
    ),
  tvs: (p) => /tv|television|smart.?android|frameless|netflix|hisense|amtec|vision/i.test(`${p.name} ${p.brand || ""}`),
  appliances: (p) =>
    /kettle|blender|microwave|fridge|dispenser|cooker|iron|fan|washer|appliance|hot.?plate|grinder/i.test(
      `${p.name} ${p.brand || ""}`
    ),
  fashion: (p) =>
    /shoe|sneaker|loafer|boxer|shirt|dress|fashion|jean|bag|watch|sock|trouser/i.test(`${p.name} ${p.brand || ""}`),
  beauty: (p) =>
    /nivea|garnier|l.?or[eé]al|serum|cream|sunscreen|shower|gel|lip|deo|rashel|beauty|skin|hair.?dryer|clipper|trimmer/i.test(
      `${p.name} ${p.brand || ""}`
    ),
  audio: (p) => /speaker|audio|bluetooth|earphone|headphone|sound|woofer/i.test(`${p.name} ${p.brand || ""}`),
  gaming: (p) => /gaming|mouse|keyboard|pad|console|webcam/i.test(`${p.name} ${p.brand || ""}`),
  home: (p) => /home|rack|mat|pad|hub|cable|flash.?drive|storage/i.test(`${p.name} ${p.brand || ""}`),
  all: () => true,
  deals: () => true,
};

function formatPrice(p: Product) {
  if (p.priceLabel) return p.priceLabel;
  const n = Number(p.price);
  if (!Number.isFinite(n)) return p.price;
  return `KSh ${n.toLocaleString()}`;
}

function ProductCard({ p }: { p: Product }) {
  const disc = p.discount
    ? p.discount.startsWith("-")
      ? p.discount
      : `-${p.discount}`
    : null;
  const href = p.url.startsWith("http") ? p.url : `https://www.jumia.co.ke${p.url}`;
  return (
    <article className="prd">
      <a href={href} target="_blank" rel="noreferrer">
        <div className="prd-img">
          <span className="prd-badge">Black Friday</span>
          {disc ? <span className="prd-disc">{disc}</span> : null}
          <img src={p.imageBlack || p.image} alt={p.name} loading="lazy" />
        </div>
        <div className="prd-body">
          <div className="prd-name">{p.name}</div>
          <div className="prd-price">{formatPrice(p)}</div>
          {p.oldPrice ? <div className="prd-old">{p.oldPrice}</div> : null}
          {p.rating ? <div className="prd-rating">★ {p.rating}</div> : null}
        </div>
      </a>
      <div className="prd-body" style={{ paddingTop: 0 }}>
        <a className="prd-btn" href={href} target="_blank" rel="noreferrer">
          Buy now
        </a>
      </div>
    </article>
  );
}

function catFromHash(): string {
  if (typeof window === "undefined") return "all";
  const h = (window.location.hash || "#deals").replace("#", "").toLowerCase();
  if (h === "deals" || h === "" || h === "all") return "all";
  if (FILTERS[h]) return h;
  return "all";
}

export default function BlackFridayPage() {
  const [cat, setCat] = useState("all");

  useEffect(() => {
    const apply = () => {
      const c = catFromHash();
      setCat(c);
      document.querySelectorAll(".cat-strip a").forEach((a) => {
        const href = a.getAttribute("href") || "";
        const active =
          (c === "all" && (href === "#deals" || href === "/")) || href === `#${c}`;
        a.classList.toggle("active", Boolean(active && href !== "/"));
      });
      if (window.location.hash && window.location.hash !== "#") {
        const el = document.getElementById("deals");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const list = useMemo(() => {
    const fn = FILTERS[cat] || FILTERS.all;
    return ALL.filter(fn);
  }, [cat]);

  const half = Math.ceil(list.length / 2) || 1;
  const top = list.slice(0, half);
  const more = list.slice(half);
  const title =
    cat === "all"
      ? "Flash sales — Black Friday"
      : `${cat.charAt(0).toUpperCase() + cat.slice(1)} — Black Friday`;

  return (
    <>
      <section className="bf-hero" aria-label="Black Friday">
        <div className="bf-hero-inner">
          <div>
            <span className="bf-badge">LIVE NOW · KENYA</span>
            <h1>
              Black Friday <span>2026</span>
            </h1>
            <p className="lead">
              Best deals on phones, TVs, appliances, fashion & beauty. Flash
              sales live — pay with M-Pesa, track your order, shop express.
            </p>
            <a className="bf-cta" href="#deals">
              Shop Black Friday deals
            </a>
          </div>
          <div className="bf-hero-art">
            <div className="pill">
              <strong>80%</strong>
              <span>Up to off</span>
            </div>
            <div className="pill">
              <strong>{ALL.length}+</strong>
              <span>Hot deals</span>
            </div>
            <div className="pill">
              <strong>M-Pesa</strong>
              <span>Pay easy</span>
            </div>
          </div>
        </div>
      </section>

      <div className="bf-banners">
        {BANNERS.map((src) => (
          <a key={src} href="#deals" className="bf-banner-item">
            <img src={src} alt="Jumia Black Friday" loading="lazy" />
          </a>
        ))}
      </div>

      <div className="bf-cats">
        {CATS.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className={`bf-cat${cat === c.id ? " active-cat" : ""}`}
            onClick={() => setCat(c.id)}
          >
            <img src={c.img} alt={c.name} loading="lazy" />
            <span>{c.name}</span>
          </a>
        ))}
      </div>

      <div className="bf-strip">
        <div className="bf-strip-inner">
          <div>
            <strong>Black Friday deal</strong>
            <span>
              {" "}·{" "}
              {cat === "all"
                ? "All categories"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}{" "}
              · {list.length} items
            </span>
          </div>
          <span>Limited stock · Prices while stocks last</span>
        </div>
      </div>

      <section className="section" id="deals">
        <div className="section-head">
          <h2>
            🔥 {title.split(" — ")[0]} — <span>{title.split(" — ")[1] || "Black Friday"}</span>
          </h2>
          {cat !== "all" ? (
            <a href="#deals" onClick={() => setCat("all")}>
              See all →
            </a>
          ) : (
            <a href="#more">See all →</a>
          )}
        </div>
        {list.length === 0 ? (
          <p style={{ padding: 24, textAlign: "center" }}>
            No items in this category yet.{" "}
            <a href="#deals" style={{ color: "#f68b1e" }} onClick={() => setCat("all")}>
              View all deals
            </a>
          </p>
        ) : (
          <div className="prd-grid">
            {top.map((p) => (
              <ProductCard key={p.sku} p={p} />
            ))}
          </div>
        )}
      </section>

      {more.length > 0 && (
        <section className="section" id="more">
          <div className="section-head">
            <h2>
              More <span>deals</span>
            </h2>
            <a href="#deals">Back to top →</a>
          </div>
          <div className="prd-grid">
            {more.map((p) => (
              <ProductCard key={p.sku} p={p} />
            ))}
          </div>
        </section>
      )}

      <div className="bf-strip">
        <div className="bf-strip-inner">
          <div>
            <strong>Shop all Black Friday</strong>
            <span> · Phones · TVs · Appliances · Fashion · Beauty · Nivea</span>
          </div>
          <a
            className="bf-cta"
            href="https://www.jumia.co.ke/mlp-black-friday/"
            target="_blank"
            rel="noreferrer"
          >
            Open Jumia BF
          </a>
        </div>
      </div>
    </>
  );
}
