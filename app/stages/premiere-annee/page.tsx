import DocxViewer from "../DocxViewer";

export default function StagePremiereAnneePage() {
  const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";
  const stageOnePath = `${basePath}/Compte%20rendu%20L%27HOTE%20LORENTZ%20L%C3%A9o.docx`;

  return (
    <main className="main-container">
      <header>
        <h1>Stage - Premiere annee</h1>
      </header>
      <section>
        <DocxViewer
          filePath={stageOnePath}
          title="Compte rendu de stage - 1ere annee de BTS SIO"
        />
      </section>
      <footer>
        <small>&copy; 2026 Mon Portfolio - L'HOTE LORENTZ Léo</small>
      </footer>
    </main>
  );
}
