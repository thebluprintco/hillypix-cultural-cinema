import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, Ticket, Award, Music2, Film, Users, Sparkles } from 'lucide-react';
import theatreHero from '@/assets/theatre-hero.jpg';
import EventRegistrationDialog from '@/components/EventRegistrationDialog';
import LiveStreamPlayer from '@/components/LiveStreamPlayer';
const HillywoodFiesta = () => {
  const [registrationOpen, setRegistrationOpen] = useState(false);
  // Toggle this to true when the event is live
  const [isEventLive, setIsEventLive] = useState(false);
  // Update this with your actual stream URL (YouTube, Vimeo, etc.)
  const streamUrl = '';
  
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section with Live Stream */}
        <section className="relative py-12 md:py-20 bg-gradient-to-b from-background via-card-accent/20 to-background">
          <div className="container mx-auto px-6">
            {/* Title */}
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-golden/20 text-golden px-4 py-2 text-sm">
                🎬 LIVE RED CARPET EVENT
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bebas mb-4 text-primary">
                Hillywood Red Carpet Event
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Watch the prestigious celebration of North East India's finest talents in Arts, Film, Fashion and Music
              </p>
            </div>

            {/* Live Stream Player */}
            <LiveStreamPlayer 
              streamUrl={streamUrl}
              isLive={isEventLive}
              eventDate="2025-12-15T18:00:00"
              viewerCount={isEventLive ? 1247 : 0}
            />
          </div>
        </section>

        {/* About Hillywood Fiesta */}
        <section className="py-20 px-6 bg-card-accent/20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="w-full">
                <img src={theatreHero} alt="Hillywood Fiesta" className="rounded-lg shadow-2xl w-full h-auto object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-anton mb-6 text-foreground">
                  Hillywood Fiesta
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-merriweather mb-6">
                  Hillywood Fiesta is a Hillywood annual red-carpet event to ignite the perennially inherent wealth of talents amongst the people of North East India in the industry of Arts, Film, Fashion and Music. The Hillywood Fiesta gala indulges in ecstasy with voices echoing from the hills and mountains of North-East India to blend with the richly blessed exotic colours of North East India Culture and Tradition.
                </p>
                <p className="text-xl md:text-2xl font-semibold text-foreground italic font-merriweather">"This isn't just a festival, it is revolution in motion."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Hillywood Fiesta Awards */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-anton mb-12 text-center text-foreground">
              Hillywood Fiesta Awards
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-stretch">
              <div className="flex flex-col">
                <div className="bg-card-accent border border-golden/20 rounded-lg p-6 md:p-8 h-full">
                  <h3 className="text-xl md:text-2xl font-spartan font-bold text-golden mb-6">TITLES</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">1. BEST PERSONALITY IN ARTS, MUSIC, FILM AND FASHION:</h4>
                      <p className="text-sm md:text-base text-muted-foreground">#Tower of Glory- North East India</p>
                    </div>

                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">2. THE TITLE OF THE MOST BEAUTY & HANDSOME:</h4>
                      <p className="text-sm md:text-base text-muted-foreground">#Queen of Patriarchs- North East India</p>
                      <p className="text-sm md:text-base text-muted-foreground">#Master Renowned- North East India</p>
                    </div>

                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">3. THE TITLE OF BEST ACTOR AND ACTRESS:</h4>
                      <p className="text-sm md:text-base text-muted-foreground">#Master Admirable- North East India</p>
                      <p className="text-sm md:text-base text-muted-foreground">#Miss Admirable- North East India</p>
                    </div>

                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">4. THE TITLE OF BEST MUSIC:</h4>
                      <p className="text-sm md:text-base text-muted-foreground">#Mystical Voice-Male</p>
                      <p className="text-sm md:text-base text-muted-foreground">#Mystical Voice- Female</p>
                    </div>

                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">5. THE TITLE OF BEST FASHION AND DESIGNING:</h4>
                      <p className="text-sm md:text-base text-muted-foreground">BEST DESIGNER TITLE:</p>
                      <p className="text-sm md:text-base text-muted-foreground">#Eastern Star- North East India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-stretch">
                <div className="relative w-full">
                  <img src={theatreHero} alt="Hillywood Fiesta Awards" className="rounded-lg shadow-2xl w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent rounded-lg flex items-end justify-center pb-8">
                    <div className="text-center">
                      <Award className="w-12 h-12 md:w-16 md:h-16 text-golden mx-auto mb-4" />
                      <h3 className="text-2xl md:text-3xl font-bebas text-golden">HILLYWOOD</h3>
                      <p className="text-lg md:text-xl text-foreground font-spartan">FIESTA AWARDS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-primary">
          <div className="container mx-auto text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-anton mb-6 text-primary-foreground">
              Be Part of the Red Carpet Experience
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto font-merriweather">
              Join us at the annual Hillywood Fiesta red carpet event celebrating the talents of North East India in Arts, Film, Fashion and Music.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-transparent" onClick={() => setRegistrationOpen(true)}>
                <Ticket className="w-5 h-5 mr-2" />
                Register for Event
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-transparent">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      <EventRegistrationDialog open={registrationOpen} onOpenChange={setRegistrationOpen} />
    </div>;
};
export default HillywoodFiesta;