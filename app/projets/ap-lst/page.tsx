export default function ApLstPage() {
  const assetPrefix = process.env.NODE_ENV === "production" ? "/portfolio" : "";

  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container">
        <header>
          <h1>AP LST</h1>
        </header>
        <section>
          <article className="stage-report">
            <h2>Compte rendu du projet</h2>
            <div className="stage-report-content">
              <p>
                Pour cet AP LST, j’ai conçu une base de données à partir de la documentation fournie par le professeur, puis développé deux applications web exploitant ces données. SyndicPro permet à l’entreprise Syndic Traditionnel de gérer et consulter les informations liées aux copropriétés, tandis qu’EasyCop offre aux copropriétaires un accès aux données qui les concernent.
              </p>
              <p>
                J’ai commencé par construire le modèle entité-association dans Looping afin de générer les tables de la base, puis j’ai complété les données pour rendre l’ensemble exploitable. Ensuite, j’ai développé plusieurs pages PHP pour consulter les copropriétés, les copropriétaires, les lots, les devis et les appels de fond, avant de travailler sur EasyCop pour gérer la connexion du copropriétaire et afficher ses informations personnelles.
              </p>
              <p>
                Ce projet m’a permis de travailler sur toute la chaîne de développement d’une application web, de la conception de la base de données à l’affichage des informations dans une interface fonctionnelle, tout en renforçant mes compétences en SQL, en structure relationnelle et en PHP dynamique.
              </p>

              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/LST/LST%20Screen%20Base.png`}
                  alt="Capture de la base de données LST"
                />
              </figure>
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/LST/LST%20Screen%20Copro.png`}
                  alt="Capture de l'affichage des copropriétés et copropriétaires"
                />
              </figure>
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/LST/LST%20Screen%20Lot.png`}
                  alt="Capture de l'affichage des lots"
                />
              </figure>
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/LST/LST%20Screen%20Devis.png`}
                  alt="Capture de la page de création de devis"
                />
              </figure>
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/LST/LST%20Screen%20Appel.png`}
                  alt="Capture de l'affichage des appels de fond"
                />
              </figure>
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/LST/LST%20Screen%20Connexion.png`}
                  alt="Capture de la page de connexion EasyCop"
                />
              </figure>
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/LST/LST%20Screen%20Info.png`}
                  alt="Capture des informations EasyCop"
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