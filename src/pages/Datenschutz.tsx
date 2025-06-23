
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, FileText, Users, Server, AlertCircle } from 'lucide-react';

const Datenschutz = () => {
  const rights = [
    "Recht auf Auskunft (Art. 15 DSGVO)",
    "Recht auf Berichtigung (Art. 16 DSGVO)",
    "Recht auf Löschung (Art. 17 DSGVO)",
    "Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)",
    "Recht auf Datenübertragbarkeit (Art. 20 DSGVO)",
    "Widerrufsrecht bei Einwilligungen (Art. 7 Abs. 3 DSGVO)",
    "Beschwerderecht bei der Aufsichtsbehörde (Art. 77 DSGVO)"
  ];

  const logData = [
    "Browsertyp und Browserversion",
    "verwendetes Betriebssystem",
    "Referrer URL",
    "Hostname des zugreifenden Rechners",
    "Uhrzeit der Serveranfrage",
    "IP-Adresse"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Datenschutzerklärung</h1>
          <p className="text-lg text-gray-600">Ihr Datenschutz ist uns wichtig</p>
        </div>
        
        <div className="space-y-8">
          {/* Datenschutz auf einen Blick */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                Datenschutz auf einen Blick
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-primary" />
                  Allgemeine Hinweise
                </h3>
                <p className="text-gray-700">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                  personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
                  Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Wer ist verantwortlich?</h4>
                  <p className="text-gray-700 text-sm">
                    Die Datenverarbeitung erfolgt durch den Websitebetreiber. 
                    Kontaktdaten finden Sie im Impressum.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Wie erfassen wir Daten?</h4>
                  <p className="text-gray-700 text-sm">
                    Durch Ihre Mitteilung (z.B. Kontaktformular) oder automatisch 
                    beim Websitebesuch.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Wofür nutzen wir Daten?</h4>
                  <p className="text-gray-700 text-sm">
                    Für fehlerfreie Bereitstellung der Website und Analyse 
                    des Nutzerverhaltens.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Welche Rechte haben Sie?</h4>
                  <p className="text-gray-700 text-sm">
                    Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hosting */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5 text-primary" />
                Hosting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Badge variant="outline" className="mb-3">Externes Hosting</Badge>
                <p className="text-gray-700">
                  Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser 
                  Website erfasst werden, werden auf den Servern des Hosters gespeichert. 
                  Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, 
                  Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine 
                  Website generiert werden, handeln.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Verantwortliche Stelle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Verantwortliche Stelle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-2">Lonquich, Külper & Kollegen Rechtsanwälte PartG</p>
                <div className="text-gray-700 text-sm space-y-1">
                  <p>Burgstr. 120</p>
                  <p>60389 Frankfurt a. Main</p>
                  <p>Telefon: +49 69 94321306</p>
                  <p>E-Mail: info@kuelper-kanzlei.de</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ihre Betroffenenrechte */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Ihre Betroffenenrechte
                <Badge variant="secondary">DSGVO</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {rights.map((right, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">{right}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Hinweis:</strong> Zur Ausübung Ihrer Rechte wenden Sie sich bitte an die 
                  oben genannte Kontaktadresse.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Datenerfassung */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Datenerfassung auf dieser Website
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Server-Log-Dateien</h3>
                <p className="text-gray-700 mb-3">
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in 
                  so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt:
                </p>
                <div className="grid gap-2">
                  {logData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Kontaktformular</h3>
                <p className="text-gray-700">
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus 
                  dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks 
                  Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Speicherdauer */}
          <Card>
            <CardHeader>
              <CardTitle>Speicherdauer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt 
                wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die 
                Datenverarbeitung entfällt.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
