import { identifySeat } from './userAccount/seatIdentification'
import { identifyGameMode } from './gameConfig/gameModeIdentification';
import { identifyRank } from './userAccount/rankIdentification'
import { storeGameRecord } from './userResult/gameRecordStorer'
import { convertUnixTime } from './gameConfig/unixTimeConverter';
import { categorizeHule } from './userAction/hule/huleCategorizer'
import { countUnrong } from './userAction/unrong/unrongCounter'
import { storeUnrongScore } from './userAction/unrong/unrongScoreStorer';
import { countLiqi } from './userAction/liqi/liqiCounter'
import { countLiqiPreemption } from './userAction/liqi/liqiPreemptionCounter';
import { countLiqiChased } from './userAction/liqi/liqiChasedCounter';
import { countNoTile } from './userAction/noTile/noTileCounter'
import { countNoTileTingpai } from './userAction/noTile/noTileTingpaiCounter'
import { countChiPengGang } from './userAction/chiPengGang/chiPengGangCounter';
import { countUnrongAlongWithLiqi } from './userAction/unrong/unrongAlongWithLiqiCounter'
import { countUnrongAfterLiqi } from './userAction/unrong/unrongAfterLiqiCounter'
import { countLiqiTurn } from './userAction/liqi/liqiTurnCounter';
import { countLiqiNoTile } from './userAction/liqi/liqiNoTileCounter';
import { countLiqiFirstTurnHule } from './userAction/liqi/liqiFirstTurnHuleCounter';
import { countLiqiZhenting } from './userAction/liqi/liqiZhentingCounter';
import { countLiqiWaitingTile } from './userAction/liqi/liqiWaitingTileCounter';
import { countLiqiRemainingTile } from './userAction/liqi/liqiRemainingTileCounter';
import { countZimoSevereParentCover } from './userAction/zimo/zimoParentCoverCounter';
import { countUnrongAfterChiPengGang } from './userAction/unrong/unrongAfterChiPengGangCounter';
import { countNoTileAfterChiPengGang } from './userAction/noTile/noTileAfterChiPengGangCounter';
import { storeScoreTrend } from './userResult/scoreTrendStorer';
import type { PlayerResult } from './distributeDataType';
import type { UserActions } from './userAction/userActionType'

export const distributeData = (data: string): PlayerResult => {
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
    hule: {
      total: 0,
      details: []
    },
    unrong: {
      total: 0,
      scores: [],
      alongWithLiqi: {
        count: 0,
        scores: []
      },
      afterLiqi: {
        count: 0,
        scores: []
      },
      afterChiPengGang: {
        count: 0,
        scores: []
      }
    },
    noTile: {
      total: 0,
      tingpai: 0,
      afterChiPengGang: 0
    },
    chiPengGang: {
      total: 0
    },
    liqi: {
      total: 0,
      preemption: 0,
      chased: 0,
      turns: [],
      noTile: 0,
      firstTurnHule: 0,
      zhenting: 0,
      waitingTileCount: [],
      remainingTileCount: []
    },
    zimo: {
      parentCoverScores: []
    },
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
  let recordAnGangAddGang: any[] = []
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
        case '.lq.RecordAnGangAddGang':
          recordAnGangAddGang.push(action)
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
  playerResult.hule.details = categorizeHule(playerResult.seat, recordHule)
  playerResult.hule.total = playerResult.hule.details.length
  playerResult.unrong.total = countUnrong(playerResult.seat, recordHule)
  playerResult.unrong.scores = storeUnrongScore(playerResult.seat, recordHule)
  playerResult.noTile.total = countNoTile(recordNoTile, recordLiuju)
  playerResult.noTile.tingpai = countNoTileTingpai(playerResult.seat, recordNoTile)

  const rounds: { round: number, startTime: number, endTime: number }[] = divideByRound(userActions, recordNewRound)
  playerResult.chiPengGang.total = countChiPengGang(rounds, recordChiPengGang, playerResult.seat)

  const unrongTimes: number[] = getUnrongTimes(playerResult.seat, recordHule)
  playerResult.unrong.alongWithLiqi = countUnrongAlongWithLiqi(playerResult.seat, recordDiscardTile, unrongTimes, recordHule)
  playerResult.unrong.afterLiqi = countUnrongAfterLiqi(playerResult.seat, rounds, recordDealTile, recordChiPengGang, unrongTimes, recordHule)
  playerResult.unrong.afterChiPengGang = countUnrongAfterChiPengGang(playerResult.seat, recordChiPengGang, recordDiscardTile, recordHule, unrongTimes, rounds)
  playerResult.liqi.total = countLiqi(playerResult.seat, userInput, playerResult.unrong.alongWithLiqi.count)
  playerResult.liqi.preemption = countLiqiPreemption(playerResult.seat, userInput, recordDiscardTile, unrongTimes, rounds)
  playerResult.liqi.chased = countLiqiChased(playerResult.seat, userInput, rounds)
  playerResult.liqi.turns = countLiqiTurn(playerResult.seat, userInput, recordDiscardTile, unrongTimes, rounds)
  playerResult.liqi.noTile = countLiqiNoTile(playerResult.seat, recordNoTile, recordDealTile, recordChiPengGang, rounds)
  playerResult.liqi.firstTurnHule = countLiqiFirstTurnHule(playerResult.seat, recordHule)
  playerResult.liqi.zhenting = countLiqiZhenting(playerResult.seat, recordDealTile, recordChiPengGang)
  playerResult.liqi.waitingTileCount = countLiqiWaitingTile(playerResult.seat, recordDiscardTile, unrongTimes, rounds)
  playerResult.liqi.remainingTileCount = countLiqiRemainingTile(playerResult.seat, recordDiscardTile, recordChiPengGang, recordAnGangAddGang, recordNewRound, recordDealTile, unrongTimes, rounds)
  playerResult.zimo.parentCoverScores = countZimoSevereParentCover(playerResult.seat, recordHule, rounds)
  playerResult.noTile.afterChiPengGang = countNoTileAfterChiPengGang(playerResult.seat, recordChiPengGang, recordNoTile, rounds)
  storeScoreTrend(userAccounts, userResults, recordNewRound)

  return playerResult
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
