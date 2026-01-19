import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Auth() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">로그인</h1>
        <p className="text-muted-foreground mb-4">진행 상황을 저장하려면 로그인하세요</p>
        <Button onClick={() => navigate("/")}>홈으로 돌아가기</Button>
      </div>
    </div>
  );
}
