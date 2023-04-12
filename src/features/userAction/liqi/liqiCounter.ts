export const countLiqi = (seat: number, userInput: any[], unrongAlongWithLiqi: number) => {
  let liqiCount: number = 0
  const operationType: { [key: string]: number } = { liqi: 7 }

  userInput.forEach((action: { user_input: { seat: number, operation: { type: number } } }) => {
    if (action.user_input.seat === seat) {
      if (action.user_input.operation && action.user_input.operation.type === operationType.liqi) {
        liqiCount++
      }
    }
  })

  return (liqiCount - unrongAlongWithLiqi)
}
