import { pretendard } from "@/lib/fonts";
import TableauLineChart from "@/components/TableauLineChart"
import TableauBarChart from "@/components/TableauBarChart"
import TableauMap from "@/components/TableauMap"
import TableauStackedBarChart from "@/components/TableauStackedBarChart"
import MapBox from "@/components/MapBox";
import WordCloud from "@/components/WordCloud";


export default function Home() {
  return (
    <div className={`${pretendard.variable} text-4xl font-medium bg-white text-black`}>
      <div className="flex flex-col">
        <section className="pb-[540px]">
          <div className="flex w-full flex-col">
            <h1 className="text-6xl font-extrabold text-center mt-96">정신과 초진까지... "6달이요?”</h1>
            <p className="text-2xl text-center font-bold p-2">데이터 사이언스와 저널리즘 아카데미 Project6 - zfill(True)</p>
          </div>
        </section>
        <div className="w-full px-4 mx-auto">
          
          <section className="pl-10 pr-20 pb-[100px] flex flex-col items-center">
            <div className="max-w-[900px] w-full">
              <h1 className="text-4xl font-bold mb-4"> 
                ‘다쳤을 때 병원에 가는 것처럼 정신과도 마찬가지’
              </h1>
              <p className="mb-4 text-xl">감기에 걸리거나 몸에 상처가 나면 병원을 찾는 것은 자연스러운 일이다. 이제는 마음이 아플 때도 정신과(정신건강의학과)를 방문하는 것이 점점 더 보편적인 선택이 되고 있다. 과거에는 정신질환을 단순히 의지 부족이나 나약함으로 치부하는 인식이 강했지만, 이제는 이러한 편견이 점차 사라지고 있다. 온라인 커뮤니티에서도 취업 실패나 투자 손실로 인한 우울감을 토로하는 글에 ‘전문가의 상담을 받아보는 게 좋겠다’는 조언이 흔하게 달릴 정도로, 정신 건강 관리에 대한 사회적 공감대가 형성되고 있다.</p>
              <p className="mb-4 text-xl">이 같은 변화는 통계에서도 확인된다. 건강보험심사평가원에 따르면, 정신질환으로 병원을 찾은 환자 수는 2019년 347만 9천 348명에서 2023년 436만 232명으로 4년 새 25.3% 증가했다. 특히 20~30대의 증가세가 두드러진다. 20대 우울증 환자는 2019년 29만 8천 958명에서 2021년 43만 3천 375명으로 45.0% 급증했다.</p>
            </div>

            <div className="w-full flex flex-row items-center justify-center gap-5">
              <div className="flex flex-col justify-center">
                <TableauStackedBarChart />
              </div>
              <div className="flex flex-col justify-center">
                <TableauLineChart />
              </div>
            </div>

            <div className="mt-4 max-w-[900px] w-full">
              <p className="mb-4 text-xl">의료 현장에서도 이러한 변화를 체감하고 있다. 강지인 세브란스병원 정신과 교수는 “정신질환에 대한 사회적 편견이 줄어들면서 정신과의 문턱이 낮아지고 있다”며 “특히 20~30대를 중심으로 ‘정신과에 가도 된다’는 인식이 자리 잡고 있다”고 설명했다.</p>
              <p className="mb-4 text-xl">최근 ‘김하늘 양 사건’에서도 우울증에 대한 대중의 인식 변화를 엿볼 수 있었다. SBS, KBS, MBC, JTBC 방송사의 유튜브 조회수 상위 4개 영상에서 상위 노출 댓글 50개씩, 총 800개를 수집, 분석해보았다. </p>
            </div>
            <WordCloud 
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
            />
            <div className="mt-4 max-w-[900px] w-full">
              <p className="mb-4 text-xl">워드클라우드 분석 결과, 우울증, 정신, 심신 등의 키워드가 상대적으로 두드러지는 것을 확인할 수 있었다. 사건의 원인 또는 비난 대상으로 우울증이 지목됐던 것일까?</p>
              <figure className="flex flex-col items-center mb-4">
                <img src="/images/comment1.png" className=""/>
              </figure>
              <p className="mb-4 text-xl">그러나 댓글들을 하나씩 살펴봤을 때, 그 추측과는 상이한 모습을 볼 수 있었다. 우울증이 언급된 댓글의 44.9%가 ‘우울증에 걸렸다고 해서 범죄를 저지르는 것은 아니다’라며 정신질환에 대한 낙인을 경계했다.</p>
              <figure className="flex flex-col items-center mb-4">
                <img src="/images/comment2.png" className=""/>
              </figure>
              <div className="flex flex-row items-start gap-6">
                <div className="w-1/2">
                  <TableauMap />
                </div>
                <p className="w-1/2 text-xl items-start">
                <br/><br/><br/>이처럼 정신질환에 대한 인식은 개선됐지만, 실제 정신과 진료의 접근성은 여전히 과제로 남아 있다.<br/><br/>
                2023년 건강보험심사평가원 자료에 따르면, 정신과를 진료과목으로 포함하는 요양기관 한 곳당 평균 환자 수는 약 920명이었다. 지역별 편차는 심했다. 경기도 남양주는 한 병원이 약 3,125명의 환자를 수용하고 있었고, 인천 동구(2,451명), 경북 문경(2,337명)도 높은 수준이었다. 반면 인천 옹진군(139명), 전북 임실군(153명)은 상대적으로 환자 수가 적었다. 서울시 강남구는 총 9만 5,954명으로 환자수 전국 1위를 기록했으나, 요양기관 또한 전국 1위인 199곳을 기록하며 요양기관 당 환자수는 약 482명으로 나타났다. 그 뒤를 성남시 분당구, 서울 송파구, 서초구 등이 이었으며 강남구와 마찬가지로 많은 요양기관이 있어 요양기관 당 환자수는 상대적으로 낮게 나타났다.
                </p>
              </div>
            </div>
          </section>
          <section className="pl-10 pr-20 pb-[100px] flex flex-col items-center">
            <div className="max-w-[900px] w-full">
              <h1 className="text-4xl font-bold mb-4"> 
                ‘초진 예약, 정말 어려운가?’
              </h1>
              <p className="mb-4 text-xl">경기도 용인시 수지구에 거주하는 A씨는 상담 치료가 필요하다 생각해 정신과 진료를 받아보기로 결심했다. 하지만 예약 과정에서 난관에 부딪혔다. 어렵게 용기를 내 병원에 전화를 걸었지만, 초진 진료까지 2~3개월을 기다려야 한다는 답변을 받았다.</p>
              <p className="mb-4 text-xl"> 초진이었던 A씨는 여러 선택지 중 의원을 우선 고려했다. 그 이유에 대해 “기침을 하는 게 편도염 때문인지, 목감기 때문인지는 병원에 가야 알 수 있는 것처럼, 정신과에 가서 내 상태를 진단 받고 싶었다.”고 말했다. 이에 따라 취재진은 개원의 정신과를 조사했다.</p>
              <p className="mb-4 text-xl">우선 A씨가 거주 중인 용인 수지구의 정신과를 전수조사해 보았다. 전화 결과, 11곳 중 당일 접수할 수 있는 곳은 없었고, 1일 이상 7일 이하는 3곳, 8일 이상 15일 이하는 1곳, 16일 이상 30일 이하는 3곳, 30일 초과는 4곳이었다.  취재진이 A 씨의 입장에서 병원 리뷰를 분석한 결과, 예약이 가장 빠른 병원은 상담 없이 약 처방을 하는 곳이었고, 예약이 가장 오래 걸리는 곳은 재진 환자들이 너무 많아 초진 환자는 무려 101일, 즉 3달 넘게 기다려야 했다. </p>
              <figure className="flex flex-col items-center mb-4">
                <img src="/images/delay.png" className=""/>
              </figure>
              <p className="mb-4 text-xl">전국적으로도 상황이 비슷할까? 전국 정신과 의원을 지역 별로 무작위로 선정해 180여 곳에 전화해 본 결과, 응답한 병원 중 절반 이상은 당일 접수가 가능했다. 그러나 1달부터 3달까지 대기해야 하는 곳도 있었으며 전주 덕진구의 한 의원은 6달을 기다려야 한다고 했다.</p>
              <div className="w-full flex justify-center">
                <div className="w-full max-w-[700px]">
                  <TableauBarChart />
                </div>
              </div>
              <p className="mb-4 text-xl">당일에 초진을 잡을 수 있던 곳은 상담 치료보단 약 처방 중심이거나 과잉 진료가 의심되는 병원이 적지 않은 비중을 차지했다. 그래서 이를 제외하고 다른 의원들에 전화를 걸었다. 그러나 한 의원은 예약이 이미 가득 차 있어 3~4달을 기다려야 했고, 또 다른 의원은 초진 비용이 10만 원에 달했다. 초진 시 진행되는 검사 여부 및 종류에 따라 병원 별 금액 편차가 컸다.</p>
              <p className="mb-4 text-xl">이처럼 리뷰가 양호한 의원들은 대부분 대기 시간이 길거나 비용이 높아 쉽게 접근하기 어려웠다. 정신과 상담은 내과나 정형외과 등 다른 진료 과목보다 일상에서의 인지적 거리가 멀다. 따라서 초진 환자들은 후기에 더욱 의존할 수밖에 없고, 이에 따라 세심하게 의원을 고르다 보면 자연스럽게 특정 의원으로 사람이 몰려 초진까지 몇 달을 기다려야 하는 상황이 생긴 것으로 추측할 수 있다. </p>
            </div>
          </section>

          <section className="pl-10 pr-20 pb-[100px] flex flex-col items-center">
            <div className="max-w-[900px] w-full">
              <h1 className="text-4xl font-bold mb-4"> 
                정신과, 상담센터, 정신건강복지센터… 어디로 가야하나?
              </h1>
              <p className="mb-4 text-xl">정신과 진료의 장벽을 더 알아보기 위해, 정신과 진료를 희망하는 사람들이 이용하는 지식인(Q&A 커뮤니티)을 조사했다. 분석 결과, 정신과 관련 질문에서 ‘치료’와 ‘병원’이 높은 비중을 차지했다. 이는 많은 이들이 진료 기관 선택에서 어려움을 겪고 있음을 보여준다.</p>
            </div>

            <div className="w-full flex flex-row justify-center gap-5 items-start mb-4">
            
              <div className="flex flex-col justify-center">
                <WordCloud 
                  path="/data/questions.json" 
                  title={<>네이버 지식iN '정신과 상담', '정신과 진료'<br />키워드 검색 기반 질문 워드 클라우드</>} 
                  description={<>네이버 지식iN에서 '정신과 상담', '정신과 진료'의 최신순 검색 결과 중<br/>4000건의 질문 제목, 본문을 수집하여, 명사 키워드를 추출한 뒤 워드 클라우드로 재구성함</>}
                /> 
              </div>

              <div className="flex flex-col justify-center">
                <img src="/images/question.png" className="max-w-[700px]"/>
              </div>
            </div>
    
            <div className="max-w-[900px] w-full">
              <p className="mb-4 text-xl">정신과 상담을 받을 수 있는 곳은 크게 세 곳으로 나뉜다. 개원의, 민간 상담센터, 그리고 보건소에서 운영하는 정신건강복지센터다. 정신과 진료를 처음 접하는 개인들은 정신과, 상담센터, 정신건강복지센터 중 어떤 곳이 자신의 필요에 맞는지 모르는 경우가 많았다. 세 곳은 어떻게 다를까? 취재진이 직접 방문해 세 곳을 비교했다.</p>
            </div>
          </section>
        </div>
      </div>
      {/* <div className="w-full flex flex-row items-center justify-center gap-5">
        <div className="flex flex-col justify-center">
          <TableauStackedBarChart />
          <figcaption className="mt-2 text-gray-600 text-center text-sm">
            2022년 SBS 지방선거 개표방송 (출처: 스브스 뉴스)
          </figcaption>
        </div>
        <div className="flex flex-col justify-center">
          <TableauLineChart />
          <figcaption className="mt-2 text-gray-600 text-center text-sm">
            2022년 SBS 지방선거 개표방송 (출처: 스브스 뉴스)
          </figcaption>
        </div>
      </div> */}
      {/* <TableauStackedBarChart/>
      <TableauMap/>
      <TableauLineChart/>
      <TableauBarChart/> */}
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
