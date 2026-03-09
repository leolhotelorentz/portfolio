import Image from 'next/image';

export default function Home() {
  return (
    <main className="main-container">
      <header>
        <h1>CV</h1>
      </header>
      <section className="cv-section">
        <Image
          src="/LeoLLCV.jpg"
          width={800}
          height={1200}
          className="cv-img"
          alt="CV de L'HOTE LORENTZ Léo"
        />
      </section>
      <footer>
        <small>&copy; 2026 Mon Portfolio - L'HOTE LORENTZ Léo</small>
      </footer>
    </main>
  );
}
