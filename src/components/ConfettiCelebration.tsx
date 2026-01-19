import { useEffect, useState } from "react";
import { CheckCircle2, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfettiCelebrationProps {
  day: number;
  onClose: () => void;
}

export default function ConfettiCelebration({ day, onClose }: ConfettiCelebrationProps) {
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; left: number; delay: number; color: string }>>([]);

  useEffect(() => {
    // Generate confetti pieces
    const colors = [
      "hsl(16, 90%, 55%)", // primary
      "hsl(145, 60%, 45%)", // success
      "hsl(45, 90%, 55%)", // warning
      "hsl(250, 30%, 60%)", // purple
      "hsl(165, 50%, 50%)", // mint
    ];

    const pieces = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)] || colors[0],
    }));

    setConfettiPieces(pieces);

    // Auto close after animation
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="celebration-overlay animate-fade-in" onClick={onClose}>
      {/* Confetti */}
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 rounded-full animate-confetti"
          style={{
            left: `${piece.left}%`,
            top: "-10px",
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}

      {/* Success Card */}
      <div
        className="bg-card rounded-3xl p-8 shadow-soft-xl text-center max-w-sm mx-4 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 animate-check-bounce">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>

        <div className="flex items-center justify-center gap-2 text-warning mb-2">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">축하해요!</span>
          <Sparkles className="w-5 h-5" />
        </div>

        <h2 className="text-2xl font-bold mb-2">Day {day} 완료</h2>
        <p className="text-muted-foreground mb-6">
          {day < 10
            ? `벌써 ${day}일차를 끝냈어요! 내일도 함께 해요 💪`
            : "10일 과정을 모두 마쳤어요! 대단해요! 🎉"}
        </p>

        <Button onClick={onClose} size="lg" className="w-full">
          {day < 10 ? (
            <>
              Day {day + 1} 시작하기
              <ChevronRight className="w-5 h-5" />
            </>
          ) : (
            "학습 완료 확인"
          )}
        </Button>
      </div>
    </div>
  );
}
