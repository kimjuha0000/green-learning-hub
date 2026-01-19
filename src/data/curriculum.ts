// 10-day Figma course curriculum data
export interface LessonDay {
  day: number;
  title: string;
  goal: string;
  videoUrl: string;
  videoDuration: string;
  action: {
    instruction: string;
    type: "text" | "checkbox" | "choice";
    placeholder?: string;
    options?: string[];
  };
}

export const curriculum: LessonDay[] = [
  {
    day: 1,
    title: "피그마와의 첫 만남",
    goal: "피그마가 뭔지, 왜 배워야 하는지 알아봐요",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoDuration: "3분",
    action: {
      instruction: "피그마를 배우고 싶은 이유를 한 줄로 적어보세요",
      type: "text",
      placeholder: "예: 앱 디자인을 직접 해보고 싶어서",
    },
  },
  {
    day: 2,
    title: "캔버스 탐험하기",
    goal: "피그마 화면 구성과 기본 도구를 익혀요",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoDuration: "3분",
    action: {
      instruction: "피그마에서 가장 먼저 해보고 싶은 것은?",
      type: "choice",
      options: ["도형 그리기", "텍스트 넣기", "이미지 넣기", "색상 바꾸기"],
    },
  },
  {
    day: 3,
    title: "프레임의 마법",
    goal: "프레임을 만들고 활용하는 법을 배워요",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoDuration: "3분",
    action: {
      instruction: "오늘 배운 프레임 개념을 이해했나요?",
      type: "checkbox",
    },
  },
  {
    day: 4,
    title: "도형과 친해지기",
    goal: "사각형, 원, 선 등 기본 도형을 다뤄요",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoDuration: "3분",
    action: {
      instruction: "어떤 도형을 가장 많이 사용할 것 같나요?",
      type: "choice",
      options: ["사각형", "원", "선", "다각형"],
    },
  },
  {
    day: 5,
    title: "텍스트 다루기",
    goal: "폰트, 크기, 스타일을 자유자재로 바꿔요",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoDuration: "3분",
    action: {
      instruction: "가장 마음에 드는 폰트 스타일은?",
      type: "choice",
      options: ["모던한 산세리프", "클래식한 세리프", "손글씨 스타일", "굵은 볼드체"],
    },
  },
  {
    day: 6,
    title: "색상의 세계",
    goal: "색상 선택과 그라데이션을 배워요",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoDuration: "3분",
    action: {
      instruction: "오늘 배운 색상 도구 중 가장 유용했던 것은?",
      type: "text",
      placeholder: "예: 스포이드 도구가 편리했어요",
    },
  },
  {
    day: 7,
    title: "레이어 정복하기",
    goal: "레이어 순서와 그룹을 관리해요",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoDuration: "3분",
    action: {
      instruction: "레이어 개념을 이해했나요?",
      type: "checkbox",
    },
  },
  {
    day: 8,
    title: "컴포넌트 입문",
    goal: "재사용 가능한 컴포넌트를 만들어요",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoDuration: "3분",
    action: {
      instruction: "컴포넌트를 어디에 활용하고 싶나요?",
      type: "text",
      placeholder: "예: 버튼을 컴포넌트로 만들고 싶어요",
    },
  },
  {
    day: 9,
    title: "프로토타입 맛보기",
    goal: "클릭하면 움직이는 프로토타입을 만들어요",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoDuration: "3분",
    action: {
      instruction: "프로토타입 기능이 유용할 것 같나요?",
      type: "checkbox",
    },
  },
  {
    day: 10,
    title: "나만의 첫 작품",
    goal: "배운 것을 활용해 간단한 UI를 만들어요",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoDuration: "3분",
    action: {
      instruction: "10일간의 학습을 마친 소감을 남겨주세요",
      type: "text",
      placeholder: "예: 피그마가 생각보다 재미있었어요!",
    },
  },
];

export const getDayStatus = (
  day: number,
  completedDays: number[]
): "completed" | "available" | "locked" => {
  if (completedDays.includes(day)) return "completed";
  if (day === 1 || completedDays.includes(day - 1)) return "available";
  return "locked";
};
