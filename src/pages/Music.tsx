import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Plus, Star, ChevronLeft, ChevronRight, Music2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

// Mock data for music
const featuredMusic = [
  {
    id: 1,
    title: "Kiman Bhi Bhal",
    artist: "Various Artists",
    year: "2022",
    genre: "Classical",
    language: "Nagamese",
    rating: 4.7,
    poster: "/src/assets/movie-poster-1.jpg",
    backdrop: "/src/assets/theatre-hero.jpg"
  },
  {
    id: 2,
    title: "Chamdan La Tho",
    artist: "Gospel Choir",
    year: "2024",
    genre: "Gospel",
    language: "Rongmei",
    rating: 4.9,
    poster: "/src/assets/movie-poster-2.jpg",
    backdrop: "/src/assets/theatre-hero.jpg"
  },
  {
    id: 3,
    title: "Hills Echo",
    artist: "Northeast Ensemble",
    year: "2023",
    genre: "Folk",
    language: "Khasi",
    rating: 4.8,
    poster: "/src/assets/movie-poster-3.jpg",
    backdrop: "/src/assets/theatre-hero.jpg"
  }
];

const recentlyAdded = [
  {
    id: 1,
    title: "Kiman Bhi Bhal",
    artist: "Various Artists",
    genre: "Classical",
    rating: 4.7,
    poster: "/src/assets/movie-poster-1.jpg",
    newRelease: true
  },
  {
    id: 2,
    title: "Chamdan La Tho",
    artist: "Gospel Choir",
    genre: "Gospel",
    rating: 4.9,
    poster: "/src/assets/movie-poster-2.jpg",
    newRelease: true
  },
  {
    id: 3,
    title: "Better Man",
    artist: "Jazz Quartet",
    genre: "Jazz",
    rating: 4.5,
    poster: "/src/assets/movie-poster-3.jpg",
    newRelease: false
  },
  {
    id: 4,
    title: "Tuna",
    artist: "Pop Artist",
    genre: "Pop",
    rating: 4.6,
    poster: "/src/assets/movie-poster-4.jpg",
    newRelease: true
  },
  {
    id: 5,
    title: "Mountain Songs",
    artist: "Folk Ensemble",
    genre: "Folk",
    rating: 4.8,
    poster: "/src/assets/movie-poster-5.jpg",
    newRelease: false
  }
];

const Music = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featured = featuredMusic[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMusic.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredMusic.length) % featuredMusic.length);
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
              <div className="flex items-center gap-2 mb-4">
                <Music2 className="w-8 h-8 text-golden" />
                <span className="text-golden text-sm font-semibold tracking-wider">MUSIC</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground">
                {featured.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">By {featured.artist}</p>
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
                  PLAY NOW
                </Button>
                <Button size="lg" variant="outline" className="border-foreground/30 hover:bg-foreground/10">
                  <Plus className="w-5 h-5 mr-2" />
                  ADD TO PLAYLIST
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
            {featuredMusic.map((_, index) => (
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
              {recentlyAdded.map((music) => (
                <Card
                  key={music.id}
                  className="group relative overflow-hidden bg-card-accent border-none hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  {music.newRelease && (
                    <Badge className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground">
                      New Release
                    </Badge>
                  )}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={music.poster}
                      alt={music.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-12 h-12 text-golden" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{music.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{music.artist}</p>
                    <p className="text-xs text-muted-foreground">Genre: {music.genre}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Classical */}
        <section className="py-16 px-6 bg-card-accent/20">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Classical</h2>
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
              {recentlyAdded.slice(0, 5).map((music) => (
                <Card
                  key={music.id}
                  className="group relative overflow-hidden bg-card-accent border-none hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={music.poster}
                      alt={music.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-12 h-12 text-golden" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{music.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{music.artist}</p>
                    <p className="text-xs text-muted-foreground">Genre: {music.genre}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Gospel */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Gospel</h2>
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
              {recentlyAdded.slice(0, 5).map((music) => (
                <Card
                  key={music.id}
                  className="group relative overflow-hidden bg-card-accent border-none hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={music.poster}
                      alt={music.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-12 h-12 text-golden" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{music.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{music.artist}</p>
                    <p className="text-xs text-muted-foreground">Genre: {music.genre}</p>
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

export default Music;
