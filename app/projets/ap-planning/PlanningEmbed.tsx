"use client";

import { createElement, useEffect, useState } from "react";
import flatpickr from "flatpickr";
import { French } from "flatpickr/dist/l10n/fr";

declare global {
  interface Window {
    flatpickr?: typeof flatpickr;
    __PLANNING_BASE_PATH__?: string;
  }
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[data-planning-src="${src}"]`);

    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.planningSrc = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Impossible de charger ${src}`));
    document.body.appendChild(script);
  });
}

export default function PlanningEmbed({ assetPrefix }: { assetPrefix: string }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const setupPlanning = async () => {
      window.flatpickr = flatpickr;
      flatpickr.localize(French);
      window.__PLANNING_BASE_PATH__ = assetPrefix;

      const scripts = [
        `${assetPrefix}/Planning/classes/DateUtils.js`,
        `${assetPrefix}/Planning/classes/Data.js`,
        `${assetPrefix}/Planning/classes/Date.js`,
        `${assetPrefix}/Planning/classes/Evenement.js`,
        `${assetPrefix}/Planning/classes/Affichage.js`,
        `${assetPrefix}/Planning/classes/EvenementSouris.js`,
        `${assetPrefix}/Planning/classes/Vue.js`,
        `${assetPrefix}/Planning/components/PlanningComponent.js`,
      ];

      for (const src of scripts) {
        await loadScript(src);
      }

      if (!cancelled) {
        setIsReady(true);
      }
    };

    setupPlanning().catch((error) => {
      console.error("Erreur lors du chargement du planning:", error);
    });

    return () => {
      cancelled = true;
    };
  }, [assetPrefix]);

  return (
    <>
      <link rel="stylesheet" href={`${assetPrefix}/Planning/vendor/flatpickr.min.css`} />
      <div className="planning-embed">
        {isReady ? createElement("planning-component") : <p>Chargement du planning...</p>}
      </div>
    </>
  );
}