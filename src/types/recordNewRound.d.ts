interface Operation {
  type: number;
}

interface OperationList {
  seat: number;
  operation_list: Operation[];
  time_add: number;
  time_fixed: number;
}

interface Open {
  seat: number;
}

interface Data {
  chang: number;
  ju: number;
  ben: number;
  scores: number[];
  liqibang: number;
  tiles0: string[];
  tiles1: string[];
  tiles2: string[];
  tiles3: string[];
  tingpai?: string[];
  operation: OperationList;
  paishan: string;
  left_tile_count: number;
  doras: string[];
  opens: Open[];
}

export interface RecordNewRound {
  name: string;
  data: Data;
}
