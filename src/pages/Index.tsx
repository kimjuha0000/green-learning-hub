import { useNavigate } from "react-router-dom";
import { Play, Clock, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/hooks/useProgress";

export default function Index() {
  const navigate = useNavigate();
  const { completedDays, currentDay } = useProgress();
  const progressPercent = (completedDays.length / 10) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container max-w-4xl mx-auto px-4 pt-16 pb-12">
        <div className="text-center space-y-6 animate-fade-in">
          <Badge variant="secondary" className="gap-2 px-4 py-2">
            <Clock className="w-4 h-4" />
            하루 5분
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            10일 만에 피그마,
            <br />
            <span className="text-gradient">완전 정복</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            매일 3분 영상 + 1분 실습으로 피그마 기초를 마스터하세요
          </p>

          {completedDays.length > 0 ? (
            <div className="space-y-4 max-w-xs mx-auto">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">학습 진행률</span>
                <span className="font-semibold">{completedDays.length}/10일</span>
              </div>
              <Progress value={progressPercent} className="h-3" />
              <Button size="xl" onClick={() => navigate(`/lesson/${currentDay}`)} className="w-full">
                Day {currentDay} 이어하기
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <Button size="xl" onClick={() => navigate("/lesson/1")} className="animate-bounce-soft">
              <Play className="w-5 h-5" />
              오늘 시작하기 (5분)
            </Button>
          )}
        </div>
      </section>

      {/* 10-Day Preview */}
      <section className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">10일 커리큘럼</h2>
          <p className="text-muted-foreground">매일 조금씩, 꾸준히 성장하세요</p>
        </div>

        <div className="flex justify-center gap-2 flex-wrap">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                completedDays.includes(i + 1)
                  ? "bg-success text-success-foreground"
                  : i + 1 === currentDay
                  ? "bg-primary text-primary-foreground animate-pulse-soft"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="ghost" onClick={() => navigate("/courses")}>
            전체 커리큘럼 보기
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
