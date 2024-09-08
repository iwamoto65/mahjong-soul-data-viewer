import type { RecordNoTileActions, RecordLiujuActions } from "@/types/userAction"

export const countNoTile = (recordNoTile: RecordNoTileActions, recordLiuju: RecordLiujuActions): number => {
  const combineRecord = [...recordNoTile, ...recordLiuju]

  return combineRecord.length
}
