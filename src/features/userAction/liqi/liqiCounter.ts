import type { UserActions } from "../../distributeDataType"

export const countLiqi = (action: UserActions, seat: number) => {
  let liqiCount: number = 0
  const operationType: { [key: string]: number } = { liqi: 7 }

  if (action.user_input.seat === seat) {
    if (action.user_input.operation && action.user_input.operation.type === operationType.liqi) {
      liqiCount++
    }
  }

  return liqiCount
}
