import type { RecordHuleActions } from "@/types/userAction"

type UnrongCount = number

export const countUnrong = (seat: number, recordHule: RecordHuleActions): UnrongCount => {
  let unrongCount: UnrongCount = 0

  recordHule.forEach((record) => {
    if (record.result.data.delta_scores[seat] < 0) {
      const numberOfPeopleWithNegativeScore: number = record.result.data.delta_scores.filter((score: number) => score < 0).length
      if (numberOfPeopleWithNegativeScore === 1) unrongCount++
    }
  })

  return unrongCount
}
