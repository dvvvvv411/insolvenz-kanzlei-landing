import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Clock, MapPin, ArrowRight, Scale, Building2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const UeberUns = () => {
  const values = [
    {
      icon: Scale,
      title: "Kompetenz",
      description: "10+ Jahre Erfahrung in komplexen Rechtsangelegenheiten mit nachweislichen Erfolgen"
    },
    {
      icon: Heart,
      title: "Vertrauen",
      description: "Langfristige Mandantenbeziehungen basierend auf Vertrauen und Zuverlässigkeit"
    },
    {
      icon: Users,
      title: "Partnerschaft",
      description: "Wir verstehen uns als Partner unserer Mandanten auf Augenhöhe"
    },
    {
      icon: Building2,
      title: "Qualität",
      description: "Höchste Qualitätsstandards in der rechtlichen Beratung und Vertretung"
    }
  ];

  const facts = [
    { number: "10+", label: "Jahre Erfahrung", icon: Clock },
    { number: "200+", label: "Erfolgreiche Mandanten", icon: Award },
    { number: "2", label: "Spezialisierte Partner", icon: Users },
    { number: "100%", label: "Mandantenzufriedenheit", icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-law-blue-900 via-law-blue-800 to-law-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-4 bg-law-blue-100 text-law-blue-900">Über uns</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Lonquich, Külper & Kollegen
              </h1>
              <p className="text-xl md:text-2xl text-law-blue-100 mb-8 max-w-4xl mx-auto">
                Rechtsanwälte PartG - Ihre erfahrenen Partner für Insolvenzrecht, 
                Gesellschaftsrecht, Vertragsrecht und Arbeitsrecht in Frankfurt am Main
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/ueber-uns/team">
                    Unser Team kennenlernen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-law-blue-900 hover:bg-white hover:text-law-blue-900" asChild>
                  <Link to="/erstberatung">
                    Kostenlose Beratung
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Facts Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {facts.map((fact, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mb-4">
                    <fact.icon className="w-8 h-8 text-law-blue-900" />
                  </div>
                  <div className="text-4xl font-bold text-law-blue-900 mb-2">{fact.number}</div>
                  <div className="text-gray-600 font-medium">{fact.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-law-blue-900 mb-6">
                  Ihre Rechtsanwaltskanzlei in Frankfurt am Main
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Seit über 10 Jahren stehen wir unseren Mandanten mit kompetenter rechtlicher Beratung zur Seite. 
                  Als spezialisierte Rechtsanwaltskanzlei haben wir uns auf die Bereiche Insolvenzrecht, 
                  Gesellschaftsrecht, Vertragsrecht und Arbeitsrecht fokussiert.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Unser erfahrenes Team, bestehend aus den Partnern Gerrit Külper und Christian Schwestka, 
                  sowie weiteren kompetenten Rechtsanwälten, bietet Ihnen maßgeschneiderte Lösungen für 
                  Ihre rechtlichen Herausforderungen.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Wir verstehen uns nicht nur als Ihre Rechtsberater, sondern als vertrauensvolle Partner, 
                  die Sie auf Augenhöhe durch komplexe rechtliche Angelegenheiten begleiten.
                </p>
                <Button size="lg" asChild>
                  <Link to="/ueber-uns/kanzlei">
                    Mehr über unsere Kanzlei
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="bg-law-blue-100 p-8 rounded-lg">
                <div className="flex items-center mb-6">
                  <MapPin className="w-6 h-6 text-law-blue-900 mr-3" />
                  <div>
                    <h3 className="font-semibold text-law-blue-900">Unser Standort</h3>
                    <p className="text-gray-600">Burgstr. 120, 60389 Frankfurt a. Main</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-law-blue-900 mb-2">Kontakt</h4>
                    <p className="text-gray-600">Telefon: +49 69 94321306</p>
                    <p className="text-gray-600">E-Mail: info@kuelper-kanzlei.de</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-law-blue-900 mb-2">Öffnungszeiten</h4>
                    <p className="text-gray-600">Mo-Fr: 8:00 - 18:00 Uhr</p>
                    <p className="text-gray-600">Termine nach Vereinbarung</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-law-blue-900 mb-6">
                Unsere Werte
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Die Grundpfeiler unserer Arbeit und der Basis für erfolgreiche Mandantenbeziehungen
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-law-blue-100 rounded-lg">
                        <value.icon className="w-8 h-8 text-law-blue-900" />
                      </div>
                      <CardTitle className="text-2xl text-law-blue-900">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-law-blue-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Lernen Sie uns persönlich kennen
            </h2>
            <p className="text-xl text-law-blue-100 mb-8 max-w-2xl mx-auto">
              Vereinbaren Sie einen Termin für eine kostenlose Erstberatung oder besuchen Sie uns in unserer Kanzlei.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/erstberatung">
                  Kostenlose Erstberatung
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-law-blue-900 hover:bg-white hover:text-law-blue-900" asChild>
                <Link to="/kontakt">
                  Kontakt aufnehmen
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default UeberUns;
