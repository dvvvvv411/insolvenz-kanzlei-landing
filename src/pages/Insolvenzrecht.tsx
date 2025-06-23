
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scale, CheckCircle, Users, FileText, ArrowRight, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Insolvenzrecht = () => {
  const services = [
    {
      title: "Regelinsolvenz",
      description: "Professionelle Abwicklung von Unternehmensinsolvenzen mit dem Ziel der bestmöglichen Gläubigerbefriedigung",
      features: ["Insolvenzverwaltung", "Sanierungsprüfung", "Verwertung", "Masseverteilung"]
    },
    {
      title: "Verbraucherinsolvenz",
      description: "Begleitung von Privatpersonen durch das Insolvenzverfahren zur Schuldenbefreiung",
      features: ["Außergerichtliche Einigung", "Verfahrensantrag", "Wohlverhaltensperiode", "Restschuldbefreiung"]
    },
    {
      title: "Sanierungsberatung",
      description: "Präventive Beratung zur Vermeidung einer Insolvenz durch rechtzeitige Sanierungsmaßnahmen",
      features: ["Krisenanalyse", "Sanierungskonzept", "Verhandlung mit Gläubigern", "Restrukturierung"]
    },
    {
      title: "Gläubigervertretung",
      description: "Durchsetzung von Gläubigerrechten in Insolvenzverfahren",
      features: ["Forderungsanmeldung", "Prüfung der Insolvenzverwaltung", "Gläubigerversammlung", "Rechtsmittel"]
    }
  ];

  const expertise = [
    { icon: Clock, title: "10+ Jahre Erfahrung", description: "Bewährte Expertise in der Insolvenzverwaltung" },
    { icon: Users, title: "200+ Mandanten", description: "Erfolgreich betreute Insolvenzverfahren" },
    { icon: Shield, title: "Zertifiziert", description: "Zugelassene Insolvenzverwalter" },
    { icon: Scale, title: "Faire Abwicklung", description: "Ausgewogene Interessenvertretung aller Beteiligten" }
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
                <Badge className="mb-4 bg-law-blue-100 text-law-blue-900">Insolvenzrecht</Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Insolvenzrecht & Insolvenzverwaltung
                </h1>
                <p className="text-xl text-law-blue-100 mb-8">
                  Als erfahrene Insolvenzverwalter begleiten wir Sie professionell durch komplexe Insolvenzverfahren. 
                  Unser Ziel ist die bestmögliche Lösung für alle Beteiligten.
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
                <Scale className="w-64 h-64 text-law-blue-200 opacity-20" />
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {expertise.map((item, index) => (
                <div key={index} className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mb-4">
                    <item.icon className="w-8 h-8 text-law-blue-900" />
                  </div>
                  <h3 className="text-lg font-semibold text-law-blue-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
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
                Unsere Leistungen im Insolvenzrecht
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Von der präventiven Sanierungsberatung bis zur vollständigen Abwicklung von Insolvenzverfahren
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
                Strukturiertes und transparentes Vorgehen für optimale Ergebnisse
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-900 text-white rounded-full text-2xl font-bold mb-4">1</div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">Analyse & Beratung</h3>
                <p className="text-gray-600">Umfassende Analyse der Situation und Entwicklung der optimalen Strategie</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-900 text-white rounded-full text-2xl font-bold mb-4">2</div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">Verfahrensabwicklung</h3>
                <p className="text-gray-600">Professional Durchführung aller verfahrensrechtlichen Schritte</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-900 text-white rounded-full text-2xl font-bold mb-4">3</div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">Erfolgreicher Abschluss</h3>
                <p className="text-gray-600">Bestmögliche Verwertung und gerechte Verteilung für alle Beteiligten</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-law-blue-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Brauchen Sie Hilfe bei einer Insolvenz?
            </h2>
            <p className="text-xl text-law-blue-100 mb-8 max-w-2xl mx-auto">
              Kontaktieren Sie uns für eine kostenlose Erstberatung. Wir finden gemeinsam die beste Lösung.
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

export default Insolvenzrecht;
