
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, ArrowRight, PenTool, Search, Gavel, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Vertragsrecht = () => {
  const services = [
    {
      title: "Vertragsgestaltung",
      description: "Erstellung maßgeschneiderter Verträge, die Ihre Interessen optimal schützen",
      features: ["Kaufverträge", "Dienstleistungsverträge", "Arbeitsverträge", "Lizenzverträge"]
    },
    {
      title: "Vertragsprüfung",
      description: "Umfassende Analyse bestehender Verträge zur Identifikation von Risiken und Chancen",
      features: ["Risikoanalyse", "Klauselprüfung", "Rechtssicherheit", "Optimierungsvorschläge"]
    },
    {
      title: "Vertragsverhandlung",
      description: "Professionelle Vertretung bei Vertragsverhandlungen für bestmögliche Ergebnisse",
      features: ["Verhandlungsstrategie", "Interessenvertretung", "Kompromissfindung", "Abschlussbegleitung"]
    },
    {
      title: "Rechtsdurchsetzung",
      description: "Durchsetzung Ihrer vertraglichen Ansprüche bei Vertragsverletzungen",
      features: ["Mahnverfahren", "Gerichtliche Durchsetzung", "Vollstreckung", "Schadensersatz"]
    }
  ];

  const contractTypes = [
    { name: "Kaufverträge", icon: "🏪" },
    { name: "Mietverträge", icon: "🏠" },
    { name: "Arbeitsverträge", icon: "💼" },
    { name: "Dienstleistungsverträge", icon: "🤝" },
    { name: "Lizenzverträge", icon: "⚖️" },
    { name: "Gesellschaftsverträge", icon: "🏢" },
    { name: "Franchiseverträge", icon: "🏪" },
    { name: "Vertriebsverträge", icon: "📈" }
  ];

  const process = [
    {
      step: 1,
      title: "Analyse",
      description: "Erfassung Ihrer Anforderungen und rechtlichen Rahmenbedingungen"
    },
    {
      step: 2,
      title: "Gestaltung",
      description: "Entwicklung der optimalen Vertragsstruktur und -inhalte"
    },
    {
      step: 3,
      title: "Verhandlung",
      description: "Professionelle Verhandlungsführung in Ihrem Interesse"
    },
    {
      step: 4,
      title: "Abschluss",
      description: "Sichere Abwicklung und rechtskonforme Dokumentation"
    }
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
                <Badge className="mb-4 bg-law-blue-100 text-law-blue-900">Vertragsrecht</Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Vertragsrecht & Vertragsgestaltung
                </h1>
                <p className="text-xl text-law-blue-100 mb-8">
                  Professionelle Vertragsgestaltung, -prüfung und -durchsetzung. 
                  Wir sorgen für rechtssichere Vereinbarungen, die Ihre Interessen optimal schützen.
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
                <FileText className="w-64 h-64 text-law-blue-200 opacity-20" />
              </div>
            </div>
          </div>
        </section>

        {/* Contract Types Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-law-blue-900 mb-4">
                Vertragsarten
              </h2>
              <p className="text-xl text-gray-600">
                Wir gestalten und prüfen Verträge aller Art
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contractTypes.map((type, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-3">{type.icon}</div>
                  <h3 className="text-lg font-semibold text-law-blue-900">{type.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-law-blue-900 mb-6">
                Unsere Leistungen im Vertragsrecht
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Von der ersten Idee bis zur erfolgreichen Durchsetzung
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
                Strukturiertes Vorgehen für optimale Vertragslösungen
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

        {/* Expertise Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-law-blue-900 mb-6">
                Unsere Expertise
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mb-4">
                  <PenTool className="w-8 h-8 text-law-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">Maßgeschneidert</h3>
                <p className="text-gray-600">Individuelle Vertragsgestaltung für Ihre Bedürfnisse</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mb-4">
                  <Search className="w-8 h-8 text-law-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">Sorgfältige Prüfung</h3>
                <p className="text-gray-600">Detaillierte Analyse aller Vertragsklauseln</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mb-4">
                  <Gavel className="w-8 h-8 text-law-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">Durchsetzungsstark</h3>
                <p className="text-gray-600">Effektive Rechtsdurchsetzung bei Bedarf</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-law-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">Rechtssicher</h3>
                <p className="text-gray-600">Maximale Rechtssicherheit für Ihre Verträge</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-law-blue-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Benötigen Sie einen Vertrag oder rechtliche Prüfung?
            </h2>
            <p className="text-xl text-law-blue-100 mb-8 max-w-2xl mx-auto">
              Lassen Sie uns Ihre Verträge rechtssicher gestalten oder bestehende Vereinbarungen prüfen.
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

export default Vertragsrecht;
