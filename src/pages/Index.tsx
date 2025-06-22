import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Shield, Users, FileText, Clock, Award, MapPin } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-br from-law-blue-900 to-law-blue-700 flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Professionelle 
              <span className="block text-law-blue-200">Insolvenzverwaltung</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-law-blue-100">
              Vertrauen Sie auf unsere langjährige Erfahrung im Insolvenzrecht. 
              Wir begleiten Sie durch alle Phasen des Insolvenzverfahrens.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Kostenlose Erstberatung
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Mehr erfahren
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Unsere Leistungen im Insolvenzrecht
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Als spezialisierte Kanzlei für Insolvenzrecht bieten wir umfassende 
                Beratung und Vertretung in allen Bereichen der Insolvenzverwaltung.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Insolvenzverwaltung</h3>
                    <p className="text-gray-600">Professionelle Abwicklung von Insolvenzverfahren</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Insolvenzberatung</h3>
                    <p className="text-gray-600">Umfassende Beratung vor und während des Verfahrens</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Sanierungsberatung</h3>
                    <p className="text-gray-600">Strategien zur Unternehmenssanierung entwickeln</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Rechtssicherheit</h3>
                  <p className="text-gray-600 text-sm">Vollständige rechtliche Absicherung</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Erfahrung</h3>
                  <p className="text-gray-600 text-sm">Langjährige Expertise im Insolvenzrecht</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Dokumentation</h3>
                  <p className="text-gray-600 text-sm">Lückenlose Verfahrensdokumentation</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Effizienz</h3>
                  <p className="text-gray-600 text-sm">Schnelle und effiziente Abwicklung</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - About */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Professionelle Rechtsberatung" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Warum Lonquich, Külper & Kollegen?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Mit Sitz in Frankfurt am Main sind wir Ihre Spezialisten für Insolvenzrecht 
                und Insolvenzverwaltung. Unsere Partner Gerrit Külper und Christian Schwestka 
                bringen jahrelange Erfahrung mit.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Award className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Spezialisierung</h3>
                    <p className="text-gray-600">
                      Fokus ausschließlich auf Insolvenzrecht und verwandte Rechtsgebiete
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Users className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Partnerschaftlich</h3>
                    <p className="text-gray-600">
                      Persönliche Betreuung durch erfahrene Partner der Kanzlei
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Frankfurt Zentral</h3>
                    <p className="text-gray-600">
                      Optimale Erreichbarkeit im Herzen der Wirtschaftsmetropole
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
