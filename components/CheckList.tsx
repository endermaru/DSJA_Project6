"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { pretendard } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const questions = [
  {
    text: "내가 병원을 갈 정도인지 가볍게 확인하고 싶다.",
    scores: { clinic: 0, counseling: 2, center: 3 },
  },
  {
    text: "상담을 받고 싶지만 비용이 부담된다.",
    scores: { clinic: 0, counseling: 0, center: 3 },
  },
  {
    text: "비용을 조금 더 들이더라도 전문적 검사와 진단을 통해 내 상태를 정확히 알고 싶다.",
    scores: { clinic: 2, counseling: 2, center: 0 },
  },
  {
    text: "불안, 우울감이 일상에 지장을 주기 시작했다.",
    scores: { clinic: 3, counseling: 1, center: 0 },
  },
  {
    text: "의원을 가면 진료 기록이 남지만, 제3자가 열람할 수 없어 취업 등에 영향을 줄까 걱정할 필요는 없다. 그럼에도 완전히 비공개된 상담을 원한다.",
    scores: { clinic: 0, counseling: 2, center: 2 },
  },
  {
    text: "약물 치료로 효과를 빠르게 보고 싶다.",
    scores: { clinic: 4, counseling: 0, center: 0 },
  },
  {
    text: "우울감이나 불안이 있지만, 상담만으로도 해결할 수 있을 것 같거나 상담으로 해결하고 싶다.",
    scores: { clinic: 0, counseling: 2, center: 1 },
  },
];

const results = {
  clinic: "정신과 의원을 추천합니다",
  counseling: "심리상담센터를 추천합니다",
  center: "정신건강복지센터를 추천합니다",
};

export default function Checklist() {
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (index: number) => {
    setSelected((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const calculateResult = () => {
    let scores = { clinic: 0, counseling: 0, center: 0 };
    let hasSelection = false; // 체크된 항목이 있는지 확인
  
    Object.keys(selected).forEach((key) => {
      if (selected[Number(key)]) {
        hasSelection = true; // 체크된 항목이 하나라도 있으면 true
        const qIndex = Number(key);
        scores.clinic += questions[qIndex].scores.clinic;
        scores.counseling += questions[qIndex].scores.counseling;
        scores.center += questions[qIndex].scores.center;
      }
    });
  
    if (!hasSelection) {
      setError("선택지를 하나 이상 체크해주세요.");
      setResult(null);
      return;
    }
  
    setError(null); // 에러 초기화
  
    const highest = Object.entries(scores).reduce(
      (a, b) => (b[1] > a[1] ? b : a)
    )[0] as keyof typeof results;
  
    setResult(results[highest]);
  };

  return (
    <div className={`${pretendard.variable} w-2/3 mx-auto space-y-4`}>
      <Card>
        <CardContent className="p-6 flex flex-col">
          <h2 className="text-3xl font-extrabold mb-2">📝 정신건강지원기관 체크리스트</h2>
          <h2 className="text-xl font-bold mb-4">당신에게 맞는 기관을 추천해드립니다.</h2>
          {questions.map((q, index) => (
            <div key={index} className="flex items-start space-x-2 py-3">
              <Checkbox
                checked={!!selected[index]}
                onCheckedChange={() => handleSelect(index)}
                className={cn(
                    "w-5 h-5 border-gray-400 rounded-md transition-colors",
                    "hover:border-green-600 hover:ring-2 hover:ring-green-300",
                    "data-[state=checked]:bg-green-700 data-[state=checked]:border-green-00 data-[state=checked]:text-white"
                  )}
                />
              <label className="text-lg leading-snug">{q.text}</label>
            </div>
          ))}
            <Button
            onClick={calculateResult}
            className="w-fit mx-auto px-6 py-2 bg-emerald-500 text-white font-semibold rounded-md transition-colors hover:bg-emerald-700 active:bg-emerald-800"
            >
            결과 확인
            </Button>

          {result && <p className="mt-4 text-xl font-bold text-center">{result}</p>}
          {error && <p className="mt-4 text-xl font-bold text-red-600 text-center">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
