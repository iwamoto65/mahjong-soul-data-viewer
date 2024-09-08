import type { RecordNoTileActions } from "@/types/userAction"

type NoTileTingpaiCount = number

export const countNoTileTingpai = (seat: number, recordNoTile: RecordNoTileActions): NoTileTingpaiCount => {
  let noTileTingpaiCount: NoTileTingpaiCount = 0

  recordNoTile.forEach((record) => {
    if (record.result.data.players[seat].tingpai) noTileTingpaiCount++
  })

  return noTileTingpaiCount
}
