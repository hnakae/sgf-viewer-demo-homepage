export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded text-xs">
                囲
              </div>
              <span className="font-medium">Eugene Go Club</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Promoting the ancient game of go in the Eugene, Oregon area since 2000.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Quick Links</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About Go
              </a>
              <a href="#meetings" className="text-muted-foreground hover:text-foreground transition-colors">
                Meeting Times
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </a>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Resources</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <a 
                href="https://online-go.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Online Go Server (OGS)
              </a>
              <a 
                href="https://www.gokgs.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                KGS Go Server
              </a>
              <a 
                href="https://www.usgo.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                American Go Association
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Eugene Go Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}