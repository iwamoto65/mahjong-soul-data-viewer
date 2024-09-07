interface Liqi {
  seat: number;
  score: number;
  liqibang: number;
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
  left_tile_count: number;
  liqi: Liqi;
  doras: string[];
  zhenting: boolean[];
  operation: OperationList;
}

export interface RecordDealTile {
  name: string;
  data: Data;
}
