export default function TpGestStagesPage() {
  const assetPrefix = process.env.NODE_ENV === "production" ? "/portfolio" : "";

  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container project-main-container">
        <header>
          <h1>TP GestStages</h1>
        </header>
        <section>
          <article className="stage-report">
            <div className="stage-report-content">
              <p>
                Dans le cadre de cet AP GestStages, j’ai travaillé en binôme avec un étudiant de l’option SISR afin de mettre en place et déployer une application web dans un environnement de préproduction. Cette collaboration m’a permis d’appréhender les interactions entre les domaines du développement applicatif et de l’administration des systèmes et réseaux.
            </p>

            <p>
                En tant qu’étudiant SLAM, j’ai pris en charge la préparation de l’environnement applicatif. J’ai récupéré le code source de l’application, configuré la base de données et importé les données nécessaires à son fonctionnement. J’ai également créé un compte utilisateur dédié avec les droits appropriés, puis adapté les paramètres de connexion afin d’assurer la communication entre l’application et la base de données.
            </p>

            <p>
                Une fois le déploiement effectué, j’ai participé à la validation du bon fonctionnement de la solution en utilisant les outils de diagnostic mis à disposition. J’ai réalisé différents tests fonctionnels afin de vérifier l’accès aux données et le bon déroulement des opérations liées à la gestion des stages.
            </p>

            <p>
                Cette réalisation m’a permis de développer mes compétences en déploiement d’applications web, en administration de bases de données, en gestion des droits d’accès et en tests fonctionnels. Elle m’a également sensibilisé aux enjeux de la collaboration entre les métiers du développement logiciel et de l’administration systèmes et réseaux.
            </p>

              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Geststages/Geststages%20Screen%201.png`}
                  alt="Capture GestStages 1"
                />
              </figure>
              <br />
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Geststages/Geststages%20Screen%202.png`}
                  alt="Capture GestStages 2"
                />
              </figure>
              <br />
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Geststages/Geststages%20Screen%203.png`}
                  alt="Capture GestStages 3"
                />
              </figure>
              <br />
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Geststages/Geststages%20Screen%204.png`}
                  alt="Capture GestStages 4"
                />
              </figure>
              <br />
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Geststages/Geststages%20Screen%205.png`}
                  alt="Capture GestStages 5"
                />
              </figure>
              <br />
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Geststages/Geststages%20Screen%206.png`}
                  alt="Capture GestStages 6"
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