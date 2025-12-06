import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, MapPin, Film, Calendar, Globe, Bell, Ticket, Play } from 'lucide-react';
import { Movie } from '@/hooks/useMovies';

interface MovieDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movie: Movie | null;
  onBuyTicket?: () => void;
  onSetReminder?: () => void;
}

const formatDuration = (minutes: number | null): string => {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const MovieDetailsDialog = ({ 
  open, 
  onOpenChange, 
  movie, 
  onBuyTicket, 
  onSetReminder 
}: MovieDetailsDialogProps) => {
  if (!movie) return null;

  const isComingSoon = movie.status === 'coming_soon';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-card border-border/40 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
            {movie.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Movie Poster & Basic Info */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="sm:w-1/3 flex-shrink-0">
              <img 
                src={movie.poster_url || '/placeholder.svg'} 
                alt={movie.title}
                className="w-full h-64 sm:h-80 object-cover rounded-lg"
              />
            </div>
            
            <div className="flex-1 space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-golden text-black">
                  {movie.state || 'Northeast India'}
                </Badge>
                {movie.genre?.map((g, i) => (
                  <Badge key={i} variant="secondary" className="bg-primary/20 text-primary-light">
                    {g}
                  </Badge>
                ))}
                {isComingSoon && (
                  <Badge className="bg-golden/20 text-golden">
                    Coming Soon
                  </Badge>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-golden fill-golden" />
                <span className="text-lg font-semibold text-golden">{movie.rating || 'N/A'}</span>
                <span className="text-muted-foreground">/ 5.0</span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-golden" />
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="text-foreground">{formatDuration(movie.duration_minutes)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-golden" />
                  <span className="text-muted-foreground">Language:</span>
                  <span className="text-foreground">{movie.language || 'Unknown'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-golden" />
                  <span className="text-muted-foreground">Region:</span>
                  <span className="text-foreground">{movie.state || 'Northeast'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-golden" />
                  <span className="text-muted-foreground">Genre:</span>
                  <span className="text-foreground">{movie.genre?.join(', ') || 'Drama'}</span>
                </div>

                {movie.release_date && (
                  <div className="flex items-center gap-2 col-span-2">
                    <Calendar className="w-4 h-4 text-golden" />
                    <span className="text-muted-foreground">Release Date:</span>
                    <span className="text-foreground">
                      {new Date(movie.release_date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                )}

                {movie.premiere_start_at && (
                  <div className="flex items-center gap-2 col-span-2">
                    <Calendar className="w-4 h-4 text-golden" />
                    <span className="text-muted-foreground">Premiere:</span>
                    <span className="text-foreground">
                      {new Date(movie.premiere_start_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              {!isComingSoon && (
                <div className="pt-2">
                  <span className="text-3xl font-bold text-golden">₹{movie.price}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">About this Film</h3>
            <p className="text-muted-foreground leading-relaxed">
              {movie.description || 
                `"${movie.title}" is a captivating film from ${movie.state || 'Northeast India'}, showcasing the rich cultural heritage and storytelling traditions of the region. This ${movie.language || 'regional'} language film brings to life authentic narratives that celebrate the diverse cultures of Northeast India.`}
            </p>
          </div>

          {/* Production Info */}
          <div className="space-y-3 bg-card-accent/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-foreground">Production Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Filmed in:</span>
                <span className="ml-2 text-foreground">{movie.state || 'Northeast India'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Language:</span>
                <span className="ml-2 text-foreground">{movie.language || 'Regional'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Category:</span>
                <span className="ml-2 text-foreground">{movie.genre?.[0] || 'Feature Film'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Origin:</span>
                <span className="ml-2 text-foreground">{movie.state}, India</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {isComingSoon ? (
              <Button 
                onClick={() => {
                  onSetReminder?.();
                  onOpenChange(false);
                }}
                className="flex-1 theatre-gradient text-white hover:scale-105 theatre-transition"
              >
                <Bell className="w-4 h-4 mr-2" />
                Set Reminder
              </Button>
            ) : (
              <Button 
                onClick={() => {
                  onBuyTicket?.();
                  onOpenChange(false);
                }}
                className="flex-1 theatre-gradient text-white hover:scale-105 theatre-transition premiere-glow"
              >
                <Ticket className="w-4 h-4 mr-2" />
                Buy Ticket - ₹{movie.price}
              </Button>
            )}
            <Button 
              variant="outline"
              className="border-golden/50 text-golden hover:bg-golden/10"
            >
              <Play className="w-4 h-4 mr-2" />
              Watch Trailer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailsDialog;
