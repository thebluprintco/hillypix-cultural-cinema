import Header from '@/components/Header';
import CulturalLibrary from '@/components/CulturalLibrary';
import { Badge } from '@/components/ui/badge';

const Library = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card-accent/20">
      <Header />
      
      <main className="pt-24">
        {/* Page Header */}
        <section className="py-16 px-6 text-center">
          <div className="container mx-auto">
            <Badge className="mb-4 bg-golden/20 text-golden px-4 py-2">
              📚 CULTURAL LIBRARY
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-light to-golden bg-clip-text text-transparent">
                Explore Our
              </span>
              <br />
              Film Collection
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dive deep into our extensive collection of films from all eight states of Northeast India. 
              Filter by state, language, or genre to discover your next cultural journey.
            </p>
          </div>
        </section>

        {/* Cultural Library Component */}
        <CulturalLibrary />
      </main>
    </div>
  );
};

export default Library;