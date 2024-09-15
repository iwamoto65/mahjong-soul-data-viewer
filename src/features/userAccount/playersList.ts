import { UserAccount } from './../../types/userAccount.d';
import { Player } from '@/types/playerData';

export const playersList = (userAccounts: UserAccount[]): Player[] => {
  let list: Player[]

  list = userAccounts.map((account) => ({ name: account.nickname, seat: account.seat }))

  return list
}
