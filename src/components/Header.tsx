import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, User, Ticket, Film, Award, Home, Tv, Music, PartyPopper, BookOpen } from 'lucide-react';
import AuthDialog from './AuthDialog';
import UserProfileDialog from './UserProfileDialog';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('hillypix-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('hillypix-user', JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('hillypix-user');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 theatre-transition">
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
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" asChild className={`text-foreground hover:text-golden theatre-transition ${location.pathname === '/' ? 'text-golden' : ''}`}>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" asChild className={`text-foreground hover:text-golden theatre-transition ${location.pathname === '/premieres' ? 'text-golden' : ''}`}>
              <Link to="/premieres">
                <Film className="w-4 h-4 mr-2" />
                Movies
              </Link>
            </Button>
            <Button variant="ghost" asChild className={`text-foreground hover:text-golden theatre-transition ${location.pathname === '/tv-series' ? 'text-golden' : ''}`}>
              <Link to="/tv-series">
                <Tv className="w-4 h-4 mr-2" />
                TV Series
              </Link>
            </Button>
            <Button variant="ghost" asChild className={`text-foreground hover:text-golden theatre-transition ${location.pathname === '/music' ? 'text-golden' : ''}`}>
              <Link to="/music">
                <Music className="w-4 h-4 mr-2" />
                Music
              </Link>
            </Button>
            <Button variant="ghost" asChild className={`text-foreground hover:text-golden theatre-transition ${location.pathname === '/hall-of-fame' ? 'text-golden' : ''}`}>
              <Link to="/hall-of-fame">
                <Award className="w-4 h-4 mr-2" />
                Hall of Fame
              </Link>
            </Button>
            <Button variant="ghost" asChild className={`text-foreground hover:text-golden theatre-transition ${location.pathname === '/hillywood-fiesta' ? 'text-golden' : ''}`}>
              <Link to="/hillywood-fiesta">
                <PartyPopper className="w-4 h-4 mr-2" />
                Hillywood Fiesta
              </Link>
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

            {/* My Library / Auth */}
            {user ? (
              <Button variant="outline" size="sm" asChild className="hidden sm:flex border-golden/30 text-golden hover:bg-golden/10">
                <Link to="/my-library">
                  <BookOpen className="w-4 h-4 mr-2" />
                  My Library ({user.purchasedMovies})
                </Link>
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsAuthDialogOpen(true)}
                className="hidden sm:flex border-golden/30 text-golden hover:bg-golden/10"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}

            {/* Profile */}
            {user ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsProfileDialogOpen(true)}
                className="text-muted-foreground hover:text-golden"
              >
                <div className="w-8 h-8 rounded-full bg-golden/20 flex items-center justify-center">
                  <span className="text-xs font-semibold text-golden">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsAuthDialogOpen(true)}
                className="text-muted-foreground hover:text-golden md:hidden"
              >
                <User className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Auth Dialog */}
        <AuthDialog 
          open={isAuthDialogOpen}
          onOpenChange={setIsAuthDialogOpen}
          onAuthSuccess={handleAuthSuccess}
        />

        {/* Profile Dialog */}
        {user && (
          <UserProfileDialog 
            open={isProfileDialogOpen}
            onOpenChange={setIsProfileDialogOpen}
            user={user}
            onSignOut={handleSignOut}
          />
        )}
      </div>
    </header>
  );
};

export default Header;