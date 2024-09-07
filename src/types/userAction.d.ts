import type { RecordNewRound } from '@/types/recordNewRound';
import type { RecordHule } from '@/types/recordHule';
import type { RecordNoTile } from '@/types/recordNoTile';
import type { RecordLiuju } from '@/types/recordLiuju';
import type { RecordChiPengGang } from '@/types/recordChiPengGang';
import type { RecordAnkanKakan } from '@/types/recordAnGangAddGang';
import type { RecordDiscardTile } from '@/types/recordDiscardTile';
import type { RecordDealTile } from '@/types/recordDealTile';
import type { UserInput } from '@/types/userInput';


export type UserAction = {
  passed: number;
  type: number;
  user_event: {
    seat: number;
    type: number;
  }
  user_input: UserInput
  game_event: number
  result: {
    name: string;
    data:
      | RecordNewRound
      | RecordHule
      | RecordNoTile
      | RecordLiuju
      | RecordChiPengGang
      | RecordAnkanKakan
      | RecordDiscardTile
      | RecordDealTile
  }
}

export interface UserActionBase<T> {
  passed: number;
  type: number;
  result: T
}
