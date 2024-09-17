import { convertUnixTime } from './../../../features/gameConfig/unixTimeConverter';

describe('convertUnixTime', () => {
  it('UnixTimeを日本の日付と時刻に変換し、フォーマットされた文字列を返す', () => {
    const unixTime = 946652400;
    const result = convertUnixTime(unixTime);

    expect(result).toBe('2000/1/1/0:00:00');
  });
});
