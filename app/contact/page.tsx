export default function Home() {
  return (
    <main className="container-fluid px-2 px-sm-3 px-md-4">
      <div className="main-container">
        <header>
          <h1>Mes contacts</h1>
        </header>
        <section>
          <p>
            Pour me contacter, vous pouvez m'envoyer un email à l'adresse suivante : 
            <br />
            <a href="mailto:lhotelorentzleo@gmail.com">lhotelorentzleo@gmail.com</a>
          </p>
          <p>
            Ou m'appeler au numéro suivant : 
            <br />
            <a href="tel:+33615686887">+33 6 15 68 68 87</a>
          </p>
        </section>
        <footer>
          <small>&copy; 2026 Mon Portfolio - L'HOTE LORENTZ Léo</small>
        </footer>
      </div>
    </main>
  );
}
