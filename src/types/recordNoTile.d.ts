interface Ting {
  tile: string;
  haveyi: boolean;
  yiman: boolean;
  count: number;
  fu: number;
  biao_dora_count: number;
  yiman_zimo: boolean;
  count_zimo: number;
  fu_zimo: number;
};

interface Player {
  tingpai: boolean;
  hand?: string[];
  tings?: Ting[];
};

interface Score {
  old_scores: number[];
  delta_scores: number[];
};

interface Data {
  liujumanguan: boolean;
  players: Player[];
  scores: Score[];
  gameend: boolean;
};

export interface RecordNoTile {
  name: string;
  data: Data;
};
