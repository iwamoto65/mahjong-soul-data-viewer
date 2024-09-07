interface Tingpai {
  tile: string;
  haveyi: boolean;
  yiman: boolean;
  count: number;
  fu: number;
  biao_dora_count: number;
  yiman_zimo: boolean;
  count_zimo: number;
  fu_zimo: number;
}

interface Operation {
  type: number;
}

interface OperationList {
  seat: number;
  operation_list: Operation[];
  time_add: number;
  time_fixed: number;
}

interface Data {
  seat: number;
  tile: string;
  is_liqi: boolean;
  moqie: boolean;
  zhenting: boolean[];
  tingpais: Tingpai[];
  doras: string[];
  is_wliqi: boolean;
  operations: OperationList[];
}

export interface RecordDiscardTile {
  name: string;
  data: Data;
}
