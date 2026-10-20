"use client";

import { useEffect, useMemo, useState } from "react";

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
    /phone|mobile|samsung|xiaomi|infinix|tecno|iphone|charger|earpod|headset|usb.?c|power.?bank|tablet|redmi|oppo|vivo|nokia|itel|smartphone/i.test(
      `${p.name} ${p.brand || ""}`
    ),
  tvs: (p) =>
    /\btv\b|television|smart.?android|frameless|netflix|hisense|amtec|vision|oled|qled|led.?tv|android.?tv/i.test(
      `${p.name} ${p.brand || ""}`
    ),
  appliances: (p) =>
    /kettle|blender|microwave|fridge|refrigerator|dispenser|cooker|iron|fan|washer|washing|appliance|hot.?plate|grinder|air.?fryer|toaster|vacuum|pressure.?cooker|oven|stove/i.test(
      `${p.name} ${p.brand || ""}`
    ),
  fashion: (p) =>
    /shoe|sneaker|loafer|boxer|shirt|dress|fashion|jean|bag|watch|sock|trouser|boot|sandal|heel|slipper|hoodie|jacket|t-shirt|polo/i.test(
      `${p.name} ${p.brand || ""}`
    ),
  beauty: (p) =>
    /nivea|garnier|l.?or[eé]al|serum|cream|sunscreen|shower|gel|lip|deo|rashel|beauty|skin|hair.?dryer|clipper|trimmer|lotion|shampoo|perfume|makeup|cosmetic|moisturizer/i.test(
      `${p.name} ${p.brand || ""}`
    ),
  audio: (p) =>
    /speaker|audio|bluetooth|earphone|headphone|sound|woofer|earbud/i.test(`${p.name} ${p.brand || ""}`),
  gaming: (p) =>
    /gaming|mouse|keyboard|pad|console|webcam|joystick|controller/i.test(`${p.name} ${p.brand || ""}`),
  home: (p) =>
    /home|rack|mat|pad|hub|cable|flash.?drive|storage|furniture|curtain|bedding|kitchen|utensil|container|organizer/i.test(
      `${p.name} ${p.brand || ""}`
    ),
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

export default function Home() {
  const [cat, setCat] = useState("all");
  const [all, setAll] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      [1, 2, 3, 4].map((i) =>
        fetch(`/products-part${i}.json`)
          .then((r) => r.json())
          .catch(() => [])
      )
    )
      .then((parts) => {
        const merged = parts.flat().filter((p: Product) => p && p.name);
        setAll(merged);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const apply = () => {
      const h = (window.location.hash || "#deals").replace("#", "") || "deals";
      if (FILTERS[h]) setCat(h);
      else setCat("all");
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  useEffect(() => {
    document.querySelectorAll("[data-cat]").forEach((el) => {
      const a = el as HTMLAnchorElement;
      a.classList.toggle(
        "active-cat",
        a.getAttribute("data-cat") === cat || (cat === "all" && a.getAttribute("data-cat") === "all")
      );
    });
  }, [cat]);

  const filtered = useMemo(() => {
    const fn = FILTERS[cat] || FILTERS.all;
    return all.filter(fn);
  }, [cat, all]);

  const top = filtered.slice(0, 48);
  const more = filtered.slice(48);

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Jumia Kenya · Black Friday 2026</p>
            <h1>Black Friday deals live now</h1>
            <p className="lead">
              Best deals on phones, TVs, appliances, fashion & beauty. Flash sales, free
              delivery* and M-Pesa friendly.
            </p>
            <div className="hero-stats">
              <span>
                <strong>{all.length || "1000"}+</strong> products
              </span>
              <span>
                <strong>Up to 70%</strong> off
              </span>
              <span>
                <strong>M-Pesa</strong> pay on delivery
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="bf-banners">
        {BANNERS.map((src, i) => (
          <div className="bf-banner-item" key={i}>
            <img src={src} alt="Black Friday campaign" />
          </div>
        ))}
      </div>

      <div className="bf-cats">
        {CATS.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className={`bf-cat${cat === c.id ? " active-cat" : ""}`}
            data-cat={c.id}
            onClick={() => setCat(c.id)}
          >
            <img src={c.img} alt={c.name} />
            <span>{c.name}</span>
          </a>
        ))}
      </div>

      <section className="section" id="deals">
        <div className="section-head">
          <h2>
            {cat === "all" || cat === "deals"
              ? "All Black Friday deals"
              : `${cat.charAt(0).toUpperCase() + cat.slice(1)} deals`}
          </h2>
          <p>{loading ? "Loading…" : `${filtered.length} products`}</p>
        </div>
        {loading ? (
          <p style={{ padding: 24 }}>Loading products…</p>
        ) : (
          <div className="grid">
            {top.map((p) => (
              <ProductCard key={p.sku + p.name} p={p} />
            ))}
          </div>
        )}
      </section>

      {more.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>More deals</h2>
          </div>
          <div className="grid">
            {more.map((p) => (
              <ProductCard key={"m-" + p.sku + p.name} p={p} />
            ))}
          </div>
        </section>
      )}

      <div className="cta-bar">
        <div className="cta-inner">
          <p>Shop the full Black Friday catalogue on Jumia</p>
          <a className="cta-btn" href="https://www.jumia.co.ke/" target="_blank" rel="noreferrer">
            Open Jumia BF
          </a>
        </div>
      </div>
    </>
  );
}
