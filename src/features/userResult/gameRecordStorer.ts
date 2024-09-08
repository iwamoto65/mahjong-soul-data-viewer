import type { UserResult } from "@/types/userResult"

type GameRecord = {
  finalPoint: number
  gradingScore: number
  place: number
}

export const storeGameRecord = (seat: number, userResults: UserResult[]): GameRecord => {
  let gameRecord: GameRecord = { finalPoint: 0, gradingScore: 0, place: 1 }

  userResults.forEach((result: { seat: number, part_point_1: number, grading_score: number }, i: number) => {
    if (result.seat === seat) {
      gameRecord.finalPoint = result.part_point_1
      gameRecord.gradingScore = result.grading_score
      gameRecord.place = i+1
    }
  })

  return gameRecord
}
