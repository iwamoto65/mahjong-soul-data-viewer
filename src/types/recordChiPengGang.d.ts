interface Liqi {
  seat: number;
  score: number;
  liqibang: number;
}

interface Operation {
  type: number;
  combination: string[];
}

interface OperationList {
  seat: number;
  operation_list: Operation[];
  time_add: number;
  time_fixed: number;
}

interface Data {
  seat: number;
  type: number;
  tiles: string[];
  froms: number[];
  liqi: Liqi;
  zhenting: boolean[];
  operation: OperationList;
  tile_states: number[];
}

export interface RecordChiPengGang {
  name: string;
  data: Data;
}
