const pai: { no: number, name: string, label: string }[] = [
  // 萬子
  { no: 0, name: '赤五萬', label: '0m' },
  { no: 1, name: '一萬', label: '1m' },
  { no: 2, name: '二萬', label: '2m' },
  { no: 3, name: '三萬', label: '3m' },
  { no: 4, name: '四萬', label: '4m' },
  { no: 5, name: '五萬', label: '5m' },
  { no: 6, name: '六萬', label: '6m' },
  { no: 7, name: '七萬', label: '7m' },
  { no: 8, name: '八萬', label: '8m' },
  { no: 9, name: '九萬', label: '9m' },
  // 筒子
  { no: 10, name: '赤五筒', label: '0p' },
  { no: 11, name: '一筒', label: '1p' },
  { no: 12, name: '二筒', label: '2p' },
  { no: 13, name: '三筒', label: '3p' },
  { no: 14, name: '四筒', label: '4p' },
  { no: 15, name: '五筒', label: '5p' },
  { no: 16, name: '六筒', label: '6p' },
  { no: 17, name: '七筒', label: '7p' },
  { no: 18, name: '八筒', label: '8p' },
  { no: 19, name: '九筒', label: '9p' },
  // 索子
  { no: 20, name: '赤五索', label: '0s' },
  { no: 21, name: '一索', label: '1s' },
  { no: 22, name: '二索', label: '2s' },
  { no: 23, name: '三索', label: '3s' },
  { no: 24, name: '四索', label: '4s' },
  { no: 25, name: '五索', label: '5s' },
  { no: 26, name: '六索', label: '6s' },
  { no: 27, name: '七索', label: '7s' },
  { no: 28, name: '八索', label: '8s' },
  { no: 29, name: '九索', label: '9s' },
  // 字牌
  { no: 30, name: '東', label: '1z' },
  { no: 31, name: '南', label: '2z' },
  { no: 32, name: '西', label: '3z' },
  { no: 33, name: '北', label: '4z' },
  { no: 34, name: '白', label: '5z' },
  { no: 35, name: '發', label: '6z' },
  { no: 36, name: '中', label: '7z' },
]

export const culculateShanten = (tiles: string[]) => {
  let targeTiles: number[] = new Array()

  tiles.forEach((tile: string) => {
    pai.filter((p) => { if (p.label === tile) targeTiles.push(p.no)})
  })
}

const culculateKokushiShanten = (tiles: number[]) => {
  let kokushiShantenCount: number = 13
  let yaochuhaiCount: number = 0
  let pairsCount: 0 | 1 = 0
  const yaochuhai: number[] = [1, 9, 11, 19, 21, 29, 30, 31, 32, 33, 34, 35, 36]

  // 19字牌を手牌から抜き出し、要素の数を取得
  tiles = tiles.filter((tile: number) => yaochuhai.includes(tile))
  yaochuhaiCount = new Set(tiles).size
  // 重複している19字牌を抜き出し、要素の数を取得
  const duplicatedTiles: number[] = tiles.filter((tile: number, i: number, array: number[]) => array.indexOf(tile) !== i)
  pairsCount = new Set(duplicatedTiles).size >= 1 ? 1 : 0

  kokushiShantenCount -= (yaochuhaiCount + pairsCount)

  return kokushiShantenCount
}

const culculateSevenPairsShanten = (tiles: number[]) => {
  let sevenPairsShantenCount: number = 6
  // 対子の数
  const duplicatedTiles: number[] = tiles.filter((tile: number, i: number, array: number[]) => array.indexOf(tile) === i && array.lastIndexOf(tile) !== i)
  const pairCount: number = new Set(duplicatedTiles).size
  // 孤立牌の数
  const isolatedTiles: number[] = tiles.filter((tile: number, _i: number, array: number[]) => array.indexOf(tile) === array.lastIndexOf(tile))
  const isolatedTilesCount: number = new Set(isolatedTiles).size

  // 七対子の向聴数 = 聴牌までの向聴数 - 対子の数 + （最大対子数 - 対子の数 - 孤立牌の数）
  sevenPairsShantenCount = 6 - pairCount + (7 - pairCount - isolatedTilesCount)

  return sevenPairsShantenCount
}
