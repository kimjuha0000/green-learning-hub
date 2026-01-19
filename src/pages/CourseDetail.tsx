import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CourseDetail() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">강의 상세</h1>
        <Button onClick={() => navigate("/courses")}>커리큘럼으로 이동</Button>
      </div>
    </div>
  );
}
