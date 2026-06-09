import Link from "next/link";

export default function ProjetsPage() {
  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container">
        <header>
          <h1>Projets</h1>
        </header>
        <section>
          <p>Sélectionne un projet pour afficher sa présentation.</p>
          <ul>
            <li><Link href="/projets/ap-transcite">AP Transcite</Link></li>
            <li><Link href="/projets/ap-lst">AP LST</Link></li>
            <li><Link href="/projets/tp-geststages">TP GestStages</Link></li>
            <li><Link href="/projets/ap-planning">AP Planning</Link></li>
            <li><Link href="/projets/ap-triathlon">AP Triathlon</Link></li>
          </ul>
        </section>
      </div>
    </main>
  );
}
