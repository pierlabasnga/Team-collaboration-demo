import { useState } from "react";
import { Layout } from "@/components/Layout";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { VideoCard } from "@/components/VideoCard";
import { workouts, categoryLabels, Workout } from "@/lib/workoutData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Zap, Clock } from "lucide-react";

export default function Index() {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(
    workouts[0]
  );
  const [selectedTime, setSelectedTime] = useState<"1" | "3" | "5" | null>(null);
  const [selectedBodyArea, setSelectedBodyArea] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const filteredWorkouts = workouts.filter((workout) => {
    if (selectedTime && workout.duration !== selectedTime) return false;
    if (selectedBodyArea && workout.bodyArea !== selectedBodyArea) return false;
    if (selectedGoal && workout.goal !== selectedGoal) return false;
    return true;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="mb-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Micro-Workouts for Busy People
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            No time for a gym? No problem. Get a health boost in just 5 minutes
            or less with our carefully curated collection of ultra-short,
            equipment-free exercises.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-foreground">
              <Zap className="w-5 h-5 text-accent" />
              <span className="font-semibold">Quick & Effective</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Heart className="w-5 h-5 text-accent" />
              <span className="font-semibold">No Equipment</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Clock className="w-5 h-5 text-accent" />
              <span className="font-semibold">5 Minutes Max</span>
            </div>
          </div>
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
                  {selectedWorkout.isOfficeHealth && (
                    <Badge className="bg-accent text-accent-foreground">
                      Office Friendly
                    </Badge>
                  )}
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

        {/* Filters */}
        <div className="bg-slate-50 p-6 rounded-xl border border-border h-fit sticky top-24">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            Filter by
          </h3>

          <div className="space-y-4">
            {/* Time Filter */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">
                Duration
              </p>
              <div className="space-y-2">
                {(["1", "3", "5"] as const).map((time) => (
                  <button
                    key={time}
                    onClick={() =>
                      setSelectedTime(selectedTime === time ? null : time)
                    }
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedTime === time
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-white text-foreground hover:bg-slate-100"
                    }`}
                  >
                    {categoryLabels.time[time]}
                  </button>
                ))}
              </div>
            </div>

            {/* Body Area Filter */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">
                Body Area
              </p>
              <div className="space-y-2">
                {(
                  [
                    "desk-stretches",
                    "core-blast",
                    "leg-quickie",
                    "full-body",
                  ] as const
                ).map((area) => (
                  <button
                    key={area}
                    onClick={() =>
                      setSelectedBodyArea(
                        selectedBodyArea === area ? null : area
                      )
                    }
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedBodyArea === area
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-white text-foreground hover:bg-slate-100"
                    }`}
                  >
                    {categoryLabels.bodyArea[area]}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal Filter */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Goal</p>
              <div className="space-y-2">
                {(["wake-up", "de-stress", "post-lunch-energy"] as const).map(
                  (goal) => (
                    <button
                      key={goal}
                      onClick={() =>
                        setSelectedGoal(selectedGoal === goal ? null : goal)
                      }
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedGoal === goal
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "bg-white text-foreground hover:bg-slate-100"
                      }`}
                    >
                      {categoryLabels.goal[goal]}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedTime || selectedBodyArea || selectedGoal) && (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  setSelectedTime(null);
                  setSelectedBodyArea(null);
                  setSelectedGoal(null);
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {selectedTime ||
          selectedBodyArea ||
          selectedGoal ? (
            <>
              Filtered Results{" "}
              <span className="text-accent">
                ({filteredWorkouts.length})
              </span>
            </>
          ) : (
            <>
              All Workouts{" "}
              <span className="text-accent">({filteredWorkouts.length})</span>
            </>
          )}
        </h2>

        {filteredWorkouts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No workouts match your filters. Try adjusting your selection.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedTime(null);
                setSelectedBodyArea(null);
                setSelectedGoal(null);
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredWorkouts.map((workout) => (
              <VideoCard
                key={workout.id}
                workout={workout}
                onSelect={setSelectedWorkout}
                isSelected={selectedWorkout?.id === workout.id}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
