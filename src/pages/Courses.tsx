import { useNavigate } from "react-router-dom";
import { Lock, CheckCircle2, Play, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { curriculum, getDayStatus } from "@/data/curriculum";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

export default function Courses() {
  const navigate = useNavigate();
  const { completedDays } = useProgress();
  const progressPercent = (completedDays.length / 10) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 glass border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{completedDays.length}/10일 완료</span>
            <Progress value={progressPercent} className="w-20 h-2" />
          </div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">10일 피그마 마스터</h1>

        <div className="space-y-4">
          {curriculum.map((lesson, index) => {
            const status = getDayStatus(lesson.day, completedDays);
            return (
              <div
                key={lesson.day}
                onClick={() => status !== "locked" && navigate(`/lesson/${lesson.day}`)}
                className={cn(
                  "day-card flex items-center gap-4 animate-fade-in",
                  status === "completed" && "day-card-completed",
                  status === "available" && "day-card-available",
                  status === "locked" && "day-card-locked"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                  status === "completed" ? "bg-success text-success-foreground" :
                  status === "available" ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                )}>
                  {status === "completed" ? <CheckCircle2 className="w-6 h-6" /> :
                   status === "locked" ? <Lock className="w-5 h-5" /> :
                   <Play className="w-5 h-5 ml-0.5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="muted" className="text-xs">Day {lesson.day}</Badge>
                    <Badge variant="secondary" className="text-xs">{lesson.videoDuration}</Badge>
                  </div>
                  <h3 className="font-semibold truncate">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{lesson.goal}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
