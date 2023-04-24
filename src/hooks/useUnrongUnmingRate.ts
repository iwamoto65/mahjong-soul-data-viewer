import { fixFloatNumber } from "@/utils/fixFloatNumber"
import { CulcUnrongAfterLiqiRateBasedOnUnrong } from "./useUnrongAfterLiqiRateBasedOnUnrong"
import { CulcUnrongAfterChiPengGangRateBasedOnUnrong } from "./useUnrongAfterChiPengGangRateBasedOnUnrong"

export const CulcUnrongUnmingRate = (unrong: number, afterLiqi: number, afterChiPengGang: number) => {
  if (unrong === 0) return 0

  const unrongAfterLiqiRate: number = CulcUnrongAfterLiqiRateBasedOnUnrong(unrong, afterLiqi)
  const unrongAfterChiPengGangRate: number = CulcUnrongAfterChiPengGangRateBasedOnUnrong(unrong, afterChiPengGang)

  return fixFloatNumber(100 - (unrongAfterLiqiRate + unrongAfterChiPengGangRate))
}
