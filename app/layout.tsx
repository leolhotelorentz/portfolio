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
        <nav className="top-nav">
          <div className="nav-container">
              <a className="logo" href="index.html">L'HOTE LORENTZ Léo - Mon Portfolio</a>
              <ul className="nav-links">
                  <li><a href="index.html">Accueil</a></li>
                  <li><a href="cv.html">CV</a></li>
                  <li><a href="contact.html">Contact</a></li>
              </ul>
          </div>
      </nav>
        {children}
      </body>
    </html>
  );
}
