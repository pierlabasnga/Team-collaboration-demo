import { useState } from "react";
import { Layout } from "@/components/Layout";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { VideoCard } from "@/components/VideoCard";
import { workouts, categoryLabels, Workout } from "@/lib/workoutData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

export default function OfficeHealth() {
  const officeWorkouts = workouts.filter((w) => w.isOfficeHealth);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(
    officeWorkouts[0]
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="mb-12">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="w-8 h-8 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Office Health
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            Exercises you can do right at your desk. No equipment needed, no
            special clothing required. Stay healthy and energized throughout
            your workday.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Video Player */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {selectedWorkout?.title}
            </h2>
            <p className="text-muted-foreground mb-4">
              {selectedWorkout?.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedWorkout && (
                <>
                  <Badge className="bg-primary text-primary-foreground">
                    {categoryLabels.time[selectedWorkout.duration]}
                  </Badge>
                  <Badge variant="outline">
                    {categoryLabels.bodyArea[selectedWorkout.bodyArea]}
                  </Badge>
                  <Badge variant="outline">
                    {categoryLabels.goal[selectedWorkout.goal]}
                  </Badge>
                </>
              )}
            </div>
          </div>

          {selectedWorkout && (
            <YouTubeEmbed
              youtubeId={selectedWorkout.youtubeId}
              title={selectedWorkout.title}
              className="mb-6 flex-1"
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="bg-slate-50 p-6 rounded-xl border border-border h-fit">
          <h3 className="font-bold text-foreground mb-4">Quick Tips</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Do these throughout your workday for better focus</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span>No need to change clothes or leave your desk</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Reduce stress and improve circulation</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Perfect for breaks between meetings</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Video Grid */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          All Office Exercises{" "}
          <span className="text-accent">({officeWorkouts.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {officeWorkouts.map((workout) => (
            <VideoCard
              key={workout.id}
              workout={workout}
              onSelect={setSelectedWorkout}
              isSelected={selectedWorkout?.id === workout.id}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}
