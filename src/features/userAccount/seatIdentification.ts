import type { UserAccount } from "@/types/userAccount"

type Seat = number

export const identifySeat = (id: number, userAccounts: UserAccount[]): Seat => {
  let seat: Seat = 0

  userAccounts.forEach((account: { account_id: number, seat: number }) => {
    if (account.account_id === id) seat = account.seat
  })

  return seat
}
