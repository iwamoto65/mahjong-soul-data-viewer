interface Fan {
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
  yiman: boolean;
  count: number;
  fans: Fan[];
  fu: number;
  point_rong: number;
  point_zimo_xian: number;
  title_id: number;
  point_sum: number;
  dadian: number;
  baopai: number;
}

interface Data {
  hules: Hule[];
  old_scores: number[];
  delta_scores: number[];
  wait_timeout: number;
  scores: number[];
  gameend: Record<string, unknown>;
  baopai: number;
}

export interface RecordHule {
  name: string;
  data: Data;
}
