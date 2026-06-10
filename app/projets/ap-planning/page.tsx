import React from "react";
import Script from "next/script";

export default function ApPlanningPage() {
  const assetPrefix = process.env.NODE_ENV === "production" ? "/portfolio" : "";

  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container">
        <header>
          <h1>AP Planning</h1>
        </header>
        <section>
          <p>
            Pour cet AP Planning, j’ai créé un web component en JavaScript pour afficher un planning interactif avec navigation par semaine, ajout d’événements, modification, suppression et consultation des événements à venir. 
          </p>
          <Script
            id="planning-base-path"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.__PLANNING_BASE_PATH__ = ${JSON.stringify(assetPrefix)};`,
            }}
          />
          <Script src="https://cdn.jsdelivr.net/npm/flatpickr" strategy="beforeInteractive" />
          <Script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/fr.js" strategy="beforeInteractive" />
          <Script src={`${assetPrefix}/Planning/classes/DateUtils.js`} strategy="afterInteractive" />
          <Script src={`${assetPrefix}/Planning/classes/Data.js`} strategy="afterInteractive" />
          <Script src={`${assetPrefix}/Planning/classes/Date.js`} strategy="afterInteractive" />
          <Script src={`${assetPrefix}/Planning/classes/Evenement.js`} strategy="afterInteractive" />
          <Script src={`${assetPrefix}/Planning/classes/Affichage.js`} strategy="afterInteractive" />
          <Script src={`${assetPrefix}/Planning/classes/EvenementSouris.js`} strategy="afterInteractive" />
          <Script src={`${assetPrefix}/Planning/classes/Vue.js`} strategy="afterInteractive" />
          <Script src={`${assetPrefix}/Planning/components/PlanningComponent.js`} strategy="afterInteractive" />
          <div className="planning-embed">
            {React.createElement("planning-component")}
          </div>
        </section>
        <footer>
          <small>&copy; 2026 Mon portfolio - L'HOTE LORENTZ Léo</small>
        </footer>
      </div>
    </main>
  );
}