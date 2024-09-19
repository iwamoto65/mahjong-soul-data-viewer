import { identifySeat } from "./../../../features/userAccount";
import { initializeMockUserAccounts } from "./utils";

describe('identifySeat', () => {
  it('accountIdからどの席に座っているか特定し、席のインデックスを返す', () => {
    const accountId = 10000000
    const mockUserAccounts = initializeMockUserAccounts(4)
    const result = identifySeat(accountId, mockUserAccounts)

    expect(result).toBe(0)
  })
})
