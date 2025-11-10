import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, User, Film, Award, Home, Tv, Music, PartyPopper, BookOpen, Info, Star } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import AuthDialog from './AuthDialog';
import UserProfileDialog from './UserProfileDialog';
import { searchableContent } from '@/data/searchData';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

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

  const filteredContent = searchableContent.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.language.toLowerCase().includes(query) ||
      item.genre.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query)
    );
  });

  const handleSelectItem = (route: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(route);
  };

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

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
              <h1 className="text-2xl font-bebas bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
                HillyPix
              </h1>
              <p className="text-xs text-muted-foreground tracking-wider font-spartan">HILLYWOOD</p>
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
                Series
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
            <Button variant="ghost" asChild className={`text-foreground hover:text-golden theatre-transition ${location.pathname === '/about' ? 'text-golden' : ''}`}>
              <Link to="/about">
                <Info className="w-4 h-4 mr-2" />
                About
              </Link>
            </Button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="text-muted-foreground hover:text-golden"
            >
              <Search className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline text-xs">Search</span>
              <kbd className="hidden lg:inline-flex ml-2 pointer-events-none h-5 select-none items-center gap-1 rounded border border-border/30 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>

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

        {/* Search Command Dialog */}
        <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <CommandInput 
            placeholder="Search movies, series, music, languages..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            
            {filteredContent.length > 0 && (
              <>
                {['movie', 'series', 'music'].map((type) => {
                  const items = filteredContent.filter((item) => item.type === type);
                  if (items.length === 0) return null;
                  
                  return (
                    <CommandGroup 
                      key={type} 
                      heading={type.charAt(0).toUpperCase() + type.slice(1) + 's'}
                    >
                      {items.map((item) => (
                        <CommandItem
                          key={item.id}
                          value={`${item.title}-${item.language}-${item.genre}`}
                          onSelect={() => handleSelectItem(item.route)}
                          className="flex items-center gap-3 py-3 cursor-pointer"
                        >
                          <img 
                            src={item.poster} 
                            alt={item.title}
                            className="w-12 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{item.title}</p>
                              <Badge variant="secondary" className="text-xs">
                                {item.language}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{item.genre}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{item.year}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="flex items-center gap-1 text-xs text-golden">
                                <Star className="w-3 h-3 fill-golden" />
                                {item.rating}
                              </span>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  );
                })}
              </>
            )}
          </CommandList>
        </CommandDialog>
      </div>
    </header>
  );
};

export default Header;