export default function ApTriathlonPage() {
  const assetPrefix = process.env.NODE_ENV === "production" ? "/portfolio" : "";

  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container">
        <header>
          <h1>AP Triathlon</h1>
        </header>
        <section>
          <article className="stage-report">
            <h2>Compte rendu du projet</h2>
            <div className="stage-report-content">
              <p>
                Pour cet AP Triathlon, nous avons travaillé à partir d’une base de données commune utilisée par trois applications : GestTriathlon, Ctrl-Triathlon et Triathlon. De mon côté, j’ai développé GestTriathlon, qui permet de gérer les triathlons, les triathlètes, les inscriptions et les résultats. Le projet m’a amené à travailler sur une application complète en C# avec une architecture MVC, afin de structurer proprement les modèles, les contrôleurs et l’accès aux données.
              </p>
              <p>
                J’ai réalisé les différents formulaires de gestion, notamment les listes des triathlons, des triathlètes, des inscriptions et des épreuves, ainsi que les écrans de création et de mise à jour associés. J’ai aussi intégré les fonctionnalités de recherche multicritères, de tri, de suppression avec confirmation et de consultation des résultats.
              </p>
              <p>
                Ce projet m’a permis de renforcer mes compétences en développement d’application bureau, en programmation événementielle et en exploitation d’une base de données relationnelle. Il m’a aussi appris à structurer une application métier complète en respectant un cahier des charges précis.
              </p>

              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/GestTriathlon/GestTriathlon%20Screen%201.png`}
                  alt="Capture GestTriathlon 1"
                />
              </figure>
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/GestTriathlon/GestTriathlon%20Screen%202.png`}
                  alt="Capture GestTriathlon 2"
                />
              </figure>
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/GestTriathlon/GestTriathlon%20Screen%203.png`}
                  alt="Capture GestTriathlon 3"
                />
              </figure>
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/GestTriathlon/GestTriathlon%20Screen%20Base.png`}
                  alt="Capture GestTriathlon Base"
                />
              </figure>
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