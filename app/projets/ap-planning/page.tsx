import PlanningEmbed from "./PlanningEmbed";

export default function ApPlanningPage() {
  const assetPrefix = process.env.NODE_ENV === "production" ? "/portfolio" : "";

  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container project-main-container">
        <header>
          <h1>AP Planning</h1>
        </header>
        <section>
          <article className="stage-report">
            <div className="stage-report-content">
             <p>
                Dans le cadre de cet AP Planning, j’ai conçu et développé un composant web réutilisable en JavaScript permettant l’affichage d’un planning interactif. L’objectif était de proposer une interface ergonomique offrant une visualisation claire des événements ainsi qu’une navigation intuitive entre les différentes semaines.
            </p>

            <p>
                J’ai mis en œuvre plusieurs fonctionnalités permettant aux utilisateurs de gérer leur planning de manière dynamique. Il est ainsi possible d’ajouter, de modifier ou de supprimer des événements directement depuis l’interface, tout en conservant une organisation cohérente des données affichées.
            </p>

            <p>
                J’ai également développé des fonctionnalités de consultation facilitant le suivi des activités, notamment l’affichage des rendez-vous à venir et la navigation temporelle au sein du calendrier. Une attention particulière a été portée à l’expérience utilisateur afin de rendre l’utilisation du composant simple et efficace.
            </p>

            <p>
                Cette réalisation m’a permis de renforcer mes compétences en développement JavaScript, en conception de composants web réutilisables et en programmation orientée interface utilisateur. Elle m’a également sensibilisé aux enjeux d’ergonomie et de modularité dans le développement d’applications web modernes.
            </p>
              <PlanningEmbed assetPrefix={assetPrefix} />
            </div>
          </article>
        </section>
        <footer>
          <small>&copy; 2026 Mon portfolio - L'HOTE LORENTZ Léo</small>
        </footer>
      </div>
    </main>
  );
}