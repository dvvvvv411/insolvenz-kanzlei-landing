
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Impressum = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Impressum</h1>
        
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Angaben gemäß § 5 TMG</h2>
            <div className="text-gray-700 leading-relaxed">
              <p className="font-semibold text-gray-900">Lonquich, Külper & Kollegen Rechtsanwälte PartG</p>
              <p>Burgstr. 120</p>
              <p className="mb-4">60389 Frankfurt a. Main</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vertreten durch</h2>
            <p className="text-gray-700 leading-relaxed">
              Partner: Gerrit Külper & Christian Schwestka
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Kontakt</h2>
            <div className="text-gray-700 leading-relaxed space-y-1">
              <p>Telefon: +49 69 94321306</p>
              <p>E-Mail: info@kuelper-kanzlei.de</p>
              <p>Website: <a href="https://kuelper-kanzlei.de" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">kuelper-kanzlei.de</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p><span className="font-semibold">Berufsbezeichnung:</span> Rechtsanwalt (verliehen in der Bundesrepublik Deutschland)</p>
              
              <p><span className="font-semibold">Zuständige Kammer:</span> Rechtsanwaltskammer Frankfurt am Main</p>
              
              <div>
                <p className="font-semibold mb-2">Berufsrechtliche Regelungen:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Bundesrechtsanwaltsordnung (BRAO)</li>
                  <li>Berufsordnung für Rechtsanwälte (BORA)</li>
                  <li>Rechtsanwaltsvergütungsgesetz (RVG)</li>
                  <li>Fachanwaltsordnung (FAO)</li>
                </ul>
              </div>
              
              <p>
                Die berufsrechtlichen Regelungen können eingesehen werden unter: 
                <a href="http://www.brak.de" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline ml-1">www.brak.de</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Angaben zur Berufshaftpflichtversicherung</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <div>
                <p className="font-semibold">Name und Sitz des Versicherers:</p>
                <p>[Versicherungsunternehmen]</p>
                <p>[Adresse des Versicherers]</p>
              </div>
              
              <p><span className="font-semibold">Geltungsraum der Versicherung:</span> Deutschland und Europa</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Redaktionell verantwortlich</h2>
            <div className="text-gray-700 leading-relaxed">
              <p>Gerrit Külper & Christian Schwestka</p>
              <p>Burgstr. 120</p>
              <p>60389 Frankfurt a. Main</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">EU-Streitschlichtung</h2>
            <p className="text-gray-700 leading-relaxed">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline ml-1">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            
            <p className="text-gray-700 leading-relaxed mt-3">
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p className="text-gray-700 leading-relaxed">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
