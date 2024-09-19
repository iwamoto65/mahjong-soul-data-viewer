import type { UserAccount } from "@/types/userAccount"
import type { SeatIndex } from "@/types/playerData"

export const identifySeat = (id: number, userAccounts: UserAccount[]): SeatIndex => {
  let seat: SeatIndex = 0

  userAccounts.forEach((account: { account_id: number, seat: number }) => {
    if (account.account_id === id) seat = account.seat as SeatIndex
  })

  return seat
}
