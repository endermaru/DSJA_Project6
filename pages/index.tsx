"use client";

import { motion } from "framer-motion";
import { pretendard } from "@/lib/fonts";
import TableauLineChart from "@/components/TableauLineChart"
import TableauBarChart from "@/components/TableauBarChart"
import TableauMap from "@/components/TableauMap"
import TableauStackedBarChart from "@/components/TableauStackedBarChart"
import MapBox from "@/components/MapBox";
import WordCloud from "@/components/WordCloud";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Checklist from "@/components/CheckList";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


export default function Home() {

  // 페이드인 애니메이션 정의
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.8, duration: 1, ease: "easeOut" },
    }),
  };

  const router = useRouter();

  return (
    <div className={`${pretendard.variable} w-screen text-4xl font-medium text-black relative bg-white`}>
      
      <div className="flex flex-col w-full">
        <section className="pb-[500px]">
          <img src="/images/main.png" className="absolute top-0 left-0 w-full h-auto max-h-none object-cover z-[1]" />
          <div className="flex w-full h-screen flex-col justify-start sm:justify-center items-start pl-4 sm:pl-8 md:pl-12 lg:pl-16 text-white">
            <motion.h1
              className="
                text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl
                font-bold text-left
                mt-12 sm:mt-16 md:mt-20 lg:mt-24
                mb-6 sm:mb-8 md:mb-12 lg:mb-16
                z-[2]
              "
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              custom={0.5}
            >
              정신과 초진까지...
            </motion.h1>

            <motion.h1
              className="
                text-[28px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[120px]
                font-extrabold text-left
                mb-8 sm:mb-12 md:mb-16 lg:mb-32
                z-[2]
              "
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              custom={2.5}
            >
              “ 6달이요? ”
            </motion.h1>

            <motion.h1
              className="
                text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
                font-bold text-left
                leading-snug
                mb-12 sm:mb-16 md:mb-24 lg:mb-32
                z-[2]
              "
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              정신질환 환자 436만명 시대,<br />
              나에게 맞는 정신건강지원기관은?
            </motion.h1>
          </div>


        </section>
        <div className="w-full px-4 mx-auto">
          
          <section className="pl-10 pr-20 pb-[100px] flex flex-col items-center">
            <div className="max-w-[900px] w-full">
              <h1 className="text-4xl font-bold mb-8"> 
                ‘다쳤을 때 병원에 가는 것처럼 정신과도 마찬가지’
              </h1>
              <p className="mb-16 text-xl text-justify">감기에 걸리거나 몸에 상처가 나면 병원을 찾는 것은 자연스러운 일이다. 이제는 마음이 아플 때도 정신과(정신건강의학과)를 방문하는 것이 점점 더 보편적인 선택이 되고 있다. 과거에는 정신질환을 단순히 의지 부족이나 나약함으로 치부하는 인식이 강했지만, 이제는 이러한 편견이 점차 사라지고 있다. 온라인 커뮤니티에서도 취업 실패나 투자 손실로 인한 우울감을 토로하는 글에 ‘전문가의 상담을 받아보는 게 좋겠다’는 조언이 흔하게 달릴 정도로, 정신 건강 관리에 대한 사회적 공감대가 형성되고 있다.</p>
              <p className="mb-4 text-xl text-justify">이 같은 변화는 통계에서도 확인된다. 건강보험심사평가원에 따르면, 정신질환으로 병원을 찾은 환자 수는 2019년 347만 9천 348명에서 2023년 436만 232명으로 4년 새 25.3% 증가했다. 특히 20~30대의 증가세가 두드러진다. 20대 우울증 환자는 2019년 29만 8천 958명에서 2021년 43만 3천 375명으로 45.0% 급증했다.</p>
            </div>

            <div className="w-full flex flex-col items-center justify-center gap-1">
              <div className="flex flex-col justify-center">
                <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                  <TableauLineChart />
                </motion.div>
              </div>
              <div className="flex flex-col justify-center">
                <motion.div
                  variants={fadeInVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <TableauStackedBarChart />
                </motion.div>
              </div>
              
            </div>

            <div className="mt-16 max-w-[900px] w-full">
              <p className="mb-16 text-xl text-justify">의료 현장에서도 이러한 변화를 체감하고 있다. 강지인 세브란스병원 정신과 교수는 “정신질환에 대한 사회적 편견이 줄어들면서 정신과의 문턱이 낮아지고 있다”며 “특히 20~30대를 중심으로 ‘정신과에 가도 된다’는 인식이 자리 잡고 있다”고 설명했다.</p>
              <p className="mb-8 text-xl text-justify">최근 ‘김하늘 양 사건’에서도 우울증에 대한 대중의 인식 변화를 엿볼 수 있었다. SBS, KBS, MBC, JTBC 방송사의 유튜브 조회수 상위 4개 영상에서 상위 노출 댓글 50개씩, 총 800개를 수집, 분석해보았다. </p>
            </div>
            <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
              <WordCloud 
                path="/data/comments.json" 
                title={
                  <>
                    주요 방송사의 ‘김하늘 양 사건’<br/> 관련 유튜브 영상의 상위 노출 댓글 워드 클라우드
                  </>
                } 
                description={
                  <>
                    ‘김하늘 양 사건’을 다룬 SBS, KBS, MBC, JTBC의 유튜브 조회수 상위 4개 영상(총 20개)에서<br/>상위 노출 댓글 50개씩, 총 800개를 수집하여, 명사 키워드를 추출한 뒤 워드 클라우드로 재구성함
                  </>
                }
              />
            </motion.div>
            <div className="mt-8 max-w-[900px] w-full">
              <p className="mb-8 text-xl text-justify">워드클라우드 분석 결과, 우울증, 정신, 심신 등의 키워드가 상대적으로 두드러지는 것을 확인할 수 있었다. 사건의 원인 또는 비난 대상으로 우울증이 지목됐던 것일까?</p>
              <figure className="flex flex-col items-center mb-8">
                <img src="/images/comment1.png" className=""/>
                <figcaption className="mt-2 text-gray-600 text-center text-sm">
                  출처: MBC 유튜브 댓글
                </figcaption>
              </figure>
              <p className="mb-8 text-xl text-justify">그러나 댓글들을 하나씩 살펴봤을 때, 그 추측과는 상이한 모습을 볼 수 있었다. 우울증이 언급된 댓글의 44.9%가 ‘우울증에 걸렸다고 해서 범죄를 저지르는 것은 아니다’라며 정신질환에 대한 낙인을 경계했다.</p>
              <figure className="flex flex-col items-center mb-8">
                <img src="/images/comment2.png" className=""/>
                <figcaption className="mt-2 text-gray-600 text-center text-sm">
                  출처: SBS, MBC 유튜브 댓글
                </figcaption>
              </figure>
              <p className="mb-8 text-xl text-justify">이처럼 정신질환에 대한 인식은 개선됐지만, 실제 정신과 진료의 접근성은 여전히 과제로 남아 있다.</p>
            </div>
          </section>
          <section className="pl-10 pr-20 pb-[100px] flex flex-col items-center">
            <div className="max-w-[900px] w-full">
              <h1 className="text-4xl font-bold mb-8"> 
                초진 예약, 정말 어려운가?
              </h1>
              <p className="mb-8 text-xl text-justify">경기도 용인시 수지구에 거주하는 A씨는 상담 치료가 필요하다 생각해 정신과 진료를 받아보기로 결심했다. 하지만 예약 과정에서 난관에 부딪혔다. 어렵게 용기를 내 병원에 전화를 걸었지만, 초진 진료까지 2~3개월을 기다려야 한다는 답변을 받았다.</p>
              <p className="mb-8 text-xl text-justify"> 초진이었던 A씨는 여러 선택지 중 의원을 우선 고려했다. 그 이유에 대해 “기침을 하는 게 편도염 때문인지, 목감기 때문인지는 병원에 가야 알 수 있는 것처럼, 정신과에 가서 내 상태를 진단 받고 싶었다.”고 말했다. 이에 따라 취재진은 개원의 정신과를 조사했다.</p>
              <p className="mb-8 text-xl text-justify">우선 A씨가 거주 중인 용인 수지구의 정신과를 전수조사해 보았다. 전화 결과, 11곳 중 당일 접수할 수 있는 곳은 없었고, 1일 이상 7일 이하는 3곳, 8일 이상 15일 이하는 1곳, 16일 이상 30일 이하는 3곳, 30일 초과는 4곳이었다.  취재진이 A 씨의 입장에서 병원 리뷰를 분석한 결과, 예약이 가장 빠른 병원은 상담 없이 약 처방을 하는 곳이었고, 예약이 가장 오래 걸리는 곳은 재진 환자들이 너무 많아 초진 환자는 무려 101일, 즉 3달 넘게 기다려야 했다. </p>
              <figure className="flex flex-col items-center mb-8">
                <motion.div
                        variants={fadeInVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                      >
                  <img src="/images/info1.png" className=""/>
                </motion.div>
              </figure>
              <p className="mb-8 text-xl text-justify">전국적으로도 상황이 비슷할까? 전국 정신과 의원을 지역 별로 무작위로 선정해 180여 곳에 전화해 본 결과, 응답한 병원 중 절반 이상은 당일 접수가 가능했다. 그러나 1달부터 3달까지 대기해야 하는 곳도 있었으며 전주 덕진구의 한 의원은 6달을 기다려야 한다고 했다.</p>
              <div className="w-full flex justify-center">
                <div className="w-full max-w-[700px]">
                  <motion.div
                      variants={fadeInVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                    >
                    <TableauBarChart />
                  </motion.div>
                </div>
              </div>
              <p className="mb-8 text-xl text-justify mt-10">시설 부족으로 인해 초진 대기 기간의 편차가 생기는 것일까? 이에 본지는 시군구별 요양기관당 평균 환자 수 분포를 분석해봤다.</p>
              <div className="flex flex-row items-start gap-6">
                <div className="w-1/2">
                  <motion.div
                        variants={fadeInVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                      >
                    <TableauMap />
                  </motion.div>
                </div>
                <p className="w-1/2 text-xl items-start text-justify">
                <br/><br/>2023년 건강보험심사평가원 자료에 따르면, 정신과를 진료과목으로 포함하는 요양기관 한 곳당 평균 환자 수는 약 920명이었다.<br/><br/>
                경기도 남양주는 한 병원이 약 3,125명의 환자를 수용하고 있었고, 인천 동구(2,451명), 경북 문경(2,337명)도 높은 수준이었다.
                반면 인천 옹진군(139명), 전북 임실군(153명)은 상대적으로 환자 수가 적었다. 서울시 강남구는 총 9만 5,954명으로 환자수 전국 1위를 기록했으나,
                요양기관 또한 전국 1위인 199곳을 기록하며 요양기관 당 환자수는 약 482명으로 나타났다. 그 뒤를 성남시 분당구, 서울 송파구, 서초구 등이 이었으며 
                강남구와 마찬가지로 많은 요양기관이 있어 요양기관 당 환자수는 상대적으로 낮게 나타났다. <br/><br/>
                허나 요양기관과 환자 수는 지역별 편차가 심했고, A씨가 거주하는 용인시 수지구는 요양기관 당 평균 환자수 742명을 기록하며
                평균보다 낮은 수치를 기록하여 환자 수 대비 시설 개수만으로 원인을 단정 짓기 어려웠다.
                </p>
              </div>
              <p className="mb-16 text-xl mt-10 text-justify">그렇다면 용인 수지구만 초진 대기일이 길었던 걸까? SBS 본사가 위치한 오목교역 부근에서 정신과 초진 예약을 시도해보았다. 데이터 상 양천구는 ‘당일 접수’가 가능해 접근성이 높은 편으로 보였기 때문이다.</p>
              <p className="mb-8 text-xl text-justify">하지만 현실은 달랐다.</p>
              <figure className="flex flex-col items-center mb-8">
                <motion.div
                          variants={fadeInVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.2 }}
                        >
                    <img src="/images/info2.png" className=""/>
                  </motion.div>
              </figure>
              <p className="mb-8 text-xl text-justify">당일에 초진을 잡을 수 있던 곳은 상담 치료보단 약 처방 중심이거나 과잉 진료가 의심되는 병원이 적지 않은 비중을 차지했다. 그래서 이를 제외하고 다른 의원들에 전화를 걸었다. 그러나 한 의원은 예약이 이미 가득 차 있어 3~4달을 기다려야 했고, 또 다른 의원은 초진 비용이 10만 원에 달했다. 초진 시 진행되는 검사 여부 및 종류에 따라 병원 별 금액 편차가 컸다.</p>
              <p className="mb-8 text-xl text-justify">이처럼 리뷰가 양호한 의원들은 대부분 대기 시간이 길거나 비용이 높아 쉽게 접근하기 어려웠다. 정신과 상담은 내과나 정형외과 등 다른 진료 과목보다 일상에서의 인지적 거리가 멀다. 따라서 초진 환자들은 후기에 더욱 의존할 수밖에 없고, 이에 따라 세심하게 의원을 고르다 보면 자연스럽게 특정 의원으로 사람이 몰려 초진까지 몇 달을 기다려야 하는 상황이 생긴 것으로 추측할 수 있다. </p>
            </div>
          </section>

          <section className="pl-10 pr-20 pb-[30px] flex flex-col items-center">
            <div className="max-w-[900px] w-full">
              <h1 className="text-4xl font-bold mb-8"> 
                정신과, 상담센터, 정신건강복지센터… 어디로 가야하나?
              </h1>
              <p className="mb-8 text-xl mb-8  text-justify">정신과 진료의 장벽을 더 알아보기 위해, 정신과 진료를 희망하는 사람들이 이용하는 지식인(Q&A 커뮤니티)을 조사했다. 분석 결과, 정신과 관련 질문에서 ‘치료’와 ‘병원’이 높은 비중을 차지했다. 이는 많은 이들이 진료 기관 선택에서 어려움을 겪고 있음을 보여준다.</p>
            </div>
            
              <div className="w-full flex flex-col justify-center gap-1 items-center mb-16">
                <motion.div
                          variants={fadeInVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.2 }}
                        >
                  <div className="flex flex-col justify-center mb-8">
                    <WordCloud 
                      path="/data/questions.json" 
                      title={<>네이버 지식iN ‘정신과 상담’, ‘정신과 진료’<br />키워드 검색 기반 질문 워드 클라우드</>} 
                      description={<>네이버 지식iN에서 ‘정신과 상담’, ‘정신과 진료’의 최신순 검색 결과 중<br/>4000건의 질문 제목, 본문을 수집하여, 명사 키워드를 추출한 뒤 워드 클라우드로 재구성함</>}
                    /> 
                  </div>
                </motion.div>

                <div className="flex flex-col justify-center">
                  <img src="/images/question.png" className="max-w-[650px]"/>
                  <figcaption className="mt-2 text-gray-600 text-center text-sm">
                  정신과(의원)과 상담센터를 고민하는 질문들 - 출처: 네이버 지식iN
                  </figcaption>
                </div>
              </div>
            
    
            <div className="max-w-[900px] w-full">
              <p className="mb-4 text-xl text-justify">정신과 상담을 받을 수 있는 곳은 크게 세 곳으로 나뉜다. 개원의, 민간 상담센터, 그리고 보건소에서 운영하는 정신건강복지센터다. 정신과 진료를 처음 접하는 개인들은 정신과, 상담센터, 정신건강복지센터 중 어떤 곳이 자신의 필요에 맞는지 모르는 경우가 많았다. 세 곳은 어떻게 다를까? 취재진이 직접 방문해 세 곳을 비교했다.</p>
            </div>
          </section>
          <section className="pl-10 pr-20 pb-[50px] flex flex-col items-center ">
            <p className="mb-4 text-lg font-regular text-justify items-start">↓ 탭을 클릭하여 각 기관 방문기를 확인하세요 ↓</p>
            <Tabs defaultValue="tab1" className="w-full max-w-[900px] bg-gray-200 p-5 border rounded-lg">
              <TabsList className="flex justify-start space-x-2 bg-gray-200">
                <TabsTrigger value="tab1"
                  className="bg-gray-100 text-gray-500 hover:bg-gray-300 data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  <p className="text-lg font-extrabold">정신건강복지센터</p></TabsTrigger>
                <TabsTrigger value="tab2"
                  className="bg-gray-100 text-gray-500 hover:bg-gray-300 data-[state=active]:bg-sky-500 data-[state=active]:text-white"
                  >
                  <p className="text-lg font-extrabold">심리상담센터</p>
                </TabsTrigger>
                <TabsTrigger value="tab3"
                  className="bg-gray-100 text-gray-500 hover:bg-gray-300 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                >
                  <p className="text-lg font-extrabold">정신과 의원</p></TabsTrigger>
                
              </TabsList>

              {/* 🟢 각 탭에 대한 내용 */}
              <TabsContent value="tab1">
                <section className="bg-white rounded-lg p-8">
                  <h2 className="text-4xl font-bold pb-10">“내가 병원을 가봐야 하는지 알고 싶어요.”<br/>- 정신건강복지센터 방문기</h2>
                  <div className="grid grid-cols-2 gap-6 pb-5 items-start">
                    <p className="mb-8 text-xl text-justify items-start">취재진이 처음으로 방문한 곳은 보건소에 운영하는 정신건강복지센터였다. 정신건강복지센터의 상담소는 직원들의 사무실 기준 왼쪽 벽에 4곳 존재했다. 상담소 내부 인테리어는 내담자들을 고려한 것 때문인지 아득하고 따뜻했다. 그러나 방음이 제대로 되지 않아 본인의 상담 내용이 다른 사람에게 들리는 것에 민감한 사람들에게는 많이 불편할 수 있다.</p>
                    <div>
                      <img src="images/pic_1_1.jpg"></img>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 pb-5 items-start">
                    <div>
                      <img src="images/pic_1_2.jpg"></img>
                    </div>
                    <p className="mb-8 text-xl text-justify items-start"> 상담사는 매우 친절했다. 직장 내 스트레스, 지금까지 마음에 담아두었던 응어리 등을 전부 풀어내게끔 유도하고, 공감하며 내담자가 안정을 취하게 했다. 상담은 약 20분 정도 진행된다. 이후 내담자의 상태가 어떤지 확인하기 위해 검사지를 작성한다. 이때 상담사는 자리를 비켜준다. 검사지는 대략 15~20분 정도 소요된다. </p>
                  </div>
                  <p className="mb-8 text-xl text-justify items-start">
                    상담 결과는 종합 결과지, 세부 결과지, 키워드 결과지 총 3분야로 나온다. 이 결과 내용과 앞서 했던 상담 내용을 바탕으로 상당사가 내담자의 상태에 대해 설명한다. 이후 상담사는 환자에게 알맞는 치료 방법을 설명한다. 심하지 않을 경우에는 지속적으로 보건소 상담이나 심리상담센터를 추천해준다. 이때 심리상담센터에 간다고 하면 전국민마음투자 바우처 접수도 동시에 진행할 수 있다. 바우처의 경우 환자의 상태와 상관없이 지원가능하니 만약 본인의 상태가 경미하다고 하더라도 지원이 필요하면 이때 접수하면 좋다. 만약 환자의 상태가 심각하여 약물치료가 필요하다고 생각하면 정신과 의원에 필요한 소견서 등을 작성하여 내담자에게 전달한 후 정신과 치료를 권유한다.
                  </p>
                  <p className="text-xl text-justify items-start">
                    보건소에서 운영하는 정신건강복지센터는 본인의 상태를 파악하고 싶지만, 가격 부담 때문에 못했던 사람들에게 추천한다. 또한 상담 기록이 남지 않아 기록을 걱정할 필요가 없다. 다만 무료이니 만큼 전문적인 상담보다는 가벼운 상담 위주이고, 방음이 되지 않아 산만하기 때문에 만약 본인이 본격적인 상담치료를 원한다면 심리상담센터를 추천한다.
                  </p>
                </section>
              </TabsContent>

              <TabsContent value="tab2">
                <section className="p-6 bg-white rounded-lg p-8">
                  <h2 className="text-4xl font-bold pb-10">“누가 내 상담 기록을 볼 수 있을까요?”<br/>- 심리상담센터 방문기</h2>
                  <div className="grid grid-cols-2 gap-6 pb-5 items-start">
                    <div>
                      <img src="images/pic_2_1.png"></img>
                    </div>
                    <p className="mb-8 text-xl text-justify items-start">
                      취재진은 광교의 한 상담센터도 방문했다.<br/><br/>
                      방문한 상담센터는 아늑하고 차분한 분위기를 자아냈다. 상담실은 두 개로 나뉘어 있었는데, 하나는 창문이 있어 블라인드를 살짝 열어 햇빛이 은은하게 들어왔고, 다른 하나는 창문이 없었지만, 포근한 조명과 푹신한 의자가 배치돼 있었다. 각각의 공간은 내담자가 더 편안하게 이야기를 나눌 수 있도록 구성되어 있었다.
                    </p>
                  </div>
                  <p className="mb-8 text-xl text-justify items-start pb-5">
                    상담 시작 전, 심리상담사의 명함을 건네받은 후 상담을 원하는 주제를 작성하고, 동의서를 작성하는 시간이 주어졌다. 동의서엔 비밀보장이 원칙이나, 내담자가 생명을 위협하는 행위, 자해, 자살을 시도하거나, 타인의 생명을 위협하는 표현, 계획을 하는 경우, 아동학대나 성인 학대에 대한 암시를 하는 경우, 법원의 요청 또는 명령에 의하여 의견서 또는 보고서를 제출해야 하는 예외 상황에 한해 보호자나 관련 기관에게 정보를 공개할 수 있다는 내용이 있었다. 이후 상담과 관련해 상담 소요 시간, 상담 과정 등에 대한 안내를 듣고 본격적인 상담이 시작됐다.
                  </p>
                  <div className="grid grid-cols-2 gap-6 items-start">
                    <p className="mb-8 text-xl text-justify items-start">
                    상담은 약 50분 동안 진행됐으며, 상담사는 부담스럽거나 과한 정보를 요구하지 않았다. 상담사는 적절한 공감을 통해 내담자가 상담하고 싶은 주제의 핵심을 짚어냈고, 내담자의 말에 집중하며 상담에 임했다. 또한 상담은 상담사가 해결방법을 제시하기 보단 내담자가 자신의 감정과 사고 패턴을 돌아보며 스스로 해결 방안을 모색할 수 있도록 돕는 방식으로 진행했다.
                    </p>
                    <div>
                      <img src="images/pic_2_2.png"></img>
                    </div>
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="tab3">
                <section className="p-6 bg-white rounded-lg p-8">
                  <h2 className="text-4xl font-bold pb-10">“어떤 이야기를 하러 오셨나요?”<br/>- 정신과 개원의 방문기</h2>
                  <div className="grid grid-cols-2 gap-6 pb-5 items-start">
                    <div>
                      <img src="images/pic_3_1.png"></img>
                    </div>
                    <p className="mb-8 text-xl text-justify items-start">
                      목동의 한 정신과 의원을 방문했다. <br/><br/>
                      진료실은 소규모 의원으로, 데스크에 간호사 한 명이 상주하고 있었다. 의사는 직접 진료실 문을 열고 환자를 호명했다. 진료실에 들어서자, 진료실보다는 교수의 서재를 연상케 하는 포근한 분위기가 눈에 들어왔다. 자그마한 책상 앞에서 의사는 메모장에 조용히 환자의 말을 만년필로 기록했다.
                    </p>
                  </div>
                  <p className="mb-8 text-xl text-justify items-start pb-5">
                    상담은 30분 동안 이어졌다. 이곳은 상담 중심 의원으로, 약 처방보다 대화를 우선하는 방식이었다. 의사는 환자의 이야기를 경청하며 어떠한 판단도 내리지 않고 경청했다. “이런 마음이 어디서 온 것 같습니까?” 등의 질문을 간혹 던지며 환자의 감정을 차분히 유도했다. 과외 선생님처럼 다음 시간에 어떤 이야기를 할 지 짚어주며 상담을 마쳤다.
                  </p>
                  <div className="grid grid-cols-2 gap-6 items-start">
                    <p className="mb-8 text-xl text-justify items-start">
                      진료를 마친 후, 다음 진료까지 36,000원 상당의 검사지를 풀어오라는 처방을 받았다. 진료 직후 의원에서 직접 검사지나 약을 수령하는 구조였다. 의원의 경우, 주로 증상이 심화한 환자들이 찾아오지만, 약 없이 상담만 진행하는 것도 가능하다고 했다.
                    </p>
                    <div>
                      <img src="images/pic_3_2.png"></img>
                    </div>
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </section>
          <section className="pl-10 pr-20 pb-[30px] flex flex-col items-center">
            <div className="max-w-[900px] w-full">
                  <motion.div
                          variants={fadeInVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.2 }}
                        >
                    <img src="/images/info3.png" className=""/>
                  </motion.div>
              <p className="mt-8 mb-8 text-xl mb-8  text-justify">정신과 의원은 주로 약 처방을 병행하며 건강보험 적용을 받을 수 있다. 반면 심리상담센터는 건강보험 혜택이 없어 정신과에 비해 비용이 많이 드는 편이었다. 의원은 건강보험 혜택을 받을 경우 건강보험 진료기록이 남지만, 이는 제3자에 의해 열람이 불가하여 취업 등에서 불이익은 없다. 정신건강복지센터(보건소)는 무료 상담을 받을 수 있는 장점이 있었으나, 구 별로 한 개씩만 존재해 개인에 따라 방문 접근성이 떨어질 수 있다는 점이 있었다.</p>
            </div>
          </section>
        </div>
      </div>
      <section className="pl-10 pr-20 pb-[30px] flex flex-col items-center">
        <div className="max-w-[900px] w-full">
          <h1 className="text-4xl font-bold mb-4"> 
            나한테 맞는 진료 기관 찾기
          </h1>
          <p className="mb-4 text-xl mb-8 text-justify">
            정신질환에 대한 사회적 인식은 과거보다 확연히 달라졌다. 정신과 진료를 받는 것이 더 이상 숨길 일이 아니며, 감기에 걸리면 병원을 찾듯 마음이 아플 때 정신과를 방문하는 것도 자연스러운 흐름이 되어가고 있다. 그러나 이러한 변화에도 불구하고, 정신과 진료를 처음 찾는 사람들에게는 여전히 높은 진입 장벽이 존재한다.
          </p>
          <p className="mb-4 text-xl mb-8 text-justify">
            정신과 의원은 많지만, 실제로 개인들이 부담 없이 초진을 받을 수 있는 곳은 제한적이다. 예약 대기 기간이 길어 한 달 이상 기다려야 하는 곳이 적지 않다. 또한, 정신과 의원 외에도 상담센터와 정신건강복지센터 같은 대안이 있지만, 이러한 기관들의 차이를 알고 있는 사람은 많지 않다.
          </p>
          <p className="mb-4 text-xl mb-8 text-justify">
            정신과 상담을 통해 긍정적인 변화를 경험한 A 씨는 이렇게 말했다.
          </p>
          <p className="mb-4 mx-20 text-xl mb-8 text-justify italic">
            “다 견디면 괜찮아질 거로 생각하는 사람들이 많다. 하지만 언제까지나 이겨내고, 버틸 수만은 없다. 정신과나 상담센터는 앞으로 나아갈 준비를 돕는 곳이다. 처음에는 돈 낭비처럼 보일 수도 있지만, 충분히 가치 있는 경험이다.”
          </p>
          <p className="mb-4 text-xl mb-8 text-justify">
            누구나 필요할 때 적절한 치료를 받을 수 있도록, 정신과 진료 시스템의 개선이 여전히 중요한 과제로 남아 있다. 이에 취재진은 의원, 상담센터, 정신건강복지센터를 모두 포함하는 진료 기관 안내 사이트를 제작했다. 이 사이트가 정신과 진료 및 상담을 고민하는 사람들에게 조금이라도 도움이 되기를 바란다.<br/><br/>취재진을 진료한 정신과 의사는 말했다.
          </p>
          <p className="mb-4 mx-20 text-xl mb-8 text-justify italic">
            “정상과 비정상은 O, X로 나뉘는 것이 아닙니다.<br/>그저 누구는 더 붉은 빛을 띠고, 누구는 더 푸른 빛에 가까울 뿐이죠.” 
          </p>
          <p className="mt-4 text-xl mb-8 text-justify">누구든, 잠시 지칠 수 있기 때문이다.</p>
        </div>
      </section>
      <section className="pl-10 pr-20 pb-[30px] flex flex-col items-center">
        <div className="max-w-[900px] w-full">
          <motion.div
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
            <Checklist/>
          </motion.div>
        </div>
        <Button
          className="text-3xl w-fit mx-auto py-8 mt-8 
            bg-white border border-emerald-500 border-4 text-emerald-500 font-semibold rounded-md 
            transition-colors hover:bg-emerald-500 hover:text-white active:bg-emerald-500"
            onClick={() => router.push("/map")}
        >
          🗺️ 마음 안내소로 이동하기
        </Button>
      </section>
    </div>
  );
}
