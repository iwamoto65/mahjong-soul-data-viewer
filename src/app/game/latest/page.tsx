"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { distributeData } from "@/features/distributeData";
import { CulcHuleRate } from "@/hooks/useHuleRate";
import { CulcUnrongRate } from "@/hooks/useUnrongRate";
import { CulcChiPengGangRate } from "@/hooks/useChiPengGangRate";
import { CulcHuleZimoWithLiqi } from "@/hooks/useHuleZimoWithLiqi";
import { CulcHuleRongWithLiqi } from "@/hooks/useHuleRongWithLiqi";
import { CulcHuleZimoWithUnliqiUnming } from "@/hooks/useHuleZimoWithUnliqiUnming";
import { CulcHuleRongWithUnliqiUnming } from "@/hooks/useHuleRongWithUnliqiUnming";
import { CulcHuleZimoWithMing } from "@/hooks/useHuleRongWithMing";
import { CulcHuleRongWithMing } from "@/hooks/useHuleZimoWithMing";
import { CulcHuleWithLiqi } from "@/hooks/useHuleWithLiqi";
import { CulcLiqiIncome } from "@/hooks/useLiqiIncome";
import { CulcLiqiExpenditure } from "@/hooks/useLiqiExpenditure";
import { CulcLiqiIncomeAndExpenditure } from "@/hooks/useLiqiIncomeAndExpenditure";
import { CulcLiqiGoodShape } from "@/hooks/useLiqiGoodShape";
import { CulcLiqiBadShape } from "@/hooks/useLiqiBadShape";
import { CulcHuleLiqiDora } from "@/hooks/useHuleLiqiDora";
import { CulcHuleAfterMing } from "@/hooks/useHuleAfterMing";
import { GameLatestCard } from "@/components/game/latest/card";
import { PlayerResult } from "@/features/distributeDataType";

export default function GameLatestPage() {
  const [paifuUrl, setPaifuUrl] = useState<string>("");
  const [modeType, setModeType] = useState<string>("");
  const [modeRoom, setModeRoom] = useState<string>("");
  const [modeFormat, setModeFormat] = useState<string>("");
  const [modePeople, setModePeople] = useState<number>(0);
  const [gameEndTime, setGameEndTime] = useState<string>("");
  const [totalRoundCount, setTotalRoundCount] = useState<number>(0);
  const [totalHuleCount, setTotalHuleCount] = useState<number>(0);
  const [totalUnrongCount, setTotalUnrongCount] = useState<number>(0);
  const [totalChiPengGangCount, setTotalChiPengGangCount] = useState<number>(0);
  const [totalNoTileCount, setTotalNoTileCount] = useState<number>(0);
  const [gameRecordFinalPoint, setGameRecordFinalPoint] = useState<number>(0);
  const [gameRecordGradingScore, setGameRecordGradingScore] = useState<number>(0);
  const [gameRecordPlace, setGameRecordPlace] = useState<number>(0);
  const [rankLevel, setRankLevel] = useState<string>("");
  const [totalHuleZimoWithLiqi, setTotalHuleZimoWithLiqi] = useState<number>(0);
  const [totalHuleRongWithLiqi, setTotalHuleRongWithLiqi] = useState<number>(0);
  const [totalHuleZimoWithUnliqiUnming, setTotalHuleZimoWithUnliqiUnming] = useState<number>(0);
  const [totalHuleRongWithUnliqiUnming, setTotalHuleRongWithUnliqiUnming] = useState<number>(0);
  const [totalHuleZimoWithMing, setTotalHuleZimoWithMing] = useState<number>(0);
  const [totalHuleRongWithMing, setTotalHuleRongWithMing] = useState<number>(0);
  const [totalUnrongAfterLiqiCount, setTotalUnrongAfterLiqiCount] = useState<number>(0);
  const [totalUnrongUnmingCount, setTotalUnrongUnmingCount] = useState<number>(0);
  const [totalUnrongAfterChiPengGangCount, setTotalUnrongAfterChiPengGangCount] = useState<number>(0);
  const [totalLiqiCount, setTotalLiqiCount] = useState<number>(0);
  const [totalHuleWithLiqiCount, setTotalHuleWithLiqiCount] = useState<number>(0);
  const [totalNoTileAfterLiqi, setTotalNoTileAfterLiqi] = useState<number>(0);
  const [liqiIncome, setLiqiIncome] = useState<number>(0);
  const [liqiExpenditure, setLiqiExpenditure] = useState<number>(0);
  const [liqiIncomeAndExpenditure, setLiqiIncomeAndExpenditure] = useState<number>(0);
  const [liqiPreemption, setLiqiPreemption] = useState<number>(0);
  const [liqiChasing, setLiqiChasing] = useState<number>(0);
  const [liqiChased, setLiqiChased] = useState<number>(0);
  const [liqiGoodShapeCount, setLiqiGoodShapeCount] = useState<number>(0);
  const [liqiBadShapeCount, setLiqiBadShapeCount] = useState<number>(0);
  const [liqiZhenting, setLiqiZhenting] = useState<number>(0);
  const [liqiFirstTurnHule, setLiqiFirstTurnHule] = useState<number>(0);
  const [liqiDoraCount, setLiqiDoraCount] = useState<number>(0);
  const [totalHuleAfterMing, setTotalHuleAfterMing] = useState<number>(0);
  const [totalNoTileAfterMing, setTotalNoTileAfterMing] = useState<number>(0);
  const [totalNoTile, setTotalNoTile] = useState<number>(0);
  const [totalNoTileTingpai, setTotalNoTileTingpai] = useState<number>(0);
  const [totalParentCover, setTotalParentCover] = useState<number>(0);
  const [totalParentCoverScore, setTotalParentCoverScore] = useState<number>(0);

  useEffect(() => {
    const storageData: string | null = window.localStorage.getItem("mahjongsoulpaifu");
    if (typeof storageData != "string") return;

    const paifuResult: PlayerResult = distributeData(storageData);
    const { uuid, mode, endTime, totalRound, hule, unrong, chiPengGang, liqi, noTile, zimo, gameRecord, rank } = paifuResult;

    setPaifuUrl("https://game.mahjongsoul.com/?paipu=" + uuid);
    setModeType(mode.type);
    setModeRoom(mode.room);
    setModeFormat(mode.format);
    setModePeople(mode.people);
    setGameEndTime(endTime);
    setTotalRoundCount(totalRound);
    setTotalHuleCount(hule.total);
    setTotalUnrongCount(unrong.total);
    setTotalChiPengGangCount(chiPengGang.total);
    setTotalNoTileCount(noTile.total);
    setGameRecordFinalPoint(gameRecord.finalPoint);
    setGameRecordGradingScore(gameRecord.gradingScore);
    setGameRecordPlace(gameRecord.place);
    setRankLevel(rank.level);
    setTotalHuleZimoWithLiqi(CulcHuleZimoWithLiqi(hule.details));
    setTotalHuleRongWithLiqi(CulcHuleRongWithLiqi(hule.details));
    setTotalHuleZimoWithUnliqiUnming(CulcHuleZimoWithUnliqiUnming(hule.details));
    setTotalHuleRongWithUnliqiUnming(CulcHuleRongWithUnliqiUnming(hule.details));
    setTotalHuleZimoWithMing(CulcHuleZimoWithMing(hule.details));
    setTotalHuleRongWithMing(CulcHuleRongWithMing(hule.details));
    setTotalUnrongAfterLiqiCount(unrong.afterLiqi.total);
    setTotalUnrongUnmingCount(unrong.total - (unrong.afterLiqi.total + unrong.afterChiPengGang.total));
    setTotalUnrongAfterChiPengGangCount(unrong.afterChiPengGang.total);
    setTotalLiqiCount(liqi.total);
    setTotalHuleWithLiqiCount(CulcHuleWithLiqi(hule.details));
    setTotalNoTileAfterLiqi(liqi.noTile);
    setLiqiIncome(CulcLiqiIncome(hule.details));
    setLiqiExpenditure(CulcLiqiExpenditure(unrong.afterLiqi.scores));
    setLiqiIncomeAndExpenditure(CulcLiqiIncomeAndExpenditure(liqi.total, hule.details, unrong.afterLiqi.scores));
    setLiqiPreemption(liqi.preemption);
    setLiqiChasing(liqi.total - liqi.preemption);
    setLiqiChased(liqi.chased);
    setLiqiGoodShapeCount(CulcLiqiGoodShape(liqi.remainingTileCount));
    setLiqiBadShapeCount(CulcLiqiBadShape(liqi.remainingTileCount));
    setLiqiZhenting(liqi.zhenting);
    setLiqiFirstTurnHule(liqi.firstTurnHule);
    setLiqiDoraCount(CulcHuleLiqiDora(hule.details));
    setTotalHuleAfterMing(CulcHuleAfterMing(hule.details));
    setTotalNoTileAfterMing(noTile.afterChiPengGang);
    setTotalNoTile(noTile.total);
    setTotalNoTileTingpai(noTile.tingpai);
    setTotalParentCover(zimo.parentCoverScores.length);
    setTotalParentCoverScore(Math.abs(zimo.parentCoverScores.reduce((a, b) => a + b)));
  }, []);

  return (
    <>
      <section className="flex justify-center">
        <div className="m-10 p-10 rounded-lg bg-white min-w-7/12">
          <div className="flex justify-between">
            <h1 className="m-0 text-xl font-bold" style={{ color: "#00002A" }}>
              {`${modeType} ${modeRoom} ${modePeople}人 ${modeFormat}`}
              <span className="ml-4 text-gray-500 text-base">{gameEndTime}</span>
            </h1>
            <Link href={paifuUrl} target="_blank" rel="noopener noreferrer">
              <div className="flex">
                <p className="text-xl" style={{ color: "#00002A" }}>
                  牌譜
                </p>
                <svg
                  style={{ width: "26px", height: "26px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
              </div>
            </Link>
          </div>

          <div className="flex flex-row space-x-10 mt-10">
            <div className="basis-1/3">
              <GameLatestCard title="和了" result={CulcHuleRate(totalRoundCount, totalHuleCount)} totalCount={totalHuleCount} totalRound={totalRoundCount} />
            </div>
            <div className="basis-1/3">
              <GameLatestCard
                title="放銃"
                result={CulcUnrongRate(totalRoundCount, totalUnrongCount)}
                totalCount={totalUnrongCount}
                totalRound={totalRoundCount}
              />
            </div>
            <div className="basis-1/3">
              <GameLatestCard
                title="副露"
                result={CulcChiPengGangRate(totalRoundCount, totalChiPengGangCount)}
                totalCount={totalChiPengGangCount}
                totalRound={totalRoundCount}
              />
            </div>
          </div>

          <div className="flex flex-row space-x-10 mt-10">
            <div className="basis-8/12">
              <h1 className="m-0 text-xl font-bold" style={{ color: "#00002A" }}>
                得点推移
              </h1>
              <LineChart roundCount={totalRoundCount} noTileCount={totalNoTileCount} />
            </div>
            <div className="basis-4/12">
              <h1 className="m-0 text-xl font-bold" style={{ color: "#00002A" }}>
                対局者情報
              </h1>
              <div className="grid grid-cols-2 gap-y-8 mt-10">
                <p className="text-xl">部屋</p>
                <p className="text-right text-xl">
                  {modeType}
                  {modeRoom}
                </p>
                <p className="text-xl">段位</p>
                <p className="text-right text-xl">{rankLevel.replace(/三麻|四麻/g, "")}</p>
                <p className="text-xl">順位</p>
                <p className="text-right text-xl">{gameRecordPlace}</p>
                <p className="text-xl">最終持ち点</p>
                <p className="text-right text-xl">{gameRecordFinalPoint}</p>
                <p className="text-xl">獲得ポイント</p>
                <p className="text-right text-xl">{gameRecordGradingScore}</p>
              </div>
            </div>
          </div>

          <div className="h-36 mt-10">
            <Tabs>
              <TabList>
                <Tab>対局結果</Tab>
                <Tab>和了</Tab>
                <Tab>放銃</Tab>
                <Tab>立直</Tab>
                <Tab>副露</Tab>
                <Tab>その他</Tab>
              </TabList>

              <TabPanel>
                <div className="grid grid-cols-6 gap-x-12 gap-y-2 text-base">
                  <TabItem title="総局数" count={totalRoundCount} />
                  <TabItem title="順位" count={gameRecordPlace} />
                  <TabItem title="点数" count={gameRecordFinalPoint} />
                  <TabItem title="和了" count={totalHuleCount} />
                  <TabItem title="放銃" count={totalUnrongCount} />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-6 gap-x-12 gap-y-2 text-base">
                  <TabItem title="和了" count={totalHuleCount} />
                  <TabItem title="立直ツモ" count={totalHuleZimoWithLiqi} />
                  <TabItem title="黙聴ツモ" count={totalHuleZimoWithUnliqiUnming} />
                  <TabItem title="副露ツモ" count={totalHuleZimoWithMing} />
                  <TabItem title="立直ロン" count={totalHuleRongWithLiqi} style="col-start-2" />
                  <TabItem title="黙聴ロン" count={totalHuleRongWithUnliqiUnming} />
                  <TabItem title="副露ロン" count={totalHuleRongWithMing} />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-6 gap-x-12 gap-y-2 text-base">
                  <TabItem title="放銃" count={totalUnrongCount} />
                  <TabItem title="立直時被ロン" count={totalUnrongAfterLiqiCount} />
                  <TabItem title="黙聴時被ロン" count={totalUnrongUnmingCount} />
                  <TabItem title="副露時被ロン" count={totalUnrongAfterChiPengGangCount} />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-6 gap-x-12 gap-y-2 text-base">
                  <TabItem title="立直" count={totalLiqiCount} />
                  <TabItem title="和了" count={totalHuleWithLiqiCount} />
                  <TabItem title="放銃" count={totalUnrongAfterLiqiCount} />
                  <TabItem title="流局" count={totalNoTileAfterLiqi} />
                  <TabItem title="収入" count={liqiIncome} />
                  <TabItem title="支出" count={liqiExpenditure} />
                  <TabItem title="収支" count={liqiIncomeAndExpenditure} />
                  <TabItem title="先制" count={liqiPreemption} />
                  <TabItem title="追っかけ" count={liqiChasing} />
                  <TabItem title="追っかけられ" count={liqiChased} />
                  <TabItem title="良型" count={liqiGoodShapeCount} />
                  <TabItem title="愚形" count={liqiBadShapeCount} />
                  <TabItem title="振聴" count={liqiZhenting} />
                  <TabItem title="一発" count={liqiFirstTurnHule} />
                  <TabItem title="裏ドラ回数" count={liqiDoraCount} />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-6 gap-x-12 gap-y-2 text-base">
                  <TabItem title="副露" count={totalChiPengGangCount} />
                  <TabItem title="和了" count={totalHuleAfterMing} />
                  <TabItem title="放銃" count={totalUnrongAfterChiPengGangCount} />
                  <TabItem title="流局" count={totalNoTileAfterMing} />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-6 gap-x-10 gap-y-2 text-base">
                  <TabItem title="流局" count={totalNoTile} />
                  <TabItem title="流局聴牌" count={totalNoTileTingpai} />
                  <TabItem title="親被り" count={totalParentCover} />
                  <TabItem title="親被り点数" count={totalParentCoverScore} />
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}

const TabItem = ({ title, count, style }: { title: string; count: number; style?: string }) => {
  return (
    <div className={`flex justify-between ${style}`}>
      <span>{title}</span>
      <span>{count}</span>
    </div>
  );
};

const LineChart = ({ roundCount, noTileCount }: { roundCount: number; noTileCount: number }) => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const data = {
    labels: ["東1", "2", "3", "", "南1", "2", "3"],
    datasets: [
      {
        label: "Aさん",
        data: [25000, 27900, 30000, 14000, 20000, 1000, -1000],
        borderColor: "rgb(255, 127, 127)",
        backgroundColor: "rgba(255, 127, 127, 0.5)",
      },
      {
        label: "Bさん",
        data: [25000, 17900, 30000, 20000, 10000, 0, 1000],
        borderColor: "rgb(127, 191, 255)",
        backgroundColor: "rgba(127, 191, 255, 0.5)",
      },
      {
        label: "Cさん",
        data: [25000, 10000, 20000, 30000, 10000, 5000, 15000],
        borderColor: "rgb(52, 183, 142)",
        backgroundColor: "rgba(52, 183, 142, 0.5)",
      },
      {
        label: "Dさん",
        data: [25000, 900, 4000, 5000, 33000, 33000, 24000],
        borderColor: "rgb(255, 191, 127)",
        backgroundColor: "rgba(255, 191, 127, 0.5)",
      },
    ],
  };

  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 12,
        },
      },
      title: {
        display: true,
        text: `総局数 ${roundCount} （流局数 ${noTileCount}）`,
        padding: {
          top: 15,
          bottom: 15,
        },
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "局",
        },
      },
      y: {
        min: -1000,
        max: 35000,
        title: {
          display: true,
          text: "得点",
        },
      },
    },
  };

  return <Line data={data} options={options} width={650} height={325} />;
};
