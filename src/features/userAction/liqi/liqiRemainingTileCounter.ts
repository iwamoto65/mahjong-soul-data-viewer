import { checkStateOfUnrongAlongWithLiqi } from "../common/stateOfUnrongAlongWithLiqiChecker"
import type {
  RecordDiscardTileActions,
  RecordChiPengGangActions,
  RecordAnGangAddGangActions,
  RecordNewRoundActions,
  RecordDealTileActions,
  Round
} from "@/types/userAction"

const presetTiles: { [key: string]: number } = {
  '0m': 0, '1m': 0, '2m': 0, '3m': 0, '4m': 0, '5m': 0, '6m': 0, '7m': 0, '8m': 0, '9m': 0,
  '0s': 0, '1s': 0, '2s': 0, '3s': 0, '4s': 0, '5s': 0, '6s': 0, '7s': 0, '8s': 0, '9s': 0,
  '0p': 0, '1p': 0, '2p': 0, '3p': 0, '4p': 0, '5p': 0, '6p': 0, '7p': 0, '8p': 0, '9p': 0,
  '1z': 0, '2z': 0, '3z': 0, '4z': 0, '5z': 0, '6z': 0, '7z': 0
}

export const countLiqiRemainingTile = (
  seat: number,
  recordDiscardTile: RecordDiscardTileActions,
  recordChiPengGang: RecordChiPengGangActions,
  recordAnGangAddGang: RecordAnGangAddGangActions,
  recordNewRound: RecordNewRoundActions,
  recordDealTile: RecordDealTileActions,
  unrongTimes: number[],
  rounds: Round[]
) => {
  const combineRecord = [...recordDiscardTile, ...recordChiPengGang, ...recordAnGangAddGang]
  const targetTiles = combineRecord.sort((a, b) => a.passed - b.passed)
  const statusToAll = countRemainingTilesToAll(seat, targetTiles, rounds)
  const statusToMyself = countTilesOnlyMyself(seat, targetTiles, recordNewRound, recordDealTile, rounds)
  const unrongStatus = checkStateOfUnrongAlongWithLiqi(seat, recordDiscardTile, unrongTimes, rounds)
  let status: { round: number, remainingTiles: number, isUnrong: boolean }[] = []
  let resultRemainingTileCount: number[] = []

  statusToAll.forEach((all, i) => {
    if (all.round === statusToMyself[i].round && all.isLiqi && statusToMyself[i].isLiqi) {
      let tiles: { [key: string]: number } = Object.assign({}, presetTiles)
      let tileCount: number = 0
      const maxTileCount: number = 4

      Object.keys(all.tiles).forEach((key) => tiles[key] = maxTileCount - (statusToMyself[i].tiles[key] + all.tiles[key]))

      statusToMyself[i].tingpais.forEach((tingpai) => {
        Object.keys(tiles).forEach((key) => { if (key === tingpai) tileCount += tiles[key] })
      })

      status.push({ round: all.round, remainingTiles: tileCount, isUnrong: false })
    }
  })

  unrongStatus.forEach((us) => status.forEach((s) => { if (us.round === s.round) s.isUnrong = true }))
  status.forEach((s) => { if (!s.isUnrong) resultRemainingTileCount.push(s.remainingTiles) })

  return resultRemainingTileCount
}

const countRemainingTilesToAll = (seat: number, targetTiles: any[], rounds: any[]) => {
  let status: { round: number, records: any[], isLiqi: boolean, visibleRemainingTilesToAll: {} }[]
    = new Array(rounds.length).fill(null).map((_, i) => ({ round: i + 1, records: [], isLiqi: false, visibleRemainingTilesToAll: {} }))

  targetTiles.forEach((record) => {
    rounds.forEach((r) => {
      if (r.startTime < record.passed && record.passed < r.endTime) {
        status.forEach((s) => {
          if (s.round === r.round) {
            if (record.result.data.seat === seat && (record.result.data.is_liqi | record.result.data.is_wliqi)) {
              s.isLiqi = true
            } else if (record.result.data.liqi?.seat === seat) {
              s.isLiqi = true
            }

            s.records.push(record.result.data)
          }
        })
      }
    })
  })

  status.forEach((s) => {
    if (!s.isLiqi) return
    const index: number = s.records.findIndex((record) => record.seat === seat && record.is_liqi)

    s.records = s.records.slice(0, index + 1)
    s.records = s.records.filter((record) => record.seat !== seat)
  })

  status.forEach((s) => {
    if (s.isLiqi) {
      let tiles: { [key: string]: number } = Object.assign({}, presetTiles)

      s.records.forEach((record) => {
        if ('tile' in record && typeof record.tile === 'string') {
          tiles[record.tile] += 1
        } else if ('tiles' in record && typeof record.tiles === 'object') {
          record.tiles.pop()
          record.tiles.forEach((mt: string) => tiles[mt] += 1)
        } else if ('tiles' in record && typeof record.tiles === 'string') {
          tiles[record.tiles] = 4
        } else if (record.doras) {
          tiles[record.doras[record.doras.length-1]] += 1
        }
      })

      s.visibleRemainingTilesToAll = tiles
    }
  })

  let returnValue: { round: number, isLiqi: boolean, tiles: { [key: string]: 0 | 1 | 2 | 3 | 4 } }[] = []
  status.forEach((s) => returnValue.push({ round: s.round, isLiqi: s.isLiqi, tiles: s.visibleRemainingTilesToAll }))

  return returnValue
}

const countTilesOnlyMyself = (seat: number, targetTiles: any[], recordNewRound: any[], recordDealTile: any[], rounds: any[]) => {
  let status: { round: number, liqiPassed: number | null, tingpais: string[], doras: string[], initTiles: string[], dealTiles: string[], tilesToMyself: {} }[]
    = new Array(rounds.length).fill(null).map((_, i) => ({ round: i + 1, liqiPassed: null, tingpais: [], doras: [], initTiles: [], dealTiles: [], tilesToMyself: {} }))

  targetTiles.forEach((record) => {
    rounds.forEach((r) => {
      if (r.startTime < record.passed && record.passed < r.endTime) {
        status.forEach((s) => {
          if (s.round === r.round) {
            if (record.result.data.seat === seat && (record.result.data.is_liqi | record.result.data.is_wliqi)) {
              s.liqiPassed = record.passed
              s.tingpais = record.result.data.tingpais.map((tingpai: { tile: string }) => tingpai.tile)
            } else if (record.result.data.liqi?.seat === seat) {
              s.liqiPassed = record.passed
            }
          }
        })
      }
    })
  })

  recordNewRound.forEach((record) => {
    rounds.forEach((r) => {
      if (r.startTime <= record.passed && record.passed < r.endTime) {
        status.forEach((s) => {
          if (s.round === r.round) {
            s.doras.push(...record.result.data.doras)
            s.initTiles = record.result.data[`tiles${seat}`]
          }
        })
      }
    })
  })

  recordDealTile.forEach((record) => {
    rounds.forEach((r) => {
      if (r.startTime < record.passed && record.passed < r.endTime) {
        status.forEach((s) => {
          if (s.round === r.round && record.result.data.seat === seat) {
            if (s.liqiPassed && s.liqiPassed > record.passed) {
              s.dealTiles.push(record.result.data.tile)
            }
          }
        })
      }
    })
  })

  status.forEach((s) => {
    let tiles: { [key: string]: number } = Object.assign({}, presetTiles)

    s.initTiles.concat(s.doras, s.dealTiles).forEach((tile) => tiles[tile] += 1)
    s.tilesToMyself = tiles
  })

  let returnValue: { round: number, isLiqi: boolean, tingpais: string[], tiles: { [key: string]: 0 | 1 | 2 | 3 | 4 } }[] = []
  status.forEach((s) => returnValue.push({ round: s.round, isLiqi: s.liqiPassed !== null ? true : false , tingpais: s.tingpais, tiles: s.tilesToMyself }))

  return returnValue
}
