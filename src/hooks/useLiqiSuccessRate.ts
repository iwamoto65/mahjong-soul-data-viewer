import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcLiqiSuccessRate = (huleWithLiqi: number, liqi: number) => {
  if (huleWithLiqi === 0) return 0

  return fixFloatNumber(huleWithLiqi / liqi * 100)
}
