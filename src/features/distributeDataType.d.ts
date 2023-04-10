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
