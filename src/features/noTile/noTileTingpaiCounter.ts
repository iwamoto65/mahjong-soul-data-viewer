export const countNoTileTingpai = (seat: number, recordNoTile: any[]) => {
  let noTileTingpaiCount: number = 0

  recordNoTile.forEach((record) => {
    if (record.result.data.players[seat].tingpai) noTileTingpaiCount++
  })

  return noTileTingpaiCount
}
