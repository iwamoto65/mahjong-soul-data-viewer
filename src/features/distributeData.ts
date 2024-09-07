import { identifyGameMode, convertUnixTime } from './gameConfig';
import { identifySeat, identifyRank } from './userAccount';
import {
  categorizeHule,
  countUnrong,
  storeUnrongScore,
  countLiqi,
  countLiqiPreemption,
  countLiqiChased,
  countNoTile,
  countNoTileTingpai,
  countChiPengGang,
  countUnrongAlongWithLiqi,
  countUnrongAfterLiqi,
  countLiqiTurn,
  countLiqiNoTile,
  countLiqiFirstTurnHule,
  countLiqiZhenting,
  countLiqiWaitingTile,
  countLiqiRemainingTile,
  countZimoSevereParentCover,
  countUnrongAfterChiPengGang,
  countNoTileAfterChiPengGang
} from './userAction';
import { storeGameRecord, storeScoreTrend } from './userResult';
import type { PlayerResult } from '@/types/distributeData';
import type {
  UserAction,
  RecordNewRoundActions,
  RecordHuleActions,
  RecordNoTileActions,
  RecordLiujuActions,
  RecordChiPengGangActions,
  RecordAnGangAddGangActions,
  RecordDiscardTileActions,
  RecordDealTileActions,
  UserInputActions
} from '@/types/userAction';
import type { UserResult } from '@/types/userResult';
import type { UserAccount } from '@/types/userAccount';

export const distributeData = (data: string): PlayerResult => {
  try {
    const paifu = JSON.parse(data);
    const userActions: UserAction[] = paifu.data.data.actions;
    const userAccounts: UserAccount[] = paifu.head.accounts;
    const userResults: UserResult[] = paifu.head.result.players;

    let playerResult: PlayerResult = initializePlayerResult();
    let recordNewRound: RecordNewRoundActions = [];
    let recordHule: RecordHuleActions = [];
    let recordNoTile: RecordNoTileActions = [];
    let recordLiuju: RecordLiujuActions = [];
    let recordChiPengGang: RecordChiPengGangActions = [];
    let recordAnGangAddGang: RecordAnGangAddGangActions = [];
    let recordDiscardTile: RecordDiscardTileActions = [];
    let recordDealTile: RecordDealTileActions = [];
    let userInput: UserInputActions = [];

    userActions.forEach((action: UserAction) => {
      handleActionResult(action, {
        recordNewRound,
        recordHule,
        recordNoTile,
        recordLiuju,
        recordChiPengGang,
        recordAnGangAddGang,
        recordDiscardTile,
        recordDealTile,
        userInput
      });
    });

    setPlayerResult(paifu, userActions, userAccounts, userResults, playerResult, {
      recordNewRound,
      recordHule,
      recordNoTile,
      recordLiuju,
      recordChiPengGang,
      recordAnGangAddGang,
      recordDiscardTile,
      recordDealTile,
      userInput
    });

    return playerResult;
  } catch (error) {
    console.error("Error in distributeData function", error);
    throw new Error("Data processing failed.");
  }
};

const initializePlayerResult = (): PlayerResult => {
  return {
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
        total: 0,
        scores: []
      },
      afterLiqi: {
        total: 0,
        scores: []
      },
      afterChiPengGang: {
        total: 0,
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
    scoreTrend: []
  }
}

const handleActionResult = (
  action: UserAction,
  records: {
    recordNewRound: RecordNewRoundActions,
    recordHule: RecordHuleActions,
    recordNoTile: RecordNoTileActions,
    recordLiuju: RecordLiujuActions,
    recordChiPengGang: RecordChiPengGangActions,
    recordAnGangAddGang: RecordAnGangAddGangActions,
    recordDiscardTile: RecordDiscardTileActions,
    recordDealTile: RecordDealTileActions,
    userInput: UserInputActions
  }
): void => {
  if (action.result) {
    switch (action.result.name) {
      case '.lq.RecordNewRound':
        records.recordNewRound.push(action)
        break
      case '.lq.RecordHule':
        records.recordHule.push(action)
        break
      case '.lq.RecordNoTile':
        records.recordNoTile.push(action)
        break
      case '.lq.RecordLiuju':
        records.recordLiuju.push({ passed: action.passed, type: action.type, result: action.result.data })
        break
      case '.lq.RecordChiPengGang':
        records.recordChiPengGang.push(action)
        break
      case '.lq.RecordAnGangAddGang':
        records.recordAnGangAddGang.push(action)
        break
      case '.lq.RecordDiscardTile':
        records.recordDiscardTile.push(action)
        break
      case '.lq.RecordDealTile':
        records.recordDealTile.push(action)
        break
    }
  } else if (action.user_input) {
    records.userInput.push({ passed: action.passed, type: action.type, result: action.user_input })
  }
}

const setPlayerResult = (
  paifu: any,
  userActions: UserAction[],
  userAccounts: UserAccount[],
  userResults: UserResult[],
  playerResult: PlayerResult,
  records: {
    recordNewRound: RecordNewRoundActions,
    recordHule: RecordHuleActions,
    recordNoTile: RecordNoTileActions,
    recordLiuju: RecordLiujuActions,
    recordChiPengGang: RecordChiPengGangActions,
    recordAnGangAddGang: RecordAnGangAddGangActions,
    recordDiscardTile: RecordDiscardTileActions,
    recordDealTile: RecordDealTileActions,
    userInput: UserInputActions
  }
): void => {
  playerResult.uuid = paifu.head.uuid;
  playerResult.seat = identifySeat(userAccounts);
  playerResult.mode = identifyGameMode(paifu.head.config.meta.mode_id);
  playerResult.endTime = convertUnixTime(paifu.head.end_time);
  playerResult.rank = identifyRank(playerResult.seat, userAccounts);
  playerResult.gameRecord = storeGameRecord(playerResult.seat, userResults);
  playerResult.totalRound = records.recordNewRound.length;
  playerResult.hule.details = categorizeHule(playerResult.seat, records.recordHule);
  playerResult.hule.total = playerResult.hule.details.length;
  playerResult.unrong.total = countUnrong(playerResult.seat, records.recordHule);
  playerResult.unrong.scores = storeUnrongScore(playerResult.seat, records.recordHule);
  playerResult.noTile.total = countNoTile(records.recordNoTile, records.recordLiuju);
  playerResult.noTile.tingpai = countNoTileTingpai(playerResult.seat, records.recordNoTile);

  const rounds = divideByRound(userActions, records.recordNewRound);
  playerResult.chiPengGang.total = countChiPengGang(rounds, records.recordChiPengGang, playerResult.seat);

  const unrongTimes = getUnrongTimes(playerResult.seat, records.recordHule);
  playerResult.unrong.alongWithLiqi = countUnrongAlongWithLiqi(playerResult.seat, records.recordDiscardTile, unrongTimes, records.recordHule);
  playerResult.unrong.afterLiqi = countUnrongAfterLiqi(playerResult.seat, rounds, records.recordDealTile, records.recordChiPengGang, unrongTimes, records.recordHule);
  playerResult.unrong.afterChiPengGang = countUnrongAfterChiPengGang(playerResult.seat, records.recordChiPengGang, records.recordHule, unrongTimes, rounds);
  playerResult.liqi.total = countLiqi(playerResult.seat, records.userInput, playerResult.unrong.alongWithLiqi.total);
  playerResult.liqi.preemption = countLiqiPreemption(playerResult.seat, records.userInput, records.recordDiscardTile, unrongTimes, rounds);
  playerResult.liqi.chased = countLiqiChased(playerResult.seat, records.userInput, rounds);
  playerResult.liqi.turns = countLiqiTurn(playerResult.seat, records.userInput, records.recordDiscardTile, unrongTimes, rounds);
  playerResult.liqi.noTile = countLiqiNoTile(playerResult.seat, records.recordNoTile, records.recordDealTile, records.recordChiPengGang, rounds);
  playerResult.liqi.firstTurnHule = countLiqiFirstTurnHule(playerResult.seat, records.recordHule);
  playerResult.liqi.zhenting = countLiqiZhenting(playerResult.seat, records.recordDealTile, records.recordChiPengGang);
  playerResult.liqi.waitingTileCount = countLiqiWaitingTile(playerResult.seat, records.recordDiscardTile, unrongTimes, rounds);
  playerResult.liqi.remainingTileCount = countLiqiRemainingTile(playerResult.seat, records.recordDiscardTile, records.recordChiPengGang, records.recordAnGangAddGang, records.recordNewRound, records.recordDealTile, unrongTimes, rounds);
  playerResult.zimo.parentCoverScores = countZimoSevereParentCover(playerResult.seat, records.recordHule, rounds);
  playerResult.noTile.afterChiPengGang = countNoTileAfterChiPengGang(playerResult.seat, records.recordChiPengGang, records.recordNoTile, rounds);
  playerResult.scoreTrend = storeScoreTrend(userAccounts, userResults, records.recordNewRound);
}

const divideByRound = (userActions: UserAction[], recordNewRound: RecordNewRoundActions): { round: number, startTime: number, endTime: number }[] => {
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

const getUnrongTimes = (seat: number, recordHule: RecordHuleActions): number[] => {
  let times: number[] = []

  recordHule.forEach((record) => {
    if (record.result.data.delta_scores[seat] < 0) {
      const NumberOfPeopleWithNegativeScore: number = record.result.data.delta_scores.filter((score: number) => score < 0).length
      if (NumberOfPeopleWithNegativeScore === 1) times.push(record.passed)
    }
  })

  return times
}
