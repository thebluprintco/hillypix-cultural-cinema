import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Ticket, Star, Clock, MapPin, CreditCard, Check, AlertTriangle, Shield, Smartphone, Info } from 'lucide-react';
import { useCreatePurchase, useRegisterDevice } from '@/hooks/usePurchases';
import { supabase } from '@/integrations/supabase/client';

interface TicketPurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movie: {
    id?: string;
    title: string;
    poster: string;
    rating: number;
    duration: string;
    language: string;
    state: string;
    price?: number;
  };
}

const ticketTypes = [
  {
    id: 'single',
    name: 'Basic Tier',
    price: 299,
    description: 'Perfect for personal viewing',
    maxDevices: 1,
    accessDays: 30,
    playbackHours: 48,
    features: ['30 days to start watching', '48 hours to finish once started', 'HD quality streaming', '1 device only']
  },
  {
    id: 'premium',
    name: 'Premium Tier',
    price: 499,
    description: 'For you and a friend',
    maxDevices: 2,
    accessDays: 30,
    playbackHours: 48,
    features: ['30 days to start watching', '48 hours to finish once started', 'Full HD quality', 'Up to 2 devices', 'Download for offline viewing']
  },
  {
    id: 'bundle',
    name: 'Family Tier',
    price: 899,
    description: 'Share with family',
    maxDevices: 3,
    accessDays: 30,
    playbackHours: 72,
    features: ['30 days to start watching', '72 hours to finish once started', '4K quality available', 'Up to 3 devices', 'Offline downloads', 'Priority support']
  }
];

const TicketPurchaseDialog = ({ open, onOpenChange, movie }: TicketPurchaseDialogProps) => {
  const { toast } = useToast();
  const [selectedTicket, setSelectedTicket] = useState('single');
  const [step, setStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const createPurchase = useCreatePurchase();
  const registerDevice = useRegisterDevice();
  
  const selectedTicketType = ticketTypes.find(t => t.id === selectedTicket);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleProceedToPayment = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in Required",
        description: "Please sign in to purchase tickets.",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const handleCompletePurchase = async () => {
    if (!movie.id || !selectedTicketType) {
      // Demo mode - simulate purchase
      toast({
        title: "Ticket Purchased Successfully!",
        description: `Your ${selectedTicketType?.name} for "${movie.title}" has been added to your library.`,
      });
      setStep(3);
      return;
    }

    setIsProcessing(true);
    
    try {
      // Create purchase in database
      const purchase = await createPurchase.mutateAsync({
        movieId: movie.id,
        maxDevices: selectedTicketType.maxDevices,
      });

      // Register current device
      await registerDevice.mutateAsync(purchase.id);

      toast({
        title: "Ticket Purchased Successfully!",
        description: `Your ${selectedTicketType.name} for "${movie.title}" has been added to your library.`,
      });
      
      setStep(3);
    } catch (error: any) {
      toast({
        title: "Purchase Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setSelectedTicket('single');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card-accent/95 backdrop-blur-md border border-border/30">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-golden/20 flex items-center justify-center">
              <Ticket className="w-5 h-5 text-golden" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-golden to-primary-light bg-clip-text text-transparent">
                {step === 3 ? 'Purchase Complete!' : 'Buy Digital Ticket'}
              </DialogTitle>
              <Badge className="bg-golden/20 text-golden text-xs mt-1">
                🎭 {movie.title}
              </Badge>
            </div>
          </div>
          {step !== 3 && (
            <DialogDescription className="text-muted-foreground">
              Step {step} of 2: {step === 1 ? 'Select your access tier' : 'Complete your purchase'}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Movie Info Bar */}
        <div className="flex items-center space-x-4 p-4 bg-background/30 rounded-lg mb-6">
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="w-16 h-24 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-bold text-foreground">{movie.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
              <div className="flex items-center">
                <Star className="w-3 h-3 text-golden mr-1" />
                {movie.rating}
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {movie.duration}
              </div>
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {movie.state}
              </div>
            </div>
            <Badge variant="secondary" className="mt-2 text-xs">
              {movie.language}
            </Badge>
          </div>
        </div>

        {/* Access Model Explanation */}
        {step === 1 && (
          <Alert className="mb-6 border-golden/30 bg-golden/5">
            <Info className="w-4 h-4 text-golden" />
            <AlertDescription className="text-sm text-muted-foreground">
              <strong className="text-golden">How it works:</strong> After purchase, you have <strong>30 days to start watching</strong>. 
              Once you press play, you have <strong>48-72 hours</strong> (depending on tier) to finish the movie. 
              This helps us protect content from unauthorized sharing.
            </AlertDescription>
          </Alert>
        )}

        {/* Step 1: Ticket Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Choose Your Access Tier</h3>
            
            <div className="grid gap-4">
              {ticketTypes.map((ticket) => (
                <Card 
                  key={ticket.id}
                  className={`cursor-pointer border-2 transition-all ${
                    selectedTicket === ticket.id 
                      ? 'border-golden bg-golden/5' 
                      : 'border-border/30 hover:border-golden/30'
                  }`}
                  onClick={() => setSelectedTicket(ticket.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            selectedTicket === ticket.id 
                              ? 'border-golden bg-golden' 
                              : 'border-border'
                          }`} />
                          <h4 className="font-semibold text-foreground">{ticket.name}</h4>
                          <Badge className="bg-primary/20 text-primary-light">
                            ₹{ticket.price}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="border-golden/30 text-golden text-xs">
                            <Smartphone className="w-3 h-3 mr-1" />
                            {ticket.maxDevices} {ticket.maxDevices === 1 ? 'Device' : 'Devices'}
                          </Badge>
                          <Badge variant="outline" className="border-primary/30 text-primary-light text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {ticket.playbackHours}h playback
                          </Badge>
                          <p className="text-sm text-muted-foreground">{ticket.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-1">
                          {ticket.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-xs text-muted-foreground">
                              <Check className="w-3 h-3 text-golden mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Device Limit Warning */}
            <Alert className="border-primary/30 bg-primary/5">
              <Shield className="w-4 h-4 text-primary-light" />
              <AlertDescription className="text-sm text-muted-foreground">
                <strong className="text-primary-light">Account Security:</strong> Each tier has a device limit to prevent unauthorized sharing. 
                If you try to watch on more devices than allowed, you'll need to remove a device first.
              </AlertDescription>
            </Alert>

            {!isAuthenticated && (
              <Alert className="border-destructive/30 bg-destructive/5">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <AlertDescription className="text-sm text-destructive">
                  You need to sign in to purchase tickets. Please sign in first.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-border/30 text-muted-foreground hover:bg-background/50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleProceedToPayment}
                className="flex-1 theatre-gradient text-white hover:scale-105 theatre-transition"
              >
                Proceed to Payment - ₹{selectedTicketType?.price}
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Payment Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Payment Details</h3>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-golden">₹{selectedTicketType?.price}</p>
              </div>
            </div>

            {/* Purchase Summary */}
            <Card className="bg-background/30 border-border/20">
              <CardContent className="p-4">
                <h4 className="font-semibold text-foreground mb-3">Purchase Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tier</span>
                    <span className="text-foreground">{selectedTicketType?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Device Limit</span>
                    <span className="text-foreground">{selectedTicketType?.maxDevices} devices</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Access Window</span>
                    <span className="text-foreground">{selectedTicketType?.accessDays} days to start</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Playback Time</span>
                    <span className="text-foreground">{selectedTicketType?.playbackHours} hours after starting</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="card" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-card-accent/50">
                <TabsTrigger value="card" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Card
                </TabsTrigger>
                <TabsTrigger value="upi" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  UPI
                </TabsTrigger>
                <TabsTrigger value="wallet" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Wallet
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card" className="mt-4">
                <div className="space-y-4">
                  <div className="bg-background/30 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">Card Number</label>
                        <div className="mt-1 p-3 bg-background/50 rounded border border-border/30 text-muted-foreground">
                          **** **** **** 1234
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Cardholder Name</label>
                        <div className="mt-1 p-3 bg-background/50 rounded border border-border/30 text-muted-foreground">
                          Demo User
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">Expiry</label>
                        <div className="mt-1 p-3 bg-background/50 rounded border border-border/30 text-muted-foreground">
                          12/25
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">CVV</label>
                        <div className="mt-1 p-3 bg-background/50 rounded border border-border/30 text-muted-foreground">
                          ***
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="upi" className="mt-4">
                <div className="bg-background/30 rounded-lg p-4 text-center">
                  <p className="text-muted-foreground mb-4">UPI Payment Demo</p>
                  <div className="p-3 bg-background/50 rounded border border-border/30 text-muted-foreground">
                    user@paytm
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="wallet" className="mt-4">
                <div className="bg-background/30 rounded-lg p-4 text-center">
                  <p className="text-muted-foreground mb-4">Wallet Balance</p>
                  <div className="p-3 bg-background/50 rounded border border-border/30 text-golden font-semibold">
                    ₹2,500 Available
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 border-border/30 text-muted-foreground hover:bg-background/50"
                disabled={isProcessing}
              >
                Back
              </Button>
              <Button
                onClick={handleCompletePurchase}
                className="flex-1 theatre-gradient text-white hover:scale-105 theatre-transition"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Complete Purchase'}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-golden/20 rounded-full flex items-center justify-center mb-4">
              <Check className="w-10 h-10 text-golden" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Purchase Successful!</h3>
              <p className="text-muted-foreground mb-4">
                Your {selectedTicketType?.name} for "{movie.title}" has been added to your library.
              </p>
              
              <Card className="bg-card-accent/30 border-border/20 max-w-md mx-auto">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Order ID:</span>
                    <span className="font-mono text-foreground">HPX{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Amount Paid:</span>
                    <span className="font-semibold text-golden">₹{selectedTicketType?.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Valid For:</span>
                    <span className="text-foreground">30 days to start</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Playback Window:</span>
                    <span className="text-foreground">{selectedTicketType?.playbackHours}h after starting</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Device Limit:</span>
                    <span className="text-foreground">{selectedTicketType?.maxDevices} device(s)</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Alert className="border-golden/30 bg-golden/5 text-left max-w-md mx-auto">
              <Info className="w-4 h-4 text-golden" />
              <AlertDescription className="text-sm text-muted-foreground">
                Remember: Once you start watching, you have {selectedTicketType?.playbackHours} hours to finish. 
                This device is now registered for playback.
              </AlertDescription>
            </Alert>

            <div className="flex gap-3 max-w-md mx-auto">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-golden/50 text-golden hover:bg-golden/10"
              >
                Continue Browsing
              </Button>
              <Button
                onClick={handleClose}
                className="flex-1 theatre-gradient text-white"
              >
                Go to My Library
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TicketPurchaseDialog;
