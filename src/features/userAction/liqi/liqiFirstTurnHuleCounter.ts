import type { RecordHuleActions } from "@/types/userAction"

type FirstTurnCount = number

export const countLiqiFirstTurnHule = (seat: number, recordHule: RecordHuleActions): FirstTurnCount => {
  const fanId: { [key: string]: number } = { firstTurn: 30 }
  let firstTurnCount: FirstTurnCount = 0

  recordHule.forEach((record) => {
    record.result.data.hules.forEach((hule: { seat: number, fans: { id: number }[] }) => {
      if (hule.seat === seat) {
        hule.fans.forEach((fan) => {
          if (fan.id === fanId.firstTurn) firstTurnCount++
        })
      }
    })
  })

  return firstTurnCount
}
