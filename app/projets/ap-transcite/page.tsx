export default function ApTranscitePage() {
  const assetPrefix = process.env.NODE_ENV === "production" ? "/portfolio" : "";

  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container project-main-container">
        <header>
          <h1>AP Transcité</h1>
        </header>
        <section>
          <article className="stage-report">
            <div className="stage-report-content">
              <p>
                  Dans le cadre de cet AP Transcité, j’ai participé à la conception et au développement d’une application web reposant sur une base de données dédiée à la gestion d’un réseau de transport. À partir de la documentation fournie, j’ai analysé les besoins afin de concevoir le modèle de données puis de générer les différentes tables nécessaires au fonctionnement de l’application.
              </p>

              <p>
                  J’ai ensuite alimenté la base de données avec les informations relatives aux lignes, aux stations et aux commentaires. Plusieurs requêtes SQL ont été réalisées afin de vérifier la cohérence des données et de valider le bon fonctionnement de la structure relationnelle mise en place.
              </p>

              <p>
                  Une fois la base de données opérationnelle, j’ai développé différentes pages web en PHP permettant de consulter les lignes du réseau, d’afficher les stations associées, de visualiser des statistiques et d’ajouter des commentaires. Ces fonctionnalités s’appuient sur des échanges dynamiques entre l’application et la base de données.
              </p>

              <p>
                  Cette réalisation m’a permis de mettre en pratique les différentes étapes du cycle de développement d’une application web, de la conception de la base de données jusqu’à l’exploitation des données dans une interface utilisateur. Elle a également renforcé mes compétences en modélisation de données, en SQL, en développement PHP et dans l’utilisation d’une architecture client-serveur.
              </p>

              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Transcite/Transcite%20Screen%20Base.png`}
                  alt="Capture de la base de données TransCité"
                />
              </figure>
              <br />
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Transcite/Transcite%20Screen%20Ligne.png`}
                  alt="Capture de l'affichage des lignes de bus TransCité"
                />
              </figure>
              <br />
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Transcite/Transcite%20Screen%20Stat.png`}
                  alt="Capture des statistiques TransCité"
                />
              </figure>
              <br />
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