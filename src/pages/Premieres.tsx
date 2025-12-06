import { useState } from 'react';
import Header from '@/components/Header';
import NowPremiering from '@/components/NowPremiering';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Star, Bell, Info, Film } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { requestNotificationPermission, scheduleReminder } from '@/utils/notifications';
import MovieDetailsDialog from '@/components/MovieDetailsDialog';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Movie } from '@/hooks/useMovies';

// Demo upcoming movies data
const upcomingMovies: Movie[] = [
  {
    id: 'upcoming-1',
    title: "Legends of Arunachal",
    release_date: "2024-12-15T19:00:00",
    state: "Arunachal Pradesh",
    language: "Nyishi",
    poster_url: null,
    price: 299,
    duration_minutes: 125,
    genre: ['Adventure', 'Drama'],
    rating: '4.6',
    description: "An epic adventure through the mystical landscapes of Arunachal Pradesh, exploring ancient legends and traditions of the Nyishi people.",
    status: 'coming_soon',
    created_at: '',
    updated_at: '',
    trailer_url: null,
    premiere_start_at: null,
    premiere_end_at: null,
  },
  {
    id: 'upcoming-2',
    title: "Songs of Tripura",
    release_date: "2024-12-22T20:00:00",
    state: "Tripura",
    language: "Kokborok",
    poster_url: null,
    price: 279,
    duration_minutes: 110,
    genre: ['Musical', 'Drama'],
    rating: '4.8',
    description: "A musical journey celebrating the rich folk traditions of Tripura, featuring traditional Kokborok songs and dance.",
    status: 'coming_soon',
    created_at: '',
    updated_at: '',
    trailer_url: null,
    premiere_start_at: null,
    premiere_end_at: null,
  },
  {
    id: 'upcoming-3',
    title: "Bamboo Dreams",
    release_date: "2024-12-29T19:30:00",
    state: "Mizoram",
    language: "Mizo",
    poster_url: null,
    price: 249,
    duration_minutes: 98,
    genre: ['Drama', 'Romance'],
    rating: '4.5',
    description: "A heartwarming tale of love and resilience set against the backdrop of Mizoram's lush bamboo forests.",
    status: 'coming_soon',
    created_at: '',
    updated_at: '',
    trailer_url: null,
    premiere_start_at: null,
    premiere_end_at: null,
  }
];

const formatDuration = (minutes: number | null): string => {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const getCountdown = (date: string | null): string => {
  if (!date) return '';
  const target = new Date(date);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'Available Now';
  if (days === 1) return '1 day';
  return `${days} days`;
};

const Premieres = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleSetReminder = async (movie: Movie) => {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      toast({
        title: "Notification Permission Denied",
        description: "Please enable notifications in your browser settings to receive reminders.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const reminderDate = movie.release_date || new Date().toISOString();
      scheduleReminder(movie.title, reminderDate);
      toast({
        title: "Reminder Set!",
        description: `You'll receive a notification 1 hour before ${movie.title} premieres.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to set reminder. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLearnMore = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card-accent/20">
      <Header />
      
      <main className="pt-24">
        {/* Now Premiering Section */}
        <NowPremiering />

        {/* Upcoming Premieres */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-golden/20 text-golden px-4 py-2">
                👀 COMING SOON
              </Badge>
              <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-6`}>
                <span className="bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
                  Upcoming Releases
                </span>
              </h2>
              {!isMobile && (
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Be the first to know when these films become available. Set reminders now!
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingMovies.map((movie) => (
                <Card key={movie.id} className="group bg-card-accent/30 border-border/20 hover:border-golden/30 theatre-transition overflow-hidden">
                  <CardContent className="p-0">
                    {/* Poster Placeholder */}
                    <div className="relative h-48 bg-gradient-to-br from-primary/20 to-golden/20 flex items-center justify-center">
                      <Film className="w-16 h-16 text-muted-foreground/50" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-golden text-black font-semibold text-xs">
                          {movie.state}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {getCountdown(movie.release_date)}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-golden theatre-transition">
                            {movie.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {movie.language} • {movie.genre?.join(', ')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-golden fill-golden" />
                          <span className="text-xs font-semibold text-golden">{movie.rating}</span>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-golden" />
                          {movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          }) : 'TBA'}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-golden" />
                          {formatDuration(movie.duration_minutes)}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-golden" />
                          {movie.state}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 theatre-gradient text-white hover:scale-105 theatre-transition" 
                          onClick={() => handleSetReminder(movie)}
                        >
                          <Bell className="w-3 h-3 mr-2" />
                          Set Reminder
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-golden/50 text-golden hover:bg-golden/10" 
                          onClick={() => handleLearnMore(movie)}
                        >
                          <Info className="w-3 h-3 mr-2" />
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Movie Details Dialog */}
        <MovieDetailsDialog 
          open={isDetailsDialogOpen} 
          onOpenChange={setIsDetailsDialogOpen}
          movie={selectedMovie}
          onSetReminder={() => {
            if (selectedMovie) {
              handleSetReminder(selectedMovie);
            }
          }}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Premieres;