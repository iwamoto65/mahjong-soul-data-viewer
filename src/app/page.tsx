'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { distributeData } from '@/features/distributeData'
import { CulcHuleRate } from '../hooks/useHuleRate'
import { CulcUnrongRate } from '@/hooks/useUnrongRate'
import { CulcZimoRate } from '@/hooks/useZimoRate'
import { CulcUnliqiUnmingHuleRate } from '@/hooks/useUnliqiUnmingHuleRate'
import { CulcNoTileRate } from '@/hooks/useNoTileRate'
import { CulcNoTileTingpaiRate } from '@/hooks/useNoTileTingpaiRate'
import { CulcChiPengGangRate } from '@/hooks/useChiPengGangRate'
import { CulcLiqiRate } from '@/hooks/useLiqiRate'
import { CulcAverageDadianScore } from '@/hooks/useAverageDadianScore'
import { CulcAverageUnrongScore } from '@/hooks/useAverageUnrongScore'
import { CulcAveragePlace } from '@/hooks/useAveragePlace'
import { CulcLiqiSuccessRate } from '@/hooks/useLiqiSuccessRate'
import { CulcUnrongIncludeOnLiqiRate } from '@/hooks/useUnrongIncludeOnLiqiRate'
import { CulcUnrongAfterLiqiRate } from '@/hooks/useUnrongAfterLiqiRate'
import { CulcLiqiIncome } from '@/hooks/useLiqiIncome'
import { CulcLiqiExpenditure } from '@/hooks/useLiqiExpenditure'
import { CulcLiqiIncomeAndExpenditure } from '@/hooks/useLiqiIncomeAndExpenditure'
import { CulcLiqiPreemptionRate } from '@/hooks/useLiqiPreemptionRate'
import { CulcLiqiChasingRate } from '@/hooks/useLiqiChasingRate'
import { CulcLiqiChasedRate } from '@/hooks/useLiqiChasedRate'
import { CulcAverageLiqiTurn } from '@/hooks/useAverageLiqiTurn'
import { CulcLiqiNoTileRate } from '@/hooks/useLiqiNoTileRate'
import { CulcLiqiFirstTurnHuleRate } from '@/hooks/useLiqiFirstTurnHuleRate'
import { CulcLiqiZhentingRate } from '@/hooks/useLiqiZhentingRate'
import { CulcLiqiMultipleWaitingRate } from '@/hooks/useLiqiMultipleWaitingRate'
import { CulcLiqiGoodShapeRate } from '@/hooks/useLiqiGoodShapeRate'
import db from '../../firebase'
import { collection, getDocs } from "firebase/firestore"

export default function Home() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (file: any) => {
    if (file.paifu.length !== 0) {
      const reader = new FileReader()
      reader.readAsText(file.paifu[0])
      reader.onload = () => {
        if (typeof reader.result == 'string') {
          distributeData(reader.result)
            // .then(res => {
            //   if (res.status === 'ok') {
            //     // alert('アップロードが完了しました。')
            //     // window.location.reload()
            //   }
            // })
        } else {
          reader.abort()
        }
      }
    } else {
      alert('ファイルを選択してください')
    }
  }

  const [gameCount, setGameCount] = useState<number>(0)
  const [totalRoundCount, setTotalRoundCount] = useState<number>(0)
  const [totalHuleCount, setTotalHuleCount] = useState<number>(0)
  const [totalUnrongCount, setTotalUnrongCount] = useState<number>(0)
  const [totalUnrongScore, setTotalUnrongScore] = useState<number[]>([])
  const [totalZimoCount, setTotalZimoCount] = useState<number>(0)
  const [totalUnliqiCount, setTotalUnliqiCount] = useState<number>(0)
  const [totalNoTileCount, setTotalNoTileCount] = useState<number>(0)
  const [totalNoTileTingpaiCount, setTotalNoTileTingpaiCount] = useState<number>(0)
  const [totalChiPengGangCount, setTotalChiPengGangCount] = useState<number>(0)
  const [totalLiqiCount, setTotalLiqiCount] = useState<number>(0)
  const [totalLiqiPreemptionCount, setTotalLiqiPreemptionCount] = useState<number>(0)
  const [totalLiqiChasedCount, setTotalLiqiChasedCount] = useState<number>(0)
  const [totalDadian, setTotalDadian] = useState<number[]>([])
  const [totalPlace, setTotalPlace] = useState<number[]>([])
  const [totalHuleOutOfLiqiCount, setTotalHuleOutOfLiqiCount] = useState<number>(0)
  const [totalLiqiIncome, setTotalLiqiIncome] = useState<number[]>([])
  const [totalLiqiExpenditure, setTotalLiqiExpenditure] = useState<number[]>([])
  const [totalUnrongAlongWithLiqiCount, setTotalUnrongAlongWithLiqiCount] = useState<number>(0)
  const [totalUnrongAfterLiqiCount, setTotalUnrongAfterLiqiCount] = useState<number>(0)
  const [totalLiqiTurn, setTotalLiqiTurn] = useState<number[]>([])
  const [totalLiqiNoTileCount, setTotalLiqiNoTileCount] = useState<number>(0)
  const [totalLiqiFirstTurnHuleCount, setTotalLiqiFirstTurnHuleCount] = useState<number>(0)
  const [totalLiqiZhentingCount, setTotalLiqiZhentingCount] = useState<number>(0)
  const [totalLiqiWaitingTiles, setTotalLiqiWaitingTiles] = useState<number[]>([])
  const [totalLiqiRemainingTileCount, setTotalLiqiRemainingTileCount] = useState<number[]>([])

  useEffect(() => {
    const firestore = async () => {
      const querySnapshot = await getDocs(collection(db, "paifu"))
      let numberOfGame: number = 0
      let roundCount: number = 0
      let huleCount: number = 0
      let unrongCount: number = 0
      let unrongScores: number[] = []
      let zimoCount: number = 0
      let unliqiCount: number = 0
      let noTileCount: number = 0
      let noTileTingpaiCount: number = 0
      let chiPengGangCount: number = 0
      let liqiCount: number = 0
      let liqiPreemptionCount: number = 0
      let liqiChasedCount: number = 0
      let dadianScores: number[] = []
      let places: number[] = []
      let huleOutOfLiqiCount: number = 0
      let liqiIncomes: number[] = []
      let liqiExpenditures: number[] = []
      let unrongAlongWithLiqiCount: number = 0
      let unrongAfterLiqiCount: number = 0
      let liqiTurns: number[] = []
      let liqiNoTileCount: number = 0
      let liqiFirstTurnHuleCount: number = 0
      let liqiZhentingCount: number = 0
      let liqiWaitingTileCount: number[] = []
      let liqiRemainingTileCount: number[] = []

      querySnapshot.forEach((doc: any) => {
        let data = doc.data()
        numberOfGame++
        roundCount += data.totalRound
        huleCount += data.hule.length
        unrongCount += data.unrong.total
        unrongScores.push(...data.unrong.scores)
        data.hule.forEach((hule: any) => {
          dadianScores.push(hule.dadian)
          if (hule.zimo) zimoCount++
          if (!hule.liqi && hule.ming.length === 0) unliqiCount++
          if (hule.liqi) {
            huleOutOfLiqiCount++
            liqiIncomes.push(hule.deltaScore)
          }
        })
        noTileCount += data.noTile.total
        noTileTingpaiCount += data.noTile.tingpai
        chiPengGangCount += data.chiPengGang
        liqiCount += data.liqi.total
        liqiPreemptionCount += data.liqi.preemption
        liqiChasedCount += data.liqi.chased
        places.push(data.gameRecord.place)
        unrongAlongWithLiqiCount += data.unrong.alongWithLiqi.count
        unrongAfterLiqiCount += data.unrong.afterLiqi.count
        liqiExpenditures.push(...data.unrong.afterLiqi.scores)
        liqiTurns.push(...data.liqi.turns)
        liqiNoTileCount += data.liqi.noTile
        liqiFirstTurnHuleCount += data.liqi.firstTurnHule
        liqiZhentingCount += data.liqi.zhenting
        liqiWaitingTileCount.push(...data.liqi.waitingTileCount)
        liqiRemainingTileCount.push(...data.liqi.remainingTileCount)
      })

      setGameCount(numberOfGame)
      setTotalRoundCount(roundCount)
      setTotalHuleCount(huleCount)
      setTotalUnrongCount(unrongCount)
      setTotalUnrongScore(unrongScores)
      setTotalZimoCount(zimoCount)
      setTotalUnliqiCount(unliqiCount)
      setTotalNoTileCount(noTileCount)
      setTotalNoTileTingpaiCount(noTileTingpaiCount)
      setTotalChiPengGangCount(chiPengGangCount)
      setTotalLiqiCount(liqiCount)
      setTotalLiqiPreemptionCount(liqiPreemptionCount)
      setTotalLiqiChasedCount(liqiChasedCount)
      setTotalDadian(dadianScores)
      setTotalPlace(places)
      setTotalHuleOutOfLiqiCount(huleOutOfLiqiCount)
      setTotalLiqiIncome(liqiIncomes)
      setTotalLiqiExpenditure(liqiExpenditures)
      setTotalUnrongAlongWithLiqiCount(unrongAlongWithLiqiCount)
      setTotalUnrongAfterLiqiCount(unrongAfterLiqiCount)
      setTotalLiqiTurn(liqiTurns)
      setTotalLiqiNoTileCount(liqiNoTileCount)
      setTotalLiqiFirstTurnHuleCount(liqiFirstTurnHuleCount)
      setTotalLiqiZhentingCount(liqiZhentingCount)
      setTotalLiqiWaitingTiles(liqiWaitingTileCount)
      setTotalLiqiRemainingTileCount(liqiRemainingTileCount)
    }

    firestore()
  }, [])

  return (
    <>
      <main style={{ textAlign: 'center', margin: '50px 0' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type='file' accept='text/plain' {...register('paifu')} />
          <br />
          <input type='submit' />
        </form>
        <table border={1} style={{ marginTop: '30px', width: '100%' }}>
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
              <td>{ gameCount }</td>
              <td>{ totalRoundCount }</td>
              <td>{ CulcHuleRate(totalRoundCount, totalHuleCount) }％</td>
              <td>{ CulcUnrongRate(totalRoundCount, totalUnrongCount) }%</td>
              <td>{ CulcZimoRate(totalHuleCount, totalZimoCount) }％</td>
              <td>{ CulcUnliqiUnmingHuleRate(totalHuleCount, totalUnliqiCount) }％</td>
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
              <td>{ CulcNoTileRate(totalRoundCount, totalNoTileCount) }％</td>
              <td>{ CulcNoTileTingpaiRate(totalNoTileCount, totalNoTileTingpaiCount) }％</td>
              <td>{ CulcChiPengGangRate(totalRoundCount, totalChiPengGangCount) }％</td>
              <td>{ CulcLiqiRate(totalRoundCount, totalLiqiCount) }％</td>
              <td>{ CulcAverageDadianScore(totalDadian) }</td>
              <td>{ CulcAverageUnrongScore(totalUnrongScore) }</td>
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
              <td>{ CulcAveragePlace(totalPlace) }</td>
              <td>{ CulcLiqiSuccessRate(totalHuleOutOfLiqiCount, totalLiqiCount) }％</td>
              <td>{ CulcUnrongIncludeOnLiqiRate(totalLiqiCount, totalUnrongAlongWithLiqiCount, totalUnrongAfterLiqiCount) }％</td>
              <td>{ CulcUnrongAfterLiqiRate(totalLiqiCount, totalUnrongAfterLiqiCount) }％</td>
              <td>{ CulcLiqiIncome(totalLiqiIncome) }</td>
              <td>{ CulcLiqiExpenditure(totalLiqiExpenditure) }</td>
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
              <td>{ CulcLiqiIncomeAndExpenditure(totalLiqiCount, totalLiqiIncome, totalLiqiExpenditure) }</td>
              <td>{ CulcLiqiPreemptionRate(totalLiqiCount, totalLiqiPreemptionCount) }％</td>
              <td>{ CulcLiqiChasingRate(totalLiqiCount, totalLiqiPreemptionCount) }％</td>
              <td>{ CulcLiqiChasedRate(totalLiqiCount, totalLiqiChasedCount) }％</td>
              <td>{ CulcAverageLiqiTurn(totalLiqiTurn) }</td>
              <td>{ CulcLiqiNoTileRate(totalLiqiCount, totalLiqiNoTileCount)}％</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>一発率</th>
              <th>振聴率</th>
              <th>立直多面</th>
              <th>立直良型</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ CulcLiqiFirstTurnHuleRate(totalLiqiCount, totalLiqiFirstTurnHuleCount) }％</td>
              <td>{ CulcLiqiZhentingRate(totalLiqiCount, totalLiqiZhentingCount) }％</td>
              <td>{ CulcLiqiMultipleWaitingRate(totalLiqiCount, totalLiqiWaitingTiles) }％</td>
              <td>{ CulcLiqiGoodShapeRate(totalLiqiRemainingTileCount) }％</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  )
}
