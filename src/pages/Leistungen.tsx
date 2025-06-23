
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scale, Building2, FileText, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Leistungen = () => {
  const services = [
    {
      icon: Scale,
      title: "Insolvenzrecht",
      description: "Professionelle Insolvenzverwaltung und umfassende Beratung in allen Insolvenzangelegenheiten",
      href: "/leistungen/insolvenzrecht",
      features: ["Regelinsolvenz", "Verbraucherinsolvenz", "Sanierungsberatung", "Gläubigervertretung"]
    },
    {
      icon: Building2,
      title: "Gesellschaftsrecht",
      description: "Beratung bei Unternehmensgründung, -umstrukturierung und gesellschaftsrechtlichen Fragen",
      href: "/leistungen/gesellschaftsrecht",
      features: ["Gesellschaftsgründung", "Umstrukturierung", "M&A Transaktionen", "Corporate Governance"]
    },
    {
      icon: FileText,
      title: "Vertragsrecht",
      description: "Erstellung, Prüfung und Durchsetzung von Verträgen aller Art",
      href: "/leistungen/vertragsrecht",
      features: ["Vertragsgestaltung", "Vertragsprüfung", "Vertragsverhandlung", "Rechtsdurchsetzung"]
    },
    {
      icon: Users,
      title: "Arbeitsrecht",
      description: "Umfassende Beratung für Arbeitgeber und Arbeitnehmer in arbeitsrechtlichen Angelegenheiten",
      href: "/leistungen/arbeitsrecht",
      features: ["Kündigungsschutz", "Arbeitsverträge", "Betriebsübergänge", "Arbeitsgerichtsprozesse"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-law-blue-900 via-law-blue-800 to-law-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Unsere Leistungen
              </h1>
              <p className="text-xl md:text-2xl text-law-blue-100 mb-8 max-w-3xl mx-auto">
                Spezialisierte Rechtsberatung mit über 25 Jahren Erfahrung in komplexen rechtlichen Angelegenheiten
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-law-blue-100 rounded-lg">
                        <service.icon className="w-8 h-8 text-law-blue-900" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-law-blue-900">{service.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-lg">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <ArrowRight className="w-4 h-4 text-law-blue-600 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full">
                      <Link to={service.href}>
                        Mehr erfahren
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
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
              Benötigen Sie rechtliche Beratung?
            </h2>
            <p className="text-xl text-law-blue-100 mb-8 max-w-2xl mx-auto">
              Kontaktieren Sie uns für eine kostenlose Erstberatung. Wir sind für Sie da.
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

export default Leistungen;
