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
            <Badge className="mb-6 bg-golden/20 text-golden px-6 py-3 text-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              ANNUAL CELEBRATION
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-golden via-primary-light to-golden bg-clip-text text-transparent">
                HillyWood Fiesta
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl">
              Celebrating the Rich Cultural Heritage of Northeast India Through Cinema, Music, and Art
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center gap-2 text-foreground">
                <Calendar className="w-5 h-5 text-golden" />
                <span className="text-lg">December 15-18, 2025</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="w-5 h-5 text-golden" />
                <span className="text-lg">Shillong, Meghalaya</span>
              </div>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-golden to-primary hover:opacity-90 text-primary-foreground text-lg px-8 py-6">
              <Ticket className="w-5 h-5 mr-2" />
              Get Festival Passes
            </Button>
          </div>
        </section>

        {/* About the Festival */}
        <section className="py-20 px-6 bg-card-accent/20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                About the Festival
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                HillyWood Fiesta is the premier celebration of Northeast Indian cinema, bringing together filmmakers, 
                artists, musicians, and cultural enthusiasts from across the eight sister states for an unforgettable 
                experience of art, culture, and community.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-card-accent border-golden/20 p-8 text-center hover:border-golden/40 transition-colors">
                <Film className="w-12 h-12 text-golden mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-3">Film Premieres</h3>
                <p className="text-muted-foreground">
                  Exclusive screenings of the latest productions from across Northeast India
                </p>
              </Card>

              <Card className="bg-card-accent border-golden/20 p-8 text-center hover:border-golden/40 transition-colors">
                <Music2 className="w-12 h-12 text-golden mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-3">Live Performances</h3>
                <p className="text-muted-foreground">
                  Traditional and contemporary music performances by renowned artists
                </p>
              </Card>

              <Card className="bg-card-accent border-golden/20 p-8 text-center hover:border-golden/40 transition-colors">
                <Award className="w-12 h-12 text-golden mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-3">Awards Ceremony</h3>
                <p className="text-muted-foreground">
                  Celebrating excellence in Northeast Indian cinema and cultural arts
                </p>
              </Card>

              <Card className="bg-card-accent border-golden/20 p-8 text-center hover:border-golden/40 transition-colors">
                <Users className="w-12 h-12 text-golden mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-3">Industry Panels</h3>
                <p className="text-muted-foreground">
                  Workshops, discussions, and networking opportunities for creators
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Festival Schedule */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-foreground">
              Festival Schedule
            </h2>

            <div className="space-y-8 max-w-4xl mx-auto">
              <Card className="bg-card-accent border-golden/20 p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-golden/20 rounded-lg p-4 min-w-[100px] text-center">
                    <div className="text-3xl font-bold text-golden">15</div>
                    <div className="text-sm text-foreground">DEC</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Day 1: Opening Ceremony</h3>
                    <p className="text-muted-foreground mb-4">
                      Grand opening with cultural performances, inaugural film screening, and welcome reception
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>6:00 PM - 10:00 PM</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-card-accent border-golden/20 p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-golden/20 rounded-lg p-4 min-w-[100px] text-center">
                    <div className="text-3xl font-bold text-golden">16</div>
                    <div className="text-sm text-foreground">DEC</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Day 2: Film Showcase</h3>
                    <p className="text-muted-foreground mb-4">
                      Multiple screening sessions featuring films from all eight states, followed by Q&A with filmmakers
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>10:00 AM - 11:00 PM</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-card-accent border-golden/20 p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-golden/20 rounded-lg p-4 min-w-[100px] text-center">
                    <div className="text-3xl font-bold text-golden">17</div>
                    <div className="text-sm text-foreground">DEC</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Day 3: Music & Culture Night</h3>
                    <p className="text-muted-foreground mb-4">
                      Live music performances, traditional dance, cultural exhibitions, and food festival
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>5:00 PM - 12:00 AM</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-card-accent border-golden/20 p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-golden/20 rounded-lg p-4 min-w-[100px] text-center">
                    <div className="text-3xl font-bold text-golden">18</div>
                    <div className="text-sm text-foreground">DEC</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Day 4: Awards & Closing</h3>
                    <p className="text-muted-foreground mb-4">
                      Grand awards ceremony honoring excellence in cinema, music, and cultural arts
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>6:00 PM - 11:00 PM</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-primary via-primary-light to-golden">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
              Be Part of the Celebration
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join us for four days of incredible cinema, music, and cultural celebration. 
              Limited passes available!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6">
                <Ticket className="w-5 h-5 mr-2" />
                Get Festival Passes
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
