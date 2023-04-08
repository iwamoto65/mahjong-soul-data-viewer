import { playerData } from '@/consts/playerData'
import { identifyGameType } from '@/utils/identifyGameType'
import { identifyRankLevel } from '@/utils/identifyRankLevel'
import { convertUnixtime } from '@/utils/convertUnixtime'
import { countChiPengGang } from './chiPengGang/chiPengGangCounter';
import { unrongAlongWithLiqi } from './liqi/unrongAlongWithLiqi'
import { unrongAfterLiqi } from './liqi/unrongAfterLiqi'
import { sendGameResult } from './sendGameResult'

export type PlayerResult = {
  uuid: string,
  mode: {
    type: string,
    room: string,
    format: string,
    people: number
  },
  endTime: string | null,
  seat: number,
  totalRound: number,
  hule: {
    ming: string[] | [],
    zimo: boolean,
    qinjia: boolean,
    liqi: boolean,
    dadian: number,
  }[],
  unrong: {
    count: number,
    score: number[],
    alongWithLiqi: number,
    afterLiqi: number,
  },
  noTile: {
    total: number,
    tingpai: number
  },
  chiPengGang: number,
  liqi: number,
  finalPoint: number,
  gradingScore: number,
  rank: {
    level: string,
    point: number,
  },
  place: number
}

type UserActions = {
  passed: number,
  user_input: {
    seat: number,
    operation: {
      type: number
    }
  },
  result: {
    name: string,
    data:
      & RecordNewRound
      & RecordHule
      & RecordNoTile
      & RecordChiPengGang
      & RecordDealTile
  }
}

type RecordNewRound = {
  chang: number,
  ju: number,
  doras: string[],
  ben: number,
  tiles0: string[],
  tiles1: string[],
  tiles2: string[],
  tiles3: string[],
}

type RecordHule = {
  hules: {
    seat: number,
    ming: string[] | [],
    zimo: boolean,
    qinjia: boolean,
    liqi: boolean,
    dadian: number,
  }[],
  delta_scores: number[]
}

type RecordNoTile = {
  players: {
    tingpai: boolean
  }[]
}

type RecordChiPengGang = {
  seat: number,
  liqi?: {
    seat: number,
    score: number,
    liqibang: number,
  }
}

type RecordDealTile = {
  seat: number,
  liqi?: {
    seat: number,
    score: number,
    liqibang: number,
  }
}

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
  let chiPengGangTimes: number[] = []
  let unrongTimes: number[] = []
  let recordDiscardTiles: any[] = []
  let recordDealTiles: any[] = []

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
          if (action.result.data.seat === playerResult.seat) {
            chiPengGangTimes.push(action.passed)
          }
          break
        case '.lq.RecordDiscardTile':
          if (action.result.data.seat === playerResult.seat) {
            recordDiscardTiles.push(action)
          }
          break
        case '.lq.RecordDealTile':
          recordDealTiles.push(action)
          break
      }
    } else if (action.user_input) {
      if (action.user_input.seat === playerResult.seat) {
        if (action.user_input.operation && action.user_input.operation.type === 7) {
          playerResult.liqi++
        }
      }
    }
  })

  const rounds: { round: number, startTime: number, endTime: number }[] = divideByRound(userActions, roundStartTimes)

  playerResult.chiPengGang = countChiPengGang(rounds, chiPengGangTimes)
  playerResult.unrong.alongWithLiqi = unrongAlongWithLiqi(recordDiscardTiles, unrongTimes)
  playerResult.unrong.afterLiqi = unrongAfterLiqi(playerResult.seat, rounds, recordDealTiles, recordChiPengGang, unrongTimes)

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
