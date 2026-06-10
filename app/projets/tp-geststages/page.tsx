export default function TpGestStagesPage() {
  const assetPrefix = process.env.NODE_ENV === "production" ? "/portfolio" : "";

  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container">
        <header>
          <h1>TP GestStages</h1>
        </header>
        <section>
          <article className="stage-report">
            <h2>Compte rendu du projet</h2>
            <div className="stage-report-content">
              <p>
                Pour cet TP GestStages, nous avons travaillé en binôme avec un étudiant SISR. Son rôle a été de configurer les machines virtuelles, le réseau, le DNS et les accès entre SRV-GESTSTAGES, SRV-GESTBDD et SRV-AD afin de préparer l’environnement de préproduction.
              </p>
              <p>
                De mon côté, en tant que SLAM, j’ai récupéré le code de l’application, préparé la base de données et importé les données nécessaires. J’ai également créé l’utilisateur dédié nguannot avec les bons privilèges, puis ajusté le fichier de connexion à la base afin que l’application puisse fonctionner correctement.
              </p>
              <p>
                Enfin, j’ai complété l’application et vérifié son bon fonctionnement grâce à la page diagnostic.php. J’ai aussi testé l’ensemble depuis SRV-AD pour m’assurer que les opérations sur les données des stages fonctionnaient correctement.
              </p>

              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Geststages/Geststages%20Screen%201.png`}
                  alt="Capture GestStages 1"
                />
              </figure>
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Geststages/Geststages%20Screen%202.png`}
                  alt="Capture GestStages 2"
                />
              </figure>
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Geststages/Geststages%20Screen%203.png`}
                  alt="Capture GestStages 3"
                />
              </figure>
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Geststages/Geststages%20Screen%204.png`}
                  alt="Capture GestStages 4"
                />
              </figure>
              <figure className="transcite-shot">
                <img
                  src={`${assetPrefix}/Geststages/Geststages%20Screen%205.png`}
                  alt="Capture GestStages 5"
                />
              </figure>
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