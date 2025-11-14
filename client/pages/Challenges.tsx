import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Download, Calendar } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  imageGradient: string;
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "7-Day 5-Minute Plank Challenge",
    description:
      "Build core strength with progressive plank exercises over 7 days. Perfect for beginners looking to strengthen their core without equipment.",
    duration: "7 Days",
    difficulty: "beginner",
    imageGradient: "from-blue-400 to-blue-600",
  },
  {
    id: "2",
    title: "14-Day Desk Stretch Mastery",
    description:
      "Complete a series of targeted desk stretches to improve flexibility and reduce muscle tension from sitting.",
    duration: "14 Days",
    difficulty: "beginner",
    imageGradient: "from-green-400 to-green-600",
  },
  {
    id: "3",
    title: "30-Day Full Body Burn",
    description:
      "A month-long challenge combining cardio, strength, and flexibility work with 5-minute daily sessions.",
    duration: "30 Days",
    difficulty: "intermediate",
    imageGradient: "from-orange-400 to-orange-600",
  },
];

export default function Challenges() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="mb-12">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Fitness Challenges
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            Join our community challenges and stay motivated with structured
            workout plans. Download printable sheets to track your progress.
          </p>
        </div>
      </section>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="border border-border rounded-xl overflow-hidden bg-white hover:shadow-lg transition-shadow"
          >
            {/* Challenge Image */}
            <div
              className={`h-40 bg-gradient-to-br ${challenge.imageGradient} relative`}
            >
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Challenge Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground pr-2">
                  {challenge.title}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {challenge.description}
              </p>

              <div className="flex gap-2 mb-4">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {challenge.duration}
                </Badge>
                <Badge
                  variant={
                    challenge.difficulty === "beginner"
                      ? "outline"
                      : challenge.difficulty === "intermediate"
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-xs"
                >
                  {challenge.difficulty.charAt(0).toUpperCase() +
                    challenge.difficulty.slice(1)}
                </Badge>
              </div>

              <Button className="w-full mb-2 gap-2">
                <Download className="w-4 h-4" />
                Download Printable Sheet
              </Button>
              <Button variant="outline" className="w-full">
                Start Challenge
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Coming Soon Section */}
      <section className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          More Challenges Coming Soon
        </h2>
        <p className="text-muted-foreground mb-4">
          We're constantly adding new challenges tailored to different fitness
          levels and goals. Stay tuned for monthly challenges, team
          competitions, and more!
        </p>
        <Button variant="outline">Notify Me</Button>
      </section>
    </Layout>
  );
}
