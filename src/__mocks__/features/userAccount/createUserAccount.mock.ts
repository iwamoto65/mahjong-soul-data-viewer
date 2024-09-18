import type { UserAccount } from '../../../types/userAccount';

export const createMockUserAccount = (overrides?: Partial<UserAccount>): UserAccount => {
  const userAccount: UserAccount = {
    "account_id": 10000000,
    "seat": 0,
    "nickname": "テストユーザー1",
    "avatar_id": 405904,
    "character": {
        "charid": 200059,
        "level": 5,
        "exp": 0,
        "skin": 405904,
        "is_upgraded": true,
        "extra_emoji": [
            10,
            11,
            12,
            955
        ]
    },
    "title": 600032,
    "level": {
        "id": 10101,
        "score": 123
    },
    "level3": {
        "id": 20302,
        "score": 1171
    },
    "avatar_frame": 305545,
    "verified": 0,
    "views": [
        {
            "slot": 0,
            "item_id": 305612
        },
        {
            "slot": 1,
            "item_id": 308021
        },
        {
            "slot": 2,
            "item_id": 308022
        },
        {
            "slot": 10,
            "item_id": 305902
        },
        {
            "slot": 3,
            "item_id": 305011
        },
        {
            "slot": 4,
            "item_id": 305052
        },
        {
            "slot": 5,
            "item_id": 305545
        },
        {
            "slot": 6,
            "item_id": 305046
        },
        {
            "slot": 7,
            "item_id": 305717
        },
        {
            "slot": 8,
            "item_id": 307009
        }
    ]
  }

  return { ...userAccount, ...overrides };
};
