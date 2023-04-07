import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcLiqiSuccessRate = (hule: number, liqi: number) => {
  if (hule === 0) return 0

  return fixFloatNumber(liqi / hule * 100)
}
