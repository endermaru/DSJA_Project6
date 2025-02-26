"use client";
import { pretendard } from "@/lib/fonts";
import { useState } from "react";
import MapBox from "@/components/MapBox";
import Image from "next/image";

export default function MapPage() {
  const [showInstruction, setShowInstruction] = useState(true);

  return (
    <div className={`${pretendard.variable} text-4xl elative w-screen h-screen font-bold bg-white`}>
      {/* 안내사항 이미지 (클릭하면 사라짐) */}
      {/* {showInstruction && (
        <div
          className="absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setShowInstruction(false)}
        >
          <Image
            src="/images/instruction.jpg"
            alt="안내사항"
            layout="fill"
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
      )} */}

      <MapBox />
    </div>
  );
}
