
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

const Kontakt = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-law-blue-900 via-law-blue-800 to-law-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Kontakt
              </h1>
              <p className="text-xl md:text-2xl text-law-blue-100 mb-8 max-w-3xl mx-auto">
                Nehmen Sie Kontakt mit uns auf. Wir sind für Sie da und beraten Sie gerne.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-law-blue-900" />
                  </div>
                  <CardTitle className="text-law-blue-900">Adresse</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Burgstr. 120<br />
                    60389 Frankfurt a. Main
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mx-auto mb-4">
                    <Phone className="w-8 h-8 text-law-blue-900" />
                  </div>
                  <CardTitle className="text-law-blue-900">Telefon</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    <a href="tel:+496994321306" className="hover:text-law-blue-900 transition-colors">
                      +49 69 94321306
                    </a>
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mx-auto mb-4">
                    <Mail className="w-8 h-8 text-law-blue-900" />
                  </div>
                  <CardTitle className="text-law-blue-900">E-Mail</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    <a href="mailto:info@kuelper-kanzlei.de" className="hover:text-law-blue-900 transition-colors">
                      info@kuelper-kanzlei.de
                    </a>
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-law-blue-100 rounded-full mx-auto mb-4">
                    <Clock className="w-8 h-8 text-law-blue-900" />
                  </div>
                  <CardTitle className="text-law-blue-900">Öffnungszeiten</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Mo-Fr: 8:00 - 18:00 Uhr<br />
                    Termine nach Vereinbarung
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-law-blue-900">Nachricht senden</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vorname *
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-law-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nachname *
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-law-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-law-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-law-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Betreff
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-law-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nachricht *
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-law-blue-500"
                      required
                    ></textarea>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="h-4 w-4 text-law-blue-600 focus:ring-law-blue-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                      Ich habe die <a href="/datenschutz" className="text-law-blue-600 hover:underline">Datenschutzerklärung</a> gelesen und akzeptiert. *
                    </label>
                  </div>
                  <Button size="lg" className="w-full">
                    Nachricht senden
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-law-blue-900">Kanzlei-Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-semibold text-law-blue-900 mb-2">
                      Lonquich, Külper & Kollegen Rechtsanwälte PartG
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Partner: Gerrit Külper & Christian Schwestka
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-law-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Anschrift</p>
                          <p className="text-gray-600">
                            Burgstr. 120<br />
                            60389 Frankfurt a. Main
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-law-blue-600" />
                        <div>
                          <p className="font-medium">Telefon</p>
                          <p className="text-gray-600">+49 69 94321306</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-law-blue-600" />
                        <div>
                          <p className="font-medium">E-Mail</p>
                          <p className="text-gray-600">info@kuelper-kanzlei.de</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-law-blue-900">Anfahrt</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Unsere Kanzlei befindet sich in zentraler Lage in Frankfurt am Main. 
                      Parkplätze sind in der Umgebung verfügbar.
                    </p>
                    <p className="text-gray-600">
                      <strong>Öffentliche Verkehrsmittel:</strong><br />
                      Gut er
reichbar mit U-Bahn, S-Bahn und Bus. 
                      Die nächste Haltestelle ist nur wenige Gehminuten entfernt.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Kontakt;
