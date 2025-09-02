import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Ticket, Star, Play, Calendar } from 'lucide-react';
import moviePoster1 from '@/assets/movie-poster-1.jpg';
import moviePoster2 from '@/assets/movie-poster-2.jpg';
import moviePoster3 from '@/assets/movie-poster-3.jpg';

const premieres = [
  {
    id: 1,
    title: 'Bihu Dreams',
    state: 'Assam',
    language: 'Assamese',
    poster: moviePoster1,
    price: '₹299',
    premiereDate: '2024-01-15',
    duration: '2h 15m',
    genre: 'Cultural Drama',
    rating: 4.8,
    description: 'A heartwarming tale celebrating Assamese traditions during Bihu festival.',
    countdown: '2 days left'
  },
  {
    id: 2,
    title: 'Raas Chronicles',
    state: 'Manipur',
    language: 'Manipuri',
    poster: moviePoster2,
    price: '₹349',
    premiereDate: '2024-01-20',
    duration: '2h 05m',
    genre: 'Dance & Culture',
    rating: 4.9,
    description: 'An enchanting journey through traditional Manipuri dance and mythology.',
    countdown: '7 days left'
  },
  {
    id: 3,
    title: 'Warriors of the Hills',
    state: 'Nagaland',
    language: 'Ao Naga',
    poster: moviePoster3,
    price: '₹279',
    premiereDate: '2024-01-25',
    duration: '1h 58m',
    genre: 'Historical Drama',
    rating: 4.7,
    description: 'Epic tale of Naga warriors defending their ancestral lands.',
    countdown: '12 days left'
  }
];

const NowPremiering = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/20 text-primary-light px-4 py-2">
            🎬 NOW PREMIERING
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
              This Week's
            </span>
            <br />
            Cultural Premieres
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your tickets now for exclusive premieres celebrating the diverse cultures 
            and stories of Northeast India's eight states.
          </p>
        </div>

        {/* Premieres Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {premieres.map((movie) => (
            <Card 
              key={movie.id} 
              className="group bg-card-accent/30 border-border/20 hover:border-golden/30 theatre-transition overflow-hidden ticket-hover premiere-spotlight"
            >
              <CardContent className="p-0">
                {/* Movie Poster */}
                <div className="relative overflow-hidden">
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    className="w-full h-80 object-cover group-hover:scale-105 theatre-transition"
                  />
                  
                  {/* Overlay Info */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <Badge className="bg-golden text-black font-semibold">
                      {movie.state}
                    </Badge>
                    <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-golden fill-current" />
                      <span className="text-xs text-white font-medium">{movie.rating}</span>
                    </div>
                  </div>

                  {/* Countdown */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-primary/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{movie.countdown}</span>
                      </div>
                      <span className="text-lg font-bold">{movie.price}</span>
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 theatre-transition flex items-center justify-center">
                    <Button size="lg" className="bg-golden hover:bg-golden-dark text-black">
                      <Play className="w-5 h-5 mr-2" />
                      Watch Trailer
                    </Button>
                  </div>
                </div>

                {/* Movie Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{movie.title}</h3>
                      <p className="text-sm text-muted-foreground">{movie.language} • {movie.duration}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {movie.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {movie.genre}
                    </Badge>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(movie.premiereDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full mt-4 theatre-gradient text-white font-semibold hover:scale-105 theatre-transition"
                  >
                    <Ticket className="w-4 h-4 mr-2" />
                    Buy Premiere Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-golden/50 text-golden hover:bg-golden/10 px-8 py-3"
          >
            View All Premieres
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NowPremiering;