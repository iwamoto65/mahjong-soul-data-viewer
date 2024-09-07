interface GameEnd {
  scores: number;
};

interface LiQiSuccess {
  seat: number;
  score: number;
  liqibang: number;
  failed: boolean;
};

interface Muyu {
  seat: number;
  count: number;
  count_max: number;
  id: number;
};

interface Fan {
  name: string;
  val: number;
  id: number;
}

interface Hule {
  hand: string[];
  ming: string[];
  hu_tile: string;
  seat: number;
  zimo: boolean;
  qinjia: boolean;
  liqi: boolean;
  doras: string[];
  li_doras: string[];
  yiman: boolean;
  count: number;
  fans: Fan[];
  fu: number;
  title: string;
  point_rong: number;
  point_zimo_qin: number;
  point_zimo_xian: number;
  title_id: number;
  point_sum: number;
  dadian: number;
};

export interface RecordLiuju {
  type: number;
  gameend: GameEnd;
  seat: number;
  tiles: string[];
  liqi?: LiQiSuccess;
  allplayertiles: string[];
  muyu?: Muyu;
  hules_history?: Hule[];
};
