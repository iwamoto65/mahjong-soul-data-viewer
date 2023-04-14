import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcLiqiChasedRate = (liqi: number, chased: number) => {
  if (liqi === 0) return 0

  return fixFloatNumber((chased / liqi) * 100)
}
