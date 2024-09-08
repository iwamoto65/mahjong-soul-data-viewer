import { playerData } from "@/consts/playerData"
import type { UserAccount } from "@/types/userAccount"

type Seat = number

export const identifySeat = (userAccounts: UserAccount[]): Seat => {
  let seat: Seat = 0

  userAccounts.forEach((account: { account_id: number, seat: number }) => {
    if (account.account_id === playerData.accountId) seat = account.seat
  })

  return seat
}
