"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { distributeData } from "@/features/distributeData";
import { useGameLatest } from "@/hooks/page/useGameLatest";
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
import { TabItem } from "@/components/game/latest/TabItem";
import { PlayerResult } from "@/features/distributeDataType";

export default function GameLatestPage() {
  const {
    paifuUrl,
    setPaifuUrl,
    modeState,
    setModeField,
    endTimeState,
    setEndTimeState,
    gameMainStats,
    setGameMainStatsField,
    gameRecordStats,
    setGameRecordField,
    rankLevel,
    setRankLevel,
    huleStats,
    setHuleStatsField,
    unrongStats,
    setUnrongStatsField,
    liqiStats,
    setLiqiStatsField,
    noTileStats,
    setNoTileStatsField,
    unzimoStats,
    setUnzimoField,
    scores,
    setScores,
  } = useGameLatest();

  useEffect(() => {
    const storageData: string | null = window.localStorage.getItem("mahjongsoulpaifu");
    if (typeof storageData != "string") return;

    const paifuResult: PlayerResult = distributeData(storageData);
    const { uuid, mode, endTime, totalRound, hule, unrong, chiPengGang, liqi, noTile, zimo, gameRecord, rank, scoreTrend } = paifuResult;

    setPaifuUrl("https://game.mahjongsoul.com/?paipu=" + uuid);
    setModeField("type", mode.type);
    setModeField("room", mode.room);
    setModeField("format", mode.format);
    setModeField("people", mode.people);
    setEndTimeState(endTime);
    setGameMainStatsField("round", totalRound);
    setGameMainStatsField("hule", hule.total);
    setGameMainStatsField("liqi", liqi.total);
    setGameMainStatsField("unrong", unrong.total);
    setGameMainStatsField("chiPengGang", chiPengGang.total);
    setGameMainStatsField("noTile", noTile.total);
    setGameRecordField("finalPoint", gameRecord.finalPoint);
    setGameRecordField("gradingScore", gameRecord.gradingScore);
    setGameRecordField("place", gameRecord.place);
    setRankLevel(rank.level);
    setHuleStatsField("liqi", useHuleWithLiqiHook(hule.details));
    setHuleStatsField("zimoWithLiqi", useHuleZimoWithLiqiHook(hule.details));
    setHuleStatsField("rongWithLiqi", useHuleRongWithLiqiHook(hule.details));
    setHuleStatsField("zimoWithUnliqiUnming", useHuleZimoWithUnliqiUnmingHook(hule.details));
    setHuleStatsField("rongWithUnliqiUnming", useHuleRongWithUnliqiUnmingHook(hule.details));
    setHuleStatsField("ming", useHuleAfterMingHook(hule.details));
    setHuleStatsField("zimoWithMing", useHuleZimoWithMingHook(hule.details));
    setHuleStatsField("rongWithMing", useHuleRongWithMingHook(hule.details));
    setUnrongStatsField("afterLiqi", unrong.afterLiqi.total);
    setUnrongStatsField("ming", unrong.afterChiPengGang.total);
    setUnrongStatsField("unming", unrong.total - (unrong.afterLiqi.total + unrong.afterChiPengGang.total));
    setLiqiStatsField("income", useLiqiIncomeHook(hule.details));
    setLiqiStatsField("expenditure", useLiqiExpenditureHook(unrong.afterLiqi.scores));
    setLiqiStatsField("incomeAndExpenditure", useLiqiIncomeAndExpenditureHook(liqi.total, hule.details, unrong.afterLiqi.scores));
    setLiqiStatsField("preemption", liqi.preemption);
    setLiqiStatsField("chasing", liqi.total - liqi.preemption);
    setLiqiStatsField("chased", liqi.chased);
    setLiqiStatsField("goodShape", useLiqiGoodShapeHook(liqi.remainingTileCount));
    setLiqiStatsField("badShape", useLiqiBadShapeHook(liqi.remainingTileCount));
    setLiqiStatsField("zhenting", liqi.zhenting);
    setLiqiStatsField("firstTurnHule", liqi.firstTurnHule);
    setLiqiStatsField("dora", useHuleLiqiDoraHook(hule.details));
    setNoTileStatsField("afterLiqi", liqi.noTile);
    setNoTileStatsField("afterMing", noTile.afterChiPengGang);
    setNoTileStatsField("tingpai", noTile.tingpai);
    setUnzimoField("parentCover", zimo.parentCoverScores.length);
    setUnzimoField("parentCoverScore", Math.abs(zimo.parentCoverScores.reduce((a, b) => a + b)));
    setScores(scoreTrend);
  }, []);

  return (
    <>
      <section className="flex justify-center">
        <div className="m-10 p-10 rounded-lg bg-white min-w-7/12">
          <div className="flex justify-between">
            <h1 className="m-0 text-xl font-bold" style={{ color: "#00002A" }}>
              {`${modeState.type} ${modeState.room} ${modeState.people}人 ${modeState.format}`}
              <span className="ml-4 text-gray-500 text-base">{endTimeState}</span>
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
                result={useHuleRateHook(gameMainStats.round, gameMainStats.hule)}
                totalCount={gameMainStats.hule}
                totalRound={gameMainStats.round}
              />
            </div>
            <div className="basis-1/3">
              <GameLatestTitleCard
                title="放銃"
                result={useUnrongRateHook(gameMainStats.round, gameMainStats.unrong)}
                totalCount={gameMainStats.unrong}
                totalRound={gameMainStats.round}
              />
            </div>
            <div className="basis-1/3">
              <GameLatestTitleCard
                title="副露"
                result={useChiPengGangRateHook(gameMainStats.round, gameMainStats.chiPengGang)}
                totalCount={gameMainStats.chiPengGang}
                totalRound={gameMainStats.round}
              />
            </div>
          </div>

          <div className="flex flex-row space-x-10 mt-10">
            <div className="basis-8/12">
              <h1 className="m-0 text-xl font-bold" style={{ color: "#00002A" }}>
                得点推移
              </h1>
              <LineChart roundCount={gameMainStats.round} noTileCount={gameMainStats.noTile} scores={scores} />
            </div>
            <div className="basis-4/12">
              <h1 className="m-0 text-xl font-bold" style={{ color: "#00002A" }}>
                対局結果
              </h1>
              <div className="grid grid-cols-2 gap-y-8 mt-10">
                <p className="text-xl">部屋</p>
                <p className="text-right text-xl">
                  {modeState.type}
                  {modeState.room}
                </p>
                <p className="text-xl">段位</p>
                <p className="text-right text-xl">{rankLevel.replace(/三麻|四麻/g, "")}</p>
                <p className="text-xl">順位</p>
                <p className="text-right text-xl">{gameRecordStats.place}</p>
                <p className="text-xl">最終持ち点</p>
                <p className="text-right text-xl">{gameRecordStats.finalPoint}</p>
                <p className="text-xl">獲得ポイント</p>
                <p className="text-right text-xl">{gameRecordStats.gradingScore}</p>
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
                  <TabItem title="総局数" count={gameMainStats.round} />
                  <TabItem title="順位" count={gameRecordStats.place} />
                  <TabItem title="点数" count={gameRecordStats.finalPoint} />
                  <TabItem title="和了" count={gameMainStats.hule} />
                  <TabItem title="放銃" count={gameMainStats.unrong} />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-6 gap-x-12 gap-y-2 text-base">
                  <TabItem title="和了" count={gameMainStats.hule} />
                  <TabItem title="立直ツモ" count={huleStats.zimoWithLiqi} />
                  <TabItem title="黙聴ツモ" count={huleStats.zimoWithUnliqiUnming} />
                  <TabItem title="副露ツモ" count={huleStats.zimoWithMing} />
                  <TabItem title="立直ロン" count={huleStats.rongWithLiqi} style="col-start-2" />
                  <TabItem title="黙聴ロン" count={huleStats.rongWithUnliqiUnming} />
                  <TabItem title="副露ロン" count={huleStats.rongWithMing} />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-6 gap-x-12 gap-y-2 text-base">
                  <TabItem title="放銃" count={gameMainStats.unrong} />
                  <TabItem title="立直時被ロン" count={unrongStats.afterLiqi} />
                  <TabItem title="黙聴時被ロン" count={unrongStats.unming} />
                  <TabItem title="副露時被ロン" count={unrongStats.ming} />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-6 gap-x-12 gap-y-2 text-base">
                  <TabItem title="立直" count={gameMainStats.liqi} />
                  <TabItem title="和了" count={huleStats.liqi} />
                  <TabItem title="放銃" count={unrongStats.afterLiqi} />
                  <TabItem title="流局" count={noTileStats.afterLiqi} />
                  <TabItem title="収入" count={liqiStats.income} />
                  <TabItem title="支出" count={liqiStats.expenditure} />
                  <TabItem title="収支" count={liqiStats.incomeAndExpenditure} />
                  <TabItem title="先制" count={liqiStats.preemption} />
                  <TabItem title="追っかけ" count={liqiStats.chasing} />
                  <TabItem title="追っかけられ" count={liqiStats.chased} />
                  <TabItem title="良型" count={liqiStats.goodShape} />
                  <TabItem title="愚形" count={liqiStats.badShape} />
                  <TabItem title="振聴" count={liqiStats.zhenting} />
                  <TabItem title="一発" count={liqiStats.firstTurnHule} />
                  <TabItem title="裏ドラ回数" count={liqiStats.dora} />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-6 gap-x-12 gap-y-2 text-base">
                  <TabItem title="副露" count={gameMainStats.chiPengGang} />
                  <TabItem title="和了" count={huleStats.ming} />
                  <TabItem title="放銃" count={unrongStats.ming} />
                  <TabItem title="流局" count={noTileStats.afterMing} />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-6 gap-x-10 gap-y-2 text-base">
                  <TabItem title="流局" count={gameMainStats.noTile} />
                  <TabItem title="流局聴牌" count={noTileStats.tingpai} />
                  <TabItem title="親被り" count={unzimoStats.parentCover} />
                  <TabItem title="親被り点数" count={unzimoStats.parentCoverScore} />
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}
