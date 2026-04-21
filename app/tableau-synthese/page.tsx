import ExcelViewer from "./ExcelViewer";

export default function TableauSynthesePage() {
  const tableauPath = `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/L%27HOTE%20LORENTZ%20L%C3%A9o%20-%20Tableau%20de%20synthese.xlsx`;

  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container tableau-main-container">
        <header>
          <h1>Tableau de synthese BTS SIO</h1>
        </header>
        <section className="tableau-section">
          <ExcelViewer filePath={tableauPath} />
        </section>
        <footer>
          <small>&copy; 2026 Mon portfolio - L'HOTE LORENTZ Léo</small>
        </footer>
      </div>
    </main>
  );
}
