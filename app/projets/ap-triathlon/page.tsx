export default function ApTriathlonPage() {
  const assetPrefix = process.env.NODE_ENV === "production" ? "/portfolio" : "";

  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container project-main-container">
        <header>
          <h1>AP Triathlon</h1>
        </header>
        <section>
          <article className="stage-report">
            <div className="stage-report-content">
              <p>
                  Dans le cadre de cet AP Triathlon, j’ai participé au développement d’une solution reposant sur une base de données commune exploitée par plusieurs applications. J’ai plus particulièrement réalisé l’application GestTriathlon, destinée à la gestion des triathlons, des triathlètes, des inscriptions et des résultats. Ce projet m’a permis de concevoir une application de bureau en C# en appliquant le modèle d’architecture MVC afin de structurer clairement les différentes couches de l’application.
              </p>

              <p>
                  J’ai développé les différentes fonctionnalités de gestion des données, notamment les formulaires permettant de consulter, créer, modifier et supprimer les informations relatives aux triathlons, aux triathlètes, aux épreuves et aux inscriptions. J’ai également mis en place plusieurs mécanismes facilitant l’utilisation de l’application, tels que la recherche multicritères, le tri des données, les confirmations de suppression et la consultation des résultats.
              </p>

              <p>
                  L’application s’appuie sur une base de données relationnelle pour assurer le stockage et la gestion des informations. J’ai ainsi réalisé les échanges entre l’interface utilisateur et la base de données en veillant à garantir la cohérence et la fiabilité des données manipulées.
              </p>

              <p>
                  Cette réalisation m’a permis de renforcer mes compétences en développement d’applications de bureau avec C#, en programmation orientée objet, en architecture MVC et en exploitation de bases de données relationnelles. Elle m’a également appris à concevoir une application métier complète en respectant les besoins fonctionnels définis dans le cahier des charges.
              </p>

              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/GestTriathlon/GestTriathlon%20Screen%201.png`}
                  alt="Capture GestTriathlon 1"
                />
              </figure>
              <br />
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/GestTriathlon/GestTriathlon%20Screen%202.png`}
                  alt="Capture GestTriathlon 2"
                />
              </figure>
              <br />
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/GestTriathlon/GestTriathlon%20Screen%203.png`}
                  alt="Capture GestTriathlon 3"
                />
              </figure>
              <br />
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