
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileText, Scale, Euro, Shield, Clock, AlertTriangle } from 'lucide-react';

const AGB = () => {
  const sections = [
    {
      id: "geltungsbereich",
      title: "Geltungsbereich",
      icon: Scale,
      content: "Diese Allgemeinen Geschäftsbedingungen gelten für alle Rechtsdienstleistungen der Lonquich, Külper & Kollegen Rechtsanwälte PartG gegenüber ihren Mandanten.",
      important: true
    },
    {
      id: "vertragsschluss",
      title: "Vertragsschluss",
      icon: FileText,
      content: "Der Anwaltsvertrag kommt durch ausdrückliche Vereinbarung oder durch die Aufnahme der anwaltlichen Tätigkeit zustande. Die Mandatserteilung kann schriftlich, mündlich oder durch schlüssiges Verhalten erfolgen."
    },
    {
      id: "leistungsumfang",
      title: "Leistungsumfang",
      icon: FileText,
      content: "Der Umfang der anwaltlichen Tätigkeit richtet sich nach der getroffenen Vereinbarung. Soweit nichts anderes vereinbart ist, erstreckt sich das Mandat nur auf die ausdrücklich übertragenen Angelegenheiten."
    },
    {
      id: "verguetung",
      title: "Vergütung",
      icon: Euro,
      content: "Die Vergütung richtet sich nach der getroffenen Vereinbarung oder, soweit keine Vereinbarung getroffen wurde, nach dem Rechtsanwaltsvergütungsgesetz (RVG). Auslagen werden gesondert in Rechnung gestellt.",
      important: true
    },
    {
      id: "zahlungsbedingungen",
      title: "Zahlungsbedingungen",
      icon: Clock,
      content: "Rechnungen sind binnen 14 Tagen nach Rechnungsstellung ohne Abzug zur Zahlung fällig. Bei Zahlungsverzug werden Verzugszinsen in Höhe von 8 Prozentpunkten über dem Basiszinssatz berechnet."
    },
    {
      id: "verschwiegenheitspflicht",
      title: "Verschwiegenheitspflicht",
      icon: Shield,
      content: "Wir unterliegen der anwaltlichen Verschwiegenheitspflicht nach § 43a BRAO. Alle Informationen werden streng vertraulich behandelt.",
      important: true
    },
    {
      id: "haftung",
      title: "Haftung",
      icon: AlertTriangle,
      content: "Wir haften für Vorsatz und grobe Fahrlässigkeit. Im Übrigen ist die Haftung auf die Deckungssumme der Berufshaftpflichtversicherung begrenzt. Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, soweit nicht Pflichten verletzt werden, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht."
    },
    {
      id: "aufbewahrung",
      title: "Aufbewahrung von Handakten",
      icon: FileText,
      content: "Handakten werden nach Beendigung des Mandats für die Dauer von 5 Jahren aufbewahrt, soweit nicht gesetzliche Bestimmungen eine längere Aufbewahrung erfordern."
    },
    {
      id: "kuendigung",
      title: "Kündigung",
      icon: FileText,
      content: "Das Mandatsverhältnis kann von beiden Seiten jederzeit gekündigt werden. Im Falle der Kündigung durch den Mandanten bleibt der Vergütungsanspruch für bereits erbrachte Leistungen bestehen."
    },
    {
      id: "salvatorische",
      title: "Salvatorische Klausel",
      icon: Scale,
      content: "Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, berührt dies die Wirksamkeit der übrigen Bestimmungen nicht. An die Stelle der unwirksamen Bestimmung tritt eine angemessene Regelung."
    },
    {
      id: "anwendbares-recht",
      title: "Anwendbares Recht und Gerichtsstand",
      icon: Scale,
      content: "Es gilt deutsches Recht. Gerichtsstand ist Frankfurt am Main, soweit der Mandant Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Allgemeine Geschäftsbedingungen</h1>
          <p className="text-lg text-gray-600">Rechtsgrundlagen unserer Zusammenarbeit</p>
        </div>
        
        <div className="space-y-6">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Card key={section.id} className={section.important ? "border-primary/30 bg-primary/5" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${section.important ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-500">§ {index + 1}</span>
                      <span>{section.title}</span>
                      {section.important && <Badge variant="default" className="text-xs">Wichtig</Badge>}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            );
          })}

          {/* Zusätzliche Hinweise */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <AlertTriangle className="w-5 h-5" />
                Wichtige Hinweise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-blue-800">
                <p className="text-sm">
                  • Diese AGB gelten für alle Mandatsverhältnisse mit unserer Kanzlei
                </p>
                <p className="text-sm">
                  • Änderungen bedürfen der Schriftform
                </p>
                <p className="text-sm">
                  • Bei Fragen zu diesen Bedingungen stehen wir Ihnen gerne zur Verfügung
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AGB;
