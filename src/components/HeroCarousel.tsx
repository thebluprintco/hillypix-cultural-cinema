import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Ticket, TrendingUp, Film, Tv, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import theatreHero from '@/assets/theatre-hero.jpg';
import moviePoster1 from '@/assets/movie-poster-1.jpg';
import moviePoster2 from '@/assets/movie-poster-2.jpg';
import moviePoster3 from '@/assets/movie-poster-3.jpg';

interface Slide {
  id: string;
  type: 'welcome' | 'new-releases' | 'popular' | 'trending';
  title: string;
  subtitle?: string;
  description?: string;
  background: string;
  badge: string;
  badgeIcon: React.ReactNode;
  primaryAction: {
    label: string;
    href: string;
    icon: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    href: string;
    icon: React.ReactNode;
  };
}

const slides: Slide[] = [
  {
    id: 'welcome',
    type: 'welcome',
    title: 'Welcome to HillyPix',
    subtitle: 'From Northeast for Northeast India',
    description: 'Step into the grand cultural theatre of Hillywood. Roots in soil, eyes on stars.',
    background: theatreHero,
    badge: 'NORTHEAST INDIA\'S CINEMA',
    badgeIcon: <span>🎭</span>,
    primaryAction: {
      label: 'Browse Premieres',
      href: '/premieres',
      icon: <Ticket className="w-5 h-5 mr-2" />,
    },
    secondaryAction: {
      label: 'Explore Library',
      href: '/library',
      icon: <Play className="w-5 h-5 mr-2" />,
    },
  },
  {
    id: 'new-releases',
    type: 'new-releases',
    title: 'New Releases',
    subtitle: 'Fresh from Hillywood',
    description: 'Discover the latest films celebrating the diverse cultures and stories of Northeast India.',
    background: moviePoster1,
    badge: 'JUST ADDED',
    badgeIcon: <Film className="w-4 h-4 mr-1" />,
    primaryAction: {
      label: 'Watch Now',
      href: '/premieres',
      icon: <Play className="w-5 h-5 mr-2" />,
    },
  },
  {
    id: 'popular',
    type: 'popular',
    title: 'Popular Movies',
    subtitle: 'Audience Favorites',
    description: 'The most-watched films that audiences love. Join the community of cultural cinema enthusiasts.',
    background: moviePoster2,
    badge: 'TOP RATED',
    badgeIcon: <TrendingUp className="w-4 h-4 mr-1" />,
    primaryAction: {
      label: 'View Popular',
      href: '/library',
      icon: <TrendingUp className="w-5 h-5 mr-2" />,
    },
  },
  {
    id: 'trending',
    type: 'trending',
    title: 'Trending TV Serials',
    subtitle: 'Binge-Worthy Stories',
    description: 'Multi-episode journeys through the heart of Northeast Indian culture and traditions.',
    background: moviePoster3,
    badge: 'TRENDING NOW',
    badgeIcon: <Tv className="w-4 h-4 mr-1" />,
    primaryAction: {
      label: 'Watch Series',
      href: '/tv-series',
      icon: <Tv className="w-5 h-5 mr-2" />,
    },
  },
];

const SLIDE_DURATION = 5000; // 5 seconds per slide (2s for welcome was too short)
const WELCOME_DURATION = 3000; // 3 seconds for welcome slide

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useIsMobile();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const duration = currentSlide === 0 ? WELCOME_DURATION : SLIDE_DURATION;
    const timer = setTimeout(nextSlide, duration);

    return () => clearTimeout(timer);
  }, [currentSlide, isPaused, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images */}
      {slides.map((s, index) => (
        <div 
          key={s.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={s.background} 
            alt={s.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80"></div>
          <div className="absolute inset-0 cultural-pattern opacity-20"></div>
        </div>
      ))}

      {/* Spotlight Effect */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 spotlight-glow animate-pulse pointer-events-none opacity-40"></div>

      {/* Navigation Arrows */}
      {!isMobile && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 z-20 p-2 rounded-full bg-background/30 backdrop-blur-sm border border-border/20 text-foreground hover:bg-background/50 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 z-20 p-2 rounded-full bg-background/30 backdrop-blur-sm border border-border/20 text-foreground hover:bg-background/50 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in" key={slide.id}>
        {/* Badge */}
        <Badge className="mb-6 theatre-gradient text-white px-6 py-2 text-sm font-medium tracking-wider inline-flex items-center">
          {slide.badgeIcon}
          <span className="ml-1">{isMobile && slide.badge.length > 15 ? slide.badge.split(' ')[0] : slide.badge}</span>
        </Badge>

        {/* Title */}
        <h1 className={`${isMobile ? 'text-4xl' : 'text-5xl md:text-7xl'} font-bold mb-4 leading-tight`}>
          <span className="bg-gradient-to-r from-golden via-primary-light to-golden bg-clip-text text-transparent">
            {slide.title}
          </span>
        </h1>

        {/* Subtitle */}
        {slide.subtitle && (
          <p className={`${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'} font-bold text-golden mb-4`}>
            {slide.subtitle}
          </p>
        )}

        {/* Description */}
        {slide.description && !isMobile && (
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {slide.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button 
            size={isMobile ? "default" : "lg"} 
            asChild 
            className="theatre-gradient text-white px-8 py-4 text-lg font-semibold hover:scale-105 theatre-transition premiere-glow w-full sm:w-auto"
          >
            <Link to={slide.primaryAction.href}>
              {slide.primaryAction.icon}
              {slide.primaryAction.label}
            </Link>
          </Button>
          
          {slide.secondaryAction && (
            <Button 
              variant="outline" 
              size={isMobile ? "default" : "lg"} 
              asChild 
              className="border-golden/50 text-golden hover:bg-golden/10 px-8 py-4 text-lg font-semibold hover:scale-105 theatre-transition w-full sm:w-auto"
            >
              <Link to={slide.secondaryAction.href}>
                {slide.secondaryAction.icon}
                {slide.secondaryAction.label}
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-golden' 
                : 'w-2 bg-foreground/30 hover:bg-foreground/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-background/30 z-20">
        <div 
          className="h-full bg-golden transition-all"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
            transition: isPaused ? 'none' : 'width 0.3s ease-out',
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </section>
  );
};

export default HeroCarousel;
