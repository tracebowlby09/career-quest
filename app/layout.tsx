import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Career Quest",
  description: "Explore careers through scenarios and skill challenges.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <div className="container topbarInner">
            <Link className="brand" href="/">Career Quest</Link>
            <nav className="nav">
              <Link className="navLink" href="/careers">Careers</Link>
              <Link className="navLink" href="/about">How to Play</Link>
            </nav>
          </div>
        </header>

        <main className="container">{children}</main>

        <footer className="footer">
          <div className="container footerInner">
            <span>© {new Date().getFullYear()} Career Quest</span>
            <span className="muted">Built with Next.js</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
