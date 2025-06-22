
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <img 
              src="https://www.muenzel-boehm.de/theme/public/assets/frontend/img/muenzel-und-boehm-rechtsanwaelte-insolvenzrecht.svg" 
              alt="Kanzlei Logo" 
              className="h-12 w-auto mb-4 filter invert"
            />
            <h3 className="text-lg font-semibold mb-4">
              Lonquich, Külper & Kollegen Rechtsanwälte PartG
            </h3>
            <p className="text-gray-300 mb-4">
              Spezialisiert auf Insolvenzverwaltung und Insolvenzrecht in Frankfurt am Main. 
              Professionelle Beratung und Vertretung in allen Insolvenzangelegenheiten.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">
                Partner: Gerrit Külper & Christian Schwestka
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p>Burgstr. 120</p>
                  <p>60389 Frankfurt a. Main</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <p>+49 69 94321306</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <p>info@kuelper-kanzlei.de</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Rechtliches</h4>
            <nav className="space-y-2">
              <Link to="/impressum" className="block text-gray-300 hover:text-white transition-colors">
                Impressum
              </Link>
              <Link to="/datenschutz" className="block text-gray-300 hover:text-white transition-colors">
                Datenschutz
              </Link>
              <Link to="/agb" className="block text-gray-300 hover:text-white transition-colors">
                AGB
              </Link>
              <a 
                href="https://kuelper-kanzlei.de" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Hauptwebsite
              </a>
            </nav>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Lonquich, Külper & Kollegen Rechtsanwälte PartG. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
