import PlanningEmbed from "./PlanningEmbed";

export default function ApPlanningPage() {
  const assetPrefix = process.env.NODE_ENV === "production" ? "/portfolio" : "";

  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container">
        <header>
          <h1>AP Planning</h1>
        </header>
        <section>
          <p>
            Pour cet AP Planning, j’ai créé un web component en JavaScript pour afficher un planning interactif avec navigation par semaine, ajout d’événements, modification, suppression et consultation des événements à venir. 
          </p>
          <PlanningEmbed assetPrefix={assetPrefix} />
        </section>
        <footer>
          <small>&copy; 2026 Mon portfolio - L'HOTE LORENTZ Léo</small>
        </footer>
      </div>
    </main>
  );
}