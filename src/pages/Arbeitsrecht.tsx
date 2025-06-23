
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, CheckCircle, ArrowRight, Briefcase, FileText, Scale, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Arbeitsrecht = () => {
  const services = [
    {
      title: "Kündigungsschutz",
      description: "Schutz vor unberechtigten Kündigungen und Durchsetzung Ihrer Rechte als Arbeitnehmer",
      features: ["Kündigungsschutzklage", "Abfindungsverhandlung", "Aufhebungsverträge", "Zeugnisprüfung"]
    },
    {
      title: "Arbeitsverträge",
      description: "Gestaltung und Prüfung von Arbeitsverträgen für Arbeitgeber und Arbeitnehmer",
      features: ["Vertragsgestaltung", "Klauselprüfung", "Gehaltsverhandlung", "Arbeitszeit"]
    },
    {
      title: "Betriebsübergänge",
      description: "Rechtssichere Abwicklung von Betriebsübergängen nach § 613a BGB",
      features: ["Due Diligence", "Übernahmeverträge", "Arbeitnehmerinformation", "Haftungsfragen"]
    },
    {
      title: "Arbeitsgerichtsprozesse",
      description: "Professionelle Vertretung vor Arbeitsgerichten in allen Instanzen",
      features: ["Klageverfahren", "Berufungsverfahren", "Revision", "Vergleichsverhandlungen"]
    }
  ];

  const forEmployers = [
    "Arbeitsvertragsgestaltung",
    "Betriebsvereinbarungen",
    "Abmahnungen & Kündigungen",
    "Compliance & Arbeitsschutz",
    "Betriebsübergänge",
    "Restrukturierung"
  ];

  const forEmployees = [
    "Kündigungsschutz",
    "Abfindungsverhandlungen",
    "Arbeitszeugnis",
    "Lohn- und Gehaltsansprüche",
    "Mobbing & Diskriminierung",
    "Arbeitsunfälle"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-law-blue-900 via-law-blue-800 to-law-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-law-blue-100 text-law-blue-900">Arbeitsrecht</Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Arbeitsrecht für Arbeitgeber & Arbeitnehmer
                </h1>
                <p className="text-xl text-law-blue-100 mb-8">
                  Kompetente Beratung und Vertretung in allen arbeitsrechtlichen Angelegenheiten in Hessen. 
                  Wir setzen uns für Ihre Rechte ein - auf beiden Seiten des Arbeitsverhältnisses.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/erstberatung">
                      Kostenlose Beratung
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-law-blue-900">
                    +49 69 94321306
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Users className="w-64 h-64 text-law-blue-200 opacity-20" />
              </div>
            </div>
          </div>
        </section>

        {/* Services for Both Sides */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-law-blue-900 mb-4">
                Für Arbeitgeber & Arbeitnehmer
              </h2>
              <p className="text-xl text-gray-600">
                Ausgewogene Beratung auf beiden Seiten des Arbeitsverhältnisses
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-law-blue-100 rounded-lg">
                      <Briefcase className="w-8 h-8 text-law-blue-900" />
                    </div>
                    <CardTitle className="text-2xl text-law-blue-900">Für Arbeitgeber</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {forEmployers.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-law-blue-100 rounded-lg">
                      <Users className="w-8 h-8 text-law-blue-900" />
                    </div>
                    <CardTitle className="text-2xl text-law-blue-900">Für Arbeitnehmer</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {forEmployees.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Services Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-law-blue-900 mb-6">
                Unsere Schwerpunkte im Arbeitsrecht
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Spezialisierte Beratung in allen wichtigen arbeitsrechtlichen Bereichen
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl text-law-blue-900">{service.title}</CardTitle>
                    <CardDescription className="text-lg">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-law-blue-900 mb-6">
                Unser Vorgehen
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Strukturierte Herangehensweise für optimale Ergebnisse
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-900 text-white rounded-full text-2xl font-bold mb-4">1</div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">Analyse</h3>
                <p className="text-gray-600">Umfassende Bewertung Ihrer arbeitsrechtlichen Situation</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-900 text-white rounded-full text-2xl font-bold mb-4">2</div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">Strategie</h3>
                <p className="text-gray-600">Entwicklung der optimalen Vorgehensweise für Ihren Fall</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-900 text-white rounded-full text-2xl font-bold mb-4">3</div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">Umsetzung</h3>
                <p className="text-gray-600">Professionelle Durchsetzung Ihrer Rechte und Interessen</p>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-law-blue-900 mb-6">
                Warum unsere Kanzlei?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mb-4">
                  <Scale className="w-8 h-8 text-law-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">Ausgewogen</h3>
                <p className="text-gray-600">Faire Beratung für beide Seiten des Arbeitsverhältnisses</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mb-4">
                  <FileText className="w-8 h-8 text-law-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">Erfahren</h3>
                <p className="text-gray-600">10+ Jahre Erfahrung im Arbeitsrecht</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mb-4">
                  <Users className="w-8 h-8 text-law-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">Persönlich</h3>
                <p className="text-gray-600">Individuelle Betreuung und persönliche Ansprechpartner</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-law-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">Durchsetzungsstark</h3>
                <p className="text-gray-600">Effektive Vertretung vor Arbeitsgerichten</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-law-blue-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Arbeitsrechtliche Probleme oder Fragen?
            </h2>
            <p className="text-xl text-law-blue-100 mb-8 max-w-2xl mx-auto">
              Kontaktieren Sie uns für eine kostenlose Erstberatung. Wir helfen Ihnen weiter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/erstberatung">
                  Kostenlose Erstberatung
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-law-blue-900" asChild>
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

export default Arbeitsrecht;
