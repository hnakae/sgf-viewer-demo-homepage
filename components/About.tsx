import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl">About Our Club</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The Eugene Go Club has been fostering the ancient game of go (weiqi/baduk) 
            in the Eugene area for over two decades.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>What is Go?</CardTitle>
              <CardDescription>
                An ancient strategy game with simple rules but infinite complexity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Go is a 4,000-year-old board game that originated in China. Two players 
                alternate placing black and white stones on a 19×19 grid, with the goal 
                of controlling territory. Despite having only a few simple rules, go is 
                considered one of the most complex games ever created.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Our Community</CardTitle>
              <CardDescription>
                Players of all ages and skill levels welcome
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Our club welcomes everyone from curious beginners to experienced players. 
                We provide teaching games, casual play, tournament preparation, and regular 
                study sessions. Whether you're learning your first moves or working toward 
                your next rank, you'll find supportive fellow players here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}