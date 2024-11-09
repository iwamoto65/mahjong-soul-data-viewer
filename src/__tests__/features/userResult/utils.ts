import { createMockUserResult } from "../../../__mocks__/features/userResult/createUserResult.mock";
import { UserResult } from "@/types/userResult";

export const initializeMockUserResults = (userAccountAttrs?: Partial<UserResult>[]): UserResult[] => {
  let mockUserResults: UserResult[]

  if (userAccountAttrs) {
    mockUserResults = userAccountAttrs.map((attr) => createMockUserResult(attr))
  } else {
    const arr = Array.from({ length: 4 }, (_, i) => i)

    mockUserResults = arr.map((i) => {
      const firstNum = i + 1

      return createMockUserResult({
        seat: i,
        total_point: Number(`${firstNum}0000`),
        part_point_1: Number(`${firstNum}0000`),
        grading_score: Number(`${firstNum}00`),
        gold: Number(`${firstNum}000`)
      })
    })
  }

  return mockUserResults
}
