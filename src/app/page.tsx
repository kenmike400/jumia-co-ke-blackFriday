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
  ratingsCount?: number | null;
  isExpress?: boolean;
  badge?: string;
};

const list = [...p1, ...p2, ...p3, ...p4, ...p5, ...p6, ...p7, ...p8, ...p9, ...p10] as Product[];

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
          {p.rating ? (
            <div className="prd-rating">
              ★ {p.rating}
              {p.ratingsCount ? ` (${p.ratingsCount.toLocaleString()})` : ""}
            </div>
          ) : null}
          {p.isExpress ? <div className="prd-ship">Express Shipping</div> : null}
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

export default function BlackFridayPage() {
  const half = Math.ceil(list.length / 2);
  const top = list.slice(0, half);
  const more = list.slice(half);

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
              Best deals on phones, TVs, appliances, fashion &amp; beauty. Flash
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
              <strong>{list.length}+</strong>
              <span>Hot deals</span>
            </div>
          </div>
        </div>
      </section>

      <section id="deals" className="bf-section">
        <div className="bf-section-head">
          <h2>Flash sale deals</h2>
          <p>Black Friday prices · Official store · Express shipping</p>
        </div>
        <div className="prd-grid">
          {top.map((p) => (
            <ProductCard key={p.sku} p={p} />
          ))}
        </div>
      </section>

      <section className="bf-section bf-section-alt">
        <div className="bf-section-head">
          <h2>More Black Friday picks</h2>
          <p>Health &amp; beauty · Nivea · Electronics · Fashion</p>
        </div>
        <div className="prd-grid">
          {more.map((p) => (
            <ProductCard key={p.sku} p={p} />
          ))}
        </div>
      </section>
    </>
  );
}
