"use client";
import { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";
import { distributeData } from "@/features/distributeData";
import {
  useGameMainStats,
  useGameMeta,
  useGameRecordStats,
  useHuleStats,
  useLiqiStats,
  useModeState,
  useNoTileStats,
  useUnrongStats,
  useUnzimoStats,
} from "@/hooks/page/game/latest/useGameLatest";
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
import { GameLatestPlayerSelectBox as PlayerSelectBox } from "@/app/components/game/latest/PlayerSelectBox";
import { GameLatestBinderIcon as BinderIcon } from "@/app/components/game/latest/BinderIcon";
import { GameLatestTitleCard as TitleCard } from "@/app/components/game/latest/TitleCard";
import { GameLatestLineChart as LineChart } from "@/app/components/game/latest/LineChart";
import { GameLatestGameResult as GameResult } from "@/app/components/game/latest/GameResult";
import { GameLatestTabItem as TabItem } from "@/app/components/game/latest/TabItem";
import { GameLatestSheet as Sheet } from "@/app/components/game/latest/Sheet";
import { PlayerResult } from "@/types/distributeData";
import { Player, SeatIndex } from "@/types/playerData";
import { playersList } from "@/features/userAccount";
import Demodata from "./data.json";

interface PlayerSelectFormInput {
  seat: SeatIndex;
}

const TabItemWrapper = styled.div.attrs({
  className: "grid grid-cols-6 gap-y-2 text-base",
})`
  gap: 0 30px;
`;

export default function GameLatestDemoPage(): JSX.Element {
  const { gameMainStats, setGameMainStatsField } = useGameMainStats();
  const { paifuUrl, setPaifuUrl, endTimeState, setEndTimeState, rankLevel, setRankLevel, scores, setScores } = useGameMeta();
  const { gameRecordStats, setGameRecordField } = useGameRecordStats();
  const { huleStats, setHuleStatsField } = useHuleStats();
  const { liqiStats, setLiqiStatsField } = useLiqiStats();
  const { modeState, setModeField } = useModeState();
  const { noTileStats, setNoTileStatsField } = useNoTileStats();
  const { unrongStats, setUnrongStatsField } = useUnrongStats();
  const { unzimoStats, setUnzimoField } = useUnzimoStats();

  const [storageData, setStorageData] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerSeat, setPlayerSeat] = useState<SeatIndex>(0);

  const { register, handleSubmit, setValue } = useForm<PlayerSelectFormInput>();
  const onSubmit: SubmitHandler<PlayerSelectFormInput> = (data) => setPlayerSeat(data.seat as SeatIndex);

  useEffect(() => setStorageData(JSON.stringify(Demodata)), []);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (typeof storageData != "string") return;
    const parseData = JSON.parse(storageData);
    setPlayers(playersList(parseData.head.accounts));
    setValues(parseData);
  }, [storageData, playerSeat]);

  const setValues = (parseData: any): void => {
    const paifuResult: PlayerResult = distributeData({ paifu: parseData, seat: playerSeat });
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
    setUnzimoField("parentCoverScore", Math.abs(zimo.parentCoverScores.reduce((a, b) => a + b, 0)));
    setScores(scoreTrend);
  };

  return (
    <>
      <section className="flex justify-center">
        <div className="m-10 p-10 rounded-lg bg-white min-w-7/12">
          <div className="flex items-center justify-between">
            <h1 className="m-0 text-xl font-bold text-midnightNavy">
              <PlayerSelectBox register={register} setValue={setValue} handleSubmit={handleSubmit(onSubmit)} players={players} />
              <span className="ml-4">{`${modeState.type} ${modeState.room} ${modeState.people}人 ${modeState.format}`}</span>
              <span className="ml-4 text-gray-500 text-base">{endTimeState}</span>
            </h1>
            <Link href="/game/latest/demo/paifu" rel="noopener noreferrer">
              <div className="flex">
                <p className="text-xl text-midnightNavy">牌譜</p>
                <BinderIcon />
              </div>
            </Link>
          </div>

          <div className="flex flex-row space-x-10 mt-10">
            <div className="basis-1/3">
              <TitleCard
                title="和了"
                result={useHuleRateHook(gameMainStats.round, gameMainStats.hule)}
                totalCount={gameMainStats.hule}
                totalRound={gameMainStats.round}
              />
            </div>
            <div className="basis-1/3">
              <TitleCard
                title="放銃"
                result={useUnrongRateHook(gameMainStats.round, gameMainStats.unrong)}
                totalCount={gameMainStats.unrong}
                totalRound={gameMainStats.round}
              />
            </div>
            <div className="basis-1/3">
              <TitleCard
                title="副露"
                result={useChiPengGangRateHook(gameMainStats.round, gameMainStats.chiPengGang)}
                totalCount={gameMainStats.chiPengGang}
                totalRound={gameMainStats.round}
              />
            </div>
          </div>

          <div className="flex flex-row space-x-10 mt-10">
            <div className="basis-8/12">
              <LineChart roundCount={gameMainStats.round} noTileCount={gameMainStats.noTile} scores={scores} />
            </div>
            <div className="basis-4/12">
              <GameResult modeState={modeState} rankLevel={rankLevel} gameRecordStats={gameRecordStats} />
            </div>
          </div>

          <div className="relative h-36 mt-3">
            <Tabs>
              <TabList>
                <Tab>結果</Tab>
                <Tab>和了</Tab>
                <Tab>放銃</Tab>
                <Tab>立直</Tab>
                <Tab>副露</Tab>
                <Tab>その他</Tab>
                <Sheet
                  paifuUrl={paifuUrl}
                  modeState={modeState}
                  gameMainStats={gameMainStats}
                  gameRecordStats={gameRecordStats}
                  huleStats={huleStats}
                  unrongStats={unrongStats}
                  noTileStats={noTileStats}
                  liqiStats={liqiStats}
                  unzimoStats={unzimoStats}
                />
              </TabList>

              <TabPanel>
                <TabItemWrapper>
                  <TabItem title="総局数" count={gameMainStats.round} />
                  <TabItem title="順位" count={gameRecordStats.place} />
                  <TabItem title="点数" count={gameRecordStats.finalPoint} />
                  <TabItem title="和了" count={gameMainStats.hule} />
                  <TabItem title="放銃" count={gameMainStats.unrong} />
                </TabItemWrapper>
              </TabPanel>
              <TabPanel>
                <TabItemWrapper>
                  <TabItem title="和了" count={gameMainStats.hule} />
                  <TabItem title="立直ツモ" count={huleStats.zimoWithLiqi} />
                  <TabItem title="黙聴ツモ" count={huleStats.zimoWithUnliqiUnming} />
                  <TabItem title="副露ツモ" count={huleStats.zimoWithMing} />
                  <TabItem title="立直ロン" count={huleStats.rongWithLiqi} style="col-start-2" />
                  <TabItem title="黙聴ロン" count={huleStats.rongWithUnliqiUnming} />
                  <TabItem title="副露ロン" count={huleStats.rongWithMing} />
                </TabItemWrapper>
              </TabPanel>
              <TabPanel>
                <TabItemWrapper>
                  <TabItem title="放銃" count={gameMainStats.unrong} />
                  <TabItem title="立直時被ロン" count={unrongStats.afterLiqi} />
                  <TabItem title="黙聴時被ロン" count={unrongStats.unming} />
                  <TabItem title="副露時被ロン" count={unrongStats.ming} />
                </TabItemWrapper>
              </TabPanel>
              <TabPanel>
                <TabItemWrapper>
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
                </TabItemWrapper>
              </TabPanel>
              <TabPanel>
                <TabItemWrapper>
                  <TabItem title="副露" count={gameMainStats.chiPengGang} />
                  <TabItem title="和了" count={huleStats.ming} />
                  <TabItem title="放銃" count={unrongStats.ming} />
                  <TabItem title="流局" count={noTileStats.afterMing} />
                </TabItemWrapper>
              </TabPanel>
              <TabPanel>
                <TabItemWrapper>
                  <TabItem title="流局" count={gameMainStats.noTile} />
                  <TabItem title="流局聴牌" count={noTileStats.tingpai} />
                  <TabItem title="親被り" count={unzimoStats.parentCover} />
                  <TabItem title="親被り点数" count={unzimoStats.parentCoverScore} />
                </TabItemWrapper>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}
