import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcLiqiZhentingRate = (liqi: number, zhenting: number) => {
  if (liqi === 0) return 0

  return fixFloatNumber((zhenting / liqi) * 100)
}
