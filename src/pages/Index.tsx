import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import NowPremiering from '@/components/NowPremiering';
import CulturalLibrary from '@/components/CulturalLibrary';

const Index = () => {
  useEffect(() => {
    // Set page title and meta description for SEO
    document.title = 'HillyPix - Northeast India\'s Cultural Cinema Theatre | HillyWood Movement';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Experience HillyPix - the premier online cultural theatre showcasing films from all eight states of Northeast India. Buy tickets for premieres, explore our cultural library, and join the HillyWood movement celebrating authentic stories and traditions.');
    }

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "HillyPix",
      "alternateName": "HillyWood",
      "description": "Northeast India's premier cultural cinema theatre platform",
      "url": "https://hillypix.com",
      "logo": "https://hillypix.com/logo.png",
      "sameAs": [
        "https://twitter.com/hillypix",
        "https://facebook.com/hillypix"
      ],
      "areaServed": [
        "Assam", "Manipur", "Nagaland", "Meghalaya", 
        "Tripura", "Arunachal Pradesh", "Mizoram", "Sikkim"
      ],
      "knowsAbout": [
        "Northeast Indian Cinema",
        "Cultural Films",
        "Traditional Stories",
        "Regional Languages"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Section - Theatre Entrance */}
        <Hero />
        
        {/* Now Premiering - Current Releases */}
        <NowPremiering />
        
        {/* Cultural Library - Film Collection */}
        <CulturalLibrary />
      </main>

      {/* Footer */}
      <footer className="bg-card-accent/50 border-t border-border/20 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-2xl font-bebas bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent mb-4">
                HillyPix
              </h3>
              <p className="text-sm text-muted-foreground mb-4 font-merriweather">
                Celebrating Northeast India's cultural cinema through the HillyWood movement.
              </p>
              <p className="text-xs text-muted-foreground">
                © 2024 HillyPix. Preserving culture through cinema.
              </p>
            </div>

            {/* States */}
            <div>
              <h4 className="font-spartan font-semibold text-foreground mb-4">Eight States</h4>
              <nav className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Assam</a>
                <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Manipur</a>
                <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Nagaland</a>
                <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Meghalaya</a>
              </nav>
            </div>

            {/* Platform */}
            <div>
              <h4 className="font-spartan font-semibold text-foreground mb-4">Platform</h4>
              <nav className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Premieres</a>
                <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Library</a>
                <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Hall of Fame</a>
                <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">About</a>
              </nav>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-spartan font-semibold text-foreground mb-4">Support</h4>
              <nav className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Help Center</a>
                <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Community</a>
                <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Contact</a>
                <a href="#" className="block text-muted-foreground hover:text-golden theatre-transition">Press Kit</a>
              </nav>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border/20 text-center">
            <p className="text-sm text-muted-foreground">
              Built with ❤️ for Northeast India's cultural heritage
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
