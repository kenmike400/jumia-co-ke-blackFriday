import p1 from "../products-1.json";
import p2 from "../products-2.json";
import p3 from "../products-3.json";
import p4 from "../products-4.json";
import p5 from "../products-5.json";
import p6 from "../products-6.json";
import p7 from "../products-7.json";
import p8 from "../products-8.json";

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

const list = [...(p1 as Product[]), ...(p2 as Product[]), ...(p3 as Product[]), ...(p4 as Product[]), ...(p5 as Product[]), ...(p6 as Product[]), ...(p7 as Product[]), ...(p8 as Product[])];

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
            <div className="pill">
              <strong>M-Pesa</strong>
              <span>Pay easy</span>
            </div>
          </div>
        </div>
      </section>

      <div className="bf-strip">
        <div className="bf-strip-inner">
          <div>
            <strong>Black Friday deal</strong>
            <span> · Official store picks · Express shipping available</span>
          </div>
          <span>Limited stock · Prices while stocks last</span>
        </div>
      </div>

      <section className="section" id="deals">
        <div className="section-head">
          <h2>
            🔥 Flash sales — <span>Black Friday</span>
          </h2>
          <a href="#more">See all →</a>
        </div>
        <div className="prd-grid">
          {top.map((p) => (
            <ProductCard key={p.sku} p={p} />
          ))}
        </div>
      </section>

      <section className="section" id="more">
        <div className="section-head">
          <h2>
            More Black Friday <span>deals</span>
          </h2>
          <a href="#deals">Back to top →</a>
        </div>
        <div className="prd-grid">
          {more.map((p) => (
            <ProductCard key={p.sku} p={p} />
          ))}
        </div>
      </section>

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
