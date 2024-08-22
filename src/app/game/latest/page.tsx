"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { distributeData } from "@/features/distributeData";
import { useHuleRateHook } from "@/hooks/shared/useHuleRateHook";
import { useUnrongRateHook } from "@/hooks/shared/useUnrongRateHook";
import { useChiPengGangRateHook } from "@/hooks/shared/useChiPengGangRateHook";
import { useHuleZimoWithLiqiHook } from "@/hooks/shared/useHuleZimoWithLiqiHook";
import { useHuleRongWithLiqiHook } from "@/hooks/shared/useHuleRongWithLiqiHook";
import { useHuleZimoWithUnliqiUnmingHook } from "@/hooks/shared/useHuleZimoWithUnliqiUnmingHook";
import { useHuleRongWithUnliqiUnmingHook } from "@/hooks/shared/useHuleRongWithUnliqiUnmingHook";
import { useHuleZimoWithMingHook } from "@/hooks/shared/useHuleZimoWithMingHook";
import { useHuleRongWithMingHook } from "@/hooks/shared/useHuleRongWithMingHook";
import { useHuleWithLiqiHook } from "@/hooks/shared/useHuleWithLiqiHook";
import { useLiqiIncomeHook } from "@/hooks/shared/useLiqiIncomeHook";
import { useLiqiExpenditureHook } from "@/hooks/shared/useLiqiExpenditureHook";
import { useLiqiIncomeAndExpenditureHook } from "@/hooks/shared/useLiqiIncomeAndExpenditureHook";
import { useLiqiGoodShapeHook } from "@/hooks/shared/useLiqiGoodShapeHook";
import { useLiqiBadShapeHook } from "@/hooks/shared/useLiqiBadShapeHook";
import { useHuleLiqiDoraHook } from "@/hooks/shared/useHuleLiqiDoraHook";
import { useHuleAfterMingHook } from "@/hooks/shared/useHuleAfterMingHook";
import { GameLatestBinderIcon } from "@/components/game/latest/BinderIcon";
import { GameLatestTitleCard } from "@/components/game/latest/TitleCard";
import { GameLatestLineChart as LineChart } from "@/components/game/latest/LineChart";
import { PlayerResult } from "@/features/distributeDataType";

type Scores =
  | {
      player: string;
      scores: {
        [key: string]: number;
      };
    }[]
  | [];

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
  const [scores, setScores] = useState<Scores>([]);

  useEffect(() => {
    const storageData: string | null = window.localStorage.getItem("mahjongsoulpaifu");
    if (typeof storageData != "string") return;

    const paifuResult: PlayerResult = distributeData(storageData);
    const { uuid, mode, endTime, totalRound, hule, unrong, chiPengGang, liqi, noTile, zimo, gameRecord, rank, scoreTrend } = paifuResult;

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
    setTotalHuleZimoWithLiqi(useHuleZimoWithLiqiHook(hule.details));
    setTotalHuleRongWithLiqi(useHuleRongWithLiqiHook(hule.details));
    setTotalHuleZimoWithUnliqiUnming(useHuleZimoWithUnliqiUnmingHook(hule.details));
    setTotalHuleRongWithUnliqiUnming(useHuleRongWithUnliqiUnmingHook(hule.details));
    setTotalHuleZimoWithMing(useHuleZimoWithMingHook(hule.details));
    setTotalHuleRongWithMing(useHuleRongWithMingHook(hule.details));
    setTotalUnrongAfterLiqiCount(unrong.afterLiqi.total);
    setTotalUnrongUnmingCount(unrong.total - (unrong.afterLiqi.total + unrong.afterChiPengGang.total));
    setTotalUnrongAfterChiPengGangCount(unrong.afterChiPengGang.total);
    setTotalLiqiCount(liqi.total);
    setTotalHuleWithLiqiCount(useHuleWithLiqiHook(hule.details));
    setTotalNoTileAfterLiqi(liqi.noTile);
    setLiqiIncome(useLiqiIncomeHook(hule.details));
    setLiqiExpenditure(useLiqiExpenditureHook(unrong.afterLiqi.scores));
    setLiqiIncomeAndExpenditure(useLiqiIncomeAndExpenditureHook(liqi.total, hule.details, unrong.afterLiqi.scores));
    setLiqiPreemption(liqi.preemption);
    setLiqiChasing(liqi.total - liqi.preemption);
    setLiqiChased(liqi.chased);
    setLiqiGoodShapeCount(useLiqiGoodShapeHook(liqi.remainingTileCount));
    setLiqiBadShapeCount(useLiqiBadShapeHook(liqi.remainingTileCount));
    setLiqiZhenting(liqi.zhenting);
    setLiqiFirstTurnHule(liqi.firstTurnHule);
    setLiqiDoraCount(useHuleLiqiDoraHook(hule.details));
    setTotalHuleAfterMing(useHuleAfterMingHook(hule.details));
    setTotalNoTileAfterMing(noTile.afterChiPengGang);
    setTotalNoTile(noTile.total);
    setTotalNoTileTingpai(noTile.tingpai);
    setTotalParentCover(zimo.parentCoverScores.length);
    setTotalParentCoverScore(Math.abs(zimo.parentCoverScores.reduce((a, b) => a + b)));
    setScores(scoreTrend);
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
                <GameLatestBinderIcon />
              </div>
            </Link>
          </div>

          <div className="flex flex-row space-x-10 mt-10">
            <div className="basis-1/3">
              <GameLatestTitleCard
                title="和了"
                result={useHuleRateHook(totalRoundCount, totalHuleCount)}
                totalCount={totalHuleCount}
                totalRound={totalRoundCount}
              />
            </div>
            <div className="basis-1/3">
              <GameLatestTitleCard
                title="放銃"
                result={useUnrongRateHook(totalRoundCount, totalUnrongCount)}
                totalCount={totalUnrongCount}
                totalRound={totalRoundCount}
              />
            </div>
            <div className="basis-1/3">
              <GameLatestTitleCard
                title="副露"
                result={useChiPengGangRateHook(totalRoundCount, totalChiPengGangCount)}
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
              <LineChart roundCount={totalRoundCount} noTileCount={totalNoTileCount} scores={scores} />
            </div>
            <div className="basis-4/12">
              <h1 className="m-0 text-xl font-bold" style={{ color: "#00002A" }}>
                対局結果
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
                <Tab>結果</Tab>
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
