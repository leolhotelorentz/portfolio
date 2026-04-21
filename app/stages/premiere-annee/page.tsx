import DocxViewer from "../DocxViewer";

export default function StagePremiereAnneePage() {
  const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";
  const stageOnePath = `${basePath}/Compte%20rendu%20L%27HOTE%20LORENTZ%20L%C3%A9o.docx`;

  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container">
        <header>
          <h1>Stage - Première année de BTS SIO</h1>
        </header>
        <section>
          <DocxViewer
            filePath={stageOnePath}
            title="Compte rendu de stage - 1ère année de BTS SIO"
          />
        </section>
        <footer>
          <small>&copy; 2026 Mon portfolio - L'HOTE LORENTZ Léo</small>
        </footer>
      </div>
    </main>
  );
}
