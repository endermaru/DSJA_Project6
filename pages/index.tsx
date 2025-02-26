import { pretendard } from "@/lib/fonts";
import TableauLineChart from "@/components/TableauLineChart"
import TableauBarChart from "@/components/TableauBarChart"
import TableauMap from "@/components/TableauMap"
import TableauStackedBarChart from "@/components/TableauStackedBarChart"
import MapBox from "@/components/MapBox";
import WordCloud from "@/components/WordCloud";


export default function Home() {
  return (
    <div className={`${pretendard.variable} text-4xl font-bold bg-white`}>
      {/* <TableauStackedBarChart/>
      <TableauMap/>
      <TableauLineChart/>
      <TableauBarChart/> */}
      <MapBox/>
      {/* <WordCloud 
        path="/data/questions.json" 
        title={
          <>
            네이버 지식iN '정신과 상담', '정신과 진료'<br />키워드 검색 기반 질문 워드 클라우드
          </>
        } 
        description={
          <>
            네이버 지식iN에서 '정신과 상담', '정신과 진료'의 최신순 검색 결과 중<br/>4000건의 질문 제목, 본문을 수집하여, 명사 키워드를 추출한 뒤 워드 클라우드로 재구성함
          </>
        }
      /> */}

      {/* <WordCloud 
        path="/data/comments.json" 
        title={
          <>
            주요 방송사의 '대전 초등학생 피살 사건'<br/> 관련 유튜브 영상의 상위 노출 댓글 워드 클라우드
          </>
        } 
        description={
          <>
            '대전 초등학생 피살 사건'을 다룬 SBS, KBS, MBC, JTBC의 유튜브 조회수 상위 4개 영상(총 20개)에서<br/>상위 노출 댓글 50개씩, 총 800개를 수집하여, 명사 키워드를 추출한 뒤 워드 클라우드로 재구성함
          </>
        }
      /> */}

    </div>
  );
}
