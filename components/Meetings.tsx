import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export function Meetings() {
  return (
    <section id="meetings" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl">Meeting Information</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us for regular play sessions, teaching games, and special events.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Weekly Meetings
                <Badge variant="secondary">Regular</Badge>
              </CardTitle>
              <CardDescription>Our main weekly gathering</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">When</h4>
                <p className="text-sm text-muted-foreground">
                  Every Thursday, 6:30 PM - 9:00 PM
                </p>
              </div>
              <div>
                <h4 className="font-medium">Where</h4>
                <p className="text-sm text-muted-foreground">
                  University of Oregon Student Union<br />
                  Room 330 (Board Game Room)
                </p>
              </div>
              <div>
                <h4 className="font-medium">What to Expect</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Casual games and teaching sessions</li>
                  <li>• Equipment provided</li>
                  <li>• All skill levels welcome</li>
                  <li>• Free to attend</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Special Events
                <Badge>Monthly</Badge>
              </CardTitle>
              <CardDescription>Tournaments and workshops</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Monthly Tournament</h4>
                <p className="text-sm text-muted-foreground">
                  First Saturday of each month, 1:00 PM - 5:00 PM
                </p>
              </div>
              <div>
                <h4 className="font-medium">Beginner Workshops</h4>
                <p className="text-sm text-muted-foreground">
                  Monthly introduction sessions for new players
                </p>
              </div>
              <div>
                <h4 className="font-medium">Study Groups</h4>
                <p className="text-sm text-muted-foreground">
                  Problem-solving and game review sessions
                </p>
              </div>
              <div>
                <h4 className="font-medium">Online Play</h4>
                <p className="text-sm text-muted-foreground">
                  Connect with members on KGS and OGS servers
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}