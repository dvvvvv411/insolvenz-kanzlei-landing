
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Impressum = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Impressum</h1>
          <p className="text-lg text-gray-600">Rechtliche Angaben gemäß § 5 TMG</p>
        </div>
        
        <div className="space-y-8">
          {/* Kanzlei Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Kanzlei Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Lonquich, Külper & Kollegen Rechtsanwälte PartG</h3>
                <div className="text-gray-700">
                  <p>Burgstr. 120</p>
                  <p>60389 Frankfurt a. Main</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Vertreten durch</h4>
                <p className="text-gray-700">Partner: Gerrit Külper & Christian Schwestka</p>
              </div>
            </CardContent>
          </Card>

          {/* Kontakt Information */}
          <Card>
            <CardHeader>
              <CardTitle>Kontakt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+49 69 94321306</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>info@kuelper-kanzlei.de</span>
                </div>
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-5 h-5 text-primary" />
                  <a href="https://kuelper-kanzlei.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    kuelper-kanzlei.de
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Berufsrechtliche Angaben */}
          <Card>
            <CardHeader>
              <CardTitle>Berufsbezeichnung und berufsrechtliche Regelungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge variant="outline" className="mb-2">Berufsbezeichnung</Badge>
                <p className="text-gray-700">Rechtsanwalt (verliehen in der Bundesrepublik Deutschland)</p>
              </div>
              
              <Separator />
              
              <div>
                <Badge variant="outline" className="mb-2">Zuständige Kammer</Badge>
                <p className="text-gray-700">Rechtsanwaltskammer Frankfurt am Main</p>
              </div>
              
              <Separator />
              
              <div>
                <Badge variant="outline" className="mb-2">Berufsrechtliche Regelungen</Badge>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Bundesrechtsanwaltsordnung (BRAO)</li>
                  <li>Berufsordnung für Rechtsanwälte (BORA)</li>
                  <li>Rechtsanwaltsvergütungsgesetz (RVG)</li>
                  <li>Fachanwaltsordnung (FAO)</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">
                  Die berufsrechtlichen Regelungen können eingesehen werden unter: 
                  <a href="http://www.brak.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                    www.brak.de
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Berufshaftpflichtversicherung */}
          <Card>
            <CardHeader>
              <CardTitle>Angaben zur Berufshaftpflichtversicherung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Name und Sitz des Versicherers:</h4>
                <p className="text-gray-700">[Versicherungsunternehmen]</p>
                <p className="text-gray-700">[Adresse des Versicherers]</p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Geltungsraum der Versicherung:</h4>
                <Badge>Deutschland und Europa</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Redaktionell verantwortlich */}
          <Card>
            <CardHeader>
              <CardTitle>Redaktionell verantwortlich</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700">
                <p className="font-medium">Gerrit Külper & Christian Schwestka</p>
                <p>Burgstr. 120</p>
                <p>60389 Frankfurt a. Main</p>
              </div>
            </CardContent>
          </Card>

          {/* Streitschlichtung */}
          <Card>
            <CardHeader>
              <CardTitle>Streitbeilegung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">EU-Streitschlichtung</h4>
                <p className="text-gray-700 mb-2">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                </p>
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" 
                   className="text-primary hover:underline inline-flex items-center gap-1">
                  https://ec.europa.eu/consumers/odr/
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-sm text-gray-600 mt-2">Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Verbraucherstreitbeilegung</h4>
                <p className="text-gray-700">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                  Verbraucherschlichtungsstelle teilzunehmen.
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

export default Impressum;
