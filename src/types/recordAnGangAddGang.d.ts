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
  type: number;
  tiles: string;
  doras: string[];
  operations: OperationList[];
}

export interface RecordAnGangAddGang {
  name: string;
  data: Data;
}
