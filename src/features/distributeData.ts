import { playerData } from '@/consts/playerData'
import { identifyGameType } from '@/utils/identifyGameType'
import { identifyRankLevel } from '@/utils/identifyRankLevel'
import { convertUnixtime } from '@/utils/convertUnixtime'
import { categorizeHule } from './hule/huleCategorizer'
import { countUnrong } from './unrong/unrongCounter'
import { storeUnrongScore } from './unrong/unrongScoreStorer';
import { countLiqi } from './liqi/liqiCounter'
import { countNoTile } from './noTile/noTileCounter'
import { countNoTileTingpai } from './noTile/noTileTingpaiCounter'
import { countChiPengGang } from './chiPengGang/chiPengGangCounter';
import { countUnrongAlongWithLiqi } from './liqi/unrongAlongWithLiqiCounter'
import { countUnrongAfterLiqi } from './liqi/unrongAfterLiqiCounter'
import { sendGameResult } from './sendGameResult'
import type { PlayerResult, UserActions } from './distributeDataType';

export const distributeData = (data: string) => {
  const paifu = JSON.parse(data)
  const userActions: [] = paifu.data.data.actions
  const userAccounts: [] = paifu.head.accounts
  const userResults: [] = paifu.head.result.players
  const { matchType, room, matchFormat, numberOfPeople } = identifyGameType(paifu.head.config.meta.mode_id)
  let playerResult: PlayerResult = {
    uuid: paifu.head.uuid,
    mode: {
      type: matchType,
      room: room,
      format: matchFormat,
      people: numberOfPeople,
    },
    endTime: convertUnixtime(paifu.head.end_time),
    seat: 0,
    totalRound: 0,
    hule: [],
    unrong: {
      count: 0,
      score: [],
      alongWithLiqi: 0,
      afterLiqi: 0,
    },
    noTile: {
      total: 0,
      tingpai: 0
    },
    chiPengGang: 0,
    liqi: 0,
    finalPoint: 0,
    gradingScore: 0,
    rank: {
      level: '',
      point: 0,
    },
    place: 0
  }

  getPlayerId(userAccounts, playerResult)
  getPlayerRank(userAccounts, playerResult)
  getPlayerScore(userResults, playerResult)

  let roundStartTimes: number[] = []
  let recordHule: any[] = []
  let recordNoTile: any[] = []
  let recordLiuju: any[] = []
  let recordChiPengGang: any[] = []
  let unrongTimes: number[] = []
  let recordDiscardTile: any[] = []
  let recordDealTile: any[] = []

  userActions.forEach((action: UserActions) => {
    if (action.result) {
      switch (action.result.name) {
        case '.lq.RecordNewRound':
          playerResult.totalRound++
          roundStartTimes.push(action.passed)
          break;
        case '.lq.RecordHule':
          recordHule.push(action)
          if (action.result.data.delta_scores[playerResult.seat] < 0) {
            const NumberOfPeopleWithNegativeScore: number = action.result.data.delta_scores.filter((score: number) => score < 0).length
            if (NumberOfPeopleWithNegativeScore === 1) {
              unrongTimes.push(action.passed)
            }
          }
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
      playerResult.liqi += countLiqi(action, playerResult.seat)
    }
  })

  const rounds: { round: number, startTime: number, endTime: number }[] = divideByRound(userActions, roundStartTimes)

  playerResult.hule = categorizeHule(playerResult.seat, recordHule)
  playerResult.unrong.count = countUnrong(playerResult.seat, recordHule)
  playerResult.unrong.score = storeUnrongScore(playerResult.seat, recordHule)
  playerResult.noTile.total = countNoTile(recordNoTile, recordLiuju)
  playerResult.noTile.tingpai = countNoTileTingpai(playerResult.seat, recordNoTile)
  playerResult.chiPengGang = countChiPengGang(rounds, recordChiPengGang, playerResult.seat)
  playerResult.unrong.alongWithLiqi = countUnrongAlongWithLiqi(playerResult.seat, recordDiscardTile, unrongTimes)
  playerResult.unrong.afterLiqi = countUnrongAfterLiqi(playerResult.seat, rounds, recordDealTile, recordChiPengGang, unrongTimes)

  return sendGameResult(playerResult)
}

const getPlayerId = (userAccounts: [], playerResult: PlayerResult) => {
  userAccounts.forEach((account: { account_id: number, seat: number }) => {
    if (account.account_id === playerData.accountId) playerResult.seat = account.seat
  })
}

const getPlayerRank = (userAccounts: [], playerResult: PlayerResult) => {
  userAccounts.forEach((account: { seat: number, level: { id: number, score: number } }) => {
    if (account.seat === playerResult.seat) {
      playerResult.rank.level = identifyRankLevel(account.level.id)
      playerResult.rank.point = account.level.score
    }
  })
}

const getPlayerScore = (userResults: [], playerResult: PlayerResult) => {
  userResults.forEach((result: { seat: number, part_point_1: number, grading_score: number }, i: number) => {
    if (result.seat === playerResult.seat) {
      playerResult.finalPoint = result.part_point_1
      playerResult.gradingScore = result.grading_score
      playerResult.place = i+1
    }
  })
}

const divideByRound = (userActions: [], roundStartTimes: number[]) => {
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
