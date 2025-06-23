
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Phone, Calendar, Clock, ArrowRight, Users, Scale, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Erstberatung = () => {
  const benefits = [
    "Kostenlose 30-minütige Erstberatung",
    "Professionelle Einschätzung Ihrer Rechtslage",
    "Aufzeigen möglicher Handlungsoptionen",
    "Transparente Kostenaufklärung",
    "Keine versteckten Kosten",
    "Unverbindlich und ohne Risiko"
  ];

  const process = [
    {
      step: 1,
      title: "Termin vereinbaren",
      description: "Rufen Sie uns an oder nutzen Sie unser Kontaktformular"
    },
    {
      step: 2,
      title: "Vorbereitung",
      description: "Sammeln Sie alle relevanten Unterlagen für das Gespräch"
    },
    {
      step: 3,
      title: "Beratungsgespräch",
      description: "30-minütiges kostenloses Gespräch in unserer Kanzlei oder telefonisch"
    },
    {
      step: 4,
      title: "Lösungsweg",
      description: "Gemeinsam entwickeln wir den optimalen Weg für Ihr Anliegen"
    }
  ];

  const areas = [
    { icon: Scale, title: "Insolvenzrecht", description: "Insolvenzverwaltung und Sanierungsberatung" },
    { icon: FileText, title: "Gesellschaftsrecht", description: "Unternehmensgründung und Corporate Law" },
    { icon: Users, title: "Arbeitsrecht", description: "Für Arbeitgeber und Arbeitnehmer" },
    { icon: FileText, title: "Vertragsrecht", description: "Vertragsgestaltung und -durchsetzung" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-law-blue-900 via-law-blue-800 to-law-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-4 bg-law-blue-100 text-law-blue-900">Kostenlos</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Kostenlose Erstberatung
              </h1>
              <p className="text-xl md:text-2xl text-law-blue-100 mb-8 max-w-4xl mx-auto">
                Vereinbaren Sie noch heute einen Termin für Ihre kostenlose 30-minütige Erstberatung. 
                Wir hören zu, analysieren Ihre Situation und zeigen Ihnen Lösungswege auf.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  <Phone className="w-4 h-4 mr-2" />
                  +49 69 94321306
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-law-blue-900" asChild>
                  <Link to="/kontakt">
                    Online Termin buchen
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-law-blue-900 mb-4">
                Was Sie erwartet
              </h2>
              <p className="text-xl text-gray-600">
                Ihre Vorteile bei der kostenlosen Erstberatung
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-law-blue-900 mb-6">
                So einfach geht's
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                In vier einfachen Schritten zu Ihrer kostenlosen Erstberatung
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-900 text-white rounded-full text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-law-blue-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-law-blue-900 mb-6">
                Unsere Beratungsbereiche
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Kostenlose Erstberatung in allen unseren Fachbereichen
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {areas.map((area, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-law-blue-100 rounded-lg">
                        <area.icon className="w-8 h-8 text-law-blue-900" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-law-blue-900">{area.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{area.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-law-blue-900 mb-4">
                Termin vereinbaren
              </h2>
              <p className="text-xl text-gray-600">
                Wählen Sie Ihren bevorzugten Kontaktweg
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mx-auto mb-4">
                    <Phone className="w-8 h-8 text-law-blue-900" />
                  </div>
                  <CardTitle className="text-law-blue-900">Telefonisch</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Rufen Sie uns direkt an und vereinbaren Sie Ihren Termin
                  </p>
                  <Button asChild>
                    <a href="tel:+496994321306">
                      +49 69 94321306
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-law-blue-900" />
                  </div>
                  <CardTitle className="text-law-blue-900">Online</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Nutzen Sie unser Kontaktformular für eine schnelle Terminvereinbarung
                  </p>
                  <Button asChild>
                    <Link to="/kontakt">
                      Kontaktformular
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mx-auto mb-4">
                    <Clock className="w-8 h-8 text-law-blue-900" />
                  </div>
                  <CardTitle className="text-law-blue-900">Öffnungszeiten</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">
                    Mo-Fr: 8:00 - 18:00 Uhr
                  </p>
                  <p className="text-gray-600 mb-4">
                    Termine auch außerhalb der Geschäftszeiten möglich
                  </p>
                  <p className="text-sm text-gray-500">
                    Nach Vereinbarung
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-law-blue-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Lassen Sie uns über Ihr Anliegen sprechen
            </h2>
            <p className="text-xl text-law-blue-100 mb-8 max-w-2xl mx-auto">
              Kostenfrei, unverbindlich und ohne Risiko. Wir nehmen uns Zeit für Ihre Fragen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Phone className="w-4 h-4 mr-2" />
                Jetzt anrufen: +49 69 94321306
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-law-blue-900" asChild>
                <Link to="/kontakt">
                  Online Kontakt
                  <ArrowRight className="w-4 h-4 ml-2" />
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

export default Erstberatung;
