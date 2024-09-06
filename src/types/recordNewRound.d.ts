interface Operation {
  seat: number;
  operation_list: {
    type: number
  }[];
  time_add: number;
  time_fixed: number;
}

interface ResultData {
  chang: number;
  ju: number;
  ben: number;
  scores: number[];
  liqibang: number;
  tiles0: string[];
  tiles1: string[];
  tiles2: string[];
  tiles3: string[];
  operation: Operation;
  paishan: string;
  left_tile_count: number;
  doras: string[];
  opens: {
    seat: number
  }[];
  sha256: string;
  saltSha256: string;
  salt: string;
}

export interface RecordNewRound {
  passed: number;
  type: number;
  result: {
    name: string;
    data: ResultData;
  }
}
