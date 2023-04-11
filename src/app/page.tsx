'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { distributeData } from '@/features/distributeData'
import { CulcHuleRate } from '../hooks/useHuleRate'
import { CulcUnrongRate } from '@/hooks/useUnrongRate'
import { CulcZimoRate } from '@/hooks/useZimoRate'
import { CulcUnliqiHuleRate } from '@/hooks/useUnliqiHuleRate'
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
  const [totalDadian, setTotalDadian] = useState<number[]>([])
  const [totalPlace, setTotalPlace] = useState<number[]>([])
  const [totalHuleOutOfLiqiCount, setTotalHuleOutOfLiqiCount] = useState<number>(0)
  const [totalUnrongAlongWithLiqiCount, setTotalUnrongAlongWithLiqiCount] = useState<number>(0)
  const [totalUnrongAfterLiqiCount, setTotalUnrongAfterLiqiCount] = useState<number>(0)

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
      let dadianScores: number[] = []
      let places: number[] = []
      let huleOutOfLiqiCount: number = 0
      let unrongAlongWithLiqiCount: number = 0
      let unrongAfterLiqiCount: number = 0

      querySnapshot.forEach((doc: any) => {
        let data = doc.data()
        numberOfGame++
        roundCount += data.totalRound
        huleCount += data.hule.length
        unrongCount += data.unrong.count
        unrongScores.push(...data.unrong.score)
        data.hule.forEach((hule: any) => {
          dadianScores.push(hule.dadian)
          if (hule.zimo) {
            zimoCount++
          } else if (hule.ming.length === 0) {
            unliqiCount++
          } else if (hule.liqi) {
            huleOutOfLiqiCount++
          }
        })
        noTileCount += data.noTile.total
        noTileTingpaiCount += data.noTile.tingpai
        chiPengGangCount += data.chiPengGang
        liqiCount += data.liqi
        places.push(data.gameRecord.place)
        unrongAlongWithLiqiCount += data.unrong.alongWithLiqi
        unrongAfterLiqiCount += data.unrong.afterLiqi
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
      setTotalDadian(dadianScores)
      setTotalPlace(places)
      setTotalHuleOutOfLiqiCount(huleOutOfLiqiCount)
      setTotalUnrongAlongWithLiqiCount(unrongAlongWithLiqiCount)
      setTotalUnrongAfterLiqiCount(unrongAfterLiqiCount)
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
              <td>{ CulcUnliqiHuleRate(totalHuleCount, totalUnliqiCount) }％</td>
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ CulcAveragePlace(totalPlace) }</td>
              <td>{ CulcLiqiSuccessRate(totalHuleOutOfLiqiCount, totalLiqiCount) }％</td>
              <td>{ CulcUnrongIncludeOnLiqiRate(totalLiqiCount, totalUnrongAlongWithLiqiCount, totalUnrongAfterLiqiCount) }％</td>
              <td>{ CulcUnrongAfterLiqiRate(totalLiqiCount, totalUnrongAfterLiqiCount) }％</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  )
}
