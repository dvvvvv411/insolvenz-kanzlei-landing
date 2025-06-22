
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Impressum = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Impressum</h1>
        
        <div className="prose prose-lg max-w-none">
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            <strong>Lonquich, Külper & Kollegen Rechtsanwälte PartG</strong><br />
            Burgstr. 120<br />
            60389 Frankfurt a. Main
          </p>

          <h2>Vertreten durch</h2>
          <p>
            Partner: Gerrit Külper & Christian Schwestka
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: +49 69 94321306<br />
            E-Mail: info@kuelper-kanzlei.de<br />
            Website: <a href="https://kuelper-kanzlei.de" target="_blank" rel="noopener noreferrer">kuelper-kanzlei.de</a>
          </p>

          <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
          <p>
            <strong>Berufsbezeichnung:</strong> Rechtsanwalt (verliehen in der Bundesrepublik Deutschland)<br />
            <strong>Zuständige Kammer:</strong> Rechtsanwaltskammer Frankfurt am Main<br />
            <strong>Berufsrechtliche Regelungen:</strong>
          </p>
          <ul>
            <li>Bundesrechtsanwaltsordnung (BRAO)</li>
            <li>Berufsordnung für Rechtsanwälte (BORA)</li>
            <li>Rechtsanwaltsvergütungsgesetz (RVG)</li>
            <li>Fachanwaltsordnung (FAO)</li>
          </ul>
          <p>
            Die berufsrechtlichen Regelungen können eingesehen werden unter: 
            <a href="http://www.brak.de" target="_blank" rel="noopener noreferrer"> www.brak.de</a>
          </p>

          <h2>Angaben zur Berufshaftpflichtversicherung</h2>
          <p>
            <strong>Name und Sitz des Versicherers:</strong><br />
            [Versicherungsunternehmen]<br />
            [Adresse des Versicherers]
          </p>
          <p>
            <strong>Geltungsraum der Versicherung:</strong> Deutschland und Europa
          </p>

          <h2>Redaktionell verantwortlich</h2>
          <p>
            Gerrit Külper & Christian Schwestka<br />
            Burgstr. 120<br />
            60389 Frankfurt a. Main
          </p>

          <h2>EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr/
            </a><br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>

          <h2>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
