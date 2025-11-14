import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground leading-tight">
                MicroFit
              </span>
              <span className="text-xs text-muted-foreground">Workouts</span>
            </div>
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            <Link to="/">
              <Button variant="ghost" size="sm">
                Home
              </Button>
            </Link>
            <Link to="/office-health">
              <Button variant="ghost" size="sm">
                Office Health
              </Button>
            </Link>
            <Link to="/challenges">
              <Button variant="ghost" size="sm">
                Challenges
              </Button>
            </Link>
          </nav>

          <div className="sm:hidden">
            <Button variant="outline" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-border bg-slate-50 py-8 text-center text-sm text-muted-foreground">
        <p>
          © 2024 MicroFit. Get healthy in just 5 minutes or less.
        </p>
      </footer>
    </div>
  );
}
