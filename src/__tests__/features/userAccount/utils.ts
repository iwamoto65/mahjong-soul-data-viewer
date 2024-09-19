import { createMockUserAccount } from '../../../__mocks__/features/userAccount/createUserAccount.mock';
import type { SeatIndex } from '@/types/playerData';
import type { UserAccount } from '@/types/userAccount';

export const initializeMockUserAccounts = (length: number, userAccountAttr?: Partial<UserAccount>): UserAccount[] => {
  const arr = Array.from({ length: length }, (_, i) => i)
  const mockUserAccounts = arr.map((num) => createMockUserAccount({ nickname: `test${num}`, seat: num as SeatIndex, ...userAccountAttr }))

  return mockUserAccounts
}
