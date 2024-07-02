export type PlayerResult = {
  uuid: string,
  mode: {
    type: string,
    room: string,
    format: string,
    people: number
  },
  endTime: string,
  seat: number,
  totalRound: number,
  hule: {
    total: number,
    details: {
      ming: string[] | [],
      zimo: boolean,
      qinjia: boolean,
      liqi: boolean,
      dadian: number,
      deltaScore: number,
      liDora: number,
    }[]
  },
  unrong: {
    total: number,
    scores: number[],
    alongWithLiqi: {
      count: number,
      scores: number[]
    },
    afterLiqi: {
      count: number,
      scores: number[]
    },
    afterChiPengGang: {
      count: number,
      scores: number[]
    }
  },
  noTile: {
    total: number,
    tingpai: number,
    afterChiPengGang: number
  },
  chiPengGang: {
    total: number
  },
  liqi: {
    total: number,
    preemption: number,
    chased: number,
    turns: number[],
    noTile: number,
    firstTurnHule: number,
    zhenting: number,
    waitingTileCount: number[],
    remainingTileCount: number[]
  },
  zimo: {
    parentCoverScores: number[]
  },
  gameRecord: {
    finalPoint: number,
    gradingScore: number,
    place: number
  },
  rank: {
    level: string,
    point: number,
  },
}
