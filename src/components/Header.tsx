import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const leistungenItems = [
    { title: "Alle Leistungen", href: "/leistungen", description: "Überblick über unser gesamtes Leistungsspektrum" },
    { title: "Insolvenzrecht", href: "/leistungen/insolvenzrecht", description: "Insolvenzverwaltung und Sanierungsberatung" },
    { title: "Gesellschaftsrecht", href: "/leistungen/gesellschaftsrecht", description: "Unternehmensgründung und M&A Transaktionen" },
    { title: "Vertragsrecht", href: "/leistungen/vertragsrecht", description: "Vertragsgestaltung und -durchsetzung" },
    { title: "Arbeitsrecht", href: "/leistungen/arbeitsrecht", description: "Für Arbeitgeber und Arbeitnehmer" }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img 
              src="https://i.imgur.com/7TEsXpP.png" 
              alt="Kanzlei Logo" 
              className="h-12 w-auto"
            />
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className="text-gray-700 hover:text-primary transition-colors px-4 py-2">
                  Home
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-primary transition-colors">
                  Leistungen
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] lg:w-[500px]">
                    {leistungenItems.map((item) => (
                      <NavigationMenuLink key={item.href} asChild>
                        <Link
                          to={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{item.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {item.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/ueber-uns" className="text-gray-700 hover:text-primary transition-colors px-4 py-2">
                  Über uns
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/kontakt" className="text-gray-700 hover:text-primary transition-colors px-4 py-2">
                  Kontakt
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden md:flex items-center space-x-4">
            <Button asChild>
              <Link to="/erstberatung">
                Beratung vereinbaren
              </Link>
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
              
              <div className="space-y-2">
                <div className="font-medium text-gray-900">Leistungen</div>
                <div className="pl-4 space-y-2">
                  {leistungenItems.map((item) => (
                    <Link 
                      key={item.href}
                      to={item.href} 
                      className="block text-gray-700 hover:text-primary transition-colors text-sm"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/ueber-uns" className="text-gray-700 hover:text-primary transition-colors">
                Über uns
              </Link>

              <Link to="/kontakt" className="text-gray-700 hover:text-primary transition-colors">
                Kontakt
              </Link>
              
              <Button className="mt-4 w-fit" asChild>
                <Link to="/erstberatung">
                  Beratung vereinbaren
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
