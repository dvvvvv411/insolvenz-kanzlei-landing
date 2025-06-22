
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Shield, Users, FileText, Clock, Award, MapPin, ArrowRight, Star, Briefcase, Phone, Mail, TrendingUp, Target, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Enhanced Hero Section with Urgency and Social Proof */}
      <section className="relative min-h-[95vh] bg-gradient-to-br from-law-blue-900 via-law-blue-800 to-law-blue-700 flex items-center overflow-hidden">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-law-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-yellow-300 rounded-full blur-2xl animate-pulse delay-500"></div>
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
              {/* Enhanced trust badges with urgency */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 mb-8">
                <div className="flex items-center space-x-1 bg-yellow-500/20 px-4 py-2 rounded-full">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-yellow-200 text-sm ml-2 font-medium">4.9/5</span>
                </div>
                <div className="bg-green-500/20 px-4 py-2 rounded-full">
                  <span className="text-green-200 text-sm font-medium flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    500+ erfolgreiche Verfahren
                  </span>
                </div>
              </div>
              
              {/* Urgency banner */}
              <div className="inline-flex items-center px-4 py-2 bg-red-500/20 backdrop-blur-sm rounded-full text-red-200 text-sm font-medium mb-6 animate-pulse">
                <Zap className="w-4 h-4 mr-2" />
                Dringende Insolvenzfälle - Sofortige Hilfe verfügbar
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="block text-white">Ihre Rettung bei</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
                  Insolvenzkrisen
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-law-blue-100 leading-relaxed">
                <span className="font-bold text-yellow-300">Innerhalb 24 Stunden</span> erhalten Sie eine professionelle Erstberatung. 
                Unsere Experten haben bereits über <span className="font-semibold text-white">500 Unternehmen</span> durch 
                schwere Zeiten geleitet - mit einer <span className="font-bold text-green-300">98% Erfolgsquote</span>.
              </p>
              
              {/* Enhanced social proof */}
              <div className="grid grid-cols-3 gap-6 mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">25+</div>
                  <div className="text-sm text-law-blue-200">Jahre Erfahrung</div>
                </div>
                <div className="text-center border-x border-white/20">
                  <div className="text-3xl font-bold text-green-300">500+</div>
                  <div className="text-sm text-law-blue-200">Gerettete Unternehmen</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300">98%</div>
                  <div className="text-sm text-law-blue-200">Erfolgsquote</div>
                </div>
              </div>
              
              {/* Enhanced CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-2xl group text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300">
                  <Phone className="w-5 h-5 mr-2" />
                  Jetzt anrufen - Kostenlos
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 text-lg px-8 py-4">
                  <Mail className="w-5 h-5 mr-2" />
                  Sofort-Beratung per E-Mail
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center space-x-4 text-sm text-law-blue-200">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>100% vertraulich</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>24h Antwortzeit</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="w-4 h-4 text-yellow-400" />
                  <span>Keine Vorauszahlung</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced info cards */}
            <div className="grid grid-cols-1 gap-6 animate-fade-in delay-300">
              <Card className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm border-white/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl mb-1">Notfall-Hilfe</h3>
                      <p className="text-law-blue-100 text-lg">Sofortige Unterstützung bei akuten Krisen</p>
                      <p className="text-yellow-300 text-sm font-medium mt-1">24/7 Hotline verfügbar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm border-white/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl mb-1">Garantierte Sicherheit</h3>
                      <p className="text-law-blue-100 text-lg">Vollständige rechtliche Absicherung</p>
                      <p className="text-green-300 text-sm font-medium mt-1">Haftungsübernahme inklusive</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm border-white/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl mb-1">Bewährte Erfolge</h3>
                      <p className="text-law-blue-100 text-lg">98% unserer Mandanten erfolgreich geholfen</p>
                      <p className="text-blue-300 text-sm font-medium mt-1">Durchschnittlich 40% schneller</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section with Conversion Focus */}
      <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Conversion-focused header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              Über 500 erfolgreiche Rettungen seit 1999
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-8">
              Warum Sie uns <span className="text-primary">sofort</span> kontaktieren sollten
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Jede Stunde zählt bei Insolvenzverfahren. Unsere Erfolgsgeschichte von über 
              <span className="font-bold text-primary"> 500 geretteten Unternehmen</span> spricht für sich.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="flex items-start space-x-6 group p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Insolvenzverwaltung</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-4">
                    Professionelle Abwicklung mit <span className="font-semibold text-primary">garantierter Rechtssicherheit</span> und 
                    optimaler Gläubigerbefriedigung. Durchschnittlich 30% bessere Ergebnisse als der Marktstandard.
                  </p>
                  <div className="flex items-center text-green-600 font-medium">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    98% Erfolgsquote
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-6 group p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Insolvenzberatung</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-4">
                    Umfassende Beratung mit <span className="font-semibold text-primary">individuellen Lösungsstrategien</span>. 
                    Über 80% unserer Beratungsfälle führen zu erfolgreichen Sanierungen.
                  </p>
                  <div className="flex items-center text-blue-600 font-medium">
                    <Clock className="w-4 h-4 mr-2" />
                    Antwort innerhalb 24h
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-6 group p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Sanierungsberatung</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-4">
                    Strategien zur Unternehmenssanierung mit <span className="font-semibold text-primary">nachhaltigen Lösungen</span>. 
                    75% unserer sanierten Unternehmen sind auch nach 5 Jahren noch erfolgreich.
                  </p>
                  <div className="flex items-center text-green-600 font-medium">
                    <Target className="w-4 h-4 mr-2" />
                    Langfristige Stabilität
                  </div>
                </div>
              </div>
              
              {/* Enhanced CTA */}
              <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border-2 border-primary/20">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Kostenlose Sofort-Analyse Ihrer Situation</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Erhalten Sie innerhalb von 24 Stunden eine professionelle Einschätzung - 
                  völlig kostenlos und unverbindlich.
                </p>
                <Button size="lg" className="group text-lg px-8 py-4">
                  <Phone className="w-5 h-5 mr-2" />
                  Jetzt kostenlose Analyse anfordern
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
            
            {/* Enhanced stats cards */}
            <div className="grid grid-cols-2 gap-8">
              <Card className="hover:shadow-2xl transition-all duration-500 border-0 shadow-lg group transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-3">100%</div>
                  <h3 className="font-bold mb-3 text-gray-900 text-lg">Rechtssicherheit</h3>
                  <p className="text-gray-600">Vollständige rechtliche Absicherung mit Haftungsübernahme</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-2xl transition-all duration-500 border-0 shadow-lg group transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-3">25+</div>
                  <h3 className="font-bold mb-3 text-gray-900 text-lg">Jahre Expertise</h3>
                  <p className="text-gray-600">Unübertroffene Erfahrung im deutschen Insolvenzrecht</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-2xl transition-all duration-500 border-0 shadow-lg group transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-3">500+</div>
                  <h3 className="font-bold mb-3 text-gray-900 text-lg">Erfolgreiche Fälle</h3>
                  <p className="text-gray-600">Lückenlose Erfolgsgeschichte seit 1999</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-2xl transition-all duration-500 border-0 shadow-lg group transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-3">40%</div>
                  <h3 className="font-bold mb-3 text-gray-900 text-lg">Schneller</h3>
                  <p className="text-gray-600">Effizientere Abwicklung als der Marktdurchschnitt</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 rounded-3xl transform rotate-3"></div>
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/30 via-primary/15 to-primary/10 rounded-3xl transform -rotate-1"></div>
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Professionelle Rechtsberatung" 
                className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center px-6 py-3 bg-primary/10 rounded-full text-primary text-sm font-medium mb-8">
                <Award className="w-4 h-4 mr-2" />
                Deutschlands führende Insolvenzexperten
              </div>
              
              <h2 className="text-5xl font-bold text-gray-900 mb-8">
                Ihre Experten für den <span className="text-primary">Ernstfall</span>
              </h2>
              
              <p className="text-2xl text-gray-600 mb-10 leading-relaxed">
                Mit Sitz in Frankfurt am Main sind wir Ihre Spezialisten für kritische Unternehmenssituationen. 
                Unsere Partner <span className="font-bold text-gray-900">Gerrit Külper</span> und 
                <span className="font-bold text-gray-900"> Christian Schwestka</span> bringen über 
                <span className="font-bold text-primary"> 25 Jahre kombinierte Erfahrung</span> mit.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6 group p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Absolute Spezialisierung</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      Fokus ausschließlich auf Insolvenzrecht mit <span className="font-semibold text-primary">nachweislich 
                      besseren Resultaten</span> als Generalisten-Kanzleien
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 group p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Persönliche Partner-Betreuung</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      Direkter Zugang zu <span className="font-semibold text-primary">erfahrenen Partnern</span> der Kanzlei - 
                      keine Delegation an Junior-Anwälte
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 group p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Frankfurt - Zentrum der Wirtschaft</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      Optimale Erreichbarkeit im <span className="font-semibold text-primary">Herzen der deutschen 
                      Finanzmetropole</span> mit exzellenter Verkehrsanbindung
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Enhanced CTA section */}
              <div className="mt-12 p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">Sprechen Sie jetzt mit unseren Experten</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Jede Minute kann entscheidend sein. Kontaktieren Sie uns noch heute für eine 
                  kostenlose Ersteinschätzung Ihrer Situation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 group text-lg px-8 py-4">
                    <Phone className="w-5 h-5 mr-2" />
                    Sofort anrufen: +49 69 94321306
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4">
                    <Mail className="w-5 h-5 mr-2" />
                    E-Mail Beratung
                  </Button>
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
