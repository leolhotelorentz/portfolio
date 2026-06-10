export default function VeilleTechnologiquePage() {
  const assetPrefix = process.env.NODE_ENV === "production" ? "/portfolio" : "";
  const slidePaths = [
    `${assetPrefix}/NGINX%20Diapo%201.png`,
    `${assetPrefix}/NGINX%20Diapo%202.png`,
    `${assetPrefix}/NGINX%20Diapo%203.png`,
  ];

  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container">
        <header>
          <h1>Veille technologique : NGINX</h1>
        </header>
        <section>
          <article className="stage-report">

            <div className="stage-report-content">
              <h3>1. Présentation du sujet : NGINX, un serveur incontournable du web moderne</h3>
              <p>
                J’ai choisi de faire ma veille technologique sur NGINX, un serveur web open source
                qui joue un rôle essentiel dans les infrastructures web actuelles. NGINX ne se
                limite pas à servir des pages web : il peut aussi faire office de reverse proxy,
                de load balancer, ou encore de proxy cache. C’est un outil particulièrement léger,
                rapide et adapté aux applications à fort trafic.
              </p>
              <p>
                Aujourd’hui, de nombreuses entreprises connues, comme Netflix, Dropbox, ou GitHub,
                utilisent NGINX pour assurer la performance et la sécurité de leurs services web.
              </p>
              <p>
                J’ai choisi ce sujet car NGINX est au cœur de nombreux projets de développement web
                et DevOps. Il est aussi en constante évolution, avec des ajouts récents comme le
                support de HTTP/3, du protocole QUIC, ou encore des améliorations liées à la
                sécurité TLS. Comprendre son évolution permet de mieux anticiper les besoins
                techniques dans les environnements de production modernes.
              </p>

              <h3>2. Ma méthode de veille technologique</h3>
              <p>
                Pour suivre l’actualité de NGINX, j’ai mis en place plusieurs outils et méthodes de
                veille :
              </p>
              <ul>
                <li>
                  Je me suis abonné à Feedly, un lecteur de flux RSS, dans lequel j’ai ajouté
                  plusieurs sites spécialisés comme le blog officiel de NGINX, ZDNet, Journal du
                  Net, ou encore Developpez.com.
                </li>
                <li>
                  Je consulte régulièrement GitHub, en particulier le dépôt officiel de NGINX,
                  pour suivre les mises à jour et les rapports de bugs ou de failles de sécurité.
                </li>
                <li>
                  Enfin, je marque en favori les articles pertinents et je les classe dans des
                  dossiers selon les thématiques : performance, sécurité, évolution du protocole.
                </li>
              </ul>
              <p>
                J’utilise à la fois des méthodes PUSH (comme les newsletters et les alertes
                automatiques) et PULL (recherches manuelles sur Reddit, HackerNews ou forums de
                développeurs).
              </p>

              <h3>3. Exemples d’articles trouvés grâce à ma veille</h3>
              <p>
                Voici deux exemples concrets d’articles qui m’ont permis d’approfondir mes
                connaissances sur NGINX :
              </p>

              <h4>CVE-2021-23017 – Faille critique dans le parser DNS de NGINX</h4>
              <p>
                Cet article rapportait une faille de sécurité critique dans le composant DNS
                interne de NGINX. Cette vulnérabilité permettait à un pirate d’exécuter du code à
                distance si le serveur n’était pas correctement mis à jour. Cet incident m’a rappelé
                l’importance de surveiller en continu les mises à jour de sécurité, même pour des
                outils réputés stables.
              </p>

              <h4>Support de HTTP/3 et QUIC dans NGINX</h4>
              <p>
                Dans un autre article publié sur le blog officiel de NGINX, j’ai découvert que le
                serveur commençait à intégrer le protocole HTTP/3, qui repose sur QUIC. Cette
                avancée permet une meilleure gestion des connexions mobiles et une réduction des
                temps de chargement. Cela montre que NGINX s’adapte aux standards les plus récents
                du web pour rester performant.
              </p>
              <p>
                <a
                  href="https://blog.nginx.org/blog/introducing-technology-preview-nginx-support-for-quic-http-3"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Lire l’article sur le support de QUIC et HTTP/3
                </a>
              </p>

              <p>
                Grâce à cette veille, j’ai pu comprendre comment un outil comme NGINX évolue dans
                le temps, comment suivre ses mises à jour, et surtout, comment rester informé sur
                les aspects critiques de sécurité et de performance. Cette démarche me servira tout
                au long de ma carrière pour m’adapter aux nouvelles technologies.
              </p>
            </div>
          </article>
        </section>
        <section>
          <h2>Diaporama NGINX</h2>
          <div className="diapo-gallery">
            {slidePaths.map((slidePath, index) => (
              <figure key={slidePath} className="diapo-slide">
                <img
                  src={slidePath}
                  alt={`Diapositive ${index + 1} du diaporama NGINX`}
                />
              </figure>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
