export default function ApTranscitePage() {
  const assetPrefix = process.env.NODE_ENV === "production" ? "/portfolio" : "";

  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container">
        <header>
          <h1>AP Transcité</h1>
        </header>
        <section>
          <article className="stage-report">
            <h2>Compte rendu du projet</h2>
            <div className="stage-report-content">
              <p>
                Pour cet AP Transcité, j’ai conçu une base de données à partir de la documentation fournie par le professeur, puis développé une application web pour exploiter les données et présenter des informations sur le réseau. Le projet m’a amené à créer le modèle de données, à générer les tables, à compléter la base avec des stations, des lignes et des commentaires, puis à tester l’ensemble avec plusieurs requêtes SQL.
              </p>
              <p>
                J’ai ensuite mis en place différentes pages PHP pour consulter les lignes, afficher les stations associées, visualiser des statistiques et ajouter des commentaires dans la base. Ce travail m’a permis de renforcer mes compétences en SQL, en structure relationnelle et en développement web dynamique.
              </p>
              <p>
                Au final, ce projet m’a permis de travailler sur toute la chaîne, de la construction de la base jusqu’à l’affichage des données dans l’application.
              </p>

              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Transcite/Transcite%20Screen%20Base.png`}
                  alt="Capture de la base de données TransCité"
                />
              </figure>
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Transcite/Transcite%20Screen%20Ligne.png`}
                  alt="Capture de l'affichage des lignes de bus TransCité"
                />
              </figure>
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Transcite/Transcite%20Screen%20Stat.png`}
                  alt="Capture des statistiques TransCité"
                />
              </figure>
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Transcite/Transcite%20Screen%20Commentaire.png`}
                  alt="Capture de la page d'ajout de commentaire TransCité"
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