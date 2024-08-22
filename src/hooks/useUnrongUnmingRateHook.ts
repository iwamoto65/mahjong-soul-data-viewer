import { fixFloatNumber } from "@/utils/fixFloatNumber"
import { useUnrongAfterLiqiRateBasedOnUnrongHook } from "./useUnrongAfterLiqiRateBasedOnUnrongHook"
import { useUnrongAfterChiPengGangRateBasedOnUnrongHook } from "./useUnrongAfterChiPengGangRateBasedOnUnrongHook"

export const useUnrongUnmingRateHook = (unrong: number, afterLiqi: number, afterChiPengGang: number) => {
  if (unrong === 0) return 0

  const unrongAfterLiqiRate: number = useUnrongAfterLiqiRateBasedOnUnrongHook(unrong, afterLiqi)
  const unrongAfterChiPengGangRate: number = useUnrongAfterChiPengGangRateBasedOnUnrongHook(unrong, afterChiPengGang)

  return fixFloatNumber(100 - (unrongAfterLiqiRate + unrongAfterChiPengGangRate))
}
