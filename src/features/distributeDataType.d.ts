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
    deltaScore: number,
  }[],
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
  },
  noTile: {
    total: number,
    tingpai: number
  },
  chiPengGang: number,
  liqi: {
    total: number,
    preemption: number,
    chased: number,
    turns: number[],
    noTile: number,
    firstTurnHule: number,
    zhenting: number,
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
