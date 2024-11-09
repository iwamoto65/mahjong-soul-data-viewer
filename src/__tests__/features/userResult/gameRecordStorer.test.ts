import { storeGameRecord } from "./../../../features/userResult";
import { initializeMockUserResults } from "./utils";

describe('storeGameRecord', () => {
  it('UserResultから最終得点・獲得ポイント・順位を取得している', () => {
    const mockUserResults = initializeMockUserResults()
    const result = storeGameRecord(0, mockUserResults)

    expect(result).toStrictEqual({ finalPoint: 10000, gradingScore: 100, place: 1 })
  });
});
