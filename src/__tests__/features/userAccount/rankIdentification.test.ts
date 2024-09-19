import { identifyRank } from "./../../../features/userAccount";
import { initializeMockUserAccounts } from './utils';
import type { UserAccount } from '@/types/userAccount';

describe('identifyRank', () => {
  it('指定したuserAccountのrankとpointのオブジェクトを返す', () => {
    const mockUserAccounts: UserAccount[] = initializeMockUserAccounts(4)
    const seatIdx = 0
    const result = identifyRank(seatIdx, mockUserAccounts)

    expect(result).toStrictEqual({ level: "四麻初心1", point: 123 })
  })
})
