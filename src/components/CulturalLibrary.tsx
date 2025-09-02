import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, BookOpen, Filter, Star } from 'lucide-react';
import moviePoster1 from '@/assets/movie-poster-1.jpg';
import moviePoster2 from '@/assets/movie-poster-2.jpg';
import moviePoster3 from '@/assets/movie-poster-3.jpg';

const states = [
  { id: 'all', name: 'All States', count: 127 },
  { id: 'assam', name: 'Assam', count: 34, color: 'text-green-400' },
  { id: 'manipur', name: 'Manipur', count: 18, color: 'text-blue-400' },
  { id: 'nagaland', name: 'Nagaland', count: 15, color: 'text-red-400' },
  { id: 'meghalaya', name: 'Meghalaya', count: 12, color: 'text-purple-400' },
  { id: 'tripura', name: 'Tripura', count: 16, color: 'text-yellow-400' },
  { id: 'arunachal', name: 'Arunachal Pradesh', count: 14, color: 'text-orange-400' },
  { id: 'mizoram', name: 'Mizoram', count: 10, color: 'text-pink-400' },
  { id: 'sikkim', name: 'Sikkim', count: 8, color: 'text-cyan-400' }
];

const categories = [
  { id: 'traditional', name: 'Traditional', icon: '🏛️' },
  { id: 'modern', name: 'Modern', icon: '🎬' },
  { id: 'documentary', name: 'Documentary', icon: '📽️' },
  { id: 'folk', name: 'Folk Tales', icon: '📚' }
];

const movies = [
  {
    id: 1,
    title: 'Bihu Dreams',
    state: 'assam',
    category: 'traditional',
    poster: moviePoster1,
    rating: 4.8,
    year: 2023,
    language: 'Assamese',
    duration: '2h 15m',
    owned: true
  },
  {
    id: 2,
    title: 'Raas Chronicles',
    state: 'manipur',
    category: 'traditional',
    poster: moviePoster2,
    rating: 4.9,
    year: 2023,
    language: 'Manipuri',
    duration: '2h 05m',
    owned: false
  },
  {
    id: 3,
    title: 'Warriors of the Hills',
    state: 'nagaland',
    category: 'traditional',
    poster: moviePoster3,
    rating: 4.7,
    year: 2023,
    language: 'Ao Naga',
    duration: '1h 58m',
    owned: true
  },
  // Duplicate for demo purposes
  {
    id: 4,
    title: 'Modern Guwahati',
    state: 'assam',
    category: 'modern',
    poster: moviePoster1,
    rating: 4.5,
    year: 2024,
    language: 'Assamese',
    duration: '2h 10m',
    owned: false
  },
  {
    id: 5,
    title: 'Dance Revolution',
    state: 'manipur',
    category: 'modern',
    poster: moviePoster2,
    rating: 4.6,
    year: 2024,
    language: 'Manipuri',
    duration: '1h 55m',
    owned: true
  },
  {
    id: 6,
    title: 'Tribal Legends',
    state: 'nagaland',
    category: 'folk',
    poster: moviePoster3,
    rating: 4.8,
    year: 2023,
    language: 'Ao Naga',
    duration: '2h 20m',
    owned: false
  }
];

const CulturalLibrary = () => {
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('traditional');

  const filteredMovies = movies.filter(movie => 
    (selectedState === 'all' || movie.state === selectedState) &&
    movie.category === selectedCategory
  );

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-card-accent/20">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-golden/20 text-golden px-4 py-2">
            📚 CULTURAL LIBRARY
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-light to-golden bg-clip-text text-transparent">
              Eight States,
            </span>
            <br />
            Countless Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our vast collection of films from all eight states of Northeast India, 
            each preserving unique cultural heritage and storytelling traditions.
          </p>
        </div>

        {/* State Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Filter className="w-5 h-5 mr-2 text-golden" />
              Filter by State
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {states.map((state) => (
              <Button
                key={state.id}
                variant={selectedState === state.id ? "default" : "outline"}
                onClick={() => setSelectedState(state.id)}
                className={`
                  ${selectedState === state.id 
                    ? 'theatre-gradient text-white' 
                    : 'border-border/30 hover:border-golden/30'
                  } theatre-transition
                `}
              >
                <span className={selectedState !== state.id ? state.color : ''}>{state.name}</span>
                <Badge 
                  variant="secondary" 
                  className="ml-2 text-xs"
                >
                  {state.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-card-accent/50">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMovies.map((movie) => (
                  <Card 
                    key={movie.id}
                    className="group bg-card-accent/30 border-border/20 hover:border-golden/30 theatre-transition overflow-hidden ticket-hover"
                  >
                    <CardContent className="p-0">
                      {/* Movie Poster */}
                      <div className="relative overflow-hidden">
                        <img 
                          src={movie.poster} 
                          alt={movie.title}
                          className="w-full h-64 object-cover group-hover:scale-105 theatre-transition"
                        />
                        
                        {/* Overlay Info */}
                        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                          {movie.owned && (
                            <Badge className="bg-golden text-black text-xs font-semibold">
                              <BookOpen className="w-3 h-3 mr-1" />
                              Owned
                            </Badge>
                          )}
                          <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                            <Star className="w-3 h-3 text-golden fill-current" />
                            <span className="text-xs text-white font-medium">{movie.rating}</span>
                          </div>
                        </div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 theatre-transition flex items-center justify-center">
                          <Button 
                            size="lg" 
                            className={movie.owned ? 'bg-golden hover:bg-golden-dark text-black' : 'theatre-gradient text-white'}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            {movie.owned ? 'Watch Now' : 'Buy Ticket'}
                          </Button>
                        </div>
                      </div>

                      {/* Movie Details */}
                      <div className="p-4">
                        <h3 className="font-bold text-foreground mb-1 line-clamp-1">{movie.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {movie.language} • {movie.year} • {movie.duration}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {states.find(s => s.id === movie.state)?.name}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-golden/50 text-golden hover:bg-golden/10 px-8 py-3"
          >
            Load More Films
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CulturalLibrary;