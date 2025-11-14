import { Workout, categoryLabels } from "@/lib/workoutData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface VideoCardProps {
  workout: Workout;
  onSelect: (workout: Workout) => void;
  isSelected?: boolean;
}

export function VideoCard({
  workout,
  onSelect,
  isSelected = false,
}: VideoCardProps) {
  const duration = categoryLabels.time[workout.duration];
  const bodyArea = categoryLabels.bodyArea[workout.bodyArea];
  const goal = categoryLabels.goal[workout.goal];

  return (
    <button
      onClick={() => onSelect(workout)}
      className={`w-full text-left transition-all duration-200 rounded-xl overflow-hidden border-2 ${
        isSelected
          ? "border-primary bg-blue-50 shadow-lg"
          : "border-border bg-white hover:border-primary hover:shadow-md"
      }`}
    >
      <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 relative group">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`rounded-full p-3 transition-all ${
              isSelected
                ? "bg-primary text-white"
                : "bg-white/80 text-slate-800 group-hover:bg-white"
            }`}
          >
            <Play className="w-6 h-6 fill-current" />
          </div>
        </div>
        {workout.isOfficeHealth && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Office Friendly
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
          {workout.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {workout.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {duration}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {bodyArea}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {goal}
          </Badge>
        </div>

        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(workout);
          }}
        >
          {isSelected ? "Playing" : "Play Video"}
        </Button>
      </div>
    </button>
  );
}
