import type { UserResult } from "@/types/userResult";

export const createMockUserResult = (overrides?: Partial<UserResult>): UserResult => {
  const userResult: UserResult = {
    "seat": 0,
    "total_point": 10000,
    "part_point_1": 10000,
    "part_point_2": 0,
    "grading_score": 100,
    "gold": 1000
  }

  return { ...userResult, ...overrides }
}
