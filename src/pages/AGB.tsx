
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AGB = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Allgemeine Geschäftsbedingungen</h1>
        
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">§ 1 Geltungsbereich</h2>
            <p className="text-gray-700 leading-relaxed">
              Diese Allgemeinen Geschäftsbedingungen gelten für alle Rechtsdienstleistungen der 
              Lonquich, Külper & Kollegen Rechtsanwälte PartG gegenüber ihren Mandanten.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">§ 2 Vertragsschluss</h2>
            <p className="text-gray-700 leading-relaxed">
              Der Anwaltsvertrag kommt durch ausdrückliche Vereinbarung oder durch die Aufnahme 
              der anwaltlichen Tätigkeit zustande.
            </p>
            
            <p className="text-gray-700 leading-relaxed mt-3">
              Die Mandatserteilung kann schriftlich, mündlich oder durch schlüssiges Verhalten erfolgen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">§ 3 Leistungsumfang</h2>
            <p className="text-gray-700 leading-relaxed">
              Der Umfang der anwaltlichen Tätigkeit richtet sich nach der getroffenen Vereinbarung.
            </p>
            
            <p className="text-gray-700 leading-relaxed mt-3">
              Soweit nichts anderes vereinbart ist, erstreckt sich das Mandat nur auf die 
              ausdrücklich übertragenen Angelegenheiten.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">§ 4 Vergütung</h2>
            <p className="text-gray-700 leading-relaxed">
              Die Vergütung richtet sich nach der getroffenen Vereinbarung oder, soweit keine 
              Vereinbarung getroffen wurde, nach dem Rechtsanwaltsvergütungsgesetz (RVG).
            </p>
            
            <p className="text-gray-700 leading-relaxed mt-3">
              Auslagen werden gesondert in Rechnung gestellt.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">§ 5 Zahlungsbedingungen</h2>
            <p className="text-gray-700 leading-relaxed">
              Rechnungen sind binnen 14 Tagen nach Rechnungsstellung ohne Abzug zur Zahlung fällig.
            </p>
            
            <p className="text-gray-700 leading-relaxed mt-3">
              Bei Zahlungsverzug werden Verzugszinsen in Höhe von 8 Prozentpunkten über dem 
              Basiszinssatz berechnet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">§ 6 Verschwiegenheitspflicht</h2>
            <p className="text-gray-700 leading-relaxed">
              Wir unterliegen der anwaltlichen Verschwiegenheitspflicht nach § 43a BRAO.
            </p>
            
            <p className="text-gray-700 leading-relaxed mt-3">
              Alle Informationen werden streng vertraulich behandelt.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">§ 7 Haftung</h2>
            <p className="text-gray-700 leading-relaxed">
              Wir haften für Vorsatz und grobe Fahrlässigkeit. Im Übrigen ist die Haftung auf 
              die Deckungssumme der Berufshaftpflichtversicherung begrenzt.
            </p>
            
            <p className="text-gray-700 leading-relaxed mt-3">
              Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, soweit nicht Pflichten verletzt werden, 
              deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">§ 8 Aufbewahrung von Handakten</h2>
            <p className="text-gray-700 leading-relaxed">
              Handakten werden nach Beendigung des Mandats für die Dauer von 5 Jahren aufbewahrt.
            </p>
            
            <p className="text-gray-700 leading-relaxed mt-3">
              Dies gilt, soweit nicht gesetzliche Bestimmungen eine längere Aufbewahrung erfordern.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">§ 9 Kündigung</h2>
            <p className="text-gray-700 leading-relaxed">
              Das Mandatsverhältnis kann von beiden Seiten jederzeit gekündigt werden.
            </p>
            
            <p className="text-gray-700 leading-relaxed mt-3">
              Im Falle der Kündigung durch den Mandanten bleibt der Vergütungsanspruch für 
              bereits erbrachte Leistungen bestehen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">§ 10 Salvatorische Klausel</h2>
            <p className="text-gray-700 leading-relaxed">
              Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, berührt 
              dies die Wirksamkeit der übrigen Bestimmungen nicht.
            </p>
            
            <p className="text-gray-700 leading-relaxed mt-3">
              An die Stelle der unwirksamen Bestimmung tritt eine angemessene Regelung.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">§ 11 Anwendbares Recht und Gerichtsstand</h2>
            <p className="text-gray-700 leading-relaxed">
              Es gilt deutsches Recht.
            </p>
            
            <p className="text-gray-700 leading-relaxed mt-3">
              Gerichtsstand ist Frankfurt am Main, soweit der Mandant Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AGB;
