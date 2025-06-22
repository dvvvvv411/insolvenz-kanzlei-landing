
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, ArrowRight, Shield, Clock } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-law-blue-900 via-law-blue-800 to-law-blue-700 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-law-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
          <Shield className="w-4 h-4 mr-2" />
          Kostenlose Erstberatung - Unverbindlich & Vertraulich
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Benötigen Sie professionelle 
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-law-blue-200 to-white">
            Insolvenzverwaltung?
          </span>
        </h2>
        
        <p className="text-xl text-law-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          Kontaktieren Sie uns für eine unverbindliche Erstberatung. 
          Wir stehen Ihnen mit unserer Expertise zur Seite und entwickeln 
          gemeinsam eine maßgeschneiderte Lösung für Ihre Situation.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Sofortige Beratung</h3>
              <p className="text-law-blue-100 mb-6 leading-relaxed">
                Sprechen Sie direkt mit unseren Experten und erhalten Sie 
                sofortige Hilfe bei dringenden Insolvenzangelegenheiten
              </p>
              <Button variant="outline" className="w-full border-2 border-white text-white hover:bg-white hover:text-primary group">
                <Phone className="w-4 h-4 mr-2" />
                +49 69 94321306
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Detaillierte Analyse</h3>
              <p className="text-law-blue-100 mb-6 leading-relaxed">
                Senden Sie uns Ihre Unterlagen für eine ausführliche 
                schriftliche Bewertung Ihrer Situation
              </p>
              <Button variant="outline" className="w-full border-2 border-white text-white hover:bg-white hover:text-primary group">
                <Mail className="w-4 h-4 mr-2" />
                E-Mail senden
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8 text-law-blue-100">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Antwort innerhalb von 24h</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>100% vertraulich</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Kostenlose Erstberatung</span>
          </div>
        </div>

        <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-xl group text-lg px-8 py-4">
          Jetzt Termin vereinbaren
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
