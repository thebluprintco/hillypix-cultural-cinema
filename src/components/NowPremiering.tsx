import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Ticket, Star, Play, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TicketPurchaseDialog from './TicketPurchaseDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import duipengThangTei from '@/assets/duipeng-thang-tei.jpg';
import cathyRongmei from '@/assets/cathy-rongmei.jpg';
import ngaanSantampu from '@/assets/ngaan-santampu.jpg';
const premieres = [{
  id: 1,
  title: 'Ngaan Santanpou',
  state: 'Manipur',
  language: 'Tangkhul',
  poster: ngaanSantampu,
  price: '₹299',
  premiereDate: '2025-02-15',
  duration: '1h 58m',
  genre: 'Romance',
  rating: 4.5,
  description: 'A heartwarming romance set in the hills of Manipur, celebrating traditional Tangkhul culture.',
  countdown: '2 days left'
}, {
  id: 2,
  title: 'Cathy',
  state: 'Manipur',
  language: 'Rongmei',
  poster: cathyRongmei,
  price: '₹349',
  premiereDate: '2025-02-20',
  duration: '2h 15m',
  genre: 'Romance',
  rating: 4.7,
  description: 'A modern love story intertwined with traditional values and cultural identity.',
  countdown: '7 days left'
}, {
  id: 3,
  title: 'Kiman Bhi Bhal',
  state: 'Nagaland',
  language: 'Nagamese',
  poster: ngaanSantampu,
  price: '₹279',
  premiereDate: '2025-02-25',
  duration: '1h 45m',
  genre: 'Classical',
  rating: 4.7,
  description: 'A classical drama showcasing the artistic traditions of Nagaland.',
  countdown: '12 days left'
}];
const NowPremiering = () => {
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const {
    toast
  } = useToast();
  const handleBuyTicket = (movie: any) => {
    setSelectedMovie(movie);
    setIsTicketDialogOpen(true);
  };
  const handleWatchTrailer = (movie: any) => {
    toast({
      title: "Trailer Coming Soon",
      description: `The trailer for ${movie.title} will be available shortly.`
    });
  };
  const handleViewAllPremieres = () => {
    navigate('/premieres');
  };
  return <section className={`${isMobile ? 'py-12' : 'py-20'} px-6`}>
      <div className="container mx-auto">
        {/* Section Header */}
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
              Get your digital tickets now for exclusive premieres celebrating the diverse cultures and stories of Northeast India.
            </p>
          )}
        </div>

        {/* Premieres Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 ${isMobile ? 'gap-4' : 'gap-8'} mb-12`}>
          {premieres.map(movie => <Card key={movie.id} className="group bg-card-accent/30 border-border/20 hover:border-golden/30 theatre-transition overflow-hidden ticket-hover premiere-spotlight">
              <CardContent className="p-0">
                {/* Movie Poster */}
                <div className="relative overflow-hidden">
                  <img src={movie.poster} alt={movie.title} className={`w-full ${isMobile ? 'h-60' : 'h-80'} object-cover group-hover:scale-105 theatre-transition`} />
                  
                  {/* Overlay Info */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <Badge className="bg-golden text-black font-semibold text-xs">
                      {movie.state}
                    </Badge>
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {isMobile ? movie.countdown.replace(' left', '') : movie.countdown}
                    </Badge>
                  </div>

                  {/* Premiere Date Badge */}
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-primary/90 backdrop-blur-sm text-white text-xs">
                      <Calendar className="w-3 h-3 mr-2" />
                      {new Date(movie.premiereDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                    </Badge>
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
                        {movie.language} • {movie.genre}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-golden fill-golden" />
                      <span className="text-xs font-semibold text-golden">{movie.rating}</span>
                    </div>
                  </div>

                  {!isMobile && (
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                      {movie.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-border/20">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {movie.duration}
                      </span>
                    </div>
                    <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-golden`}>{movie.price}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <Button onClick={() => handleBuyTicket(movie)} size={isMobile ? 'sm' : 'default'} className="flex-1 theatre-gradient text-white hover:scale-105 theatre-transition premiere-glow text-xs">
                      <Ticket className="w-3 h-3 mr-2" />
                      {isMobile ? 'Buy' : 'Buy Ticket'}
                    </Button>
                    <Button onClick={() => handleWatchTrailer(movie)} variant="outline" size="icon" className="border-golden/50 text-golden hover:bg-golden/10 hover:scale-105 theatre-transition">
                      <Play className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="border-golden/50 text-golden hover:bg-golden/10 px-8 py-3" onClick={handleViewAllPremieres}>
            View All Premieres
          </Button>
        </div>

        {/* Ticket Purchase Dialog */}
        {selectedMovie && <TicketPurchaseDialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen} movie={selectedMovie} />}
      </div>
    </section>;
};
export default NowPremiering;