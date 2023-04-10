export const identifyGameMode = (modeId: number) => {
  let mode: { type: string, room: string, format: string, people: number } = { type: '', room: '', format: '', people: 0 }

  switch (modeId) {
    // mode_id別データ
    // https://wikiwiki.jp/majsoul-api/%E5%AE%9A%E6%95%B0%E4%B8%80%E8%A6%A7%E3%81%AB%E3%82%83?word=%E9%87%91%E3%81%AE%E9%96%93
    case 2:
      mode.type = '段位戦'
      mode.room = '銅の間'
      mode.format = '東風'
      mode.people = 4
      break
    case 3:
      mode.type = '段位戦'
      mode.room = '銅の間'
      mode.format = '半荘'
      mode.people = 4
      break
    case 5:
      mode.type = '段位戦'
      mode.room = '銀の間'
      mode.format = '東風'
      mode.people = 4
      break
    case 6:
      mode.type = '段位戦'
      mode.room = '銀の間'
      mode.format = '半荘'
      mode.people = 4
      break
    case 8:
      mode.type = '段位戦'
      mode.room = '金の間'
      mode.format = '東風'
      mode.people = 4
      break
    case 9:
      mode.type = '段位戦'
      mode.room = '金の間'
      mode.format = '半荘'
      mode.people = 4
      break
    case 11:
      mode.type = '段位戦'
      mode.room = '玉の間'
      mode.format = '東風'
      mode.people = 4
      break
    case 12:
      mode.type = '段位戦'
      mode.room = '玉の間'
      mode.format = '半荘'
      mode.people = 4
      break
    case 15:
      mode.type = '段位戦'
      mode.room = '王座の間'
      mode.format = '東風'
      mode.people = 4
      break
    case 16:
      mode.type = '段位戦'
      mode.room = '王座の間'
      mode.format = '半荘'
      mode.people = 4
      break
    case 17:
      mode.type = '段位戦'
      mode.room = '銅の間'
      mode.format = '東風'
      mode.people = 3
      break
    case 18:
      mode.type = '段位戦'
      mode.room = '銅の間'
      mode.format = '半荘'
      mode.people = 3
      break
    case 19:
      mode.type = '段位戦'
      mode.room = '銀の間'
      mode.format = '東風'
      mode.people = 3
      break
    case 20:
      mode.type = '段位戦'
      mode.room = '銀の間'
      mode.format = '半荘'
      mode.people = 3
      break
    case 21:
      mode.type = '段位戦'
      mode.room = '金の間'
      mode.format = '東風'
      mode.people = 3
      break
    case 22:
      mode.type = '段位戦'
      mode.room = '金の間'
      mode.format = '半荘'
      mode.people = 3
      break
    case 23:
      mode.type = '段位戦'
      mode.room = '玉の間'
      mode.format = '東風'
      mode.people = 3
      break
    case 24:
      mode.type = '段位戦'
      mode.room = '玉の間'
      mode.format = '半荘'
      mode.people = 3
      break
    case 25:
      mode.type = '段位戦'
      mode.room = '王座の間'
      mode.format = '東風'
      mode.people = 3
      break
    case 26:
      mode.type = '段位戦'
      mode.room = '王座の間'
      mode.format = '半荘'
      mode.people = 3
      break
  }

  return mode
}
