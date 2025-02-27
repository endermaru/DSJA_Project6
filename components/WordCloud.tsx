import React, { useEffect, useRef, useState, ReactNode } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import { pretendard } from "@/lib/fonts";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";

interface Word {
  text: string;
  value: number;
  freq: number;
}

interface WordCloudDatum {
  text: string;
  size: number;
  freq: number;
  x?: number;
  y?: number;
  rotate?: number;
}

interface WordCloudProps {
  path: string;
  title: ReactNode;
  description: ReactNode;
}

const WordCloud: React.FC<WordCloudProps> = ({ path, title, description }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [selectedWord, setSelectedWord] = useState<WordCloudDatum | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!path) return;

    fetch(path)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          console.error("Error: No data found!");
          return;
        }

        const rawValues = data.map((item: { freq: number }) => item.freq);
        const sizeScale = d3.scaleLinear()
          .domain([Math.min(...rawValues), Math.max(...rawValues)])
          .range([20, 100]);

        const formattedWords = data.map((item: { keyword: string; freq: number }) => ({
          text: item.keyword,
          value: sizeScale(item.freq),
          freq: item.freq
        }));

        setWords(formattedWords);
      })
      .catch((err) => console.error("Failed to load word cloud data", err));
  }, [path]);

  useEffect(() => {
    if (!words.length) return;

    const width = 700;
    const height = 500;

    const layout = cloud<WordCloudDatum>()
      .size([width, height])
      .spiral("archimedean")
      .words(words.map((d) => ({ text: d.text, size: d.value, freq: d.freq })))
      .padding(5)
      .rotate(() => (Math.random() > 0.4 ? 0 : 90))
      .font("Pretendard")
      .fontSize((d) => d.size)
      .on("end", draw);

    layout.start();

    function draw(words: WordCloudDatum[]) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const group = svg
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      group.selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
        .style("font-family", "Pretendard, sans-serif")
        .style("font-weight", "800")
        .attr("text-anchor", "middle")
        .attr("transform", (d) => `translate(${d.x ?? 0}, ${d.y ?? 0}) rotate(${d.rotate ?? 0})`)
        .text((d) => d.text)
        .on("mouseover", (_, d) => setSelectedWord(d))
        .on("mousemove", (event) => {
          setTooltipPos({ x: event.clientX, y: event.clientY });
        })
        .on("mouseout", () => setSelectedWord(null));
    }
  }, [words]);

  return (
    <div className="flex flex-col w-[710px]">
      {/* 제목 */}
      <h2 className="text-2xl font-bold text-black text-left mb-2">{title}</h2>

      {/* 기존 컨테이너 */}
      <div className="relative w-full h-[510px]">
        {/* SVG (D3 Word Cloud) */}
        <svg
          ref={svgRef}
          className={`${pretendard.variable} bg-transparent`}
          viewBox="0 0 700 500"
          preserveAspectRatio="xMidYMid meet"
          width="700"
          height="500"
          style={{ background: "none" }}
        ></svg>

        {/* ShadCN Tooltip (빈도수만 표시, 마우스 따라 이동) */}
        {selectedWord && (
          <Tooltip open={!!selectedWord}>
            <TooltipContent
              side="top"
              align="center"
              className="absolute bg-white p-2 shadow-lg rounded-md text-lg text-black whitespace-nowrap animate-in fade-in"
              style={{
                left: `${tooltipPos.x}px`,
                top: `${tooltipPos.y}px`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <p className="font-bold">{selectedWord.text}</p>
              <p>빈도수: {selectedWord.freq}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* 출처 */}
      <p className="mt-2 text-sm text-gray-600 text-right mr-4">{description}</p>

    </div>

  );
};

export default WordCloud;
