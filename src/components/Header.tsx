import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, User, Ticket, Film, Award, BookOpen, Home } from 'lucide-react';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Film className="h-8 w-8 text-golden" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
                HillyPix
              </h1>
              <p className="text-xs text-muted-foreground tracking-wider">HILLYWOOD</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" className="text-foreground hover:text-golden theatre-transition">
              <Home className="w-4 h-4 mr-2" />
              Theatre
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-golden theatre-transition">
              <Ticket className="w-4 h-4 mr-2" />
              Premieres
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-golden theatre-transition">
              <BookOpen className="w-4 h-4 mr-2" />
              Library
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-golden theatre-transition">
              <Award className="w-4 h-4 mr-2" />
              Hall of Fame
            </Button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-muted-foreground hover:text-golden"
              >
                <Search className="w-4 h-4" />
              </Button>
              {isSearchOpen && (
                <div className="absolute right-0 top-12 w-80 animate-theatre-entrance">
                  <div className="bg-card-accent/95 backdrop-blur-md rounded-lg p-4 border border-border/30">
                    <input
                      type="text"
                      placeholder="Search films, states, languages..."
                      className="w-full bg-background/50 text-foreground placeholder:text-muted-foreground px-4 py-2 rounded-lg border border-border/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      autoFocus
                    />
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">Assamese</Badge>
                      <Badge variant="secondary" className="text-xs">Manipuri</Badge>
                      <Badge variant="secondary" className="text-xs">Folk Tales</Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* My Library */}
            <Button variant="outline" size="sm" className="hidden sm:flex border-golden/30 text-golden hover:bg-golden/10">
              <BookOpen className="w-4 h-4 mr-2" />
              My Library
            </Button>

            {/* Profile */}
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-golden">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;