"use client";

import { useEffect, useState } from "react";
import mammoth from "mammoth/mammoth.browser";

type DocxViewerProps = {
  filePath: string;
  title: string;
};

export default function DocxViewer({ filePath, title }: DocxViewerProps) {
  const [htmlContent, setHtmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadDocx = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error("Impossible de charger le document.");
        }

        const arrayBuffer = await response.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });

        if (isMounted) {
          setHtmlContent(result.value);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage("Affichage indisponible pour ce document.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDocx();

    return () => {
      isMounted = false;
    };
  }, [filePath]);

  return (
    <article className="stage-report">
      <h2>{title}</h2>

      {isLoading && <p>Chargement du document...</p>}

      {!isLoading && errorMessage && (
        <p>
          {errorMessage} <a href={filePath}>Ouvrir le fichier</a>
        </p>
      )}

      {!isLoading && !errorMessage && (
        <div className="stage-report-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      )}
    </article>
  );
}
