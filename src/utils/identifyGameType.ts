export const identifyGameType = (mode_id: number) => {
  let matchType: string = ''
  let room: string = ''
  let matchFormat: string = ''
  let numberOfPeople: number = 0

  switch (mode_id) {
    // mode_id別データ
    // https://wikiwiki.jp/majsoul-api/%E5%AE%9A%E6%95%B0%E4%B8%80%E8%A6%A7%E3%81%AB%E3%82%83?word=%E9%87%91%E3%81%AE%E9%96%93
    case 2:
      matchType = '段位戦'
      room = '銅の間'
      matchFormat = '東風'
      numberOfPeople = 4
      break
    case 3:
      matchType = '段位戦'
      room = '銅の間'
      matchFormat = '半荘'
      numberOfPeople = 4
      break
    case 5:
      matchType = '段位戦'
      room = '銀の間'
      matchFormat = '東風'
      numberOfPeople = 4
      break
    case 6:
      matchType = '段位戦'
      room = '銀の間'
      matchFormat = '半荘'
      numberOfPeople = 4
      break
    case 8:
      matchType = '段位戦'
      room = '金の間'
      matchFormat = '東風'
      numberOfPeople = 4
      break
    case 9:
      matchType = '段位戦'
      room = '金の間'
      matchFormat = '半荘'
      numberOfPeople = 4
      break
    case 11:
      matchType = '段位戦'
      room = '玉の間'
      matchFormat = '東風'
      numberOfPeople = 4
      break
    case 12:
      matchType = '段位戦'
      room = '玉の間'
      matchFormat = '半荘'
      numberOfPeople = 4
      break
    case 15:
      matchType = '段位戦'
      room = '王座の間'
      matchFormat = '東風'
      numberOfPeople = 4
      break
    case 16:
      matchType = '段位戦'
      room = '王座の間'
      matchFormat = '半荘'
      numberOfPeople = 4
      break
    case 17:
      matchType = '段位戦'
      room = '銅の間'
      matchFormat = '東風'
      numberOfPeople = 3
      break
    case 18:
      matchType = '段位戦'
      room = '銅の間'
      matchFormat = '半荘'
      numberOfPeople = 3
      break
    case 19:
      matchType = '段位戦'
      room = '銀の間'
      matchFormat = '東風'
      numberOfPeople = 3
      break
    case 20:
      matchType = '段位戦'
      room = '銀の間'
      matchFormat = '半荘'
      numberOfPeople = 3
      break
    case 21:
      matchType = '段位戦'
      room = '金の間'
      matchFormat = '東風'
      numberOfPeople = 3
      break
    case 22:
      matchType = '段位戦'
      room = '金の間'
      matchFormat = '半荘'
      numberOfPeople = 3
      break
    case 23:
      matchType = '段位戦'
      room = '玉の間'
      matchFormat = '東風'
      numberOfPeople = 3
      break
    case 24:
      matchType = '段位戦'
      room = '玉の間'
      matchFormat = '半荘'
      numberOfPeople = 3
      break
    case 25:
      matchType = '段位戦'
      room = '王座の間'
      matchFormat = '東風'
      numberOfPeople = 3
      break
    case 26:
      matchType = '段位戦'
      room = '王座の間'
      matchFormat = '半荘'
      numberOfPeople = 3
      break
  }

  return { matchType: matchType, room: room, matchFormat: matchFormat, numberOfPeople: numberOfPeople }
}
