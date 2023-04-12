import { identifySeat } from './userAccount/seatIdentification'
import { identifyGameMode } from './gameConfig/gameModeIdentification';
import { identifyRank } from './userAccount/rankIdentification'
import { storeGameRecord } from './userResult/gameRecordStorer'
import { convertUnixTime } from './gameConfig/unixTimeConverter';
import { categorizeHule } from './userAction/hule/huleCategorizer'
import { countUnrong } from './userAction/unrong/unrongCounter'
import { storeUnrongScore } from './userAction/unrong/unrongScoreStorer';
import { countLiqi } from './userAction/liqi/liqiCounter'
import { countNoTile } from './userAction/noTile/noTileCounter'
import { countNoTileTingpai } from './userAction/noTile/noTileTingpaiCounter'
import { countChiPengGang } from './userAction/chiPengGang/chiPengGangCounter';
import { countUnrongAlongWithLiqi } from './userAction/unrong/unrongAlongWithLiqiCounter'
import { countUnrongAfterLiqi } from './userAction/unrong/unrongAfterLiqiCounter'
import { sendGameResult } from './sendGameResult'
import type { PlayerResult } from './distributeDataType';
import type { UserActions } from './userAction/userActionType'

export const distributeData = (data: string) => {
  const paifu = JSON.parse(data)
  const userActions: [] = paifu.data.data.actions
  const userAccounts: [] = paifu.head.accounts
  const userResults: [] = paifu.head.result.players
  let playerResult: PlayerResult = {
    uuid: '',
    mode: {
      type: '',
      room: '',
      format: '',
      people: 0,
    },
    endTime: '',
    seat: 0,
    totalRound: 0,
    hule: [],
    unrong: {
      count: 0,
      score: {
        liqi: [],
        unliqi: [],
      },
      alongWithLiqi: 0,
      afterLiqi: 0,
    },
    noTile: {
      total: 0,
      tingpai: 0
    },
    chiPengGang: 0,
    liqi: 0,
    gameRecord: {
      finalPoint: 0,
      gradingScore: 0,
      place: 0
    },
    rank: {
      level: '',
      point: 0,
    },
  }

  let recordNewRound: any[] = []
  let recordHule: any[] = []
  let recordNoTile: any[] = []
  let recordLiuju: any[] = []
  let recordChiPengGang: any[] = []
  let recordDiscardTile: any[] = []
  let recordDealTile: any[] = []
  let userInput: any[] = []

  userActions.forEach((action: UserActions) => {
    if (action.result) {
      switch (action.result.name) {
        case '.lq.RecordNewRound':
          recordNewRound.push(action)
          break
        case '.lq.RecordHule':
          recordHule.push(action)
          break
        case '.lq.RecordNoTile':
          recordNoTile.push(action)
          break
        case '.lq.RecordLiuju':
          recordLiuju.push(action)
          break
        case '.lq.RecordChiPengGang':
          recordChiPengGang.push(action)
          break
        case '.lq.RecordDiscardTile':
          recordDiscardTile.push(action)
          break
        case '.lq.RecordDealTile':
          recordDealTile.push(action)
          break
      }
    } else if (action.user_input) {
      userInput.push(action)
    }
  })

  playerResult.uuid = paifu.head.uuid
  playerResult.seat = identifySeat(userAccounts)
  playerResult.mode = identifyGameMode(paifu.head.config.meta.mode_id)
  playerResult.endTime = convertUnixTime(paifu.head.end_time)
  playerResult.rank = identifyRank(playerResult.seat, userAccounts)
  playerResult.gameRecord = storeGameRecord(playerResult.seat, userResults)
  playerResult.totalRound = recordNewRound.length
  playerResult.hule = categorizeHule(playerResult.seat, recordHule)
  playerResult.unrong.count = countUnrong(playerResult.seat, recordHule)
  playerResult.unrong.score = storeUnrongScore(playerResult.seat, recordHule)
  playerResult.noTile.total = countNoTile(recordNoTile, recordLiuju)
  playerResult.noTile.tingpai = countNoTileTingpai(playerResult.seat, recordNoTile)

  const rounds: { round: number, startTime: number, endTime: number }[] = divideByRound(userActions, recordNewRound)
  playerResult.chiPengGang = countChiPengGang(rounds, recordChiPengGang, playerResult.seat)

  const unrongTimes: number[] = getUnrongTimes(playerResult.seat, recordHule)
  playerResult.unrong.alongWithLiqi = countUnrongAlongWithLiqi(playerResult.seat, recordDiscardTile, unrongTimes)
  playerResult.unrong.afterLiqi = countUnrongAfterLiqi(playerResult.seat, rounds, recordDealTile, recordChiPengGang, unrongTimes)
  playerResult.liqi = countLiqi(playerResult.seat, userInput, playerResult.unrong.alongWithLiqi)

  return sendGameResult(playerResult)
}

const divideByRound = (userActions: [], recordNewRound: any[]) => {
  const roundStartTimes: number[] = recordNewRound.map((record) => record.passed)
  let rounds: { round: number, startTime: number, endTime: number }[] = []
  const lastRound: { game_event: number, passed: number, type: number } = userActions[userActions.length - 1]

  roundStartTimes.forEach((_time, i, arr) => {
    if (i < arr.length-1) {
      rounds.push({ round: i+1, startTime: arr[i], endTime: arr[i+1] })
    } else {
      rounds.push({ round: i+1, startTime: arr[i], endTime: lastRound.passed })
    }
  })

  return rounds
}

const getUnrongTimes = (seat: number, recordHule: any[]) => {
  let times: number[] = []

  recordHule.forEach((record) => {
    if (record.result.data.delta_scores[seat] < 0) {
      const NumberOfPeopleWithNegativeScore: number = record.result.data.delta_scores.filter((score: number) => score < 0).length
      if (NumberOfPeopleWithNegativeScore === 1) times.push(record.passed)
    }
  })

  return times
}
