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
      <main style={{ textAlign: "center", margin: "50px 0" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="file" accept="text/plain" {...register("paifu")} />
          <br />
          <input type="submit" />
        </form>
        <table border={1} style={{ marginTop: "30px", width: "100%" }}>
          <thead>
            <tr>
              <th>対戦数</th>
              <th>総局数</th>
              <th>和了率</th>
              <th>放銃率</th>
              <th>ツモ率</th>
              <th>ダマ率</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{gameCount}</td>
              <td>{totalRoundCount}</td>
              <td>{useHuleRateHook(totalRoundCount, totalHuleCount)}％</td>
              <td>{useUnrongRateHook(totalRoundCount, totalUnrongCount)}%</td>
              <td>{useZimoRateHook(totalHuleCount, totalZimoCount)}％</td>
              <td>{useUnliqiUnmingHuleRateHook(totalHuleCount, totalUnliqiCount)}％</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>流局率</th>
              <th>流局聴牌率</th>
              <th>副露率</th>
              <th>立直率</th>
              <th>平均和了</th>
              <th>平均放銃</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{useNoTileRateHook(totalRoundCount, totalNoTileCount)}％</td>
              <td>{useNoTileTingpaiRateHook(totalNoTileCount, totalNoTileTingpaiCount)}％</td>
              <td>{useChiPengGangRateHook(totalRoundCount, totalChiPengGangCount)}％</td>
              <td>{useLiqiRateHook(totalRoundCount, totalLiqiCount)}％</td>
              <td>{useAverageDadianScoreHook(totalDadian)}</td>
              <td>{useAverageUnrongScoreHook(totalUnrongScore)}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>平均順位</th>
              <th>立直和了</th>
              <th>立直放銃A</th>
              <th>立直放銃B</th>
              <th>立直収入</th>
              <th>立直支出</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{useAveragePlaceHook(totalPlace)}</td>
              <td>{useLiqiSuccessRateHook(totalHuleOutOfLiqiCount, totalLiqiCount)}％</td>
              <td>{useUnrongIncludeOnLiqiRateHook(totalLiqiCount, totalUnrongAlongWithLiqiCount, totalUnrongAfterLiqiCount)}％</td>
              <td>{useUnrongAfterLiqiRateBasedOnLiqiHook(totalLiqiCount, totalUnrongAfterLiqiCount)}％</td>
              {/* <td>{useLiqiIncomeHook(totalLiqiIncome)}</td> */}
              <td>useLiqiIncomeの引数変更必須</td>
              <td>{useLiqiExpenditureHook(totalLiqiExpenditure)}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>立直収支</th>
              <th>先制率</th>
              <th>追っかけ率</th>
              <th>追っかけられ率</th>
              <th>立直巡目</th>
              <th>立直流局</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <td>{useLiqiIncomeAndExpenditureHook(totalLiqiCount, totalLiqiIncome, totalLiqiExpenditure)}</td> */}
              <td>{useLiqiPreemptionRateHook(totalLiqiCount, totalLiqiPreemptionCount)}％</td>
              <td>{useLiqiChasingRateHook(totalLiqiCount, totalLiqiPreemptionCount)}％</td>
              <td>{useLiqiChasedRateHook(totalLiqiCount, totalLiqiChasedCount)}％</td>
              <td>{useAverageLiqiTurnHook(totalLiqiTurn)}</td>
              <td>{useLiqiNoTileRateHook(totalLiqiCount, totalLiqiNoTileCount)}％</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>一発率</th>
              <th>振聴率</th>
              <th>立直多面</th>
              <th>立直良型</th>
              <th>裏ドラ率</th>
              <th>痛い親被り率</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{useLiqiFirstTurnHuleRateHook(totalLiqiCount, totalLiqiFirstTurnHuleCount)}％</td>
              <td>{useLiqiZhentingRateHook(totalLiqiCount, totalLiqiZhentingCount)}％</td>
              <td>{useLiqiMultipleWaitingRateHook(totalLiqiCount, totalLiqiWaitingTiles)}％</td>
              <td>{useLiqiGoodShapeRateHook(totalLiqiRemainingTileCount)}％</td>
              <td>{useLiDoraRateHook(totalLiDoraCount)}％</td>
              <td>{useZimoSereveParentCoverRateHook(totalZimoParentCoverScores)}%</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>痛い親被り平均</th>
              <th>放銃時面前率</th>
              <th>放銃時立直率</th>
              <th>放銃時副露率</th>
              <th>副露後放銃率</th>
              <th>副露後和了率</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{useZimoSereveParentCoverScoreHook(totalZimoParentCoverScores)}</td>
              <td>{useUnrongUnmingRateHook(totalUnrongCount, totalUnrongAfterLiqiCount, totalUnrongAfterChiPengGang)}％</td>
              <td>{useUnrongAfterLiqiRateBasedOnUnrongHook(totalUnrongCount, totalUnrongAfterLiqiCount)}％</td>
              <td>{useUnrongAfterChiPengGangRateBasedOnUnrongHook(totalUnrongCount, totalUnrongAfterChiPengGang)}％</td>
              <td>{useUnrongAfterChiPengGangRateBasedOnMingHook(totalChiPengGangCount, totalUnrongAfterChiPengGang)}％</td>
              <td>{useHuleAfterMingRateHook(totalChiPengGangCount, totalHuleAfterMingCount)}％</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>副露後流局率</th>
              <th>打点効率</th>
              <th>銃点損失</th>
              <th>調整打点効率</th>
              <th>局収支</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{useNoTileAfterChiPengGangRateHook(totalChiPengGangCount, totalNoTileAfterChiPengGangCount)}％</td>
              <td>{useAttackBalanceIndexHook(totalRoundCount, totalHuleCount, totalDadian)}</td>
              <td>{useDefenseBalanceIndexHook(totalRoundCount, totalUnrongCount, totalUnrongScore)}</td>
              <td>{useAttackAndDefenseBalanceIndexHook(totalRoundCount, totalHuleCount, totalDadian, totalUnrongCount, totalUnrongScore)}</td>
              <td>{useRoundIncomeAndExpenditureHook(gameCount, totalRoundCount, totalFinalPoints)}</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}
