import { useState } from 'react';
import Header from '@/components/Header';
import NowPremiering from '@/components/NowPremiering';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';
import LearnMoreDialog from '@/components/LearnMoreDialog';

const Premieres = () => {
  const [isLearnMoreDialogOpen, setIsLearnMoreDialogOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card-accent/20">
      <Header />
      
      <main className="pt-24">
        {/* Page Header */}
        <section className="py-16 px-6 text-center">
          <div className="container mx-auto">
            <Badge className="mb-4 bg-golden/20 text-golden px-4 py-2">
              🎭 PREMIERES
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-light to-golden bg-clip-text text-transparent">
                Current &amp; Upcoming
              </span>
              <br />
              Premieres
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the excitement of live premieres from Northeast India's vibrant film industry. 
              Each premiere is a cultural celebration waiting for you.
            </p>
          </div>
        </section>

        {/* Now Premiering Section */}
        <NowPremiering />

        {/* Upcoming Premieres */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Coming Soon</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Legends of Arunachal",
                  date: "Dec 15, 2024",
                  time: "7:00 PM IST",
                  state: "Arunachal Pradesh",
                  language: "Nyishi"
                },
                {
                  title: "Songs of Tripura",
                  date: "Dec 22, 2024", 
                  time: "8:00 PM IST",
                  state: "Tripura",
                  language: "Kokborok"
                },
                {
                  title: "Bamboo Dreams",
                  date: "Dec 29, 2024",
                  time: "7:30 PM IST", 
                  state: "Mizoram",
                  language: "Mizo"
                }
              ].map((premiere, index) => (
                <div key={index} className="bg-card-accent/30 rounded-xl p-6 border border-border/20 hover:border-golden/30 theatre-transition">
                  <h3 className="text-xl font-bold mb-3">{premiere.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-golden" />
                      {premiere.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-golden" />
                      {premiere.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-golden" />
                      {premiere.state}
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-4">{premiere.language}</Badge>
                  <div className="flex gap-2">
                    <Button size="sm" className="theatre-gradient text-white">
                      Set Reminder
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-golden/50 text-golden"
                      onClick={() => setIsLearnMoreDialogOpen(true)}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learn More Dialog */}
        <LearnMoreDialog 
          open={isLearnMoreDialogOpen}
          onOpenChange={setIsLearnMoreDialogOpen}
          topic="premiere"
        />
      </main>
    </div>
  );
};

export default Premieres;