import type { UserInputActions } from "@/types/userAction"

export const countLiqi = (seat: number, userInput: UserInputActions, unrongAlongWithLiqi: number): number => {
  let liqiCount: number = 0
  const operationType: { [key: string]: number } = { liqi: 7 }

  userInput.forEach((action: { result: { seat: number, operation: { type: number } }}) => {
    if (action.result.seat === seat) {
      if (action.result.operation && action.result.operation.type === operationType.liqi) {
        liqiCount++
      }
    }
  })

  return (liqiCount - unrongAlongWithLiqi)
}
