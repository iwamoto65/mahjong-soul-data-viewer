import { playerData } from '@/consts/playerData'
import { identifyGameType } from '@/utils/identifyGameType'
import { convertUnixtime } from '@/utils/convertUnixtime'
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
    ming: string[],
    zimo: boolean,
    qinjia: boolean,
    liqi: boolean,
    dadian: number,
  }[],
  unrong: number,
  noTile: {
    total: number,
    tingpai: number
  },
  chiPengGang: number,
}

type UserActions = {
  passed: number,
  result: {
    name: string,
    data: RecordNewRound & RecordHule & RecordNoTile & RecordChiPengGang
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
    ming: string[],
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
  seat: number
}

export const distributeData = (data: string) => {
  const paifu = JSON.parse(data)
  const userActions: [] = paifu.data.data.actions
  const userAccounts: [] = paifu.head.accounts
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
    unrong: 0,
    noTile: {
      total: 0,
      tingpai: 0
    },
    chiPengGang: 0,
  }

  getPlayerId(userAccounts, playerResult)

  let roundStartTimes: number[] = []
  let chiPengGangTimes: number[] = []

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
              playerResult.hule.push({ ming: hule.ming, zimo: hule.zimo, qinjia: hule.qinjia, liqi: hule.liqi, dadian: hule.dadian })
            }
          })
          if (action.result.data.delta_scores[playerResult.seat] < 0) {
            let negativeScore: number = 0
            negativeScore += action.result.data.delta_scores.filter((score: number) => score < 0).length
            if (negativeScore === 1) playerResult.unrong++
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
          if (action.result.data.seat === playerResult.seat) {
            chiPengGangTimes.push(action.passed)
          }
          break
      }
    }
  })

  let rounds: { round: number, startTime: number, endTime: number }[] = []
  const lastRound: { game_event: number, passed: number, type: number } = userActions[userActions.length - 1]
  roundStartTimes.forEach((_time, i, arr) => {
    if (i < arr.length-1) {
      rounds.push({ round: i+1, startTime: arr[i], endTime: arr[i+1] })
    } else {
      rounds.push({ round: i+1, startTime: arr[i], endTime: lastRound.passed })
    }
  })

  let chiPengGangRounds: number[] = []
  rounds.forEach((r) => {
    chiPengGangTimes.forEach((t) => {
      if (r.startTime < t && t < r.endTime) {
        chiPengGangRounds.push(r.round)
      }
    })
  })

  playerResult.chiPengGang = new Set(chiPengGangRounds).size

  sendGameResult(playerResult)
}

const getPlayerId = (userAccounts: [], playerResult: PlayerResult) => {
  userAccounts.forEach((account: { account_id: number, seat: number }) => {
    if (account.account_id === playerData.accountId) playerResult.seat = account.seat
  })
}
