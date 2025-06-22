
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-law-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Benötigen Sie professionelle Insolvenzverwaltung?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Kontaktieren Sie uns für eine unverbindliche Erstberatung. 
          Wir stehen Ihnen mit unserer Expertise zur Seite.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Telefonberatung</h3>
              <p className="text-gray-600 mb-4">Sofortige Hilfe am Telefon</p>
              <Button variant="outline" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                +49 69 94321306
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">E-Mail Anfrage</h3>
              <p className="text-gray-600 mb-4">Detaillierte schriftliche Beratung</p>
              <Button variant="outline" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                E-Mail senden
              </Button>
            </CardContent>
          </Card>
        </div>

        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Jetzt Termin vereinbaren
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
