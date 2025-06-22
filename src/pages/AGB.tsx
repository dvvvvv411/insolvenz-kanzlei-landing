
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AGB = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Allgemeine Geschäftsbedingungen</h1>
        
        <div className="prose prose-lg max-w-none">
          <h2>§ 1 Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen gelten für alle Rechtsdienstleistungen der 
            Lonquich, Külper & Kollegen Rechtsanwälte PartG gegenüber ihren Mandanten.
          </p>

          <h2>§ 2 Vertragsschluss</h2>
          <p>
            Der Anwaltsvertrag kommt durch ausdrückliche Vereinbarung oder durch die Aufnahme 
            der anwaltlichen Tätigkeit zustande. Die Mandatserteilung kann schriftlich, mündlich 
            oder durch schlüssiges Verhalten erfolgen.
          </p>

          <h2>§ 3 Leistungsumfang</h2>
          <p>
            Der Umfang der anwaltlichen Tätigkeit richtet sich nach der getroffenen Vereinbarung. 
            Soweit nichts anderes vereinbart ist, erstreckt sich das Mandat nur auf die 
            ausdrücklich übertragenen Angelegenheiten.
          </p>

          <h2>§ 4 Vergütung</h2>
          <p>
            Die Vergütung richtet sich nach der getroffenen Vereinbarung oder, soweit keine 
            Vereinbarung getroffen wurde, nach dem Rechtsanwaltsvergütungsgesetz (RVG). 
            Auslagen werden gesondert in Rechnung gestellt.
          </p>

          <h2>§ 5 Zahlungsbedingungen</h2>
          <p>
            Rechnungen sind binnen 14 Tagen nach Rechnungsstellung ohne Abzug zur Zahlung fällig. 
            Bei Zahlungsverzug werden Verzugszinsen in Höhe von 8 Prozentpunkten über dem 
            Basiszinssatz berechnet.
          </p>

          <h2>§ 6 Verschwiegenheitspflicht</h2>
          <p>
            Wir unterliegen der anwaltlichen Verschwiegenheitspflicht nach § 43a BRAO. 
            Alle Informationen werden streng vertraulich behandelt.
          </p>

          <h2>§ 7 Haftung</h2>
          <p>
            Wir haften für Vorsatz und grobe Fahrlässigkeit. Im Übrigen ist die Haftung auf 
            die Deckungssumme der Berufshaftpflichtversicherung begrenzt. Die Haftung für 
            leichte Fahrlässigkeit ist ausgeschlossen, soweit nicht Pflichten verletzt werden, 
            deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht.
          </p>

          <h2>§ 8 Aufbewahrung von Handakten</h2>
          <p>
            Handakten werden nach Beendigung des Mandats für die Dauer von 5 Jahren aufbewahrt, 
            soweit nicht gesetzliche Bestimmungen eine längere Aufbewahrung erfordern.
          </p>

          <h2>§ 9 Kündigung</h2>
          <p>
            Das Mandatsverhältnis kann von beiden Seiten jederzeit gekündigt werden. 
            Im Falle der Kündigung durch den Mandanten bleibt der Vergütungsanspruch für 
            bereits erbrachte Leistungen bestehen.
          </p>

          <h2>§ 10 Salvatorische Klausel</h2>
          <p>
            Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, berührt 
            dies die Wirksamkeit der übrigen Bestimmungen nicht. An die Stelle der unwirksamen 
            Bestimmung tritt eine angemessene Regelung.
          </p>

          <h2>§ 11 Anwendbares Recht und Gerichtsstand</h2>
          <p>
            Es gilt deutsches Recht. Gerichtsstand ist Frankfurt am Main, soweit der Mandant 
            Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches 
            Sondervermögen ist.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AGB;
