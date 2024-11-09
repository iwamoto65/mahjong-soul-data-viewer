import { storeScoreTrend } from "../../../features/userResult";
import { initializeMockUserAccounts } from "../userAccount/utils";
import { initializeMockUserResults } from "./utils";
import { createRecordNewRound } from './../../../__mocks__/features/userAction/createRecordNewRound.mock';

describe('storeScoreTrend', () => {
  it('UserAccount毎に局の点数を割り出しオブジェクトで返す', () => {
    const mockUserAccounts = initializeMockUserAccounts(4)
    const mockUserResults = initializeMockUserResults()
    const recordNewRound = createRecordNewRound()
    const result = storeScoreTrend(mockUserAccounts, mockUserResults, recordNewRound)

    expect(result).toStrictEqual(mockRecordNewRound)
  });
});

const mockRecordNewRound = [
  {
    player: "test0",
    scores: {
      "100": 24900,
      "101": 27800,
      "102": 46100,
      "103": 50700,
      "110": 48900,
      "111": 47400,
      "120": 47400,
      "999": 10000,
      "000": 25000,
      "010": 21000,
      "020": 21000,
      "030": 21000,
    },
  },
  {
    player: "test1",
    scores: {
      "100": 25300,
      "101": 22400,
      "102": 4100,
      "103": 3100,
      "110": 2500,
      "111": 3000,
      "120": 700,
      "999": 20000,
      "000": 25000,
      "010": 33000,
      "020": 33000,
      "030": 25300,
    },
  },
  {
    player: "test2",
    scores: {
      "100": 29200,
      "101": 29200,
      "102": 29200,
      "103": 28200,
      "110": 31200,
      "111": 32700,
      "120": 36000,
      "999": 30000,
      "000": 25000,
      "010": 23000,
      "020": 29200,
      "030": 29200,
    },
  },
  {
    player: "test3",
    scores: {
      "100": 20600,
      "101": 20600,
      "102": 20600,
      "103": 18000,
      "110": 17400,
      "111": 15900,
      "120": 15900,
      "999": 40000,
      "000": 25000,
      "010": 23000,
      "020": 16800,
      "030": 24500,
    },
  },
];