import { UserAccount } from './../../types/userAccount.d';
import { Player } from '@/types/playerData';

export const playersList = (userAccounts: UserAccount[]): Player[] => {
  let list: Player[]

  list = userAccounts
    .sort((a, b) => a.seat - b.seat)
    .map((account) => ({ name: account.nickname, seat: account.seat }))

  return list
}
