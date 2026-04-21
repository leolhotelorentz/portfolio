import DocxViewer from "./DocxViewer";

export default function StagesPage() {
  const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';

  const stageOnePath = `${basePath}/Compte%20rendu%20L%27HOTE%20LORENTZ%20L%C3%A9o.docx`;
  const stageTwoPath = `${basePath}/Compte%20rendu%202eme%20ann%C3%A9e%20L%27HOTE%20LORENTZ%20L%C3%A9o.docx`;

  return (
    <main className="main-container">
      <header>
        <h1>Comptes rendus de stage</h1>
      </header>
      <section>
        <p>Retrouvez ci-dessous mes deux comptes rendus de stage réalisés durant mes années de BTS SIO :</p>
        <DocxViewer
          filePath={stageOnePath}
          title="Compte rendu de stage - 1ere année de BTS SIO"
        />
        <DocxViewer
          filePath={stageTwoPath}
          title="Compte rendu de stage - 2eme année de BTS SIO"
        />
      </section>
      <footer>
        <small>&copy; 2026 Mon Portfolio - L'HOTE LORENTZ Léo</small>
      </footer>
    </main>
  );
}
