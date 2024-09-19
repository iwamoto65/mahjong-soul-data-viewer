import { playersList } from './../../../features/userAccount/playersList';
import { initializeMockUserAccounts } from './utils';
import type { UserAccount } from '@/types/userAccount';

describe('create playersList', () => {
  it('userAccountのオブジェクトを受け取り、nameとseatのオブジェクトを返す', () => {
    const mockUserAccounts: UserAccount[] = initializeMockUserAccounts(4)
    const result = playersList(mockUserAccounts)
    const players = [
      { name: 'test0', seat: 0 },
      { name: 'test1', seat: 1 },
      { name: 'test2', seat: 2 },
      { name: 'test3', seat: 3 },
    ]

    expect(result).toStrictEqual(players)
  })
})
