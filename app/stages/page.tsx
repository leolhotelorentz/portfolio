import Link from "next/link";

export default function StagesPage() {
  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container">
        <header>
          <h1>Comptes rendus de stage</h1>
        </header>
        <section>
          <p>Choisissez l'annee de stage a consulter :</p>
          <div className="stage-choice-grid">
            <Link className="stage-choice-card" href="/stages/premiere-annee">
              <h2>Premiere annee</h2>
              <p>Afficher le compte rendu de stage de premiere annee.</p>
            </Link>
            <Link className="stage-choice-card" href="/stages/deuxieme-annee">
              <h2>Deuxieme annee</h2>
              <p>Afficher le compte rendu de stage de deuxieme annee.</p>
            </Link>
          </div>
        </section>
        <footer>
          <small>&copy; 2026 Mon Portfolio - L'HOTE LORENTZ Léo</small>
        </footer>
      </div>
    </main>
  );
}
