export default function ApLstPage() {
  const assetPrefix = process.env.NODE_ENV === "production" ? "/portfolio" : "";

  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container project-main-container">
        <header>
          <h1>AP LST</h1>
        </header>
        <section>
          <article className="stage-report">
            <div className="stage-report-content">
              <p>
                Dans le cadre de cet AP LST, j’ai participé à la conception et au développement de deux applications web reposant sur une même base de données : SyndicPro, destinée aux collaborateurs de l’entreprise Syndic Traditionnel pour la gestion des copropriétés, et EasyCop, une plateforme permettant aux copropriétaires de consulter les informations relatives à leur copropriété en ligne.
              </p>
              <p>
                La première étape du projet a consisté à analyser la documentation fournie afin de comprendre les besoins fonctionnels et les données à gérer. J’ai ensuite conçu le modèle conceptuel de données (MCD) à l’aide de l’outil Looping, puis généré et enrichi la base de données relationnelle pour garantir sa cohérence et son exploitation.
              </p>
              <p>
                J’ai développé plusieurs pages web en PHP pour l'application SyndicPro, permettant d’afficher et de consulter les différentes informations liées aux copropriétés, aux copropriétaires, aux lots, aux devis ainsi qu’aux appels de fonds. Pour l'application EasyCop, j’ai mis en place la connexion des utilisateurs et l’affichage des informations les concernant.
              </p>
              <p>
                Cette expérience m’a permis de mettre en œuvre les différentes étapes du cycle de développement d’une application web, de la conception de la base de données jusqu’à la réalisation de l’interface utilisateur. Elle m’a également permis de renforcer mes compétences en modélisation des données, en SQL, en développement PHP et dans l’exploitation d’une architecture client-serveur.
              </p >

              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/LST/LST%20Screen%20Base.png`}
                  alt="Capture de la base de données LST"
                />
              </figure>
              <br />
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/LST/LST%20Screen%20Copro.png`}
                  alt="Capture de l'affichage des copropriétés et copropriétaires"
                />
              </figure>
              <br />
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/LST/LST%20Screen%20Lot.png`}
                  alt="Capture de l'affichage des lots"
                />
              </figure>
              <br />
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/LST/LST%20Screen%20Devis.png`}
                  alt="Capture de la page de création de devis"
                />
              </figure>
              <br />
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/LST/LST%20Screen%20Appel.png`}
                  alt="Capture de l'affichage des appels de fond"
                />
              </figure>
              <br />
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/LST/LST%20Screen%20Connexion.png`}
                  alt="Capture de la page de connexion EasyCop"
                />
              </figure>
              <br />
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