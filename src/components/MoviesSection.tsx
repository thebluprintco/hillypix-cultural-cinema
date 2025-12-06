import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, Ticket, Star, Play, Calendar, Film, Eye, Bell, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TicketPurchaseDialog from './TicketPurchaseDialog';
import MovieDetailsDialog from './MovieDetailsDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMoviesByStatus, Movie } from '@/hooks/useMovies';
import { requestNotificationPermission, scheduleReminder } from '@/utils/notifications';

// Fallback images for demo
import duipengThangTei from '@/assets/duipeng-thang-tei.jpg';
import cathyRongmei from '@/assets/cathy-rongmei.jpg';
import ngaanSantampu from '@/assets/ngaan-santampu.jpg';

// Demo data for when database is empty
const demoPremieres = [
  {
    id: 'demo-1',
    title: 'Ngaan Santanpou',
    state: 'Manipur',
    language: 'Tangkhul',
    poster_url: ngaanSantampu,
    price: 299,
    premiere_start_at: '2025-02-15',
    premiere_end_at: '2025-02-22',
    duration_minutes: 118,
    genre: ['Romance'],
    rating: '4.5',
    description: 'A heartwarming romance set in the hills of Manipur.',
    status: 'premiere' as const,
    created_at: '',
    updated_at: '',
    trailer_url: null,
    release_date: null,
  },
  {
    id: 'demo-2',
    title: 'Cathy',
    state: 'Manipur',
    language: 'Rongmei',
    poster_url: cathyRongmei,
    price: 349,
    premiere_start_at: '2025-02-20',
    premiere_end_at: '2025-02-27',
    duration_minutes: 135,
    genre: ['Romance', 'Drama'],
    rating: '4.7',
    description: 'A modern love story intertwined with tradition.',
    status: 'premiere' as const,
    created_at: '',
    updated_at: '',
    trailer_url: null,
    release_date: null,
  },
];

const demoComingSoon = [
  {
    id: 'demo-3',
    title: 'Kiman Bhi Bhal',
    state: 'Nagaland',
    language: 'Nagamese',
    poster_url: ngaanSantampu,
    price: 279,
    release_date: '2025-03-15',
    duration_minutes: 105,
    genre: ['Drama'],
    rating: '4.7',
    description: 'A classical drama showcasing traditions of Nagaland.',
    status: 'coming_soon' as const,
    created_at: '',
    updated_at: '',
    trailer_url: null,
    premiere_start_at: null,
    premiere_end_at: null,
  },
];

const demoLibrary = [
  {
    id: 'demo-4',
    title: 'Duipeng Thang Tei',
    state: 'Manipur',
    language: 'Rongmei',
    poster_url: duipengThangTei,
    price: 199,
    duration_minutes: 480,
    genre: ['Horror', 'Thriller'],
    rating: '5.0',
    description: 'A chilling horror series that became a cult classic.',
    status: 'library' as const,
    created_at: '',
    updated_at: '',
    trailer_url: null,
    release_date: null,
    premiere_start_at: null,
    premiere_end_at: null,
  },
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
  if (days <= 0) return 'Now Showing';
  if (days === 1) return '1 day left';
  return `${days} days left`;
};

interface MovieCardProps {
  movie: Movie;
  type: 'premiere' | 'coming_soon' | 'library';
  onBuyTicket: (movie: Movie) => void;
  onLearnMore: (movie: Movie) => void;
  onSetReminder: (movie: Movie) => void;
  isMobile: boolean;
}

const MovieCard = ({ movie, type, onBuyTicket, onLearnMore, onSetReminder, isMobile }: MovieCardProps) => {
  const countdown = type === 'premiere' 
    ? getCountdown(movie.premiere_end_at) 
    : type === 'coming_soon' 
    ? getCountdown(movie.release_date)
    : null;

  return (
    <Card className="group bg-card-accent/30 border-border/20 hover:border-golden/30 theatre-transition overflow-hidden ticket-hover premiere-spotlight">
      <CardContent className="p-0">
        {/* Movie Poster */}
        <div className="relative overflow-hidden">
          <img 
            src={movie.poster_url || ngaanSantampu} 
            alt={movie.title} 
            className={`w-full ${isMobile ? 'h-60' : 'h-80'} object-cover group-hover:scale-105 theatre-transition`} 
          />
          
          {/* Overlay Info */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <Badge className="bg-golden text-black font-semibold text-xs">
              {movie.state || 'Northeast'}
            </Badge>
            {countdown && (
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {isMobile ? countdown.replace(' left', '').replace(' days', 'd') : countdown}
              </Badge>
            )}
          </div>

          {/* Status Badge */}
          <div className="absolute bottom-4 left-4">
            {type === 'premiere' && (
              <Badge className="bg-primary/90 backdrop-blur-sm text-white text-xs">
                <Calendar className="w-3 h-3 mr-2" />
                Premiere
              </Badge>
            )}
            {type === 'coming_soon' && (
              <Badge className="bg-golden/90 backdrop-blur-sm text-black text-xs">
                <Eye className="w-3 h-3 mr-2" />
                Coming Soon
              </Badge>
            )}
            {type === 'library' && (
              <Badge className="bg-background/80 backdrop-blur-sm text-foreground text-xs">
                <Film className="w-3 h-3 mr-2" />
                Available
              </Badge>
            )}
          </div>
        </div>

        {/* Movie Details */}
        <div className={isMobile ? 'p-4' : 'p-6'}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-foreground mb-1 group-hover:text-golden theatre-transition`}>
                {movie.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {movie.language} • {movie.genre?.join(', ') || 'Drama'}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-golden fill-golden" />
              <span className="text-xs font-semibold text-golden">{movie.rating || 'N/A'}</span>
            </div>
          </div>

          {!isMobile && movie.description && (
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
              {movie.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border/20">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {formatDuration(movie.duration_minutes)}
              </span>
            </div>
            {type !== 'coming_soon' && (
              <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-golden`}>
                ₹{movie.price}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            {type === 'coming_soon' ? (
              <>
                <Button 
                  onClick={() => onSetReminder(movie)} 
                  size={isMobile ? 'sm' : 'default'} 
                  className="flex-1 theatre-gradient text-white hover:scale-105 theatre-transition text-xs"
                >
                  <Bell className="w-3 h-3 mr-2" />
                  {isMobile ? 'Remind' : 'Set Reminder'}
                </Button>
                <Button 
                  onClick={() => onLearnMore(movie)} 
                  variant="outline" 
                  size={isMobile ? 'sm' : 'default'}
                  className="flex-1 border-golden/50 text-golden hover:bg-golden/10 text-xs"
                >
                  <Info className="w-3 h-3 mr-2" />
                  {isMobile ? 'Info' : 'Learn More'}
                </Button>
              </>
            ) : (
              <>
                <Button 
                  onClick={() => onBuyTicket(movie)} 
                  size={isMobile ? 'sm' : 'default'} 
                  className="flex-1 theatre-gradient text-white hover:scale-105 theatre-transition premiere-glow text-xs"
                >
                  <Ticket className="w-3 h-3 mr-2" />
                  {isMobile ? 'Buy' : 'Buy Ticket'}
                </Button>
                <Button 
                  onClick={() => onLearnMore(movie)} 
                  variant="outline" 
                  size={isMobile ? 'sm' : 'default'}
                  className="border-golden/50 text-golden hover:bg-golden/10 text-xs"
                >
                  <Info className="w-3 h-3 mr-2" />
                  {isMobile ? 'Info' : 'Learn More'}
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const LoadingSkeleton = ({ count = 3, isMobile }: { count?: number; isMobile: boolean }) => (
  <div className={`grid md:grid-cols-2 lg:grid-cols-3 ${isMobile ? 'gap-4' : 'gap-8'}`}>
    {Array.from({ length: count }).map((_, i) => (
      <Card key={i} className="bg-card-accent/30 border-border/20 overflow-hidden">
        <CardContent className="p-0">
          <Skeleton className={`w-full ${isMobile ? 'h-60' : 'h-80'}`} />
          <div className={isMobile ? 'p-4' : 'p-6'}>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const MoviesSection = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [detailsMovie, setDetailsMovie] = useState<Movie | null>(null);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const { data: moviesByStatus, isLoading } = useMoviesByStatus();

  // Use demo data if database is empty
  const premieres = moviesByStatus?.premieres?.length ? moviesByStatus.premieres : demoPremieres;
  const comingSoon = moviesByStatus?.comingSoon?.length ? moviesByStatus.comingSoon : demoComingSoon;
  const library = moviesByStatus?.library?.length ? moviesByStatus.library : demoLibrary;

  const hasPremieres = premieres.length > 0;
  const hasComingSoon = comingSoon.length > 0;
  const hasLibrary = library.length > 0;

  const handleBuyTicket = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsTicketDialogOpen(true);
  };

  const handleLearnMore = (movie: Movie) => {
    setDetailsMovie(movie);
    setIsDetailsDialogOpen(true);
  };

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

    const reminderDate = movie.release_date || movie.premiere_start_at || new Date().toISOString();
    scheduleReminder(movie.title, reminderDate);
    toast({
      title: "Reminder Set!",
      description: `We'll notify you when "${movie.title}" is available.`,
    });
  };

  const handleViewAllPremieres = () => {
    navigate('/premieres');
  };

  if (isLoading) {
    return (
      <section className={`${isMobile ? 'py-12' : 'py-20'} px-6`}>
        <div className="container mx-auto">
          <LoadingSkeleton isMobile={isMobile} />
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Premieres Section - Only show if there are active premieres */}
      {hasPremieres && (
        <section className={`${isMobile ? 'py-12' : 'py-20'} px-6`}>
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/20 text-primary-light px-4 py-2">
                🎬 NOW PREMIERING
              </Badge>
              {isMobile ? (
                <h2 className="text-3xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
                    This Week
                  </span>
                </h2>
              ) : (
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
                    This Week's
                  </span>
                  <br />
                  Premieres
                </h2>
              )}
              {!isMobile && (
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get your digital tickets now for exclusive premieres celebrating the diverse cultures of Northeast India.
                </p>
              )}
            </div>

            <div className={`grid md:grid-cols-2 lg:grid-cols-3 ${isMobile ? 'gap-4' : 'gap-8'} mb-12`}>
              {premieres.slice(0, 3).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie as Movie}
                  type="premiere"
                  onBuyTicket={handleBuyTicket}
                  onLearnMore={handleLearnMore}
                  onSetReminder={handleSetReminder}
                  isMobile={isMobile}
                />
              ))}
            </div>

            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-golden/50 text-golden hover:bg-golden/10 px-8 py-3" 
                onClick={handleViewAllPremieres}
              >
                View All Premieres
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Coming Soon Section - Show if no premieres or has coming soon content */}
      {(!hasPremieres || hasComingSoon) && hasComingSoon && (
        <section className={`${isMobile ? 'py-12' : 'py-20'} px-6 bg-gradient-to-b from-background to-card-accent/20`}>
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
                  Be the first to know when these films become available. Set notifications now!
                </p>
              )}
            </div>

            <div className={`grid md:grid-cols-2 lg:grid-cols-3 ${isMobile ? 'gap-4' : 'gap-8'}`}>
              {comingSoon.slice(0, 3).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie as Movie}
                  type="coming_soon"
                  onBuyTicket={handleBuyTicket}
                  onLearnMore={handleLearnMore}
                  onSetReminder={handleSetReminder}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Library Section */}
      {hasLibrary && (
        <section className={`${isMobile ? 'py-12' : 'py-20'} px-6`}>
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/20 text-primary-light px-4 py-2">
                📚 FULL LIBRARY
              </Badge>
              <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-6`}>
                <span className="bg-gradient-to-r from-primary-light to-golden bg-clip-text text-transparent">
                  Explore Our Collection
                </span>
              </h2>
              {!isMobile && (
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Browse our complete library of films from Northeast India.
                </p>
              )}
            </div>

            <div className={`grid md:grid-cols-2 lg:grid-cols-4 ${isMobile ? 'gap-4' : 'gap-6'}`}>
              {library.slice(0, 4).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie as Movie}
                  type="library"
                  onBuyTicket={handleBuyTicket}
                  onLearnMore={handleLearnMore}
                  onSetReminder={handleSetReminder}
                  isMobile={isMobile}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-golden/50 text-golden hover:bg-golden/10 px-8 py-3" 
                onClick={() => navigate('/library')}
              >
                View Full Library
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Ticket Purchase Dialog */}
      {selectedMovie && (
        <TicketPurchaseDialog 
          open={isTicketDialogOpen} 
          onOpenChange={setIsTicketDialogOpen} 
          movie={{
            id: selectedMovie.id,
            title: selectedMovie.title,
            poster: selectedMovie.poster_url || ngaanSantampu,
            rating: parseFloat(selectedMovie.rating || '0'),
            duration: formatDuration(selectedMovie.duration_minutes),
            language: selectedMovie.language || 'Unknown',
            state: selectedMovie.state || 'Northeast',
            price: selectedMovie.price,
          }} 
        />
      )}

      {/* Movie Details Dialog */}
      <MovieDetailsDialog 
        open={isDetailsDialogOpen} 
        onOpenChange={setIsDetailsDialogOpen}
        movie={detailsMovie}
        onBuyTicket={() => {
          if (detailsMovie) {
            handleBuyTicket(detailsMovie);
          }
        }}
        onSetReminder={() => {
          if (detailsMovie) {
            handleSetReminder(detailsMovie);
          }
        }}
      />
    </>
  );
};

export default MoviesSection;
