import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jumia Black Friday 2026 Kenya: Best Deals and Offers",
  description:
    "Jumia Black Friday 2026 in Kenya: shop deals on phones, TVs, appliances, fashion, and beauty. Pay with M-Pesa, flash sales live now.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://www.jumia.co.ke/assets_he/favicon.87f00114.ico"
        />
        <link rel="preconnect" href="https://ke.jumia.is" />
      </head>
      <body>
        <div className="topbar">
          <div className="topbar-inner">
            <div>
              <a href="https://www.jumia.co.ke/" target="_blank" rel="noreferrer">
                Sell on Jumia
              </a>
              <a href="/" className="pay-link">
                Jumia Pay
              </a>
            </div>
            <div>
              <a href="#deals">Deals</a>
              <a href="#deals">Help</a>
              <a href="#deals">Cart</a>
            </div>
          </div>
        </div>

        <header className="header">
          <div className="header-inner">
            <a href="/" className="logo" title="Jumia Kenya">
              <img
                src="https://ke.jumia.is/cms/icons/jumialogo-x-4.png"
                alt="Jumia"
                width={110}
                height={32}
              />
            </a>
            <form className="search" role="search">
              <input
                type="search"
                placeholder="Search products, brands and categories"
                aria-label="Search"
              />
              <button type="submit">SEARCH</button>
            </form>
            <div className="header-actions">
              <span className="ha">Account</span>
              <span className="ha">Help</span>
              <span className="ha cart">Cart</span>
            </div>
          </div>
        </header>

        <nav className="cat-strip">
          <div className="cat-strip-inner">
            <a href="/">Home</a>
            <a href="#deals" className="active">
              Black Friday
            </a>
            <a href="#deals">Phones</a>
            <a href="#deals">TVs</a>
            <a href="#deals">Appliances</a>
            <a href="#deals">Fashion</a>
            <a href="#deals">Beauty</a>
            <a href="#deals">All Deals</a>
          </div>
        </nav>

        {children}

        <footer className="footer">
          <div className="footer-inner">
            <div>
              <h4>Need Help?</h4>
              <a href="#deals">Chat with us</a>
              <a href="#deals">Help Center</a>
            </div>
            <div>
              <h4>About Jumia</h4>
              <a href="#deals">About us</a>
              <a href="#deals">Careers</a>
            </div>
            <div>
              <h4>Payment</h4>
              <span className="mpesa">M-Pesa</span>
            </div>
            <div>
              <h4>Black Friday</h4>
              <a href="#deals">Live deals</a>
              <a href="#deals">Flash sales</a>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} Jumia Kenya · Black Friday 2026
          </div>
        </footer>
      </body>
    </html>
  );
}
