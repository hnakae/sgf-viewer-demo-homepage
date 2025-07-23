import { Button } from "./ui/button";

export function Hero() {
  return (
    <section id="home" className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl tracking-tight">
              Welcome to Eugene Go Club
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
              Join Oregon's premier go community in Eugene. Learn the ancient game of strategy, 
              improve your skills, and connect with fellow players in a welcoming environment.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-base">
              Join Our Next Meeting
            </Button>
            <Button variant="outline" size="lg" className="text-base">
              Learn About Go
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-4xl">
            <div className="text-center space-y-2">
              <div className="text-2xl">🏆</div>
              <h3>All Skill Levels</h3>
              <p className="text-sm text-muted-foreground">
                From complete beginners to dan-level players
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl">📅</div>
              <h3>Regular Meetings</h3>
              <p className="text-sm text-muted-foreground">
                Weekly sessions every Thursday evening
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl">🤝</div>
              <h3>Friendly Community</h3>
              <p className="text-sm text-muted-foreground">
                Welcoming atmosphere for learning and growth
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}