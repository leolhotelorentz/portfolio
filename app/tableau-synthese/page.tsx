export default function TableauSynthesePage() {
  const tableauPath = `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/L%27HOTE%20LORENTZ%20L%C3%A9o%20-%20Tableau%20de%20synthese.jpg`;

  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container">
        <header>
          <h1>Tableau de synthese BTS</h1>
        </header>
        <section className="cv-section">
          <img src={tableauPath} className="cv-img" alt="Tableau de synthese BTS de L'HOTE LORENTZ Léo" />
        </section>
        <footer>
          <small>&copy; 2026 Mon Portfolio - L'HOTE LORENTZ Léo</small>
        </footer>
      </div>
    </main>
  );
}
