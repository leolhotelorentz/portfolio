export default function Home() {
  const cvImagePath = `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/L%27HOTE%20LORENTZ%20L%C3%A9o%20-%20CV.jpg`;

  return (
    <main className="main-container">
      <header>
        <h1>CV</h1>
      </header>
      <section className="cv-section">
        <img src={cvImagePath} className="cv-img" alt="CV de L'HOTE LORENTZ Léo" />
      </section>
      <footer>
        <small>&copy; 2026 Mon Portfolio - L'HOTE LORENTZ Léo</small>
      </footer>
    </main>
  );
}
