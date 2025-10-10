import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Globe, Zap, ArrowRight, Mountain } from 'lucide-react';
import SupportHillyWoodDialog from './SupportHillyWoodDialog';
import LearnMoreDialog from './LearnMoreDialog';

const values = [
  {
    icon: Heart,
    title: 'Celebrating NorthEast Culture',
    description: 'Every film is a living archive, preserving languages, traditions, and stories that might otherwise be lost to time.',
    color: 'text-red-400'
  },
  {
    icon: Users,
    title: 'Community Pride',
    description: 'Building a movement where every Northeastern person sees their culture celebrated and their stories told with dignity.',
    color: 'text-golden'
  },
  {
    icon: Globe,
    title: 'Global Recognition',
    description: 'Bringing the rich diversity of Northeast India to the world stage, one authentic story at a time.',
    color: 'text-blue-400'
  },
  {
    icon: Zap,
    title: 'Industry Innovation',
    description: 'Creating new opportunities for filmmakers, actors, and storytellers across all eight states.',
    color: 'text-primary-light'
  }
];

const stats = [
  { number: '8', label: 'States United', sublabel: 'One Vision' },
  { number: '50+', label: 'Languages', sublabel: 'Preserved' },
  { number: '200+', label: 'Stories', sublabel: 'Celebrated' },
  { number: '1M+', label: 'Hearts', sublabel: 'Connected' }
];

const AboutHillyWood = () => {
  const [isSupportDialogOpen, setIsSupportDialogOpen] = useState(false);
  const [isLearnMoreDialogOpen, setIsLearnMoreDialogOpen] = useState(false);
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 cultural-pattern opacity-5"></div>
      
      <div className="container mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/20 text-primary-light px-4 py-2">
            🏔️ THE HILLYWOOD MOVEMENT
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">More Than</span>
            <br />
            <span className="bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
              Entertainment
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            HillyPix isn't just a platform—it's a cultural revolution. We're building 
            <span className="text-golden font-semibold"> HillyWood</span>, 
            a movement that celebrates the distinct identity of Northeast India through the power of cinema.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-card-accent/40 border-golden/20 p-8 text-center">
            <CardContent className="p-0">
              <div className="flex items-center justify-center mb-6">
                <Mountain className="w-12 h-12 text-golden" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                "To create a thriving ecosystem where the eight states of Northeast India have their own 
                cinematic identity—<strong className="text-golden">HillyWood</strong>—that rivals any film industry 
                in the world while staying true to our roots, traditions, and unique cultural tapestry."
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">What Drives Us</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="bg-card-accent/30 border-border/20 hover:border-golden/30 theatre-transition group text-center"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-background/50 flex items-center justify-center group-hover:scale-110 theatre-transition">
                      <value.icon className={`w-8 h-8 ${value.color}`} />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-3">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="mb-16 bg-gradient-to-r from-primary/10 to-golden/10 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">Impact So Far</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-golden mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>

        {/* The Vision */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">The HillyWood Vision</h3>
            <p className="text-lg text-muted-foreground">
              Imagine a future where Northeast India's cinema is celebrated globally...
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-6 bg-card-accent/20 rounded-lg border border-border/10">
              <div className="w-8 h-8 rounded-full bg-golden/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-golden font-bold">1</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Authentic Storytelling</h4>
                <p className="text-muted-foreground">
                  Films that authentically represent our diverse cultures, languages, and traditions without compromise or stereotypes.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-card-accent/20 rounded-lg border border-border/10">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary-light font-bold">2</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Economic Empowerment</h4>
                <p className="text-muted-foreground">
                  Creating sustainable livelihoods for artists, technicians, and storytellers across all eight states.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-card-accent/20 rounded-lg border border-border/10">
              <div className="w-8 h-8 rounded-full bg-golden/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-golden font-bold">3</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Cultural Legacy</h4>
                <p className="text-muted-foreground">
                  Ensuring that future generations inherit a rich digital archive of their cultural heritage through cinema.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Dialog */}
        <SupportHillyWoodDialog 
          open={isSupportDialogOpen}
          onOpenChange={setIsSupportDialogOpen}
        />

        {/* Learn More Dialog */}
        <LearnMoreDialog 
          open={isLearnMoreDialogOpen}
          onOpenChange={setIsLearnMoreDialogOpen}
          topic="hillywood"
        />
      </div>
    </section>
  );
};

export default AboutHillyWood;