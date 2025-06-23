
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, CheckCircle, ArrowRight, Users, FileText, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Gesellschaftsrecht = () => {
  const services = [
    {
      title: "Gesellschaftsgründung",
      description: "Beratung bei der Wahl der optimalen Rechtsform und Begleitung des gesamten Gründungsprozesses",
      features: ["Rechtsformwahl", "Gesellschaftsverträge", "Handelsregisteranmeldung", "Steuerliche Aspekte"]
    },
    {
      title: "Umstrukturierung",
      description: "Professionelle Begleitung bei Unternehmensumstrukturierungen und Rechtsformwechseln",
      features: ["Verschmelzungen", "Spaltungen", "Rechtsformwechsel", "Asset Deals"]
    },
    {
      title: "M&A Transaktionen",
      description: "Umfassende rechtliche Betreuung bei Unternehmenskäufen und -verkäufen",
      features: ["Due Diligence", "Kaufvertragsgestaltung", "Verhandlungsführung", "Closing-Begleitung"]
    },
    {
      title: "Corporate Governance",
      description: "Beratung zu Compliance, Governance-Strukturen und Gesellschafterrechten",
      features: ["Compliance-Systeme", "Gesellschaftervereinbarungen", "Organpflichten", "Haftungsfragen"]
    }
  ];

  const companyTypes = [
    { name: "GmbH", description: "Gesellschaft mit beschränkter Haftung" },
    { name: "AG", description: "Aktiengesellschaft" },
    { name: "UG", description: "Unternehmergesellschaft (haftungsbeschränkt)" },
    { name: "GbR", description: "Gesellschaft bürgerlichen Rechts" },
    { name: "OHG", description: "Offene Handelsgesellschaft" },
    { name: "KG", description: "Kommanditgesellschaft" }
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
                <Badge className="mb-4 bg-law-blue-100 text-law-blue-900">Gesellschaftsrecht</Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Gesellschaftsrecht & Corporate Law
                </h1>
                <p className="text-xl text-law-blue-100 mb-8">
                  Von der Unternehmensgründung bis zur komplexen M&A-Transaktion - 
                  wir begleiten Sie bei allen gesellschaftsrechtlichen Angelegenheiten in Hessen.
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
                <Building2 className="w-64 h-64 text-law-blue-200 opacity-20" />
              </div>
            </div>
          </div>
        </section>

        {/* Company Types Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-law-blue-900 mb-4">
                Rechtsformen im Überblick
              </h2>
              <p className="text-xl text-gray-600">
                Wir beraten Sie bei allen Gesellschaftsformen
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyTypes.map((type, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                  <h3 className="text-2xl font-bold text-law-blue-900 mb-2">{type.name}</h3>
                  <p className="text-gray-600">{type.description}</p>
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
                Unsere Leistungen im Gesellschaftsrecht
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Kompetente Beratung in allen Phasen des Unternehmenslebens
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

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-law-blue-900 mb-6">
                Warum unsere Kanzlei?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mb-4">
                  <TrendingUp className="w-8 h-8 text-law-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">10+ Jahre Erfahrung</h3>
                <p className="text-gray-600">Bewährte Expertise im Gesellschaftsrecht</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mb-4">
                  <Users className="w-8 h-8 text-law-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">Starkes Team</h3>
                <p className="text-gray-600">Kompetente Rechtsanwälte und Fachanwälte</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mb-4">
                  <FileText className="w-8 h-8 text-law-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">Maßgeschneidert</h3>
                <p className="text-gray-600">Individuelle Lösungen für Ihr Unternehmen</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-law-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-law-blue-900 mb-3">Verlässlich</h3>
                <p className="text-gray-600">Vertrauensvolle Partnerschaft auf Augenhöhe</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-law-blue-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Planen Sie eine Unternehmensgründung oder -transaktion?
            </h2>
            <p className="text-xl text-law-blue-100 mb-8 max-w-2xl mx-auto">
              Lassen Sie sich von unseren Experten beraten. Wir finden die optimale Lösung für Ihr Vorhaben.
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

export default Gesellschaftsrecht;
