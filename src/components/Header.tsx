
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img 
              src="https://www.muenzel-boehm.de/theme/public/assets/frontend/img/muenzel-und-boehm-rechtsanwaelte-insolvenzrecht.svg" 
              alt="Kanzlei Logo" 
              className="h-12 w-auto"
            />
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/leistungen" className="text-gray-700 hover:text-primary transition-colors">
              Leistungen
            </Link>
            <Link to="/ueber-uns" className="text-gray-700 hover:text-primary transition-colors">
              Über uns
            </Link>
            <Link to="/kontakt" className="text-gray-700 hover:text-primary transition-colors">
              Kontakt
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button>
              Beratung vereinbaren
            </Button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/leistungen" className="text-gray-700 hover:text-primary transition-colors">
                Leistungen
              </Link>
              <Link to="/ueber-uns" className="text-gray-700 hover:text-primary transition-colors">
                Über uns
              </Link>
              <Link to="/kontakt" className="text-gray-700 hover:text-primary transition-colors">
                Kontakt
              </Link>
              <Button className="mt-4 w-fit">
                Beratung vereinbaren
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
