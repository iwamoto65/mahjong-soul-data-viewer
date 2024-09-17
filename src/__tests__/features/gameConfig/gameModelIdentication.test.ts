import { identifyGameMode } from './../../../features/gameConfig/gameModelIdentification';

describe('identifyGameMode', () => {
  it('ゲームモードのオブジェクトを返す', () => {
    const modeId = 2
    const result = identifyGameMode(modeId)

    expect(result).toStrictEqual({ type: '段位戦', room: '銅の間', format: '東風', people: 4 })
  })
})
