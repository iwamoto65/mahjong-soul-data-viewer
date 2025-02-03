"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { distributeData } from "@/features/distributeData";
import { useHuleRateHook } from "../hooks/shared/useHuleRateHook";
import { useUnrongRateHook } from "@/hooks/shared/useUnrongRateHook";
import { useZimoRateHook } from "@/hooks/shared/useZimoRateHook";
import { useUnliqiUnmingHuleRateHook } from "@/hooks/shared/useUnliqiUnmingHuleRateHook";
import { useNoTileRateHook } from "@/hooks/shared/useNoTileRateHook";
import { useNoTileTingpaiRateHook } from "@/hooks/shared/useNoTileTingpaiRateHook";
import { useChiPengGangRateHook } from "@/hooks/shared/useChiPengGangRateHook";
import { useLiqiRateHook } from "@/hooks/shared/useLiqiRateHook";
import { useAverageDadianScoreHook } from "@/hooks/shared/useAverageDadianScoreHook";
import { useAverageUnrongScoreHook } from "@/hooks/shared/useAverageUnrongScoreHook";
import { useAveragePlaceHook } from "@/hooks/shared/useAveragePlaceHook";
import { useLiqiSuccessRateHook } from "@/hooks/shared/useLiqiSuccessRateHook";
import { useUnrongIncludeOnLiqiRateHook } from "@/hooks/shared/useUnrongIncludeOnLiqiRateHook";
import { useUnrongAfterLiqiRateBasedOnLiqiHook } from "@/hooks/shared/useUnrongAfterLiqiRateBasedOnLiqiHook";
import { useLiqiIncomeHook } from "@/hooks/shared/useLiqiIncomeHook";
import { useLiqiExpenditureHook } from "@/hooks/shared/useLiqiExpenditureHook";
import { useLiqiIncomeAndExpenditureHook } from "@/hooks/shared/useLiqiIncomeAndExpenditureHook";
import { useLiqiPreemptionRateHook } from "@/hooks/shared/useLiqiPreemptionRateHook";
import { useLiqiChasingRateHook } from "@/hooks/shared/useLiqiChasingRateHook";
import { useLiqiChasedRateHook } from "@/hooks/shared/useLiqiChasedRateHook";
import { useAverageLiqiTurnHook } from "@/hooks/shared/useAverageLiqiTurnHook";
import { useLiqiNoTileRateHook } from "@/hooks/shared/useLiqiNoTileRateHook";
import { useLiqiFirstTurnHuleRateHook } from "@/hooks/shared/useLiqiFirstTurnHuleRateHook";
import { useLiqiZhentingRateHook } from "@/hooks/shared/useLiqiZhentingRateHook";
import { useLiqiMultipleWaitingRateHook } from "@/hooks/shared/useLiqiMultipleWaitingRateHook";
import { useLiqiGoodShapeRateHook } from "@/hooks/shared/useLiqiGoodShapeRateHook";
import { useLiDoraRateHook } from "@/hooks/shared/useLiDoraRateHook";
import { useZimoSereveParentCoverRateHook } from "@/hooks/shared/useZimoSereveParentCoverRateHook";
import { useZimoSereveParentCoverScoreHook } from "@/hooks/shared/useZimoSereveParentCoverScoreHook";
import { useUnrongAfterChiPengGangRateBasedOnUnrongHook } from "@/hooks/shared/useUnrongAfterChiPengGangRateBasedOnUnrongHook";
import { useUnrongAfterLiqiRateBasedOnUnrongHook } from "@/hooks/shared/useUnrongAfterLiqiRateBasedOnUnrongHook";
import { useUnrongUnmingRateHook } from "@/hooks/shared/useUnrongUnmingRateHook";
import { useUnrongAfterChiPengGangRateBasedOnMingHook } from "@/hooks/shared/useUnrongAfterChiPengGangRateBasedOnMingHook";
import { useHuleAfterMingRateHook } from "@/hooks/shared/useHuleAfterMingRateHook";
import { useNoTileAfterChiPengGangRateHook } from "@/hooks/shared/useNoTileAfterChiPengGangRateHook";
import { useAttackBalanceIndexHook } from "@/hooks/shared/useAttackBalanceIndexHook";
import { useDefenseBalanceIndexHook } from "@/hooks/shared/useDefenseBalanceIndexHook";
import { useAttackAndDefenseBalanceIndexHook } from "@/hooks/shared/useAttackAndDefenseBalanceIndexHook";
import { useRoundIncomeAndExpenditureHook } from "@/hooks/shared/useRoundIncomeAndExpenditureHook";
import db from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components";

const Thead = styled.thead.attrs({ className: "bg-gray-50" })``;
const Th = styled.th.attrs({ className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" })``;
const Tbody = styled.tbody.attrs({ className: "bg-white divide-y divide-gray-200" })``;
const Td = styled.td.attrs({ className: "px-6 py-4 whitespace-nowrap" })``;

export default function Home() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (file: any) => {
    if (file.paifu.length !== 0) {
      const reader = new FileReader();
      reader.readAsText(file.paifu[0]);
      reader.onload = () => {
        if (typeof reader.result == "string") {
          // distributeData(reader.result);
          // .then(res => {
          //   if (res.status === 'ok') {
          //     // alert('アップロードが完了しました。')
          //     // window.location.reload()
          //   }
          // })
        } else {
          reader.abort();
        }
      };
    } else {
      alert("ファイルを選択してください");
    }
  };

  const [gameCount, setGameCount] = useState<number>(0);
  const [totalRoundCount, setTotalRoundCount] = useState<number>(0);
  const [totalHuleCount, setTotalHuleCount] = useState<number>(0);
  const [totalUnrongCount, setTotalUnrongCount] = useState<number>(0);
  const [totalUnrongScore, setTotalUnrongScore] = useState<number[]>([]);
  const [totalZimoCount, setTotalZimoCount] = useState<number>(0);
  const [totalUnliqiCount, setTotalUnliqiCount] = useState<number>(0);
  const [totalNoTileCount, setTotalNoTileCount] = useState<number>(0);
  const [totalNoTileTingpaiCount, setTotalNoTileTingpaiCount] = useState<number>(0);
  const [totalChiPengGangCount, setTotalChiPengGangCount] = useState<number>(0);
  const [totalLiqiCount, setTotalLiqiCount] = useState<number>(0);
  const [totalLiqiPreemptionCount, setTotalLiqiPreemptionCount] = useState<number>(0);
  const [totalLiqiChasedCount, setTotalLiqiChasedCount] = useState<number>(0);
  const [totalDadian, setTotalDadian] = useState<number[]>([]);
  const [totalPlace, setTotalPlace] = useState<number[]>([]);
  const [totalHuleOutOfLiqiCount, setTotalHuleOutOfLiqiCount] = useState<number>(0);
  const [totalLiqiIncome, setTotalLiqiIncome] = useState<number[]>([]);
  const [totalLiqiExpenditure, setTotalLiqiExpenditure] = useState<number[]>([]);
  const [totalUnrongAlongWithLiqiCount, setTotalUnrongAlongWithLiqiCount] = useState<number>(0);
  const [totalUnrongAfterLiqiCount, setTotalUnrongAfterLiqiCount] = useState<number>(0);
  const [totalUnrongAfterChiPengGang, setTotalUnrongAfterChiPengGang] = useState<number>(0);
  const [totalLiqiTurn, setTotalLiqiTurn] = useState<number[]>([]);
  const [totalLiqiNoTileCount, setTotalLiqiNoTileCount] = useState<number>(0);
  const [totalLiqiFirstTurnHuleCount, setTotalLiqiFirstTurnHuleCount] = useState<number>(0);
  const [totalLiqiZhentingCount, setTotalLiqiZhentingCount] = useState<number>(0);
  const [totalLiqiWaitingTiles, setTotalLiqiWaitingTiles] = useState<number[]>([]);
  const [totalLiqiRemainingTileCount, setTotalLiqiRemainingTileCount] = useState<number[]>([]);
  const [totalLiDoraCount, setTotalLiDoraCount] = useState<number[]>([]);
  const [totalZimoParentCoverScores, setTotalZimoParentCoverScores] = useState<number[]>([]);
  const [totalHuleAfterMingCount, setTotalHuleAfterMingCount] = useState<number>(0);
  const [totalNoTileAfterChiPengGangCount, setTotalNoTileAfterChiPengGangCount] = useState<number>(0);
  const [totalFinalPoints, setTotalFinalPoints] = useState<number[]>([]);

  useEffect(() => {
    const firestore = async () => {
      const querySnapshot = await getDocs(collection(db, "paifu"));
      let numberOfGame: number = 0;
      let roundCount: number = 0;
      let huleCount: number = 0;
      let unrongCount: number = 0;
      let unrongScores: number[] = [];
      let zimoCount: number = 0;
      let unliqiCount: number = 0;
      let noTileCount: number = 0;
      let noTileTingpaiCount: number = 0;
      let chiPengGangCount: number = 0;
      let liqiCount: number = 0;
      let liqiPreemptionCount: number = 0;
      let liqiChasedCount: number = 0;
      let dadianScores: number[] = [];
      let places: number[] = [];
      let huleOutOfLiqiCount: number = 0;
      let liqiIncomes: number[] = [];
      let liqiExpenditures: number[] = [];
      let unrongAlongWithLiqiCount: number = 0;
      let unrongAfterLiqiCount: number = 0;
      let unrongAfterChiPengGang: number = 0;
      let liqiTurns: number[] = [];
      let liqiNoTileCount: number = 0;
      let liqiFirstTurnHuleCount: number = 0;
      let liqiZhentingCount: number = 0;
      let liqiWaitingTileCount: number[] = [];
      let liqiRemainingTileCount: number[] = [];
      let liDoraCount: number[] = [];
      let zimoParentCoverScores: number[] = [];
      let huleAfterMingCount: number = 0;
      let noTileAfterChiPengGangCount: number = 0;
      let finalPoints: number[] = [];

      querySnapshot.forEach((doc: any) => {
        let data = doc.data();
        numberOfGame++;
        roundCount += data.totalRound;
        huleCount += data.hule.length;
        unrongCount += data.unrong.total;
        unrongScores.push(...data.unrong.scores);
        data.hule.forEach((hule: any) => {
          dadianScores.push(hule.dadian);
          if (hule.zimo) zimoCount++;
          if (!hule.liqi && hule.ming.length === 0) unliqiCount++;
          if (hule.liqi) {
            huleOutOfLiqiCount++;
            liqiIncomes.push(hule.deltaScore);
            liDoraCount.push(hule.liDora);
          }
          if (hule.ming.length > 0) huleAfterMingCount++;
        });
        noTileCount += data.noTile.total;
        noTileTingpaiCount += data.noTile.tingpai;
        chiPengGangCount += data.chiPengGang;
        liqiCount += data.liqi.total;
        liqiPreemptionCount += data.liqi.preemption;
        liqiChasedCount += data.liqi.chased;
        places.push(data.gameRecord.place);
        unrongAlongWithLiqiCount += data.unrong.alongWithLiqi.count;
        unrongAfterLiqiCount += data.unrong.afterLiqi.count;
        unrongAfterChiPengGang += data.unrong.afterChiPengGang.count;
        liqiExpenditures.push(...data.unrong.afterLiqi.scores);
        liqiTurns.push(...data.liqi.turns);
        liqiNoTileCount += data.liqi.noTile;
        liqiFirstTurnHuleCount += data.liqi.firstTurnHule;
        liqiZhentingCount += data.liqi.zhenting;
        liqiWaitingTileCount.push(...data.liqi.waitingTileCount);
        liqiRemainingTileCount.push(...data.liqi.remainingTileCount);
        zimoParentCoverScores.push(...data.zimo.parentCoverScores);
        noTileAfterChiPengGangCount += data.noTile.afterChiPengGang;
        finalPoints.push(data.gameRecord.finalPoint);
      });

      setGameCount(numberOfGame);
      setTotalRoundCount(roundCount);
      setTotalHuleCount(huleCount);
      setTotalUnrongCount(unrongCount);
      setTotalUnrongScore(unrongScores);
      setTotalZimoCount(zimoCount);
      setTotalUnliqiCount(unliqiCount);
      setTotalNoTileCount(noTileCount);
      setTotalNoTileTingpaiCount(noTileTingpaiCount);
      setTotalChiPengGangCount(chiPengGangCount);
      setTotalLiqiCount(liqiCount);
      setTotalLiqiPreemptionCount(liqiPreemptionCount);
      setTotalLiqiChasedCount(liqiChasedCount);
      setTotalDadian(dadianScores);
      setTotalPlace(places);
      setTotalHuleOutOfLiqiCount(huleOutOfLiqiCount);
      setTotalLiqiIncome(liqiIncomes);
      setTotalLiqiExpenditure(liqiExpenditures);
      setTotalUnrongAlongWithLiqiCount(unrongAlongWithLiqiCount);
      setTotalUnrongAfterLiqiCount(unrongAfterLiqiCount);
      setTotalUnrongAfterChiPengGang(unrongAfterChiPengGang);
      setTotalLiqiTurn(liqiTurns);
      setTotalLiqiNoTileCount(liqiNoTileCount);
      setTotalLiqiFirstTurnHuleCount(liqiFirstTurnHuleCount);
      setTotalLiqiZhentingCount(liqiZhentingCount);
      setTotalLiqiWaitingTiles(liqiWaitingTileCount);
      setTotalLiqiRemainingTileCount(liqiRemainingTileCount);
      setTotalLiDoraCount(liDoraCount);
      setTotalZimoParentCoverScores(zimoParentCoverScores);
      setTotalHuleAfterMingCount(huleAfterMingCount);
      setTotalNoTileAfterChiPengGangCount(noTileAfterChiPengGangCount);
      setTotalFinalPoints(finalPoints);
    };

    firestore();
  }, []);

  return (
    <>
      <section className="container mx-auto p-4">
        <div className="flex items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <input type="file" accept="text/plain" {...register("paifu")} />
            <br />
            <input
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </form>
        </div>

        <table border={1} className="min-w-full divide-y divide-gray-200">
          <Thead>
            <tr>
              <Th>対戦数</Th>
              <Th>総局数</Th>
              <Th>和了率</Th>
              <Th>放銃率</Th>
              <Th>ツモ率</Th>
              <Th>ダマ率</Th>
            </tr>
          </Thead>
          <Tbody>
            <tr>
              <Td>{gameCount}</Td>
              <Td>{totalRoundCount}</Td>
              <Td>{useHuleRateHook(totalRoundCount, totalHuleCount)}％</Td>
              <Td>{useUnrongRateHook(totalRoundCount, totalUnrongCount)}%</Td>
              <Td>{useZimoRateHook(totalHuleCount, totalZimoCount)}％</Td>
              <Td>{useUnliqiUnmingHuleRateHook(totalHuleCount, totalUnliqiCount)}％</Td>
            </tr>
          </Tbody>
          <Thead>
            <tr>
              <Th>流局率</Th>
              <Th>流局聴牌率</Th>
              <Th>副露率</Th>
              <Th>立直率</Th>
              <Th>平均和了</Th>
              <Th>平均放銃</Th>
            </tr>
          </Thead>
          <Tbody>
            <tr>
              <Td>{useNoTileRateHook(totalRoundCount, totalNoTileCount)}％</Td>
              <Td>{useNoTileTingpaiRateHook(totalNoTileCount, totalNoTileTingpaiCount)}％</Td>
              <Td>{useChiPengGangRateHook(totalRoundCount, totalChiPengGangCount)}％</Td>
              <Td>{useLiqiRateHook(totalRoundCount, totalLiqiCount)}％</Td>
              <Td>{useAverageDadianScoreHook(totalDadian)}</Td>
              <Td>{useAverageUnrongScoreHook(totalUnrongScore)}</Td>
            </tr>
          </Tbody>
          <Thead>
            <tr>
              <Th>平均順位</Th>
              <Th>立直和了</Th>
              <Th>立直放銃A</Th>
              <Th>立直放銃B</Th>
              <Th>立直収入</Th>
              <Th>立直支出</Th>
            </tr>
          </Thead>
          <Tbody>
            <tr>
              <Td>{useAveragePlaceHook(totalPlace)}</Td>
              <Td>{useLiqiSuccessRateHook(totalHuleOutOfLiqiCount, totalLiqiCount)}％</Td>
              <Td>{useUnrongIncludeOnLiqiRateHook(totalLiqiCount, totalUnrongAlongWithLiqiCount, totalUnrongAfterLiqiCount)}％</Td>
              <Td>{useUnrongAfterLiqiRateBasedOnLiqiHook(totalLiqiCount, totalUnrongAfterLiqiCount)}％</Td>
              {/* <Td>{useLiqiIncomeHook(totalLiqiIncome)}</Td> */}
              <Td>useLiqiIncomeの引数変更必須</Td>
              <Td>{useLiqiExpenditureHook(totalLiqiExpenditure)}</Td>
            </tr>
          </Tbody>
          <Thead>
            <tr>
              <Th>立直収支</Th>
              <Th>先制率</Th>
              <Th>追っかけ率</Th>
              <Th>追っかけられ率</Th>
              <Th>立直巡目</Th>
              <Th>立直流局</Th>
            </tr>
          </Thead>
          <Tbody>
            <tr>
              {/* <Td>{useLiqiIncomeAndExpenditureHook(totalLiqiCount, totalLiqiIncome, totalLiqiExpenditure)}</Td> */}
              <Td>useLiqiIncomeAndExpenditureの引数変更必須</Td>
              <Td>{useLiqiPreemptionRateHook(totalLiqiCount, totalLiqiPreemptionCount)}％</Td>
              <Td>{useLiqiChasingRateHook(totalLiqiCount, totalLiqiPreemptionCount)}％</Td>
              <Td>{useLiqiChasedRateHook(totalLiqiCount, totalLiqiChasedCount)}％</Td>
              <Td>{useAverageLiqiTurnHook(totalLiqiTurn)}</Td>
              <Td>{useLiqiNoTileRateHook(totalLiqiCount, totalLiqiNoTileCount)}％</Td>
            </tr>
          </Tbody>
          <Thead>
            <tr>
              <Th>一発率</Th>
              <Th>振聴率</Th>
              <Th>立直多面</Th>
              <Th>立直良型</Th>
              <Th>裏ドラ率</Th>
              <Th>痛い親被り率</Th>
            </tr>
          </Thead>
          <Tbody>
            <tr>
              <Td>{useLiqiFirstTurnHuleRateHook(totalLiqiCount, totalLiqiFirstTurnHuleCount)}％</Td>
              <Td>{useLiqiZhentingRateHook(totalLiqiCount, totalLiqiZhentingCount)}％</Td>
              <Td>{useLiqiMultipleWaitingRateHook(totalLiqiCount, totalLiqiWaitingTiles)}％</Td>
              <Td>{useLiqiGoodShapeRateHook(totalLiqiRemainingTileCount)}％</Td>
              <Td>{useLiDoraRateHook(totalLiDoraCount)}％</Td>
              <Td>{useZimoSereveParentCoverRateHook(totalZimoParentCoverScores)}%</Td>
            </tr>
          </Tbody>
          <Thead>
            <tr>
              <Th>痛い親被り平均</Th>
              <Th>放銃時面前率</Th>
              <Th>放銃時立直率</Th>
              <Th>放銃時副露率</Th>
              <Th>副露後放銃率</Th>
              <Th>副露後和了率</Th>
            </tr>
          </Thead>
          <Tbody>
            <tr>
              <Td>{useZimoSereveParentCoverScoreHook(totalZimoParentCoverScores)}</Td>
              <Td>{useUnrongUnmingRateHook(totalUnrongCount, totalUnrongAfterLiqiCount, totalUnrongAfterChiPengGang)}％</Td>
              <Td>{useUnrongAfterLiqiRateBasedOnUnrongHook(totalUnrongCount, totalUnrongAfterLiqiCount)}％</Td>
              <Td>{useUnrongAfterChiPengGangRateBasedOnUnrongHook(totalUnrongCount, totalUnrongAfterChiPengGang)}％</Td>
              <Td>{useUnrongAfterChiPengGangRateBasedOnMingHook(totalChiPengGangCount, totalUnrongAfterChiPengGang)}％</Td>
              <Td>{useHuleAfterMingRateHook(totalChiPengGangCount, totalHuleAfterMingCount)}％</Td>
            </tr>
          </Tbody>
          <Thead>
            <tr>
              <Th>副露後流局率</Th>
              <Th>打点効率</Th>
              <Th>銃点損失</Th>
              <Th>調整打点効率</Th>
              <Th>局収支</Th>
              <Th></Th>
            </tr>
          </Thead>
          <Tbody>
            <tr>
              <Td>{useNoTileAfterChiPengGangRateHook(totalChiPengGangCount, totalNoTileAfterChiPengGangCount)}％</Td>
              <Td>{useAttackBalanceIndexHook(totalRoundCount, totalHuleCount, totalDadian)}</Td>
              <Td>{useDefenseBalanceIndexHook(totalRoundCount, totalUnrongCount, totalUnrongScore)}</Td>
              <Td>{useAttackAndDefenseBalanceIndexHook(totalRoundCount, totalHuleCount, totalDadian, totalUnrongCount, totalUnrongScore)}</Td>
              <Td>{useRoundIncomeAndExpenditureHook(gameCount, totalRoundCount, totalFinalPoints)}</Td>
              <Td></Td>
            </tr>
          </Tbody>
        </table>
      </section>
    </>
  );
}
