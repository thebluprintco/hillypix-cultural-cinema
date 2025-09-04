import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Star, Trophy, Users, Film, Crown } from 'lucide-react';
import NominationDialog from './NominationDialog';

const awardCategories = [
  {
    id: 'lifetime',
    title: 'Lifetime Achievement',
    icon: Crown,
    color: 'golden',
    recipients: [
      {
        name: 'Dr. Bhabendra Nath Saikia',
        state: 'Assam',
        achievement: 'Pioneer of Assamese Cinema',
        films: 15,
        years: '1975-2003'
      }
    ]
  },
  {
    id: 'directors',
    title: 'Outstanding Directors',
    icon: Film,
    color: 'primary',
    recipients: [
      {
        name: 'Aribam Syam Sharma',
        state: 'Manipur',
        achievement: 'Master of Manipuri Cinema',
        films: 12,
        years: '1985-2023'
      },
      {
        name: 'Pradip Kurbah',
        state: 'Meghalaya',
        achievement: 'Contemporary Storytelling',
        films: 8,
        years: '2010-2023'
      }
    ]
  },
  {
    id: 'actors',
    title: 'Celebrated Performers',
    icon: Users,
    color: 'golden',
    recipients: [
      {
        name: 'Seema Biswas',
        state: 'Assam',
        achievement: 'National Award Winner',
        films: 25,
        years: '1990-2023'
      },
      {
        name: 'Kaushik Ganguly',
        state: 'Tripura',
        achievement: 'Versatile Actor-Director',
        films: 18,
        years: '2005-2023'
      }
    ]
  }
];

const milestones = [
  {
    year: '2023',
    title: 'HillyWood Movement Launch',
    description: 'HillyPix launched as the first dedicated platform for Northeast Indian cinema',
    icon: Trophy,
    highlight: true
  },
  {
    year: '2022',
    title: 'Celebrating NorthEast Culture Initiative',
    description: 'Started digitizing and preserving traditional folk tales through cinema',
    icon: Star
  },
  {
    year: '2021',
    title: 'Eight States United',
    description: 'First platform to represent all eight Northeastern states equally',
    icon: Award
  }
];

const HallOfFame = () => {
  const [isNominationOpen, setIsNominationOpen] = useState(false);
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-card-accent/20 to-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-golden/20 text-golden px-4 py-2">
            🏆 HALL OF FAME
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
              Honoring
            </span>
            <br />
            Cultural Legends
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrating the visionaries, storytellers, and artists who have shaped 
            and continue to build the rich cinematic heritage of Northeast India.
          </p>
        </div>

        {/* Award Categories */}
        <div className="mb-16">
          {awardCategories.map((category, index) => (
            <div key={category.id} className="mb-12">
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full bg-${category.color}/20 flex items-center justify-center`}>
                    <category.icon className={`w-6 h-6 text-${category.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.recipients.map((recipient, recipientIndex) => (
                  <Card 
                    key={recipientIndex}
                    className="bg-card-accent/40 border-border/30 hover:border-golden/50 theatre-transition group"
                  >
                    <CardContent className="p-6 text-center">
                      {/* Spotlight Effect */}
                      <div className="relative mb-4">
                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-golden/20 to-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 theatre-transition">
                          <div className="w-16 h-16 bg-golden/30 rounded-full flex items-center justify-center">
                            <Award className="w-8 h-8 text-golden" />
                          </div>
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-primary-foreground fill-current" />
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-foreground mb-2">{recipient.name}</h4>
                      <Badge className="bg-primary/20 text-primary-light mb-3">
                        {recipient.state}
                      </Badge>
                      <p className="text-sm text-golden font-semibold mb-3">{recipient.achievement}</p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>{recipient.films} Films</p>
                        <p>{recipient.years}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* HillyWood Milestones */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-foreground mb-4">HillyWood Milestones</h3>
            <p className="text-muted-foreground">Key moments in building Northeast India's cinematic identity</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6 mb-8 last:mb-0">
                {/* Timeline Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  milestone.highlight 
                    ? 'bg-golden text-black' 
                    : 'bg-primary/20 text-primary-light'
                }`}>
                  <milestone.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`text-2xl font-bold ${
                      milestone.highlight ? 'text-golden' : 'text-primary-light'
                    }`}>
                      {milestone.year}
                    </span>
                    {milestone.highlight && (
                      <Badge className="bg-golden text-black font-semibold animate-pulse">
                        Latest
                      </Badge>
                    )}
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h4>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>

                {/* Timeline Line */}
                {index < milestones.length - 1 && (
                  <div className="absolute left-6 mt-12 w-0.5 h-8 bg-border/30"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-card-accent/30 p-8 rounded-xl border border-border/20">
          <h3 className="text-2xl font-bold text-foreground mb-4">Nominate Cultural Heroes</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Know someone who deserves recognition for their contribution to Northeast Indian cinema? 
            Help us celebrate and preserve their legacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="theatre-gradient text-white px-6 py-3"
              onClick={() => setIsNominationOpen(true)}
            >
              Submit Nomination
            </Button>
            <Button 
              variant="outline" 
              className="border-golden/50 text-golden hover:bg-golden/10 px-6 py-3"
              asChild
            >
              <Link to="/all-honorees">
                View All Honorees
              </Link>
            </Button>
          </div>
        </div>

        {/* Nomination Dialog */}
        <NominationDialog 
          open={isNominationOpen} 
          onOpenChange={setIsNominationOpen} 
        />
      </div>
    </section>
  );
};

export default HallOfFame;