import { playerData } from "@/consts/playerData"

export const identifySeat = (userAccounts: []) => {
  let seat: number = 0

  userAccounts.forEach((account: { account_id: number, seat: number }) => {
    if (account.account_id === playerData.accountId) seat = account.seat
  })

  return seat
}
