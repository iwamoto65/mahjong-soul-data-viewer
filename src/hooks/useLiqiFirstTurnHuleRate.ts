import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcLiqiFirstTurnHuleRate = (liqi: number, firstTurnHule: number) => {
  if (liqi === 0) return 0

  return fixFloatNumber((firstTurnHule / liqi) * 100)
}
