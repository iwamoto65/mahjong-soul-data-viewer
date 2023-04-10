export type UserActions = {
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
