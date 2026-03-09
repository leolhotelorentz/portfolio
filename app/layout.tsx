import "./globals.css";

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
              <a className="logo" href="/portfolio">L'HOTE LORENTZ Léo </a>
            <ul className="nav-links">
                <li><a href="/portfolio">Accueil</a></li>
                <li><a href="/portfolio/cv">CV</a></li>
                <li><a href="/portfolio/contact">Contact</a></li>
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
