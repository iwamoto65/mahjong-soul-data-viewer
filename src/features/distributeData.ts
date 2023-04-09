import { playerData } from '@/consts/playerData'
import { identifyGameType } from '@/utils/identifyGameType'
import { identifyRankLevel } from '@/utils/identifyRankLevel'
import { convertUnixtime } from '@/utils/convertUnixtime'
import { countLiqi } from './liqi/liqiCounter'
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
          action.result.data.hules.forEach((hule) => {
            if (hule.seat === playerResult.seat) {
              playerResult.hule.push({ ming: hule.ming || [], zimo: hule.zimo, qinjia: hule.qinjia, liqi: hule.liqi, dadian: hule.dadian })
            }
          })
          if (action.result.data.delta_scores[playerResult.seat] < 0) {
            let negativeScore: number = 0
            negativeScore += action.result.data.delta_scores.filter((score: number) => score < 0).length
            if (negativeScore === 1) {
              unrongTimes.push(action.passed)
              playerResult.unrong.count++
              playerResult.unrong.score.push(action.result.data.delta_scores[playerResult.seat])
            }
          }
          break;
        case '.lq.RecordNoTile':
          playerResult.noTile.total++
          if (action.result.data.players[playerResult.seat].tingpai) {
            playerResult.noTile.tingpai++
          }
          break
        case '.lq.RecordLiuju':
          playerResult.noTile.total++
          break
        case '.lq.RecordChiPengGang':
          recordChiPengGang.push(action)
          break
        case '.lq.RecordDiscardTile':
          if (action.result.data.seat === playerResult.seat) {
            recordDiscardTile.push(action)
          }
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

  playerResult.chiPengGang = countChiPengGang(rounds, recordChiPengGang, playerResult.seat)
  playerResult.unrong.alongWithLiqi = countUnrongAlongWithLiqi(recordDiscardTile, unrongTimes)
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
