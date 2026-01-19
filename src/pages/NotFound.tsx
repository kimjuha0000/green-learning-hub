import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-muted-foreground mb-6">페이지를 찾을 수 없습니다</p>
        <Button onClick={() => navigate("/")}>홈으로 돌아가기</Button>
      </div>
    </div>
  );
}
