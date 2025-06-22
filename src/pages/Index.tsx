
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Shield, Users, FileText, Clock, Award, MapPin, ArrowRight, Star, Briefcase } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Modern Hero Section */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-law-blue-900 via-law-blue-800 to-law-blue-700 flex items-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-law-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              {/* Trust badges */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-law-blue-100 text-sm">Über 500 erfolgreiche Verfahren</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Professionelle 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-law-blue-200 to-white">
                  Insolvenzverwaltung
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-law-blue-100 leading-relaxed">
                Vertrauen Sie auf unsere langjährige Erfahrung im Insolvenzrecht. 
                Wir begleiten Sie durch alle Phasen des Insolvenzverfahrens mit 
                <span className="font-semibold text-white"> garantierter Rechtssicherheit</span>.
              </p>
              
              {/* Social proof */}
              <div className="flex items-center space-x-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">25+</div>
                  <div className="text-sm text-law-blue-200">Jahre Erfahrung</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-law-blue-200">Erfolgreiche Fälle</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm text-law-blue-200">Erfolgsquote</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-lg group">
                  Kostenlose Erstberatung
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300">
                  +49 69 94321306
                </Button>
              </div>
            </div>
            
            {/* Modern info cards */}
            <div className="grid grid-cols-1 gap-6 animate-fade-in delay-300">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Sofortige Hilfe</h3>
                      <p className="text-law-blue-100">24/7 Notfall-Hotline verfügbar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">100% Rechtssicher</h3>
                      <p className="text-law-blue-100">Vollständige Haftungsübernahme</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Schnelle Abwicklung</h3>
                      <p className="text-law-blue-100">Durchschnittlich 30% kürzere Verfahren</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Services Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Warum über 500 Unternehmen uns vertrauen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Als spezialisierte Kanzlei für Insolvenzrecht bieten wir umfassende 
              Beratung und Vertretung mit nachweislich erfolgreichen Resultaten.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Insolvenzverwaltung</h3>
                  <p className="text-gray-600 leading-relaxed">Professionelle Abwicklung von Insolvenzverfahren mit garantierter Rechtssicherheit und optimaler Gläubigerbefriedigung</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Insolvenzberatung</h3>
                  <p className="text-gray-600 leading-relaxed">Umfassende Beratung vor und während des Verfahrens mit individuellen Lösungsstrategien für Ihre Situation</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Sanierungsberatung</h3>
                  <p className="text-gray-600 leading-relaxed">Strategien zur Unternehmenssanierung entwickeln und nachhaltige Lösungen für die Zukunft implementieren</p>
                </div>
              </div>
              
              <div className="mt-8">
                <Button size="lg" className="group">
                  Kostenlose Beratung anfragen
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
            
            {/* Modern stats cards */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
                  <h3 className="font-semibold mb-2 text-gray-900">Rechtssicherheit</h3>
                  <p className="text-gray-600 text-sm">Vollständige rechtliche Absicherung</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">25+</div>
                  <h3 className="font-semibold mb-2 text-gray-900">Jahre Erfahrung</h3>
                  <p className="text-gray-600 text-sm">Langjährige Expertise im Insolvenzrecht</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
                  <h3 className="font-semibold mb-2 text-gray-900">Erfolgreiche Fälle</h3>
                  <p className="text-gray-600 text-sm">Lückenlose Verfahrensdokumentation</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">30%</div>
                  <h3 className="font-semibold mb-2 text-gray-900">Schneller</h3>
                  <p className="text-gray-600 text-sm">Effizientere Verfahrensabwicklung</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl transform rotate-2"></div>
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Professionelle Rechtsberatung" 
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Award className="w-4 h-4 mr-2" />
                Ausgezeichnete Expertise
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Warum Lonquich, Külper & Kollegen?
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Mit Sitz in Frankfurt am Main sind wir Ihre Spezialisten für Insolvenzrecht 
                und Insolvenzverwaltung. Unsere Partner Gerrit Külper und Christian Schwestka 
                bringen über 25 Jahre kombinierte Erfahrung mit.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Spezialisierung</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Fokus ausschließlich auf Insolvenzrecht und verwandte Rechtsgebiete 
                      mit nachweislich erfolgreichen Resultaten
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Partnerschaftlich</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Persönliche Betreuung durch erfahrene Partner der Kanzlei 
                      mit direktem Zugang zu Entscheidungsträgern
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Frankfurt Zentral</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Optimale Erreichbarkeit im Herzen der Wirtschaftsmetropole 
                      mit exzellenter Verkehrsanbindung
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group">
                  Termin vereinbaren
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  Mehr über uns erfahren
                </Button>
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
