
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Link from "next/link";
import NavMenuAutoClose from "./NavMenuAutoClose";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Portfolio - L'HOTE LORENTZ Léo</title>
      </head>
      <body>
        <NavMenuAutoClose />
        <nav className="site-navbar">
          <div className="navbar-content">
            <Link className="logo" href="/">
              <span className="logo-top">L'HOTE LORENTZ</span>
              <span className="logo-bottom">Léo</span>
            </Link>
            <input id="nav-toggle" className="nav-toggle-input" type="checkbox" aria-label="Ouvrir le menu" />
            <label className="nav-toggle-btn" htmlFor="nav-toggle" aria-hidden="true">
              <span />
              <span />
              <span />
            </label>
            <ul className="nav-links">
                <li><Link href="/">Accueil</Link></li>
                <li><Link href="/cv">CV</Link></li>
              <li><Link href="/tableau-synthese">Tableau BTS</Link></li>
                <li className="nav-dropdown">
                  <button type="button" className="nav-dropdown-toggle">Stages</button>
                  <ul className="dropdown-menu">
                    <li><Link href="/stages/premiere-annee">Première année</Link></li>
                    <li><Link href="/stages/deuxieme-annee">Deuxième année</Link></li>
                  </ul>
                </li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </nav>
        <div className="layout-bg">
          {children}
        </div>
      </body>
    </html>
  );
}
