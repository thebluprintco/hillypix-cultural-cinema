import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Plus, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

// Mock data for TV series
const featuredSeries = [
  {
    id: 1,
    title: "Duipeng Thang Tei",
    year: "2021",
    genre: "Horror",
    language: "Rongmei",
    rating: 5.0,
    seasons: "1 Season",
    poster: "/src/assets/movie-poster-1.jpg",
    backdrop: "/src/assets/theatre-hero.jpg"
  },
  {
    id: 2,
    title: "Cultural Chronicles",
    year: "2024",
    genre: "Documentary",
    language: "Assamese",
    rating: 4.8,
    seasons: "2 Seasons",
    poster: "/src/assets/movie-poster-2.jpg",
    backdrop: "/src/assets/theatre-hero.jpg"
  },
  {
    id: 3,
    title: "Hills of Mystery",
    year: "2023",
    genre: "Thriller",
    language: "Manipuri",
    rating: 4.6,
    seasons: "3 Seasons",
    poster: "/src/assets/movie-poster-3.jpg",
    backdrop: "/src/assets/theatre-hero.jpg"
  }
];

const recentlyAdded = [
  {
    id: 1,
    title: "Duipeng Thang Tei",
    genre: "Horror",
    language: "Rongmei",
    rating: 5.0,
    year: "2021",
    seasons: "1 Season",
    poster: "/src/assets/movie-poster-1.jpg",
    newRelease: true
  },
  {
    id: 2,
    title: "Cultural Chronicles",
    genre: "Documentary",
    language: "Assamese",
    rating: 4.8,
    year: "2024",
    seasons: "2 Seasons",
    poster: "/src/assets/movie-poster-2.jpg",
    newRelease: true
  },
  {
    id: 3,
    title: "Hills of Mystery",
    genre: "Thriller",
    language: "Manipuri",
    rating: 4.6,
    year: "2023",
    seasons: "3 Seasons",
    poster: "/src/assets/movie-poster-3.jpg",
    newRelease: false
  },
  {
    id: 4,
    title: "Legends of the Valley",
    genre: "Drama",
    language: "Mizo",
    rating: 4.7,
    year: "2024",
    seasons: "1 Season",
    poster: "/src/assets/movie-poster-4.jpg",
    newRelease: true
  },
  {
    id: 5,
    title: "Northeast Tales",
    genre: "Fantasy",
    language: "Nagamese",
    rating: 4.5,
    year: "2023",
    seasons: "2 Seasons",
    poster: "/src/assets/movie-poster-5.jpg",
    newRelease: false
  }
];

const TVSeries = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featured = featuredSeries[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredSeries.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredSeries.length) % featuredSeries.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Carousel */}
        <section className="relative h-[70vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
            style={{
              backgroundImage: `url(${featured.backdrop})`,
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/80" />
          </div>

          <div className="relative container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground">
                {featured.title}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-muted-foreground">{featured.year}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-foreground">{featured.genre}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-foreground">{featured.language}</span>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-golden text-golden" />
                  <span className="text-foreground font-semibold">{featured.rating}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary-light">
                  <Play className="w-5 h-5 mr-2" />
                  DETAILS
                </Button>
                <Button size="lg" variant="outline" className="border-foreground/30 hover:bg-foreground/10">
                  <Plus className="w-5 h-5 mr-2" />
                  ADD TO WATCHLIST
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center hover:bg-background/70 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center hover:bg-background/70 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {featuredSeries.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-golden w-8' : 'bg-foreground/30'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Recently Added */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Recently Added</h2>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-card-accent flex items-center justify-center hover:bg-accent transition-colors">
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button className="w-10 h-10 rounded-full bg-card-accent flex items-center justify-center hover:bg-accent transition-colors">
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {recentlyAdded.map((series) => (
                <Card
                  key={series.id}
                  className="group relative overflow-hidden bg-card-accent border-none hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  {series.newRelease && (
                    <Badge className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground">
                      New Release
                    </Badge>
                  )}
                  <div className="aspect-[2/3] overflow-hidden">
                    <img
                      src={series.poster}
                      alt={series.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{series.title}</h3>
                    <p className="text-sm text-muted-foreground">Genre: {series.genre}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Romance Series */}
        <section className="py-16 px-6 bg-card-accent/20">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Romance</h2>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-card-accent flex items-center justify-center hover:bg-accent transition-colors">
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button className="w-10 h-10 rounded-full bg-card-accent flex items-center justify-center hover:bg-accent transition-colors">
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {recentlyAdded.slice(0, 5).map((series) => (
                <Card
                  key={series.id}
                  className="group relative overflow-hidden bg-card-accent border-none hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="aspect-[2/3] overflow-hidden">
                    <img
                      src={series.poster}
                      alt={series.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{series.title}</h3>
                    <p className="text-sm text-muted-foreground">Genre: {series.genre}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TVSeries;
