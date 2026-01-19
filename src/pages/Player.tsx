import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Pause, CheckCircle2, ChevronRight, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { curriculum, getDayStatus } from "@/data/curriculum";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";
import ConfettiCelebration from "@/components/ConfettiCelebration";

export default function Player() {
  const { day } = useParams();
  const navigate = useNavigate();
  const dayNumber = parseInt(day || "1", 10);
  const lesson = curriculum[dayNumber - 1];

  const { completedDays, completeDay } = useProgress();
  const [videoEnded, setVideoEnded] = useState(false);
  const [actionCompleted, setActionCompleted] = useState(false);
  const [actionValue, setActionValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  // Check if already completed
  const isAlreadyCompleted = completedDays.includes(dayNumber);

  // Check access
  const status = getDayStatus(dayNumber, completedDays);

  useEffect(() => {
    if (status === "locked") {
      navigate("/courses");
    }
  }, [status, navigate]);

  useEffect(() => {
    if (isAlreadyCompleted) {
      setVideoEnded(true);
      setActionCompleted(true);
    }
  }, [isAlreadyCompleted]);

  // Simulate video end for demo (in real app, use video player events)
  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleActionComplete = () => {
    if (lesson?.action.type === "text" && actionValue.trim().length > 0) {
      setActionCompleted(true);
    } else if (lesson?.action.type === "checkbox") {
      setActionCompleted(!actionCompleted);
    } else if (lesson?.action.type === "choice" && selectedOption) {
      setActionCompleted(true);
    }
  };

  const handleComplete = () => {
    setIsCompleting(true);
    setTimeout(() => {
      completeDay(dayNumber);
      setShowCelebration(true);
    }, 300);
  };

  const handleNextDay = () => {
    setShowCelebration(false);
    if (dayNumber < 10) {
      navigate(`/lesson/${dayNumber + 1}`);
      // Reset states for next lesson
      setVideoEnded(false);
      setActionCompleted(false);
      setActionValue("");
      setSelectedOption(null);
      setIsCompleting(false);
    } else {
      navigate("/courses");
    }
  };

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>존재하지 않는 수업입니다</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/courses")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">커리큘럼</span>
          </button>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="font-medium">
              Day {dayNumber} / 10
            </Badge>
            <Progress value={(completedDays.length / 10) * 100} className="w-20 h-2" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Day Title */}
        <div className="text-center space-y-2 animate-fade-in">
          <Badge variant="muted" className="mb-2">
            Day {dayNumber}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {lesson.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {lesson.goal}
          </p>
        </div>

        {/* Video Player */}
        <div className="animate-fade-in stagger-1">
          <div className="video-container group">
            {/* Placeholder for actual video - in production use a real video player */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
              <p className="text-muted-foreground text-sm">{lesson.videoDuration} 영상</p>
              
              {/* Demo button to simulate video end */}
              {!videoEnded && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleVideoEnd}
                  className="mt-4"
                >
                  영상 시청 완료 (데모)
                </Button>
              )}
            </div>

            {/* Video completed overlay */}
            {videoEnded && (
              <div className="absolute top-4 right-4 animate-scale-in">
                <Badge variant="success" className="gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  시청 완료
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Action Section - Only visible after video ends */}
        <div
          className={cn(
            "transition-all duration-500 ease-out",
            videoEnded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8 pointer-events-none h-0 overflow-hidden"
          )}
        >
          <div className="action-section animate-slide-up space-y-6">
            <div className="flex items-center gap-2 text-accent-foreground">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-semibold">오늘의 액션</h3>
            </div>

            <p className="text-foreground">{lesson.action.instruction}</p>

            {/* Action Input based on type */}
            {lesson.action.type === "text" && (
              <Input
                value={actionValue}
                onChange={(e) => {
                  setActionValue(e.target.value);
                  setActionCompleted(e.target.value.trim().length > 0);
                }}
                placeholder={lesson.action.placeholder}
                className="bg-background"
              />
            )}

            {lesson.action.type === "checkbox" && (
              <button
                onClick={handleActionComplete}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 w-full",
                  actionCompleted
                    ? "border-success bg-success/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                    actionCompleted
                      ? "border-success bg-success"
                      : "border-muted-foreground"
                  )}
                >
                  {actionCompleted && (
                    <CheckCircle2 className="w-4 h-4 text-success-foreground animate-check-bounce" />
                  )}
                </div>
                <span className={actionCompleted ? "text-success" : "text-foreground"}>
                  네, 이해했어요!
                </span>
              </button>
            )}

            {lesson.action.type === "choice" && lesson.action.options && (
              <div className="grid grid-cols-2 gap-3">
                {lesson.action.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedOption(option);
                      setActionCompleted(true);
                    }}
                    className={cn(
                      "p-4 rounded-2xl border-2 transition-all duration-300 text-left",
                      selectedOption === option
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Complete Button */}
        <div
          className={cn(
            "transition-all duration-500 ease-out",
            videoEnded && actionCompleted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8 pointer-events-none"
          )}
        >
          {!isAlreadyCompleted ? (
            <Button
              size="xl"
              onClick={handleComplete}
              disabled={!actionCompleted || isCompleting}
              className="w-full"
            >
              {isCompleting ? (
                <span className="animate-pulse-soft">완료 중...</span>
              ) : (
                <>
                  Day {dayNumber} 완료하기
                  <CheckCircle2 className="w-5 h-5" />
                </>
              )}
            </Button>
          ) : (
            <Button
              size="xl"
              variant="success"
              onClick={handleNextDay}
              className="w-full"
            >
              {dayNumber < 10 ? (
                <>
                  Day {dayNumber + 1}로 이동
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                "🎉 모든 학습 완료!"
              )}
            </Button>
          )}
        </div>
      </main>

      {/* Celebration Modal */}
      {showCelebration && (
        <ConfettiCelebration
          day={dayNumber}
          onClose={handleNextDay}
        />
      )}
    </div>
  );
}
