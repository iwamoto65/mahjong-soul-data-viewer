import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcUnrongIncludeOnLiqiRate = (liqi: number, unrongAlongWithLiqi: number, unrongAfterLiqi: number) => {
  if (liqi === 0) return 0

  return fixFloatNumber((unrongAlongWithLiqi + unrongAfterLiqi) / liqi * 100)
}
