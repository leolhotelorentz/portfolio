import { permanentRedirect } from "next/navigation";

export default function StagesPage() {
  const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

  permanentRedirect(`${basePath}/stages/premiere-annee`);
}
