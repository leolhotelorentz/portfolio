"use client";

import { useEffect, useState } from "react";

type ExcelViewerProps = {
  filePath: string;
};

export default function ExcelViewer({ filePath }: ExcelViewerProps) {
  const [embedUrl, setEmbedUrl] = useState("");

  useEffect(() => {
    const absoluteFileUrl = new URL(filePath, window.location.origin).toString();
    const officeEmbedUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteFileUrl)}`;

    setEmbedUrl(officeEmbedUrl);
  }, [filePath]);

  return (
    <article className="excel-report">
      {embedUrl && (
        <div className="excel-table-wrap excel-embed-wrap">
          <iframe
            title="Tableau de synthese Excel"
            src={embedUrl}
            className="excel-embed"
            loading="lazy"
          />
        </div>
      )}
    </article>
  );
}