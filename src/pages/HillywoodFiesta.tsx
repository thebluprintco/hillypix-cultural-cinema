import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, Ticket, Award, Music2, Film, Users, Sparkles } from 'lucide-react';

const HillywoodFiesta = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[80vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(/src/assets/theatre-hero.jpg)`,
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
          </div>

          <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              <span className="bg-gradient-to-r from-golden via-primary-light to-golden bg-clip-text text-transparent">
                Hillywood Red Carpet Event
              </span>
            </h1>
          </div>
        </section>

        {/* About Hillywood Fiesta */}
        <section className="py-20 px-6 bg-card-accent/20">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="/src/assets/theatre-hero.jpg" 
                  alt="Hillywood Fiesta" 
                  className="rounded-lg shadow-2xl"
                />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                  Hillywood Fiesta
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Hillywood Fiesta is a Hillywood annual red-carpet event to ignite the perennially inherent wealth of talents amongst the people of North East India in the industry of Arts, Film, Fashion and Music. The Hillywood Fiesta gala indulges in ecstasy with voices echoing from the hills and mountains of North-East India to blend with the richly blessed exotic colours of North East India Culture and Tradition.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hillywood Fiesta Awards */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-foreground">
              Hillywood Fiesta Awards
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              <div className="space-y-8">
                <div className="bg-card-accent border border-golden/20 rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-golden mb-6">TITLES</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">1. BEST PERSONALITY IN ARTS, MUSIC, FILM AND FASHION:</h4>
                      <p className="text-muted-foreground">#Tower of Glory- North East India</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">2. THE TITLE OF THE MOST BEAUTY & HANDSOME:</h4>
                      <p className="text-muted-foreground">#Queen of Patriarchs- North East India</p>
                      <p className="text-muted-foreground">#Master Renowned- North East India</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">3. THE TITLE OF BEST ACTOR AND ACTRESS:</h4>
                      <p className="text-muted-foreground">#Master Admirable- North East India</p>
                      <p className="text-muted-foreground">#Miss Admirable- North East India</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">4. THE TITLE OF BEST MUSIC:</h4>
                      <p className="text-muted-foreground">#Mystical Voice-Male</p>
                      <p className="text-muted-foreground">#Mystical Voice- Female</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">5. THE TITLE OF BEST FASHION AND DESIGNING:</h4>
                      <p className="text-muted-foreground">BEST DESIGNER TITLE:</p>
                      <p className="text-muted-foreground">#Eastern Star- North East India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative">
                  <img 
                    src="/src/assets/theatre-hero.jpg" 
                    alt="Hillywood Fiesta Awards" 
                    className="rounded-lg shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent rounded-lg flex items-end justify-center pb-8">
                    <div className="text-center">
                      <Award className="w-16 h-16 text-golden mx-auto mb-4" />
                      <h3 className="text-3xl font-bold text-golden">HILLYWOOD</h3>
                      <p className="text-xl text-foreground">FIESTA AWARDS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-primary via-primary-light to-golden">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
              Be Part of the Red Carpet Experience
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join us at the annual Hillywood Fiesta red carpet event celebrating the talents of North East India in Arts, Film, Fashion and Music.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6">
                <Ticket className="w-5 h-5 mr-2" />
                Register for Event
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HillywoodFiesta;
