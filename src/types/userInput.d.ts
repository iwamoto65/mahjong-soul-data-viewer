interface Operation {
  type: number;
  tile?: string;
  moqie?: boolean;
  timeuse?: number;
  tile_state?: number;
  index?: number;
  cancel_operation?: boolean;
}

interface Cpg {
  type?: number;
  index?: number;
  timeuse?: number;
  cancel_operation?: boolean;
}

export interface UserInput {
  seat: number;
  type: number;
  emo?: number;
  operation: Operation;
  cpg?: Cpg;
}
