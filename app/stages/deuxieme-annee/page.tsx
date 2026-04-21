import DocxViewer from "../DocxViewer";

export default function StageDeuxiemeAnneePage() {
  const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";
  const stageTwoPath = `${basePath}/Compte%20rendu%202eme%20ann%C3%A9e%20L%27HOTE%20LORENTZ%20L%C3%A9o.docx`;

  return (
    <main className="main-container">
      <header>
        <h1>Stage - Deuxieme annee</h1>
      </header>
      <section>
        <DocxViewer
          filePath={stageTwoPath}
          title="Compte rendu de stage - 2eme annee de BTS SIO"
        />
      </section>
      <footer>
        <small>&copy; 2026 Mon Portfolio - L'HOTE LORENTZ Léo</small>
      </footer>
    </main>
  );
}
