import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Portfolio - L'HOTE LORENTZ Léo</title>
      </head>
      <body>
        <nav className="navbar">
          <div className="navbar-content">
              <Link className="logo" href="/">L'HOTE LORENTZ Léo </Link>
            <ul className="nav-links">
                <li><Link href="/">Accueil</Link></li>
                <li><Link href="/cv">CV</Link></li>
              <li><Link href="/tableau-synthese">Tableau BTS</Link></li>
                <li className="nav-dropdown">
                  <Link href="/stages">Stages</Link>
                  <ul className="dropdown-menu">
                    <li><Link href="/stages/premiere-annee">Premiere annee</Link></li>
                    <li><Link href="/stages/deuxieme-annee">Deuxieme annee</Link></li>
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
